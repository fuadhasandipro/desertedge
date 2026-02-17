import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
    CheckCircle, MapPin, Phone, Star,
    Wrench, ShieldCheck, Clock, ArrowRight
} from 'lucide-react';
import locations from '@/data/locations.json';
import { Metadata } from 'next';

// Define the Props type for Next.js 15+
type Props = {
    params: Promise<{ city: string }>
}

// --- 1. DYNAMIC SEO METADATA (Strict) ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // CRITICAL FIX: Await params
    const { city } = await params;

    const cityData = locations.find((c) => c.slug === city);
    if (!cityData) return {};

    // SEO: Canonical URL to prevent duplicate content penalties
    const siteUrl = process.env.NODE_ENV === 'production'
        ? 'https://desertedgeplumbing.com'
        : 'http://localhost:3000';

    // In production, the canonical URL should be the subdomain
    const canonicalUrl = process.env.NODE_ENV === 'production'
        ? `https://${cityData.slug}.desertedgeplumbing.com`
        : `${siteUrl}/city-sites/${cityData.slug}`;

    return {
        title: cityData.meta_title || `Top Rated Plumber in ${cityData.city}, ${cityData.state}`,
        description: `Need a plumber in ${cityData.city}? We offer 24/7 emergency drain cleaning, leak detection, and water heater repair in ${cityData.city}, ${cityData.state}. Licensed & Insured.`,
        alternates: {
            canonical: canonicalUrl,
        },
    };
}

export default async function CityPage({ params }: Props) {
    // CRITICAL FIX: Await params
    const { city } = await params;

    const data = locations.find((c) => c.slug === city);
    if (!data) return notFound();

    // --- 2. JSON-LD SCHEMA ---
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "PlumbingService",
        "name": `DesertEdge Plumbing ${data.city}`,
        "image": data.hero_image,
        "telephone": data.phone,
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": data.city,
            "addressRegion": data.state,
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": data.geo.lat,
            "longitude": data.geo.lng
        },
        "areaServed": {
            "@type": "City",
            "name": data.city
        }
    };

    return (
        <>
            {/* Inject Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* --- HERO SECTION --- */}
            <section className="relative bg-slate-900 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <img src={data.hero_image} alt={`Plumber in ${data.city}`} className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>

                <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-3/5 space-y-6">
                        <div className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-500/50 rounded-full px-4 py-1.5 text-brand-300 font-semibold text-sm uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            Serving {data.city} & Surrounding Areas
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                            Reliable Plumbing in <span className="text-brand-400">{data.city}</span>
                        </h1>

                        <p className="text-xl text-slate-300 max-w-xl">
                            {data.intro_text || `Professional plumbing repair, installation, and maintenance for homeowners in ${data.city}. 24/7 Emergency service available.`}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <a href={`tel:${data.phone.replace(/\D/g, '')}`} className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-glow hover:scale-105 transition-all flex items-center gap-2">
                                <Phone className="w-5 h-5" /> Call {data.phone}
                            </a>
                            <Link href="/contact" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg backdrop-blur-sm transition-all flex items-center gap-2">
                                Book Online <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Trust Badge Card (Floating) */}
                    <div className="md:w-2/5 w-full">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-green-500 p-3 rounded-full text-white">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Guaranteed Service</h3>
                                    <p className="text-slate-400 text-sm">Licensed in {data.state}</p>
                                </div>
                            </div>
                            <ul className="space-y-4 text-slate-300">
                                <li className="flex gap-3"><CheckCircle className="text-brand-400 w-5 h-5" /> 60-Minute Response Time</li>
                                <li className="flex gap-3"><CheckCircle className="text-brand-400 w-5 h-5" /> Upfront, Flat-Rate Pricing</li>
                                <li className="flex gap-3"><CheckCircle className="text-brand-400 w-5 h-5" /> 100% Satisfaction Guarantee</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SERVICES GRID (Localized) --- */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-brand-600 font-bold uppercase tracking-wider text-sm mb-2">Our Services</h2>
                        <h3 className="text-4xl font-bold text-slate-900">Expert Solutions for {data.city}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Emergency Repairs", icon: Clock, desc: "Burst pipes, sewer backups, and gas leaks handled 24/7." },
                            { title: "Drain Cleaning", icon: Wrench, desc: "Hydro-jetting and rooter service to clear stubborn clogs." },
                            { title: "Water Heaters", icon: Star, desc: "Repair and installation of tankless and standard units." }
                        ].map((service, idx) => (
                            <div key={idx} className="group bg-slate-50 p-8 rounded-2xl hover:bg-white hover:shadow-xl border border-slate-100 transition-all duration-300">
                                <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <service.icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
                                <p className="text-slate-600 mb-4">{service.desc}</p>
                                <Link href={`/services`} className="text-brand-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                    See Details <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- LOCAL CONTENT BLOCK (AI Generated) --- */}
            <section className="py-20 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-16">

                    <div className="lg:w-2/3">
                        <h3 className="text-3xl font-bold text-slate-900 mb-6">Why {data.city} Homeowners Trust Us</h3>
                        <div className="prose prose-lg text-slate-600">
                            {/* This content comes from your JSON/AI */}
                            <p className="mb-4">
                                {data.intro_text}
                                We understand that plumbing issues in <strong>{data.city}</strong> can be unique due to the local climate and infrastructure.
                                Whether it's hard water mineral buildup common in {data.state} or older pipe systems in historic neighborhoods,
                                our team has the specific tools and experience to handle it.
                            </p>
                            <p>
                                Don't let a small leak turn into a major disaster. We are stationed locally, meaning we can get to your home in
                                minutes, not hours.
                            </p>
                        </div>

                        <div className="mt-8 p-6 bg-brand-50 border border-brand-100 rounded-xl flex items-start gap-4">
                            <div className="bg-brand-500 text-white p-2 rounded-full mt-1">
                                <Star className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-lg">Local Pro Tip</h4>
                                <p className="text-slate-600">
                                    Did you know {data.city} water pressure can fluctuate? We recommend installing a pressure regulator to protect your appliances.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* --- NEARBY CITIES (The Silo Mesh) --- */}
                    <div className="lg:w-1/3">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
                            <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-brand-500" /> Nearby Service Areas
                            </h4>
                            <p className="text-sm text-slate-500 mb-4">We also have trucks available in:</p>

                            <ul className="space-y-3">
                                {data.nearby?.map((nearbyCity: any) => (
                                    <li key={nearbyCity.slug}>
                                        <a
                                            href={`http://${nearbyCity.slug}.localhost:3000`} // Change to production domain
                                            className="block p-3 rounded-lg bg-slate-50 hover:bg-brand-50 hover:text-brand-700 transition-colors text-slate-700 font-medium text-sm flex justify-between items-center"
                                        >
                                            {nearbyCity.name}
                                            <ArrowRight className="w-4 h-4 opacity-50" />
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-6 pt-6 border-t border-slate-100">
                                <Link href="/locations" className="w-full block text-center bg-slate-900 text-white py-3 rounded-lg font-bold text-sm hover:bg-slate-800 transition">
                                    View All {data.state} Locations
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* --- CTA BANNER --- */}
            <section className="bg-brand-600 py-16 text-center text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Need a Plumber in {data.city} Now?</h2>
                    <p className="text-brand-100 text-lg mb-8 max-w-2xl mx-auto">
                        Our dispatchers are standing by. No extra charge for nights or weekends.
                    </p>
                    <a href={`tel:${data.phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-3 bg-white text-brand-700 px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-slate-50 transition-all hover:scale-105">
                        <Phone className="w-6 h-6" />
                        {data.phone}
                    </a>
                </div>
            </section>
        </>
    );
}