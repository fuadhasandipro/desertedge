// app/city-sites/[city]/services/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCityBySlug } from "@/lib/city-data";
import ServiceCard from "@/components/shared/ServiceCard";

interface Props {
    params: Promise<{ city: string }>;
}

// ─── SEO OPTIMIZED METADATA ───────────────────────────────────────────────────
export async function generateMetadata({ params }: Props) {
    const { city } = await params;
    const cityData = getCityBySlug(city);

    if (!cityData) return { title: "Plumbing Services Near Me" };

    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
    const canonicalBase = `https://${cityData.slug}.${rootDomain}/services`;

    return {
        title: `Top-Rated Plumbing Services in ${cityData.city}, ${cityData.state} | 24/7 Pros`,
        description: `Explore comprehensive residential and commercial plumbing solutions in ${cityData.city}. Licensed experts available 24/7 for drains, water heaters, leaks, and emergencies.`,
        keywords: [
            `plumbing services ${cityData.city}`,
            `${cityData.city} plumbers`,
            `emergency plumbing ${cityData.state}`,
            `drain cleaning`,
            `water heater repair`
        ],
        alternates: {
            canonical: canonicalBase,
        }
    };
}

export default async function ServicesPage({ params }: Props) {
    const { city } = await params;
    const cityData = getCityBySlug(city);

    if (!cityData) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-screen font-sans bg-slate-50">
            {/* 1. HERO SECTION */}
            <section className="relative pt-32 pb-44 bg-brand-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/bg.jpg" // Replace with your actual hero image
                        alt={`Plumbing Tools Background in ${cityData.city}`}
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900/90 mix-blend-multiply" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                        Plumbing Services in <span className="text-brand-200">{cityData.city}, {cityData.state}</span>
                    </h1>
                    <p className="text-xl text-brand-100 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Comprehensive, licensed, and insured plumbing solutions for homes and businesses across {cityData.city}. Available 24/7.
                    </p>
                </div>
            </section>

            {/* 2. MAIN SERVICES GRID */}
            <section className="py-20 bg-white relative z-20 -mt-16 mx-4 md:mx-auto md:max-w-7xl rounded-3xl shadow-xl border border-slate-100">
                <div className="container mx-auto px-4 md:px-8 py-8">
                    <div id="services">
                        <div className="mb-16 text-center">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                                Professional Plumbing Solutions in <span className="text-brand-600">{cityData.city}</span>
                            </h2>
                            <div className="h-1.5 w-24 bg-brand-500 mx-auto rounded-full"></div>
                        </div>

                        {/* DYNAMIC SERVICES RENDERED FROM JSON */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {cityData.services?.map((service) => (
                                <ServiceCard
                                    key={service.service_id}
                                    title={service.service_title}
                                    description={service.hero?.subheadline || `Professional ${service.service_title} in ${cityData.city}`}
                                    href={`/services/${service.service_id}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}