import Link from 'next/link';
import { ArrowRight, Flame, Droplets, Search, Activity, Armchair, Hammer } from 'lucide-react';
import { mainServices } from '@/data/servicesData';

const iconMap: any = {
    Flame: Flame,
    Droplets: Droplets,
    Search: Search,
    Activity: Activity,
    Armchair: Armchair,
    Tap: Hammer
};

export default function ServicesPage() {
    return (
        <div className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Plumbing Services</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Comprehensive plumbing solutions for residential and commercial properties backed by our 100% satisfaction guarantee.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mainServices.map((service) => {
                        const Icon = iconMap[service.icon] || Hammer;
                        return (
                            <div key={service.slug} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100">
                                <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {service.shortDesc}
                                </p>
                                <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-brand-600 font-bold group-hover:gap-3 transition-all">
                                    Learn More <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}