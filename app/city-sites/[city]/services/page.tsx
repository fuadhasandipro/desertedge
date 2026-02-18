import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getCityBySlug } from '@/lib/city-data';
import { services } from '@/data/servicesData';
import SectionHeading from '@/components/shared/SectionHeading';
import { notFound } from 'next/navigation';

export const metadata = {
    title: 'Plumbing Services | DesertEdge',
    description: 'Full list of plumbing services we offer.',
};

export default async function LocalServicesPage({ params }: { params: Promise<{ city: string }> }) {
    const { city } = await params;
    const cityData = getCityBySlug(city);

    if (!cityData) return notFound();

    return (
        <div className="bg-slate-50 min-h-screen">

            {/* Page Header */}
            <div className="bg-slate-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Plumbing Services in {cityData.city}</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Professional, licensed solutions for every pipe, drain, and fixture in your home.
                    </p>
                </div>
            </div>

            {/* Services List */}
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col md:flex-row gap-8 items-center">
                            <div className="w-full md:w-1/3 relative h-48 rounded-xl overflow-hidden shrink-0">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {service.shortDescription}
                                </p>
                                <Link
                                    href={`/services/${service.slug}`}
                                    className="inline-flex items-center text-brand-600 font-bold uppercase tracking-wider text-sm hover:text-brand-800"
                                >
                                    {cityData.city} {service.title} <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}