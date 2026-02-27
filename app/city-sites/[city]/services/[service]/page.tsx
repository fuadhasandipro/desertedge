// app/city-sites/[city]/services/[service]/page.tsx

import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, ChevronDown, CheckCircle2 } from "lucide-react";
import ServiceCard from "@/components/shared/ServiceCard";
import GlowingButton from "@/components/shared/GlowingButton";
import type { Metadata } from "next";
import { PHONE_NUMBER, PHONE_NUMBER_TEL } from "@/data/constants";
import { getCityBySlug } from "@/lib/city-data";

// ─── Image Mapping ─────────────────────────────────────────────────────────────
const serviceImages: Record<string, string> = {
    "tankless": "/images/tankless.jpg",
    "emergency-plumbing": "/images/emergency-plumbing.jpeg",
    "leak-repair": "/images/leak-repair.jpg",
    "drain-cleaning": "/images/drain-cleaning.jpg",
    "pipe-installation": "/images/pipe-installation.jpg",
    "water-heater": "/images/water-heater.jpg",
    "toilet": "/images/toilet-repair.webp",
    "boiler": "/images/boiler.webp",
    "shower": "/images/shower.jpg",
    "filtration": "/images/filtration.webp",
    "softener": "/images/softener.jpg",
    "faucet-repair": "/images/faucet-repair.jpg",
    "garbage-disposal": "/images/garbage-disposal.jpg",
    "sump-pump": "/images/sump-pump.png",
    "gas-line": "/images/gas-line.webp",
    "sewer-line": "/images/sewer-line.jpg",
    "commercial-plumbing": "/images/commercial-plumbing.jpg",
    "backflow": "/images/backflow.jpeg",
    "sink": "/images/sink.jpg",
    "video": "/images/video.png",
    "hydro": "/images/hydro.jfif",
    "water-line": "/images/water-line.jpg",
    "grease-trap": "/images/grease-trap.jpg",
    "default": "/images/default.jpeg"
};

const getServiceImage = (serviceId: string) => {
    const id = serviceId.toLowerCase();

    // Direct matches
    const match = Object.keys(serviceImages).find(key => id.includes(key));
    if (match) return serviceImages[match];

    // Smart Keyword Fallbacks for the 45 services
    if (id.includes("tankless")) return serviceImages["tankless"];
    if (id.includes("emergency") || id.includes("24") || id.includes("burst")) return serviceImages["emergency-plumbing"];
    if (id.includes("sink")) return serviceImages["sink"];
    if (id.includes("softener")) return serviceImages["softener"];
    if (id.includes("filtration")) return serviceImages["filtration"];
    if (id.includes("video")) return serviceImages["video"];
    if (id.includes("clog") || id.includes("jetting") || id.includes("clear") || id.includes("drain")) return serviceImages["drain-cleaning"];
    if (id.includes("repiping") || id.includes("pipe")) return serviceImages["pipe-installation"];
    if (id.includes("fixture") || id.includes("tub") || id.includes("shower") || id.includes("toilet") || id.includes("faucet") || id.includes("disposal")) return serviceImages["faucet-repair"];
    if (id.includes("boiler") || id.includes("tankless") || id.includes("heater")) return serviceImages["water-heater"];
    if (id.includes("grease") || id.includes("backflow") || id.includes("construction") || id.includes("remodel") || id.includes("commercial")) return serviceImages["commercial-plumbing"];
    if (id.includes("trenchless") || id.includes("video") || id.includes("camera") || id.includes("sewer")) return serviceImages["sewer-line"];
    if (id.includes("filtration") || id.includes("softener") || id.includes("pump")) return serviceImages["water-heater"]; // fallback
    if (id.includes("gas")) return serviceImages["gas-line"];
    if (id.includes("detection") || id.includes("leak") || id.includes("repair")) return serviceImages["leak-repair"];

    // Default catch-all
    return serviceImages["default"];
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface ServicePageData {
    service_id: string;
    service_title: string;
    hero: { h1: string; subheadline: string; body: string; cta_label: string };
    what_is_section: { h2: string; body: string };
    why_city_needs_section: { h2: string; body: string };
    signs_you_need_section: { h2: string; body: string };
    our_process_section: { h2: string; body: string };
    service_area_section: { h2: string; body: string };
    related_services: { service_id: string; label: string }[];
}



export async function generateStaticParams() {
    return [];
}

// ─── SEO OPTIMIZED METADATA ───────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ city: string; service: string }> }): Promise<Metadata> {
    const { city, service } = await params;
    const cityData = getCityBySlug(city);
    const serviceData = cityData?.services.find(s => s.service_id === service);

    if (!serviceData || !cityData) return { title: "Service Not Found" };

    const primaryZip = cityData.zip_codes?.[0] || "";
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
    const canonicalBase = `https://${cityData.slug}.${rootDomain}/services/${serviceData.service_id}`;

    return {
        title: `${serviceData.service_title} in ${cityData.city}, ${cityData.state} | Top Rated Pros`,
        description: `${serviceData.hero.subheadline} Fast, reliable ${serviceData.service_title.toLowerCase()} serving ${cityData.city} ${primaryZip}. Call us 24/7!`,
        keywords: [
            `${serviceData.service_title.toLowerCase()} ${cityData.city}`,
            `${serviceData.service_title.toLowerCase()} near me`,
            `emergency ${serviceData.service_title.toLowerCase()} ${cityData.state}`,
            `best ${serviceData.service_title.toLowerCase()} ${primaryZip}`
        ],
        alternates: {
            canonical: canonicalBase,
        }
    };
}

export default async function SingleServicePage({ params }: { params: Promise<{ city: string; service: string }> }) {
    const { city, service } = await params;

    const cityData = getCityBySlug(city);
    if (!cityData) notFound();

    const serviceData = cityData.services.find(s => s.service_id === service);
    if (!serviceData) notFound();

    const {
        hero, what_is_section, why_city_needs_section,
        signs_you_need_section, our_process_section, service_area_section,
    } = serviceData;

    const { city: cityName, state, county_name, nearby_cities, zip_codes, faqs, services } = cityData;

    const relevantFaqs = faqs.slice(0, 5);
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
    const canonicalBase = `https://${cityData.slug}.${rootDomain}/services/${serviceData.service_id}`;

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": `${serviceData.service_title} in ${cityName}, ${state}`,
        "brand": {
            "@type": "Brand",
            "name": `${cityName} Plumbing Pros`
        },
        "description": serviceData.hero.subheadline,
        "url": canonicalBase,
        "aggregateRating": {
            "@type": "AggregateRating",
            "reviewCount": 169,
            "ratingValue": 4.9
        }
    };

    return (
        <div className="flex flex-col min-h-screen font-sans">
            {/* Inject Service Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />

            {/* HERO */}
            <section className="relative py-28 lg:py-44 bg-brand-900 mb-10">
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900/90 mix-blend-multiply" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-500 font-bold text-sm mb-6 uppercase tracking-wider">
                        <ShieldCheck className="w-4 h-4" /> {cityName}, {state} Plumbing Service Pros
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-5xl mx-auto">
                        {hero.h1}
                    </h1>
                    <p className="text-xl text-brand-100 max-w-3xl mx-auto mb-4 leading-relaxed font-medium">
                        {hero.subheadline}
                    </p>
                    <p className="text-white text-brand-200 max-w-2xl mx-auto mb-10 leading-relaxed">
                        {hero.body}
                    </p>
                    <GlowingButton href={`${PHONE_NUMBER_TEL}`} text={`Call: ${PHONE_NUMBER}`} icon="phone" variant="primary" />
                </div>
            </section>

            {/* WHAT IS + WHY CITY NEEDS */}
            <section className="py-24 bg-slate-50 overflow-hidden">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 relative w-full lg:w-auto">
                        <div className="absolute -inset-4 bg-slate-50 rounded-[3rem] rotate-2 z-0" />
                        <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] lg:aspect-auto lg:h-[450px]">
                            <Image
                                src={getServiceImage(serviceData.service_id)}
                                alt={`${serviceData.service_title} in ${cityName}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex-1 max-w-2xl space-y-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{what_is_section.h2}</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">{what_is_section.body}</p>
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{why_city_needs_section.h2}</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">{why_city_needs_section.body}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SIGNS + OUR PROCESS */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100">
                        <h2 className="text-2xl font-extrabold text-slate-900 mb-4">{signs_you_need_section.h2}</h2>
                        <p className="text-slate-600 leading-relaxed">{signs_you_need_section.body}</p>
                    </div>
                    <div className="bg-brand-900 rounded-3xl p-10 text-white shadow-sm">
                        <h2 className="text-2xl font-extrabold mb-4">{our_process_section.h2}</h2>
                        <p className="text-brand-100 leading-relaxed">{our_process_section.body}</p>
                    </div>
                </div>
            </section>

            {/* OTHER SERVICES */}
            <section className="py-20 bg-brand-50">
                <div className="container mx-auto px-4">
                    <div className="mb-12 text-center">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                            Other Plumbing Services in <span className="text-brand-600">{cityName}, {state}</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services
                            .filter(s => s.service_id !== serviceData.service_id)
                            .map((s) => (
                                <ServiceCard
                                    key={s.service_id}
                                    title={s.service_title}
                                    description={s.hero?.subheadline || `Professional ${s.service_title} in ${cityName}`}
                                    href={`/services/${s.service_id}`}
                                />
                            ))}
                    </div>
                </div>
            </section>

            {/* SERVICE AREA */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{service_area_section.h2}</h2>
                    <h3 className="text-slate-600 text-lg leading-relaxed mb-3">Zip Codes We Serve</h3>

                    <div className="flex flex-wrap justify-center gap-3 mb-5">
                        {zip_codes.map((zip) => (
                            <span key={zip} className="px-4 py-2 bg-slate-50 rounded-full border border-slate-200 text-slate-700 font-semibold text-sm">
                                {zip}
                            </span>
                        ))}
                    </div>
                    <h3 className="text-slate-600 text-lg leading-relaxed mb-3">Nearby Areas We Serve</h3>

                    <div className="flex flex-wrap justify-center gap-3">
                        {nearby_cities.map((nc) => (
                            <Link
                                key={nc.slug}
                                href={`https://${nc.slug}-${nc.state.toLowerCase()}.${rootDomain}`}
                                title={`${serviceData.service_title} in ${nc.name}, ${nc.state}`}
                                className="px-4 py-2 bg-brand-50 rounded-full border border-brand-100 text-brand-700 font-semibold text-sm hover:bg-brand-100 transition-colors"
                            >
                                {nc.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* BOTTOM CTA */}
            <section className="py-16 mb-0 bg-slate-900 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-extrabold mb-4">Need {serviceData.service_title} in {cityName}?</h2>
                    <p className="text-brand-100 mb-8 text-lg">
                        Call us now — we're available 24/7 for emergencies across {cityName} and {county_name} County.
                    </p>
                    <GlowingButton href={`${PHONE_NUMBER_TEL}`} text={`Call: ${PHONE_NUMBER}`} icon="phone" variant="secondary" />
                </div>
            </section>
        </div>
    );
}