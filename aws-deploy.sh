#!/bin/bash
# ==============================================================================
# AWS Auto-Deployment Script for Next.js (Free Tier Architecture)
# ==============================================================================
# Before running this script, ensure you have:
# 1. Installed AWS CLI (https://aws.amazon.com/cli/)
# 2. Run `aws configure` with your Access Key and Secret Key
# 3. Installed `jq` (required for parsing JSON responses)
#
# Usage: ./aws-deploy.sh <YOUR_ROOT_DOMAIN>
# Example: ./aws-deploy.sh rootdomain.com
# ==============================================================================

set -e # Exit immediately if a command exits with a non-zero status

DOMAIN=$1
if [ -z "$DOMAIN" ]; then
    echo "❌ Error: Please provide your root domain as an argument."
    echo "Usage: ./aws-deploy.sh rootdomain.com"
    exit 1
fi

APP_NAME="desertedge"
REGION=$(aws configure get region)
ACCOUNT_ID=$(aws sts get-caller-identity --query "Account" --output text)

echo "🚀 Starting AWS Infrastructure Setup for $DOMAIN in $REGION..."

# ------------------------------------------------------------------------------
# 1. Amazon ECR (Elastic Container Registry) Setup
# ------------------------------------------------------------------------------
echo "📦 Setting up ECR Repository ($APP_NAME)..."
aws ecr describe-repositories --repository-names $APP_NAME >/dev/null 2>&1 || \
aws ecr create-repository --repository-name $APP_NAME >/dev/null

echo "🐳 Logging into ECR..."
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com

echo "🛠️ Building Next.js Docker Image..."
# Pass NEXT_PUBLIC_ROOT_DOMAIN so it's baked into static files
docker build --build-arg NEXT_PUBLIC_ROOT_DOMAIN=$DOMAIN -t $APP_NAME .

echo "📤 Tagging and Pushing Image to ECR..."
docker tag $APP_NAME:latest $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$APP_NAME:latest
docker push $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$APP_NAME:latest

# ------------------------------------------------------------------------------
# 2. IAM Role for EC2
# ------------------------------------------------------------------------------
ROLE_NAME="EC2_Pull_ECR_Role"
PROFILE_NAME="EC2_Pull_ECR_Profile"

echo "🔐 Setting up IAM Role ($ROLE_NAME)..."
aws iam get-role --role-name $ROLE_NAME >/dev/null 2>&1 || \
aws iam create-role --role-name $ROLE_NAME --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{"Effect": "Allow", "Principal": {"Service": "ec2.amazonaws.com"}, "Action": "sts:AssumeRole"}]
}' >/dev/null

aws iam attach-role-policy --role-name $ROLE_NAME --policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly

aws iam get-instance-profile --instance-profile-name $PROFILE_NAME >/dev/null 2>&1 || \
aws iam create-instance-profile --instance-profile-name $PROFILE_NAME >/dev/null

# Attach role to profile (might fail if already attached, ignore error)
aws iam add-role-to-instance-profile --instance-profile-name $PROFILE_NAME --role-name $ROLE_NAME >/dev/null 2>&1 || true

# Wait for IAM role to propagate
sleep 10

# ------------------------------------------------------------------------------
# 3. Security Groups
# ------------------------------------------------------------------------------
SG_NAME="${APP_NAME}-sg"
echo "🛡️ Creating Security Group ($SG_NAME)..."
VPC_ID=$(aws ec2 describe-vpcs --filters Name=isDefault,Values=true --query "Vpcs[0].VpcId" --output text)

SG_ID=$(aws ec2 describe-security-groups --filters Name=group-name,Values=$SG_NAME --query "SecurityGroups[0].GroupId" --output text)
if [ "$SG_ID" == "None" ] || [ -z "$SG_ID" ]; then
    SG_ID=$(aws ec2 create-security-group --group-name $SG_NAME --description "Security group for $APP_NAME" --vpc-id $VPC_ID --query "GroupId" --output text)
    # Allow SSH (22) and App Port (3000)
    aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 22 --cidr 0.0.0.0/0
    aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 3000 --cidr 0.0.0.0/0
fi

# ------------------------------------------------------------------------------
# 4. Amazon EC2 Instance
# ------------------------------------------------------------------------------
echo "💻 Launching EC2 t2.micro Instance..."
# Get the latest Amazon Linux 2023 AMI
AMI_ID=$(aws ssm get-parameters --names /aws/service/ami-amazon-linux-latest/al2023-ami-kernel-6.1-x86_64 --query 'Parameters[0].Value' --output text)

USER_DATA=$(cat <<EOF
#!/bin/bash
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user

aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com
docker pull $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$APP_NAME:latest
docker run -d -p 3000:3000 --restart unless-stopped --name $APP_NAME -e NODE_ENV=production $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$APP_NAME:latest
EOF
)

INSTANCE_ID=$(aws ec2 run-instances \
    --image-id $AMI_ID \
    --instance-type t2.micro \
    --security-group-ids $SG_ID \
    --iam-instance-profile Name=$PROFILE_NAME \
    --user-data "$USER_DATA" \
    --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=$APP_NAME}]" \
    --query "Instances[0].InstanceId" \
    --output text)

echo "⏳ Waiting for EC2 instance to start running (ID: $INSTANCE_ID)..."
aws ec2 wait instance-running --instance-ids $INSTANCE_ID

PUBLIC_IP=$(aws ec2 describe-instances --instance-ids $INSTANCE_ID --query "Reservations[0].Instances[0].PublicIpAddress" --output text)
echo "✅ EC2 Instance Running at: http://$PUBLIC_IP:3000"

# ------------------------------------------------------------------------------
# 5. Application Load Balancer (ALB)
# ------------------------------------------------------------------------------
echo "⚖️ Setting up Application Load Balancer..."
SUBNETS=$(aws ec2 describe-subnets --filters Name=vpc-id,Values=$VPC_ID --query "Subnets[*].SubnetId" --output text | awk '{print $1 " " $2}')

# Note: Automatic ACM Certificate creation via CLI requires DNS validation which is difficult to fully automate in a single synchronous script if the domain isn't already hosted in Route53 on this specific account.
echo ""
echo "⚠️  MANUAL STEPS REQUIRED FOR HTTPS / CLOUDFRONT / DNS:"
echo "------------------------------------------------------"
echo "To keep the script from hanging or failing due to SSL propagation, please complete the final routing steps in the AWS Console:"
echo ""
echo "1. Request an SSL Certificate in AWS Certificate Manager (ACM) for '$DOMAIN' and '*.$DOMAIN'"
echo "2. Create a Target Group (Port 3000) and register Instance: $INSTANCE_ID"
echo "3. Create an Application Load Balancer attached to the Target Group and SSL Cert."
echo "4. Create a CloudFront Distribution pointing to the ALB (Forward the 'Host' header)."
echo "5. Create Route 53 A Records for '$DOMAIN' and '*.$DOMAIN' pointing to CloudFront."
echo ""
echo "🎉 AWS CLI setup script complete! Your EC2 server is spinning up your Docker container now."
