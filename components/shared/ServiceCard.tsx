import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PHONE_NUMBER_TEL } from '@/data/constants';

interface ServiceCardProps {
    title: string;
    description: string;
    href: string | null;
}

export default function ServiceCard({ title, description, href }: ServiceCardProps) {
    return (
        <div className="flex flex-col items-center justify-center p-10 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow h-full">
            {/* Title */}
            {href ? <Link
                href={href}

            >
                <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center hover:text-brand-600 transition-all ">
                    {title}
                </h3>
            </Link> : <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center hover:text-brand-600 transition-all ">
                {title}
            </h3>}

            {/* Description */}
            <p className="text-slate-600 text-center mb-8 leading-relaxed text-base">
                {description}
            </p>

            {/* Action Button */}
            <Link
                href={PHONE_NUMBER_TEL}
                className="mt-auto inline-flex items-center border border-slate-200 px-5 py-2 hover:border-slate-300 hover:bg-slate-50 transition-all group"
            >
                <span className="font-medium text-slate-900 mr-3">Get Quotes</span>
                <div className="bg-[#facc15] rounded-full p-1 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <ArrowRight className="w-4 h-4 text-slate-900 stroke-[3]" />
                </div>
            </Link>
        </div>
    );
}