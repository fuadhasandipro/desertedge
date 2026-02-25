// app/city-sites/[city]/about/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCityBySlug } from "@/lib/city-data";
import { Phone, ShieldCheck, Heart, Wrench } from "lucide-react";

interface Props {
    params: Promise<{ city: string }>;
}

// ─── SEO OPTIMIZED METADATA ───────────────────────────────────────────────────
export async function generateMetadata({ params }: Props) {
    const { city } = await params;
    const cityData = getCityBySlug(city);
    if (!cityData) return { title: "About Us" };
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
    const canonicalBase = `https://${cityData.slug}.${rootDomain}/about`;

    return {
        title: `About Our Plumbers in ${cityData.city}, ${cityData.state} | Local Experts`,
        description: `Learn about our trusted plumbing team serving ${cityData.city}, ${cityData.state}. With over 50 years of experience, we provide honest, 24/7 plumbing services.`,
        alternates: {
            canonical: canonicalBase,
        }
    };
}

export default async function CityAboutPage({ params }: Props) {
    const { city } = await params;
    const cityData = getCityBySlug(city);

    if (!cityData) notFound();

    return (
        <div className="flex flex-col min-h-screen font-sans">
            {/* 1. LOCALIZED HERO */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://www.gdprofessionalplumbing.com/hero-bg.jpg" // Replace with your actual hero image
                        alt={`Plumbing Team serving ${cityData.city}`}
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900/90 mix-blend-multiply" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="mb-8">
                        <span className="bg-accent-600 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                            Trusted in {cityData.city} Since 1973
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-4xl mx-auto">
                        Serving the <span className="text-brand-200">{cityData.city}</span> Community
                    </h1>
                    <p className="text-xl text-brand-100 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
                        For over 50 years, we have been the gold standard for plumbing excellence in {cityData.city}. We combine nationwide resources with hometown values.
                    </p>
                    <div className="flex justify-center">
                        <a href={`tel:${cityData.phone}`} className="flex items-center gap-3 bg-white text-brand-900 font-extrabold text-xl px-10 py-4 rounded-xl shadow-glow transition-transform hover:-translate-y-1">
                            <Phone className="w-6 h-6 text-accent-600" />
                            <span>{cityData.phone}</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* 2. OUR STORY & STATS (Combined for cleaner flow) */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 max-w-2xl">
                            <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Our Story in {cityData.city}</h2>
                            <div className="space-y-6 text-lg text-slate-600 leading-relaxed mb-8">
                                <p>
                                    Founded with a simple mission: to provide <strong>honest, reliable plumbing services</strong>. What started as a small local operation has grown into a community staple here in {cityData.city}.
                                </p>
                                <p>
                                    We understand the unique plumbing infrastructure of {cityData.city}, from historic neighborhood restorations to modern developments. Our commitment to quality hasn't wavered in five decades.
                                </p>
                            </div>

                            {/* Inline Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <div className="text-3xl font-black text-brand-600">50+</div>
                                    <div className="text-sm font-bold text-slate-500 uppercase">Years Experience</div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <div className="text-3xl font-black text-brand-600">24/7</div>
                                    <div className="text-sm font-bold text-slate-500 uppercase">Emergency Service</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 relative w-full aspect-[4/3] lg:aspect-auto lg:h-[500px]">
                            <div className="absolute -inset-4 bg-slate-50 rounded-[3rem] rotate-2 z-0"></div>
                            <div className="relative z-10 h-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                                <Image
                                    src="https://ik.imagekit.io/nang9yead/Plumber%20Fixing%20Leaking%20Sink%20Pipe%20with%20Wrench.png"
                                    alt={`Professional Plumber in ${cityData.city}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CORE VALUES SECTION */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Our Core Values</h2>
                        <div className="h-1.5 w-24 bg-brand-500 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Integrity First", desc: "Honest assessments and transparent pricing on every local job.", icon: ShieldCheck },
                            { title: "Quality Craftsmanship", desc: "We use state-of-the-art tech to ensure repairs last for years.", icon: Wrench },
                            { title: "Community Driven", desc: `We take pride in keeping ${cityData.city} homes safe and functional.`, icon: Heart },
                        ].map((value, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
                                <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <value.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                                <p className="text-slate-500">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}