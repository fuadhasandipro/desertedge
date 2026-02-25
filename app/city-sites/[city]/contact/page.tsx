// app/city-sites/[city]/contact/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCityBySlug } from "@/lib/city-data";
import { Phone, Clock, MapPin } from "lucide-react";

interface Props {
    params: Promise<{ city: string }>;
}

// ─── SEO OPTIMIZED METADATA ───────────────────────────────────────────────────
export async function generateMetadata({ params }: Props) {
    const { city } = await params;
    const cityData = getCityBySlug(city);
    if (!cityData) return { title: "Contact Us" };
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
    const canonicalBase = `https://${cityData.slug}.${rootDomain}/contact`;

    return {
        title: `Contact Plumbers in ${cityData.city}, ${cityData.state} | 24/7 Support`,
        description: `Need a plumber in ${cityData.city}? Call us 24/7 at ${cityData.phone} for emergency plumbing repairs, drain cleaning, and water heater service.`,
        alternates: {
            canonical: canonicalBase,
        }
    };
}

export default async function CityContactPage({ params }: Props) {
    const { city } = await params;
    const cityData = getCityBySlug(city);

    if (!cityData) notFound();

    // Fix: Properly encode the city and state for the Google Maps iframe
    const mapQuery = encodeURIComponent(`${cityData.city}, ${cityData.state}`);

    return (
        <div className="flex flex-col min-h-screen font-sans bg-white">
            {/* 1. HERO SECTION */}
            <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="https://ik.imagekit.io/nang9yead/Smiling%20Plumber%20Holding%20Wrench%20in%20Kitchen.png"
                        alt={`Contact a plumber in ${cityData.city}`}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 to-brand-700/80 shadow-inner"></div>
                </div>
                <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
                    <div className="max-w-4xl mx-auto mt-16">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
                            Contact Plumbers in <span className="text-brand-200">{cityData.city}</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-brand-50 opacity-95 max-w-2xl mx-auto leading-relaxed font-medium">
                            Get in touch for fast, reliable plumbing services and expert solutions 24/7.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. GET IN TOUCH CARDS */}
            <section className="py-24 px-4 relative z-20 -mt-16">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Call Card */}
                        <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-xl hover:shadow-2xl hover:border-brand-400 transition-all text-center group">
                            <div className="w-20 h-20 bg-brand-50 text-brand-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                                <Phone className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-3">Call Us Now</h3>
                            <p className="text-slate-500 mb-6">Speak directly with our local plumbing experts.</p>
                            <a href={`tel:${cityData.phone}`} className="text-2xl font-black text-brand-600 hover:text-brand-800 transition">
                                {cityData.phone}
                            </a>
                        </div>

                        {/* Emergency Card */}
                        <div className="bg-red-600 p-10 rounded-[2rem] shadow-xl text-center text-white transform md:-translate-y-4 hover:-translate-y-6 transition-all">
                            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                <Clock className="w-10 h-10 animate-pulse" />
                            </div>
                            <h3 className="text-2xl font-black mb-3">Emergency Service</h3>
                            <p className="text-red-50 mb-6">24/7 emergency response available in {cityData.city}.</p>
                            <a href={`tel:${cityData.phone}`} className="inline-block bg-white text-red-600 px-8 py-3 rounded-xl font-black text-xl hover:bg-red-50 transition shadow-lg">
                                Dispatch Now
                            </a>
                        </div>

                        {/* Location Card */}
                        <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-xl hover:shadow-2xl transition-all text-center">
                            <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                <MapPin className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-3">Service Area</h3>
                            <p className="text-slate-500 mb-6">Serving the greater {cityData.city} region.</p>
                            <span className="text-xl font-black text-slate-800">{cityData.city}, {cityData.state}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. MAP SECTION (Fixed Google Maps iframe) */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                            Serving {cityData.city} & Surrounding Areas
                        </h2>
                        <div className="h-1.5 w-24 bg-brand-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="bg-white p-4 rounded-3xl shadow-xl border border-slate-200 relative h-[450px]">
                        <iframe
                            src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=11&ie=UTF8&iwloc=&output=embed`}
                            width="100%"
                            height="100%"
                            style={{ border: 0, borderRadius: "1.5rem" }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                        ></iframe>
                    </div>
                </div>
            </section>

        </div>
    );
}