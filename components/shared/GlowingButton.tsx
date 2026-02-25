// components/shared/GlowingButton.tsx
import { Phone, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface GlowingButtonProps {
    href: string;
    text: string;
    variant?: 'primary' | 'secondary' | 'outline';
    icon?: 'phone' | 'arrow' | 'none';
    className?: string;
}

export default function GlowingButton({ href, text, variant = 'primary', icon = 'none', className = '' }: GlowingButtonProps) {
    const baseStyles = "inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1";

    const variants = {
        primary: "bg-brand-600 text-white shadow-glow hover:bg-brand-700 animate-pulse-slow",
        secondary: "bg-accent-500 text-white shadow-lg shadow-accent-500/30 hover:bg-accent-600",
        outline: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
    };

    const Icon = icon === 'phone' ? Phone : icon === 'arrow' ? ArrowRight : null;

    const isTel = href.startsWith('tel:');

    if (isTel) {
        return (
            <a href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
                {Icon && <Icon className={`w-5 h-5 ${icon === 'phone' ? 'animate-pulse' : ''}`} />}
                <span>{text}</span>
            </a>
        );
    }

    return (
        <Link href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
            {Icon && <Icon className="w-5 h-5" />}
            <span>{text}</span>
        </Link>
    );
}