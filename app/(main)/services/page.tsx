import Link from "next/link";
import Image from "next/image";
import { services } from "@/data/servicesData"; // Using your specific data structure
import {
    ArrowRight,
    Phone,
    CheckCircle2,
    ShieldCheck,
    Clock,
    Star,
    MapPin,
    Flame,
    Droplet,
    Search,
    Activity,
    Armchair,
    Wrench,
    PenTool,
    AlertTriangle
} from "lucide-react";

export const metadata = {
    title: "Professional Plumbing Services | Desert Edge Plumbing",
    description: "Comprehensive residential and commercial plumbing solutions. Licensed experts for drains, water heaters, leaks, and emergency repairs.",
};

// Icon Helper
const getIcon = (iconName: any) => {
    // If the data passes the component directly or a string name
    return iconName;
};

// Image Mapping Helper
const getServiceImage = (id: string) => {
    const images: Record<string, string> = {
        "drain-cleaning": "https://ik.imagekit.io/nang9yead/plumber%20clearing%20blocked%20sink%20with%20water?updatedAt=1756066954284",
        "water-heaters": "https://ik.imagekit.io/nang9yead/Plumber%20Fixing%20Leaking%20Sink%20Pipe%20with%20Wrench.png?updatedAt=1756066955385",
        "leak-detection": "https://ik.imagekit.io/nang9yead/PVC%20Pipe%20Installation%20in%20Soil.png?updatedAt=1756066962271",
        "pipe-repair": "https://ik.imagekit.io/nang9yead/Maintenance%20Worker%20Adjusting%20Copper%20Plumbing%20Pipes.png?updatedAt=1756066948233",
        "emergency-plumbing": "https://ik.imagekit.io/nang9yead/Old%20Rusty%20Pipe%20Dripping%20Water.png?updatedAt=1756066951741",
        "sewer-repair": "https://ik.imagekit.io/nang9yead/Old%20Rusty%20Underground%20Pipeline.png?updatedAt=1756066953091",
    };
    return images[id] || "https://ik.imagekit.io/nang9yead/Female%20Carpenter%20or%20Technician%20in%20Workshop.png?updatedAt=1756066944879";
};

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans">

            {/* 1. HERO SECTION: Phone Highlighted */}
            <section className="relative pt-32 pb-44 bg-brand-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://www.gdprofessionalplumbing.com/hero-bg.jpg"
                        alt="Plumbing Tools Background"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900/90 mix-blend-multiply" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-500 font-bold text-sm mb-6 uppercase tracking-wider">
                        <ShieldCheck className="w-4 h-4" /> Licensed & Insured Professionals
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                        Comprehensive <span className="text-brand-200">Plumbing Services</span>
                    </h1>
                    <p className="text-xl text-brand-100 max-w-2xl mx-auto mb-10 leading-relaxed">
                        From minor repairs to major installations, our expert team delivers reliable solutions for every corner of your home or business.
                    </p>

                    {/* Highlighted Phone CTA */}
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <p className="text-brand-200 font-medium uppercase tracking-widest text-sm">24/7 Emergency Dispatch</p>
                        <a href="tel:+18336090936" className="flex items-center gap-3 bg-accent-600 hover:bg-accent-500 text-white font-extrabold text-3xl md:text-4xl px-8 py-4 rounded-2xl shadow-glow transition-transform hover:-translate-y-1">
                            <Phone className="w-8 h-8 md:w-10 md:h-10 animate-pulse" />
                            <span>(833) 609-0936</span>
                        </a>
                    </div>
                </div>

                {/* Wave Divider (Rotated) */}
                <div className="absolute bottom-[60px] left-0 w-full overflow-hidden leading-[0] z-10">
                    <svg className="relative block w-[calc(100%+1.3px)] h-[60px] lg:h-[100px] transform rotate-180" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
                    </svg>
                </div>
            </section>

            {/* 2. STATS COUNTER SECTION */}
            <section className="bg-white relative z-20 -mt-16 lg:-mt-20 pb-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center transform hover:-translate-y-2 transition-transform">
                            <div className="text-5xl font-extrabold text-brand-600 mb-2">50+</div>
                            <p className="text-slate-600 font-medium uppercase tracking-wide">Years Experience</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center transform hover:-translate-y-2 transition-transform">
                            <div className="text-5xl font-extrabold text-accent-500 mb-2">24/7</div>
                            <p className="text-slate-600 font-medium uppercase tracking-wide">Emergency Service</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center transform hover:-translate-y-2 transition-transform">
                            <div className="text-5xl font-extrabold text-brand-600 mb-2">5k+</div>
                            <p className="text-slate-600 font-medium uppercase tracking-wide">Projects Completed</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Main Services Grid */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-sm font-bold text-accent-600 uppercase tracking-widest mb-3">Our Expertise</h2>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Complete Plumbing Solutions</h2>
                        <p className="text-xl text-slate-600">
                            We cover every aspect of residential and commercial plumbing with precision and care.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, i) => {
                            const IconComponent = getIcon(service.icon);
                            return (
                                <div key={i} className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-soft border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

                                    {/* Image Area */}
                                    <div className="relative h-64 w-full overflow-hidden bg-slate-200">
                                        <Image
                                            src={getServiceImage(service.id)}
                                            alt={service.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-900/20 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>

                                        <div className="absolute bottom-0 left-0 w-full p-8">
                                            <div className="w-14 h-14 bg-accent-500 text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 transition-transform">
                                                <IconComponent className="h-7 w-7" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white leading-tight">{service.title}</h3>
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-8 flex flex-col flex-1">
                                        <p className="text-slate-600 mb-8 leading-relaxed flex-1">
                                            {service.shortDesc}
                                        </p>

                                        {/* Sub-services List */}
                                        <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                            <h4 className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-4">Includes:</h4>
                                            <ul className="space-y-3">
                                                {service.subServices.slice(0, 3).map((sub, idx) => (
                                                    <li key={idx} className="flex items-start text-sm text-slate-700 font-semibold">
                                                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                        {sub}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <Link
                                            href={`/services/${service.id}`}
                                            className="inline-flex items-center justify-center w-full py-4 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition-all duration-300 shadow-md hover:shadow-lg"
                                        >
                                            View Details <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 4. Truck CTA Section - THEME FIXED */}
            <section className="py-20 px-4 bg-gradient-to-br from-brand-800 to-brand-900 text-white relative overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                    <div className="text-center lg:text-left z-10 flex-1">
                        <div className="inline-block px-4 py-1 rounded-full bg-accent-500/20 border border-accent-500/30 text-accent-400 text-sm font-bold uppercase tracking-wider mb-4">
                            Local & Ready
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                            We're In Your Neighborhood.<br />
                            <span className="text-brand-200">Call Us Today!</span>
                        </h2>
                        <p className="text-brand-100 text-lg mb-8 max-w-xl">
                            Our fully stocked trucks are ready to deploy 24/7. No waiting for parts, no delays. We fix it on the spot.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                            <a href="tel:+18336090936" className="flex items-center gap-4 bg-white text-brand-900 p-1 pl-1 pr-6 rounded-full hover:shadow-glow transition-all group">
                                <div className="bg-accent-500 text-white p-4 rounded-full group-hover:scale-110 transition-transform">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div className="text-left">
                                    <div className="text-xs uppercase tracking-wider font-bold opacity-60">Call Now</div>
                                    <div className="text-2xl font-black tracking-tight">(833) 609-0936</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="relative w-full max-w-lg lg:max-w-xl h-64 lg:h-96">
                        <Image
                            src="https://www.gdprofessionalplumbing.com/van.png"
                            alt="DesertEdge Plumbing Van"
                            fill
                            className="object-contain drop-shadow-2xl scale-110 lg:scale-125 lg:translate-y-8"
                        />
                    </div>
                </div>
            </section>

            {/* 5. Service Area Map Section - FIXED (Contained) */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Service Areas</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            We proudly serve homeowners and businesses across the region. Check the map below to see if you are in our coverage zone.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white relative h-[500px]">
                        {/* Full Color Map */}
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

                        {/* Overlay Card */}
                        <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-100 max-w-xs hidden md:block">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="bg-brand-100 p-2 rounded-lg text-brand-600">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-slate-900">Nationwide Reach</h3>
                            </div>
                            <p className="text-sm text-slate-600 mb-4">
                                Don't see your city? Call us, we likely service your area too.
                            </p>
                            <Link href="/locations" className="text-accent-600 font-bold text-sm hover:underline flex items-center">
                                View Location List <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}