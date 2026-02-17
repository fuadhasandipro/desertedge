import Link from 'next/link';
import locations from '@/data/locations.json';
import { cityServicesList } from '@/data/servicesData';
import { notFound } from 'next/navigation';
import { ArrowRight, Hammer } from 'lucide-react';

export default function CityServicesPage({ params }: { params: { city: string } }) {
    const cityData = locations.find(c => c.slug === params.city);
    if (!cityData) return notFound();

    return (
        <div className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Plumbing Services in {cityData.city}, {cityData.state}</h1>
                    <p className="text-lg text-slate-600">Local experts serving {cityData.city} with 24/7 availability.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cityServicesList.map((service, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:border-brand-300 transition-colors">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                            <p className="text-slate-600 mb-6 text-sm">{service.desc}</p>
                            <Link
                                href={`/services/${service.slug}`}
                                className="text-brand-600 font-bold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all"
                            >
                                Service Details <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}