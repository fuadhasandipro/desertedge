// components/shared/ServiceCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
    title: string;
    description: string;
    image: string;
    href: string;
    delay?: number; // For animation staggered effect
}

export default function ServiceCard({ title, description, image, href }: ServiceCardProps) {
    return (
        <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 h-full">
            <div className="relative h-60 w-full overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white z-10 drop-shadow-md pr-4">
                    {title}
                </h3>
            </div>

            <div className="p-8 flex flex-col flex-1">
                <p className="text-slate-600 mb-6 leading-relaxed flex-1 text-base">
                    {description}
                </p>
                <Link
                    href={href}
                    className="inline-flex items-center text-brand-600 font-bold uppercase tracking-wider text-sm hover:text-brand-800 transition-colors mt-auto"
                >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}