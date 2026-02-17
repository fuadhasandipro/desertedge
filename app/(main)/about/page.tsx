import Image from "next/image";
import Link from "next/link";
import {
    Phone,
    CheckCircle2,
    ArrowRight,
    Star,
    ShieldCheck,
    Clock,
    Users,
    Award,
    MapPin
} from "lucide-react";

export const metadata = {
    title: "About Desert Edge Plumbing | Trusted Since 1973",
    description: "Learn about Desert Edge Plumbing - 50+ years of trusted service. Licensed, insured, and committed to excellence in residential and commercial plumbing.",
};

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans">

            {/* 1. HERO SECTION */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://www.gdprofessionalplumbing.com/hero-bg.jpg"
                        alt="Plumbing Team"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900/90 mix-blend-multiply" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="mb-8">
                        <span className="bg-accent-600 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg animate-pulse">
                            Serving Since 1973
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-4xl mx-auto">
                        About <span className="text-brand-200">Desert Edge Plumbing</span>
                    </h1>
                    <p className="text-xl text-brand-100 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
                        Five decades of trusted service across the USA. We combine old-school integrity with modern innovation to deliver the best plumbing solutions.
                    </p>

                    <div className="flex justify-center">
                        <a href="tel:+18336090936" className="flex items-center gap-3 bg-white text-brand-900 font-extrabold text-xl px-10 py-4 rounded-xl shadow-glow transition-transform hover:-translate-y-1 hover:bg-brand-50">
                            <Phone className="w-6 h-6 text-accent-600" />
                            <span>(833) 609-0936</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* 2. STATS SECTION */}
            <section className="py-20 px-4 bg-gradient-to-br from-brand-800 to-brand-900 text-white relative z-20 -mt-8 mx-4 rounded-3xl shadow-2xl border border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { val: "50+", label: "Years of Experience" },
                            { val: "100+", label: "Expert Plumbers" },
                            { val: "50k+", label: "Happy Customers" },
                            { val: "100k+", label: "Projects Completed" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center group">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/5">
                                    <div className="text-4xl md:text-5xl font-extrabold mb-2 text-accent-400">{stat.val}</div>
                                    <div className="text-sm md:text-base opacity-90 font-medium">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. OUR STORY */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Story & Values</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Discover the journey that made us the most trusted name in plumbing services.
                        </p>
                    </div>

                    <div className="bg-slate-50 rounded-[3rem] shadow-xl overflow-hidden border border-slate-100">
                        <div className="grid grid-cols-1 lg:grid-cols-2">

                            {/* Content Side */}
                            <div className="p-10 md:p-16 flex flex-col justify-center">
                                <h3 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <Award className="w-8 h-8 text-accent-500" />
                                    A Legacy of Excellence
                                </h3>
                                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                                    <p>
                                        Founded in 1973, Desert Edge Plumbing began as a small family business with a simple mission: to provide <strong>honest, reliable plumbing services</strong> throughout the community. What started as a one-van operation has grown into a nationwide leader in the industry.
                                    </p>
                                    <p>
                                        Over the past five decades, we've witnessed the evolution of plumbing technology. Through it all, we've maintained our commitment to quality, integrity, and customer satisfaction.
                                    </p>
                                    <p>
                                        Today, we serve thousands of residential and commercial customers with a team of licensed professionals, state-of-the-art equipment, and an unwavering dedication to getting the job done right.
                                    </p>
                                </div>

                                <div className="mt-8 flex gap-4">
                                    <Link href="/contact" className="px-8 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition shadow-md">
                                        Work With Us
                                    </Link>
                                </div>
                            </div>

                            {/* Image Side */}
                            <div className="relative min-h-[400px] lg:min-h-full">
                                <Image
                                    src="https://ik.imagekit.io/nang9yead/Plumber%20Fixing%20Leaking%20Sink%20Pipe%20with%20Wrench.png?updatedAt=1756066955385"
                                    alt="Plumber working professionally"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-brand-900/20 mix-blend-multiply"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* 4. WHY CHOOSE US */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose Desert Edge?</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            We bring decades of experience to every job, big or small.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Experienced Professionals", icon: Users, desc: "Decades of experience solving all plumbing challenges." },
                            { title: "24/7 Emergency Services", icon: Clock, desc: "No hidden fees. Transparent and budget-friendly pricing." },
                            { title: "Licensed and Insured", icon: ShieldCheck, desc: "Fully licensed and insured for your peace of mind." },
                            { title: "Reliable and Trustworthy", icon: Star, desc: "Honest, dependable service you can rely on every time." },
                            { title: "Affordable Pricing", icon: CheckCircle2, desc: "Quality solutions fairly priced for the best value." },
                            { title: "Satisfaction Guaranteed", icon: Award, desc: "We're committed to top-notch service and complete satisfaction." },
                        ].map((item, i) => (
                            <div key={i} className="bg-slate-50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 group">
                                <div className="flex justify-center mb-6">
                                    <div className="p-4 bg-white rounded-full text-brand-600 shadow-md group-hover:bg-brand-600 group-hover:text-white transition-colors">
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                </div>
                                <h3 className="text-slate-900 font-bold text-xl mb-3 text-center">{item.title}</h3>
                                <p className="text-slate-600 text-center">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. CTA STRIP */}
            <section className="py-16 px-4 bg-brand-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
                    <div className="text-center lg:text-left flex-1">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            We're Available 24/7 For You
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20 flex items-center gap-4">
                                <Phone className="w-8 h-8 text-accent-500" />
                                <div>
                                    <div className="text-xs text-brand-200 uppercase tracking-wider font-bold">Call Today</div>
                                    <div className="text-2xl font-bold text-white">(833) 609-0936</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-64 h-64 lg:w-96 lg:h-80 flex-shrink-0">
                        <Image
                            src="/van.png"
                            alt="Plumbing Van"
                            fill
                            className="object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>
            </section>

            {/* 6. MAP SECTION */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">Nationwide Coverage</h2>
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