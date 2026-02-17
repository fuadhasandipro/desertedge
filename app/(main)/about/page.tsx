import { ShieldCheck, Users, Clock, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="bg-slate-900 py-20 text-white text-center">
                <h1 className="text-5xl font-bold mb-4">About GD Professional Plumbing</h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                    Providing trusted plumbing solutions across the US for over 15 years.
                </p>
            </section>

            {/* Stats Section */}
            <section className="py-16 container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { label: "Years Experience", value: "15+", icon: Trophy },
                        { label: "Emergency Service", value: "24/7", icon: Clock },
                        { label: "Happy Customers", value: "1000+", icon: Users },
                        { label: "Satisfaction", value: "100%", icon: ShieldCheck },
                    ].map((stat, idx) => (
                        <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <stat.icon className="w-10 h-10 text-brand-600 mx-auto mb-4" />
                            <div className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                            <div className="text-slate-600 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Narrative */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Why We Are The #1 Choice</h2>
                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                        At GD Professional Plumbing, we understand that plumbing issues can disrupt your daily life or business operations.
                        That's why we built our business on three pillars: <strong>Speed, Integrity, and Quality</strong>.
                        With a 15-minute response time target for emergencies and a team of fully licensed professionals,
                        we don't just fix pipes—we restore peace of mind.
                    </p>
                    <Link href="/contact" className="inline-block bg-brand-600 text-white px-8 py-3 rounded-full font-bold hover:bg-brand-700 transition">
                        Contact Us Today
                    </Link>
                </div>
            </section>
        </div>
    );
}