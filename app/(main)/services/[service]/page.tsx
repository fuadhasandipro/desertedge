import { notFound } from 'next/navigation';
import { mainServices } from '@/data/servicesData';
import Link from 'next/link';
import { CheckCircle, Phone, Clock, ShieldCheck } from 'lucide-react';

export async function generateMetadata({ params }: { params: { service: string } }) {
    const service = mainServices.find(s => s.slug === params.service);
    if (!service) return {};
    return { title: `${service.title} | Licensed & Insured`, description: service.intro };
}

export default function SingleServicePage({ params }: { params: { service: string } }) {
    const service = mainServices.find(s => s.slug === params.service);
    if (!service) return notFound();

    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="bg-slate-900 text-white py-24">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-block bg-brand-600 px-4 py-1 rounded-full text-sm font-bold mb-6 animate-pulse">
                        24/7 EMERGENCY SERVICE
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">{service.heroTitle}</h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">{service.intro}</p>
                    <a href="tel:8336090936" className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-50 transition">
                        <Phone className="w-6 h-6 text-brand-600" /> Call (833) 609-0936
                    </a>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 container mx-auto px-4 grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-12">
                    {/* Residential vs Commercial */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                            <h3 className="text-2xl font-bold mb-4 text-brand-700">Residential Services</h3>
                            <p className="text-slate-700">{service.fullContent.residential}</p>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                            <h3 className="text-2xl font-bold mb-4 text-brand-700">Commercial Services</h3>
                            <p className="text-slate-700">{service.fullContent.commercial}</p>
                        </div>
                    </div>

                    {/* Features List */}
                    <div>
                        <h3 className="text-3xl font-bold mb-8">What We Offer</h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {service.fullContent.features.map((feature, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <CheckCircle className="w-6 h-6 text-brand-500 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-lg">{feature.title}</h4>
                                        <p className="text-slate-600 text-sm">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="bg-brand-600 text-white p-10 rounded-3xl text-center">
                        <h2 className="text-3xl font-bold mb-4">Need {service.title}?</h2>
                        <p className="mb-8 opacity-90">Contact us today for a free consultation and estimate.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a href="tel:8336090936" className="bg-white text-brand-600 px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform">Call (833) 609-0936</a>
                            <Link href="/contact" className="border border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition">Book Online</Link>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="bg-white shadow-xl shadow-slate-200/50 p-8 rounded-2xl border border-slate-100 sticky top-24">
                        <h3 className="text-xl font-bold mb-6 border-b pb-4">Why Choose Us?</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 font-medium text-slate-700"><ShieldCheck className="text-brand-500" /> Licensed & Insured</li>
                            <li className="flex items-center gap-3 font-medium text-slate-700"><Clock className="text-brand-500" /> 15 Min Response Time</li>
                            <li className="flex items-center gap-3 font-medium text-slate-700"><CheckCircle className="text-brand-500" /> 100% Satisfaction</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}