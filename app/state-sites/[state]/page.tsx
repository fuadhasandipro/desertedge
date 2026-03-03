// app/state-sites/[state]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, MapPin } from "lucide-react";
import ServiceCard from "@/components/shared/ServiceCard";
import GlowingButton from "@/components/shared/GlowingButton";
import { getCitiesForState, getStateName } from "@/lib/city-data";
import { PHONE_NUMBER, PHONE_NUMBER_TEL } from "@/lib/constants";
import { getServices } from "@/lib/services";
import type { CityEntry } from "@/lib/types";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
    return [];
}

export default async function StatePage({
    params,
}: {
    params: Promise<{ state: string }>;
}) {
    const { state } = await params;

    // getCitiesForState is deduplicated by React cache() — layout + page share one fetch
    const cities = await getCitiesForState(state) as CityEntry[];
    if (!cities.length) notFound();

    // getStateName is a zero-cost synchronous dictionary lookup
    const stateName = getStateName(state);

    // Shared services list with state-specific suffix — no inline duplication
    const services = getServices(`in ${stateName}`);

    const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

    return (
        <>
            <div className="flex flex-col min-h-screen font-sans">
                {/* HERO */}
                <section className="relative pt-32 pb-32 lg:pt-48 lg:pb-48 bg-slate-900 z-20">
                    <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90" />
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white font-bold text-sm mb-6 uppercase tracking-wider">
                            <MapPin className="w-4 h-4" aria-hidden="true" />
                            <span>Top-Rated in {stateName}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold text-white mb-4 lg:mb-6 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700">
                                Emergency Plumbing Services
                                <br />
                            </span>
                            in {stateName}
                        </h1>
                        <p className="text-xl text-slate-200 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
                            Don&apos;t let plumbing issues ruin your day. Our licensed and insured experts are available 24/7 across {stateName} for fast, reliable, and affordable repairs.
                        </p>
                        <GlowingButton
                            href={PHONE_NUMBER_TEL}
                            text={`Call Now: ${PHONE_NUMBER}`}
                            icon="phone"
                            variant="primary"
                        />
                    </div>
                </section>

                {/* TRUST BAR */}
                <section className="bg-brand-600 py-4">
                    <div className="container mx-auto px-4 flex flex-wrap justify-center gap-6 text-white font-semibold text-sm">
                        {["24/7 Service", "Licensed & Insured", "Upfront Pricing"].map((item) => (
                            <span key={item} className="flex items-center gap-2">
                                <span className="text-accent-400" aria-hidden="true">✓</span>
                                {item}
                            </span>
                        ))}
                    </div>
                </section>

                {/* SERVICES */}
                <section className="py-12 md:py-24 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <p className="text-blue-600 font-bold uppercase tracking-wider mb-2">What We Do</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                                Complete Plumbing Solutions in {stateName}
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service) => (
                                <ServiceCard
                                    key={service.title}
                                    title={service.title}
                                    description={service.description}
                                    href={null}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* CITIES WE SERVE */}
                <section className="py-12 md:py-24 bg-slate-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">
                                Cities We Serve in {stateName}
                            </h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">
                                We provide fast, local plumbing services to communities all across {stateName}. Find your city below to get started.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
                            {cities.map((city) => (
                                <Link
                                    key={city.slug}
                                    href={`https://${city.slug}.${ROOT_DOMAIN}`}
                                    title={`Plumbing services in ${city.city}, ${stateName}`}
                                    className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md hover:border-blue-500 transition-all flex items-center justify-between group"
                                >
                                    <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                                        {city.city}
                                        {city.zip_codes[0] ? ` (${city.zip_codes[0]})` : ""}
                                    </span>
                                    <CheckCircle2 className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" aria-hidden="true" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}