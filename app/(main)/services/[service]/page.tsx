import { services } from "@/data/servicesData";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    Phone,
    CheckCircle2,
    ShieldCheck,
    ArrowRight,
    Flame,
    Droplet,
    Search,
    Activity,
    Armchair,
    Wrench,
    Home,
    Building2,
    Clock
} from "lucide-react";

interface Props {
    // In Next.js 15+, params is a Promise
    params: Promise<{ service: string }>;
}

// Icon Helper
const getIcon = (iconName: any) => {
    const icons: any = {
        "Flame": Flame,
        "Droplet": Droplet,
        "Search": Search,
        "Activity": Activity,
        "Armchair": Armchair,
        "Wrench": Wrench,
        "AlertTriangle": Wrench,
        "PenTool": Wrench
    };
    return typeof iconName === 'string' ? icons[iconName] || Wrench : iconName;
};

// Image Helper
const getServiceImage = (slug: string) => {
    const images: Record<string, string> = {
        "water-heaters": "https://ik.imagekit.io/nang9yead/Plumber%20Fixing%20Leaking%20Sink%20Pipe%20with%20Wrench.png?updatedAt=1756066955385",
        "drain-cleaning": "https://ik.imagekit.io/nang9yead/plumber%20clearing%20blocked%20sink%20with%20water?updatedAt=1756066954284",
        "leak-detection": "https://ik.imagekit.io/nang9yead/PVC%20Pipe%20Installation%20in%20Soil.png?updatedAt=1756066962271",
        "sewer-repair": "https://ik.imagekit.io/nang9yead/Old%20Rusty%20Underground%20Pipeline.png?updatedAt=1756066953091",
        "toilet-repair": "https://ik.imagekit.io/nang9yead/Plumber%20Using%20Plunger%20on%20Toilet%20Bowl%20worker%20in%20orange%20uniform%20unclogging%20toilet?updatedAt=1756066962119",
        "faucet-sink": "https://ik.imagekit.io/nang9yead/Smiling%20Plumber%20Repairing%20Bathroom%20Sink%20Pipe.png?updatedAt=1756066965094",
        "pipe-repair": "https://ik.imagekit.io/nang9yead/Maintenance%20Worker%20Adjusting%20Copper%20Plumbing%20Pipes.png?updatedAt=1756066948233",
        "emergency-plumbing": "https://ik.imagekit.io/nang9yead/Old%20Rusty%20Pipe%20Dripping%20Water.png?updatedAt=1756066951741",
    };
    return images[slug] || "https://ik.imagekit.io/nang9yead/Female%20Carpenter%20or%20Technician%20in%20Workshop.png?updatedAt=1756066944879";
};

export async function generateMetadata({ params }: Props) {
    // Await params here too
    const { service: slug } = await params;

    const service = services.find((s) => s.slug === slug || s.id === slug);

    if (!service) return { title: "Service Not Found" };
    return {
        title: `${service.heroTitle || service.title} | Desert Edge Plumbing`,
        description: service.intro || service.shortDesc,
    };
}

// MAKE COMPONENT ASYNC
export default async function SingleServicePage({ params }: Props) {
    // AWAIT PARAMS BEFORE USING
    const { service: slug } = await params;

    // Use the imported 'services' array
    const service = services.find((s) => s.slug === slug || s.id === slug);

    if (!service) {
        notFound();
    }

    const ServiceIcon = getIcon(service.icon);

    return (
        <div className="flex flex-col min-h-screen font-sans">

            {/* 1. HERO SECTION */}
            <section className="relative pt-28 pb-16 lg:pt-44 lg:pb-40 bg-brand-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={getServiceImage(service.slug || service.id)}
                        alt={service.heroTitle || service.title}
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900/90 mix-blend-multiply" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-500 font-bold text-sm mb-6 uppercase tracking-wider">
                        <ShieldCheck className="w-4 h-4" /> Licensed & Insured
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-5xl mx-auto">
                        {service.heroTitle || service.title}
                    </h1>
                    <p className="text-xl text-brand-100 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
                        {service.intro || service.shortDesc}
                    </p>

                    <div className="flex justify-center">
                        <a href="tel:+18336090936" className="flex items-center gap-3 bg-accent-600 hover:bg-accent-500 text-white font-extrabold text-2xl px-10 py-5 rounded-2xl shadow-glow transition-transform hover:-translate-y-1">
                            <Phone className="w-6 h-6 animate-pulse" />
                            <span>(833) 609-0936</span>
                        </a>
                    </div>
                </div>



            </section>

            {/* 2. INTRO / LEAD GEN SECTION */}
            <section className="pt-24 pb-16 bg-slate-50">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                        Find the Best <span className="text-brand-600">{service.title}</span> Services in the USA
                    </h2>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        Looking for reliable {service.title.toLowerCase()}? Our team of licensed and certified plumbers provides exceptional service at competitive prices. Whether you need emergency repairs, new installation, or maintenance, we're your trusted experts.
                    </p>
                    <a href="tel:+18336090936" className="inline-flex items-center bg-brand-600 hover:bg-brand-700 text-white font-bold px-8 py-3 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl">
                        Call (833) 609-0936 Now
                    </a>
                </div>
            </section>

            {/* 3. SPLIT CONTENT (Residential/Commercial) */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left Content */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                                Are you searching for expert {service.title.toLowerCase()}?
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Look no further! DesertEdge Plumbing is your trusted partner. We provide comprehensive solutions for both residential and commercial properties throughout the US, with 24/7 emergency service availability.
                            </p>

                            <div className="grid gap-6">
                                {/* Residential Box */}
                                <div className="bg-brand-50 rounded-2xl p-6 border border-brand-100 flex gap-4">
                                    <div className="bg-brand-200 p-3 rounded-full h-fit text-brand-700">
                                        <Home className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-brand-800 mb-2">Residential Services</h3>
                                        <p className="text-slate-600">{service.fullContent?.residential || "Comprehensive residential plumbing solutions."}</p>
                                    </div>
                                </div>

                                {/* Commercial Box */}
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex gap-4">
                                    <div className="bg-slate-200 p-3 rounded-full h-fit text-slate-700">
                                        <Building2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800 mb-2">Commercial Services</h3>
                                        <p className="text-slate-600">{service.fullContent?.commercial || "Heavy-duty commercial plumbing services."}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                            <Image
                                src={getServiceImage(service.slug || service.id)}
                                alt={service.title}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/50 to-transparent"></div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 4. STATS BAR */}
            <section className="py-16 bg-brand-50 border-y border-brand-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { val: "50+", label: "Years Experience" },
                            { val: "10k+", label: "Happy Customers" },
                            { val: "24/7", label: "Emergency Service" },
                            { val: "100%", label: "Satisfaction" },
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-4xl md:text-5xl font-extrabold text-brand-600 mb-2">{stat.val}</div>
                                <div className="text-slate-600 font-medium uppercase tracking-wide text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. SERVICES WE OFFER GRID (Features) */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{service.title} Solutions</h2>
                        <p className="text-xl text-slate-600">Specific problems we solve for you every day:</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {service.fullContent?.features?.map((feature: any, i: number) => (
                            <div key={i} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col">
                                <div className="relative h-48 bg-slate-100">
                                    <Image
                                        src={getServiceImage(service.slug || service.id)}
                                        alt={feature.title}
                                        fill
                                        className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-brand-900/20 group-hover:bg-brand-900/10 transition-colors"></div>
                                </div>

                                <div className="p-8 flex flex-col flex-1">
                                    <h3 className="text-xl font-bold text-brand-800 mb-3 group-hover:text-brand-600 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600 mb-6 flex-1">{feature.desc}</p>

                                    <div className="mt-auto pt-6 border-t border-slate-100">
                                        <p className="text-sm font-bold text-slate-400 mb-2">Call to schedule:</p>
                                        <a href="tel:+18336090936" className="text-xl font-bold text-accent-600 flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                            (833) 609-0936 <ArrowRight className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. WHY CHOOSE US */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
                        Why Choose DesertEdge for {service.title}?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Experienced Professionals", desc: "Decades of hands-on experience solving complex issues.", icon: ShieldCheck },
                            { title: "Transparent Pricing", desc: "Flat-rate quotes before we start. No hidden fees.", icon: CheckCircle2 },
                            { title: "Rapid Response", desc: "Our local teams are dispatched immediately for emergencies.", icon: Clock },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm text-center border border-slate-100 hover:-translate-y-1 transition-transform">
                                <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. TRUCK CTA (Reused Theme) */}
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

            {/* 8. MAP SECTION (Contained) */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">Service Area Map</h2>
                    <div className="bg-slate-100 rounded-3xl shadow-xl overflow-hidden border-4 border-white relative h-[450px]">
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
        </div>
    );
}