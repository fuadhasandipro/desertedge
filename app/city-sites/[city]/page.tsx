// app/city-sites/[city]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import ServiceCard from "@/components/shared/ServiceCard";
import GlowingButton from "@/components/shared/GlowingButton";
import { MapPin, Award, ChevronDown } from "lucide-react";
import { getCityBySlug, getAllCitySlugs } from "@/lib/city-data";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NearbyCity { name: string; slug: string; state: string; }
interface FAQ { q: string; a: string; }
interface Review { id: number; source: string; author: string; date: string; text: string; rating: number; }
interface Service { service_id: string; service_title: string; hero: { subheadline: string } }

interface CityData {
    city: string;
    state: string;
    state_name: string;
    county_name: string;
    lat: number;
    lng: number;
    slug: string;
    phone: string;
    meta: { title: string; description: string };
    hero: { badge_text: string; h1_highlight: string; h1_main: string; subheadline: string; cta_label: string; hero_image_alt: string; };
    trust_bar: string[];
    about: { badge: string; h2: string; body_paragraphs: string[]; residential_box: { title: string; description: string }; commercial_box: { title: string; description: string }; badge_stat: string; badge_label: string; };
    why_choose_us: { badge: string; h2: string; body: string; points: { label: string; text: string }[]; };
    stats: { val: string; label: string }[];
    services_section: { h2_prefix: string; intro: string };
    zip_codes: string[];
    nearby_cities: NearbyCity[];
    faqs: FAQ[];
    service_area_text: string;
    reviews: Review[];
    services: Service[];
}

// ─── Data Helpers ─────────────────────────────────────────────────────────────
export async function generateStaticParams() {
    return getAllCitySlugs().map(slug => ({ city: slug }));
}

// ─── SEO OPTIMIZED METADATA ───────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
    const { city } = await params;
    const data = getCityBySlug(city);

    if (!data) return { title: "Plumber Near Me" };

    const primaryZip = data.zip_codes?.[0] || "";

    const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
    const canonicalBase = `https://${data.slug}.${ROOT_DOMAIN}`;

    return {
        title: `${data.city}, ${data.state} Plumbing Services | 24/7 Emergency Plumbers in ${data.city}, ${data.state} ${primaryZip} Near Me`,
        description: data.meta.description || `Need a reliable plumber in ${data.city}, ${data.state}? Fast, licensed, 24/7 emergency service. Call now for plumbing, drains, and water heaters.`,
        keywords: [`plumber ${data.city}`, `emergency plumbing ${data.city} ${data.state}`, `plumbing service ${primaryZip}`],
        alternates: {
            canonical: canonicalBase,
        },
    };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
    const { city } = await params;
    const data = getCityBySlug(city);

    if (!data) notFound();

    const {
        city: cityName, state, phone, hero, trust_bar, about, why_choose_us,
        stats, services_section, zip_codes, nearby_cities, faqs, reviews, services
    } = data;

    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
    const canonicalBase = `https://${data.slug}.${rootDomain}`;
    const primaryZip = zip_codes?.[0] || "";

    const avgRating = reviews?.length
        ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
        : "4.9";

    const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: `Plumbing Service in ${data.city}, ${data.state}`,
        image: "https://ik.imagekit.io/kreimr9tq/Screenshot_8.png",
        address: {
            '@type': 'PostalAddress',
            streetAddress: `${data.state_name} Plumbing Service`,
            addressLocality: data.city,
            addressRegion: data.state_name,
            postalCode: primaryZip,
            addressCountry: 'US',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: data.lat,
            longitude: data.lng,
        },
        review: {
            '@type': 'Review',
            reviewRating: {
                '@type': 'Rating',
                ratingValue: avgRating,
                bestRating: '5',
            },
            author: {
                '@type': 'Person',
                name: `${data.state_name} Emergency Plumbing`,
            },
        },
        telephone: data.phone,
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '00:00',
            closes: '23:59',
        },
        areaServed: data.county_name + " County",
        url: canonicalBase,
    };

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": `Plumbing Service in ${data.city}, ${data.state}`,
        "brand": {
            "@type": "Brand",
            "name": `Plumbing Service ${data.city}, ${data.state} Pros`
        },
        "description": `Need a reliable plumber in ${data.city}, ${data.state}? We handle burst pipes, drain cleaning, water-heater fixes, trenchless sewer repair and more fast, licensed, 24/7. Call now!`,
        "url": canonicalBase,
        "aggregateRating": {
            "@type": "AggregateRating",
            "reviewCount": 169,
            "ratingValue": avgRating
        }
    };

    return (
        <>
            {/* INJECT JSON-LD SCHEMA DIRECTLY INTO THE PAGE */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />

            <div className="flex flex-col min-h-screen font-sans">
                {/* HERO SECTION */}
                <section className="relative pt-32 pb-32 lg:pt-48 lg:pb-48 bg-slate-900 z-20 ">
                    <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90" />
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white font-bold text-sm mb-6 uppercase tracking-wider">
                            <MapPin className="w-4 h-4" /> <span>{hero.badge_text}</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700">
                                {hero.h1_highlight}<br />
                            </span>
                            {hero.h1_main}
                        </h1>
                        <p className="text-xl text-slate-200 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
                            {hero.subheadline}
                        </p>
                        <GlowingButton href={`tel:${phone}`} text={hero.cta_label} icon="phone" variant="primary" />
                    </div>
                </section>

                {/* TRUST BAR */}
                <section className="bg-brand-600 py-4">
                    <div className="container mx-auto px-4 flex flex-wrap justify-center gap-6 text-white font-semibold text-sm">
                        {trust_bar.map((item, i) => (
                            <span key={i} className="flex items-center gap-2">
                                <span className="text-accent-400">✓</span> {item}
                            </span>
                        ))}
                    </div>
                </section>

                {/* ABOUT */}
                <section className="py-24 bg-white overflow-hidden">
                    <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-brand-50 border border-brand-100 text-brand-600 font-bold text-xs uppercase tracking-widest mb-6">
                                {about.badge}
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                                Best Emergency Plumbing in <span className="text-brand-600">{cityName}, {state}</span>
                            </h2>
                            {about.body_paragraphs.map((para, i) => (
                                <p key={i} className="text-lg text-slate-600 leading-relaxed mb-6">{para}</p>
                            ))}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                                    <h4 className="text-xl font-extrabold text-slate-900 mb-3">{about.residential_box.title}</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">{about.residential_box.description}</p>
                                </div>
                                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                                    <h4 className="text-xl font-extrabold text-slate-900 mb-3">{about.commercial_box.title}</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">{about.commercial_box.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] -rotate-2 z-0" />
                            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                                <Image src="https://ik.imagekit.io/nang9yead/Plumber%20Fixing%20Leaking%20Sink%20Pipe%20with%20Wrench.png?updatedAt=1756066955385" alt={hero.hero_image_alt} width={800} height={600} className="object-cover" />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-50 z-20 hidden md:block">
                                <div className="flex items-center gap-4">
                                    <div className="bg-brand-100 p-3 rounded-full text-brand-600">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-slate-900 leading-none">{about.badge_stat}</p>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{about.badge_label}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SERVICES GRID */}
                <section className="py-24 bg-white overflow-hidden">
                    <div className="container mx-auto px-4" id="services">
                        <div className="mb-12 text-center lg:text-left">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                                {services_section.h2_prefix} <span className="text-brand-600">{cityName}, {state}</span>
                            </h2>
                            <p className="text-lg text-slate-600 max-w-3xl">{services_section.intro}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {services?.map((service) => (
                                <ServiceCard
                                    key={service.service_id}
                                    title={service.service_title}
                                    description={service.hero?.subheadline || `Professional ${service.service_title} in ${cityName}`}
                                    href={`/services/${service.service_id}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* STATS */}
                <section className="py-24 px-4 bg-brand-900 text-white">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/5">
                                <div className="text-4xl md:text-5xl font-extrabold mb-2 text-accent-400">{stat.val}</div>
                                <div className="text-sm md:text-base opacity-90 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* WHY CHOOSE US */}
                <section className="pt-24 bg-white">
                    <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-16 mb-20">
                        <div className="flex-1 relative aspect-[4/3] lg:aspect-auto lg:h-[450px]">
                            <div className="absolute -inset-4 bg-slate-50 rounded-[3rem] rotate-2 z-0" />
                            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white h-full">
                                <Image src="https://ik.imagekit.io/nang9yead/Plumber%20Fixing%20Leaking%20Sink%20Pipe%20with%20Wrench.png" alt="Plumbing Service" fill className="object-cover" />
                            </div>
                        </div>
                        <div className="flex-1 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-brand-50 border border-brand-100 text-brand-600 font-bold text-xs uppercase mb-6">
                                {why_choose_us.badge}
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">{why_choose_us.h2}</h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">{why_choose_us.body}</p>
                            <div className="space-y-4">
                                {why_choose_us.points.map((point, i) => (
                                    <div key={i} className="flex gap-4">
                                        <span className="mt-1 text-brand-600 font-black text-lg">✓</span>
                                        <div>
                                            <p className="font-bold text-slate-900">{point.label}</p>
                                            <p className="text-slate-600 text-sm">{point.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ZIP CODES & NEARBY */}
                <section className="py-24 bg-slate-50/50">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <h3 className="text-3xl font-extrabold text-slate-900 mb-6">Popular ZIP Codes We Serve</h3>
                            <div className="flex flex-wrap justify-center gap-3">
                                {zip_codes.map((zip) => (
                                    <span key={zip} className="px-4 py-2 bg-white rounded-full border border-slate-200 text-slate-700 font-semibold text-sm shadow-sm">{zip}</span>
                                ))}
                            </div>
                        </div>
                        <div className="text-center max-w-3xl mx-auto mb-8">
                            <h3 className="text-3xl font-extrabold text-slate-900 mb-6">Nearby Cities We Cover</h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                {nearby_cities.map((nc) => (
                                    <Link
                                        key={nc.slug}
                                        href={`https://${nc.slug}-${nc.state.toLowerCase()}.${rootDomain}`}
                                        className="px-5 py-3 bg-white rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm shadow-sm hover:border-brand-400 hover:text-brand-600"
                                    >
                                        {nc.name}, {nc.state}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                            Frequently Asked Questions in {cityName}, {state}
                        </h2>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <details key={i} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all">
                                    <summary className="flex justify-between items-center p-6 font-bold text-lg text-slate-900 cursor-pointer select-none">
                                        {faq.q}
                                        <span className="bg-brand-50 text-brand-600 rounded-full w-8 h-8 flex items-center justify-center group-open:rotate-180">
                                            <ChevronDown className="w-5 h-5" />
                                        </span>
                                    </summary>
                                    <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}