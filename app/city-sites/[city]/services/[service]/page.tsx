import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Phone, ArrowLeft } from 'lucide-react';
import { getCityBySlug } from '@/lib/city-data';
import { services } from '@/data/servicesData';
import GlowingButton from '@/components/shared/GlowingButton';

// Dynamic Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ city: string; service: string }> }) {
    const { city, service } = await params;
    const cityData = getCityBySlug(city);
    const serviceData = services.find(s => s.slug === service);

    if (!cityData || !serviceData) return {};

    return {
        title: `Best ${serviceData.title} in ${cityData.city}, ${cityData.state} | DesertEdge`,
        description: `Need ${serviceData.title} in ${cityData.city}? We provide fast, licensed ${serviceData.title.toLowerCase()} services. Call ${cityData.phone} for a free quote.`,
    };
}

export default async function LocalServiceDetail({ params }: { params: Promise<{ city: string; service: string }> }) {
    const { city, service } = await params;
    const cityData = getCityBySlug(city);
    const serviceData = services.find(s => s.slug === service);

    if (!cityData || !serviceData) return notFound();

    return (
        <div className="font-sans">
            {/* 1. SERVICE HERO */}
            <section className="relative bg-slate-900 text-white py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <Image src={serviceData.image} alt={serviceData.title} fill className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-transparent"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <Link href="/services" className="inline-flex items-center text-brand-300 mb-6 hover:text-white transition">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
                    </Link>
                    <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">
                        Professional <span className="text-brand-400">{serviceData.title}</span> <br /> in {cityData.city}
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
                        {/* We inject the city name dynamically into the description */}
                        Expert {serviceData.title.toLowerCase()} solutions tailored for {cityData.city} homes.
                        Licensed, insured, and available 24/7 for emergencies.
                    </p>
                    <div className="flex gap-4">
                        <GlowingButton href={`tel:${cityData.phone.replace(/\D/g, '')}`} text="Get a Free Quote" icon="phone" />
                    </div>
                </div>
            </section>

            {/* 2. CONTENT & SIDEBAR */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-16">

                    {/* Main Content Area */}
                    <div className="lg:w-2/3 prose prose-lg prose-slate">
                        <h2>Why Choose Us for {serviceData.title} in {cityData.city}?</h2>
                        <p>
                            When it comes to <strong>{serviceData.title}</strong>, {cityData.city} homeowners demand reliability.
                            At DesertEdge, we combine state-of-the-art technology with local expertise.
                        </p>
                        <p>
                            {serviceData.longDescription || "We handle everything from minor adjustments to major system overhauls. Our technicians are trained to identify the root cause of the problem to prevent future breakdowns."}
                        </p>

                        <h3>Our {cityData.city} {serviceData.title} Process</h3>
                        <ul>
                            <li><strong>Inspection:</strong> We arrive at your {cityData.city} property and perform a thorough diagnostic.</li>
                            <li><strong>Upfront Pricing:</strong> You get a flat-rate price before we start. No surprises.</li>
                            <li><strong>Execution:</strong> We perform the {serviceData.title.toLowerCase()} using high-quality parts.</li>
                            <li><strong>Cleanup:</strong> We leave your home cleaner than we found it.</li>
                        </ul>

                        <div className="bg-green-50 p-8 rounded-2xl border border-green-100 my-8 not-prose">
                            <h4 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                                <CheckCircle2 className="w-6 h-6" /> The DesertEdge Guarantee
                            </h4>
                            <p className="text-green-700">
                                We guarantee our {serviceData.title.toLowerCase()} work for 1 year. If anything goes wrong related to our service in {cityData.city}, we fix it for free.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar: Sticky Call to Action & Navigation */}
                    <div className="lg:w-1/3 space-y-8">
                        {/* Quick Contact Box */}
                        <div className="bg-brand-600 text-white p-8 rounded-2xl shadow-xl sticky top-24">
                            <h3 className="text-2xl font-bold mb-4">Need {serviceData.title} Now?</h3>
                            <p className="mb-6 opacity-90">
                                We have technicians available in the {cityData.city} area. Call now for priority dispatch.
                            </p>
                            <a
                                href={`tel:${cityData.phone.replace(/\D/g, '')}`}
                                className="flex items-center justify-center gap-3 bg-white text-brand-700 font-bold py-4 rounded-xl hover:bg-slate-100 transition shadow-lg"
                            >
                                <Phone className="w-5 h-5 animate-pulse" /> {cityData.phone}
                            </a>
                            <div className="mt-6 text-center text-sm opacity-75">
                                <span className="block">NO Extra Charge for Weekends</span>
                            </div>
                        </div>

                        {/* Other Services Link */}
                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                            <h4 className="font-bold text-slate-900 mb-4">Other Services in {cityData.city}</h4>
                            <ul className="space-y-3 text-sm">
                                {services.filter(s => s.slug !== service).slice(0, 5).map(s => (
                                    <li key={s.slug}>
                                        <Link href={`/services/${s.slug}`} className="text-slate-600 hover:text-brand-600 block py-2 border-b border-slate-100 last:border-0">
                                            {s.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}