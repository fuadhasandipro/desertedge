import { notFound } from 'next/navigation';
import locations from '@/data/locations.json';
import { cityServicesList } from '@/data/servicesData';
import { Phone, CheckCircle, MapPin } from 'lucide-react';

export async function generateMetadata({ params }: { params: { city: string, service: string } }) {
    const cityData = locations.find(c => c.slug === params.city);
    const serviceData = cityServicesList.find(s => s.slug === params.service);
    if (!cityData || !serviceData) return {};

    return {
        title: `${serviceData.title} in ${cityData.city}, ${cityData.state}`,
        description: `Professional ${serviceData.title} in ${cityData.city}. Call ${cityData.phone} for 24/7 service.`
    };
}

export default function CitySingleServicePage({ params }: { params: { city: string, service: string } }) {
    const cityData = locations.find(c => c.slug === params.city);
    const serviceData = cityServicesList.find(s => s.slug === params.service);

    if (!cityData || !serviceData) return notFound();

    return (
        <div className="bg-white">
            {/* City Service Hero */}
            <section className="bg-slate-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="flex justify-center items-center gap-2 mb-4 text-brand-300 font-semibold uppercase tracking-wider text-sm">
                        <MapPin className="w-4 h-4" /> Serving {cityData.city}, {cityData.state}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto">
                        {serviceData.title} in {cityData.city}
                    </h1>
                    <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                        {serviceData.desc}
                    </p>
                    <a href={`tel:${cityData.phone.replace(/\D/g, '')}`} className="bg-brand-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-700 transition inline-flex items-center gap-3">
                        <Phone className="w-5 h-5" /> Call {cityData.phone}
                    </a>
                </div>
            </section>

            {/* Content Injection */}
            <section className="py-16 container mx-auto px-4 max-w-4xl">
                <div className="prose prose-lg mx-auto text-slate-700">
                    <p className="lead text-xl font-medium mb-8">
                        Looking for <strong>{serviceData.title}</strong> in <strong>{cityData.city}</strong>?
                        Call GD Professional Plumbing at <strong>{cityData.phone}</strong>.
                        We provide affordable, professional solutions for homes and commercial buildings in {cityData.city}.
                    </p>

                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 my-8">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Why Choose Us in {cityData.city}?</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3"><CheckCircle className="text-brand-500 w-6 h-6 shrink-0" /> Fast service to all {cityData.city} neighborhoods</li>
                            <li className="flex gap-3"><CheckCircle className="text-brand-500 w-6 h-6 shrink-0" /> Licensed plumbers familiar with {cityData.state} codes</li>
                            <li className="flex gap-3"><CheckCircle className="text-brand-500 w-6 h-6 shrink-0" /> Energy-efficient systems and expert installation</li>
                        </ul>
                    </div>

                    <h3>Our Process</h3>
                    <p>
                        Whether you are in downtown {cityData.city} or the surrounding suburbs, our team arrives fully equipped.
                        We start with a thorough inspection of your plumbing system to identify the root cause.
                        For {serviceData.title.toLowerCase()}, we ensure that every component is installed to manufacturer specifications.
                    </p>
                </div>
            </section>
        </div>
    );
}