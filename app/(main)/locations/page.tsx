import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight, Phone, ShieldCheck, Search } from "lucide-react";

// Mock Data with States (Replace this with your actual import)
// import locationsData from "@/data/locations.json"; 
const locationsData = [
    { city: "Phoenix", slug: "phoenix", state: "Arizona" },
    { city: "Scottsdale", slug: "scottsdale", state: "Arizona" },
    { city: "Mesa", slug: "mesa", state: "Arizona" },
    { city: "Chandler", slug: "chandler", state: "Arizona" },
    { city: "Gilbert", slug: "gilbert", state: "Arizona" },
    { city: "Los Angeles", slug: "los-angeles", state: "California" },
    { city: "San Diego", slug: "san-diego", state: "California" },
    { city: "San Francisco", slug: "san-francisco", state: "California" },
    { city: "Dallas", slug: "dallas", state: "Texas" },
    { city: "Houston", slug: "houston", state: "Texas" },
    { city: "Austin", slug: "austin", state: "Texas" },
    { city: "Las Vegas", slug: "las-vegas", state: "Nevada" },
];

// Helper to group locations by state
const locationsByState = locationsData.reduce((acc, loc) => {
    if (!acc[loc.state]) {
        acc[loc.state] = [];
    }
    acc[loc.state].push(loc);
    return acc;
}, {} as Record<string, typeof locationsData>);

export const metadata = {
    title: "Service Areas | Desert Edge Plumbing",
    description: "Find a licensed plumber near you. We proudly serve Arizona, California, Texas, and surrounding regions.",
};

export default function LocationsPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans">

            {/* 1. HERO SECTION */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://www.gdprofessionalplumbing.com/hero-bg.jpg" // Consistent Hero Image
                        alt="Service Area Map Background"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900/90 mix-blend-multiply" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-500 font-bold text-sm mb-6 uppercase tracking-wider">
                        <MapPin className="w-4 h-4" /> Nationwide Coverage
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                        Our Service <span className="text-brand-200">Areas</span>
                    </h1>
                    <p className="text-xl text-brand-100 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        We proudly serve homeowners and businesses across multiple states. Find your local Desert Edge expert today.
                    </p>

                    <div className="max-w-md mx-auto relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search your city..."
                            className="w-full pl-12 pr-4 py-4 rounded-xl text-slate-900 focus:ring-4 focus:ring-accent-500/30 border-0 shadow-lg"
                        />
                    </div>
                </div>

                {/* Wave Divider (Rotated) */}
                <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-10">
                    <svg className="relative block w-[calc(100%+1.3px)] h-[60px] lg:h-[100px] transform rotate-180" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-slate-50"></path>
                    </svg>
                </div>
            </section>

            {/* 2. LOCATIONS GRID (State Wise) */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">

                    {Object.keys(locationsByState).sort().map((state) => (
                        <div key={state} className="mb-16 last:mb-0">
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-3xl font-bold text-slate-900">{state}</h2>
                                <div className="h-1 flex-1 bg-slate-200 rounded-full"></div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {locationsByState[state].map((loc) => (
                                    <Link
                                        key={loc.slug}
                                        href={`http://${loc.slug}.localhost:3000`}
                                        className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-between"
                                        target="_blank"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                                                <MapPin className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <span className="font-bold text-lg text-slate-800 block group-hover:text-brand-700 transition-colors">{loc.city}</span>
                                                <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">View Services</span>
                                            </div>
                                        </div>
                                        <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-accent-500 transform group-hover:translate-x-1 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Fallback if no locations */}
                    {Object.keys(locationsByState).length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-xl text-slate-600">No locations found. Please check back later.</p>
                        </div>
                    )}

                </div>
            </section>

            {/* 3. TRUCK CTA SECTION */}
            <section className="py-16 px-4 bg-gradient-to-br from-brand-800 to-brand-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-900 opacity-50" />
                <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
                    <div className="text-center lg:text-left z-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">We're Available 24/7.<br />Reach Us Today!</h2>
                        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                            <a href="tel:+18336090936" className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                                <Phone className="h-8 w-8 text-accent-500" />
                                <div className="text-left">
                                    <div className="text-xs uppercase tracking-wider opacity-80 text-brand-100">Call Today</div>
                                    <div className="text-2xl font-bold text-white">(833) 609-0936</div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="relative w-full max-w-md lg:max-w-lg h-64 lg:h-80">
                        <Image
                            src="https://www.gdprofessionalplumbing.com/van.png"
                            alt="Plumbing Van"
                            fill
                            className="object-contain scale-110 lg:scale-125 translate-y-4"
                        />
                    </div>
                </div>
            </section>

            {/* 4. MAP SECTION (Contained) */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">Interactive Coverage Map</h2>
                    <div className="bg-slate-100 rounded-3xl shadow-xl overflow-hidden border-4 border-white relative h-[500px]">
                        <iframe
                            src="https://maps.google.com/maps?q=United+States&t=&z=4&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* 5. BOTTOM CTA */}
            <section className="bg-brand-600 text-white py-16 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-8">Can't Find Your City?</h2>
                    <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
                        We serve many surrounding areas not listed here. Call us to confirm service at your address.
                    </p>
                    <a href="tel:+18336090936" className="inline-block bg-white text-brand-700 font-bold px-12 py-5 rounded-xl text-2xl hover:bg-brand-50 transition shadow-lg hover:scale-105">
                        (833) 609-0936
                    </a>
                </div>
            </section>

        </div>
    );
}