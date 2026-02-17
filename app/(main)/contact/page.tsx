import Image from "next/image";
import Link from "next/link";
import { Phone, Clock, MapPin, Mail, ArrowRight } from "lucide-react";

export const metadata = {
    title: "Contact Us | Desert Edge Plumbing",
    description: "Contact Desert Edge Plumbing for 24/7 emergency plumbing services. Call (833) 609-0936 for immediate assistance.",
};

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans">

            {/* 1. HERO SECTION */}
            <section className="relative pt-32 pb-20 bg-brand-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://ik.imagekit.io/nang9yead/Smiling%20Plumber%20Holding%20Wrench%20in%20Kitchen.png?updatedAt=1756066963942"
                        alt="Plumber on Phone"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900/90 mix-blend-multiply" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="mb-6">
                        <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider animate-pulse">
                            24/7 Emergency Service
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                        Contact Us Today
                    </h1>
                    <p className="text-xl text-brand-100 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
                        Get in touch for fast, reliable plumbing services and expert solutions. We are standing by to take your call.
                    </p>

                    <div className="flex justify-center">
                        <a href="tel:+18336090936" className="flex items-center gap-3 bg-white text-brand-900 font-extrabold text-2xl px-10 py-5 rounded-2xl shadow-glow transition-transform hover:-translate-y-1">
                            <Phone className="w-6 h-6 text-accent-600 animate-pulse" />
                            <span>(833) 609-0936</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* 2. MAIN CONTACT CARD */}
            <section className="py-20 px-4 bg-slate-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to Get Started?</h2>
                        <p className="text-xl text-slate-600">
                            Don't wait for plumbing issues to get worse. Call us now for fast, reliable service across the United States.
                        </p>
                    </div>

                    <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-16 border border-slate-100 text-center transform hover:scale-[1.01] transition-transform duration-500">
                        <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-600">
                            <Phone className="w-10 h-10" />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-4">Call Us Now</h3>
                        <p className="text-lg text-slate-600 mb-10 max-w-lg mx-auto">
                            Our team is ready to help with all your plumbing needs. Speak directly to a dispatcher.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <a href="tel:+18336090936" className="inline-flex items-center bg-brand-600 hover:bg-brand-700 text-white font-bold px-10 py-5 rounded-xl text-xl transition-all shadow-lg hover:shadow-brand-500/30">
                                <Phone className="w-6 h-6 mr-3" />
                                Call (833) 609-0936
                            </a>
                            <div className="text-center sm:text-left">
                                <div className="flex items-center gap-2 text-slate-700 font-bold">
                                    <Clock className="w-4 h-4 text-green-500" /> Available 24/7
                                </div>
                                <div className="text-sm text-slate-500">Emergency Service</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SERVICE AREAS GRID */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-6">Service Areas</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            We proudly serve communities across the United States.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { state: "California", cities: "Los Angeles, San Francisco, San Diego" },
                            { state: "New York", cities: "New York City, Buffalo, Rochester" },
                            { state: "Texas", cities: "Houston, Dallas, Austin" },
                            { state: "Florida", cities: "Miami, Orlando, Tampa" },
                            { state: "Illinois", cities: "Chicago, Springfield, Peoria" },
                            { state: "Ohio", cities: "Columbus, Cleveland, Cincinnati" },
                            { state: "Pennsylvania", cities: "Philadelphia, Pittsburgh, Harrisburg" },
                            { state: "Michigan", cities: "Detroit, Grand Rapids, Lansing" },
                        ].map((loc, i) => (
                            <div key={i} className="group bg-slate-50 hover:bg-white p-8 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-xl border border-slate-100">
                                <div className="text-3xl mb-4">📍</div>
                                <h3 className="text-xl font-bold text-brand-900 mb-2">{loc.state}</h3>
                                <p className="text-slate-600 text-sm">{loc.cities}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <Link href="/locations" className="inline-flex items-center text-brand-600 font-bold text-lg hover:text-brand-800 hover:underline">
                            View All Service Areas <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 4. CTA STRIP */}
            <section className="py-8 px-4 bg-brand-800 text-white">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="text-center lg:text-left flex-1">
                        <h2 className="text-3xl font-bold mb-2">Plumbing Emergency?</h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-4">
                            <div className="bg-white/10 p-3 rounded-lg flex items-center gap-3">
                                <Clock className="w-6 h-6 text-accent-500" />
                                <div>
                                    <div className="text-xs opacity-80 uppercase tracking-wider font-bold">Fast Response</div>
                                    <div className="font-bold">60 Minutes or Less</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center lg:justify-end">
                        <a href="tel:+18336090936" className="bg-white text-brand-800 px-8 py-4 rounded-full font-bold hover:bg-brand-50 transition shadow-lg">
                            Call (833) 609-0936
                        </a>
                    </div>
                </div>
            </section>

            {/* 5. MAP SECTION */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">Our Coverage Map</h2>
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