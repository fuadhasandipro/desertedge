// app/city-sites/[city]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Star, ShieldCheck, Clock, MapPin, Phone } from 'lucide-react';
import { getCityBySlug } from '@/lib/city-data';
import SectionHeading from '@/components/shared/SectionHeading';
import GlowingButton from '@/components/shared/GlowingButton';
import ServiceCard from '@/components/shared/ServiceCard';
import SiloMesh from '@/components/shared/SiloMesh';
import { services } from '@/data/servicesData'; // Assuming you have a central services list

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
    const { city } = await params;
    const data = getCityBySlug(city);

    if (!data) return notFound();

    return (
        <div className="flex flex-col font-sans">

            {/* 1. HERO SECTION: Localized & High Impact */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={data.hero_image}
                        alt={`Emergency Plumber in ${data.city}`}
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-transparent to-slate-900/90" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-brand-600/30 backdrop-blur-md border border-brand-500/50 rounded-full px-5 py-2 text-brand-100 font-bold text-sm uppercase tracking-widest mb-8 animate-fade-in-up">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        Now Active in {data.city}, {data.state}
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight drop-shadow-2xl">
                        The Plumbers <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-white">{data.city}</span> Trusts
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                        {data.intro_text || `Fast, reliable, and licensed plumbing services specifically for ${data.city} homeowners. We arrive in minutes, not hours.`}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <GlowingButton
                            href={`tel:${data.phone.replace(/\D/g, '')}`}
                            text={`Call ${data.phone}`}
                            icon="phone"
                        />
                        <GlowingButton
                            href="/services"
                            text="View Local Services"
                            variant="outline"
                            icon="arrow"
                        />
                    </div>

                    {/* Local Trust Badge */}
                    <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm font-semibold text-slate-300">
                        <div className="flex items-center gap-2"><ShieldCheck className="text-green-400" /> Licensed in {data.state}</div>
                        <div className="flex items-center gap-2"><Star className="text-yellow-400" /> Top Rated in {data.city}</div>
                        <div className="flex items-center gap-2"><Clock className="text-blue-400" /> 24/7 Emergency Dispatch</div>
                    </div>
                </div>
            </section>

            {/* 2. STATS / TRUST BAR */}
            <section className="py-12 bg-white border-b border-slate-100">
                <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { label: "Years in Business", val: "20+" },
                        { label: "Local Projects", val: "5k+" },
                        { label: "Satisfaction", val: "100%" },
                        { label: "Response Time", val: "< 60m" },
                    ].map((stat, i) => (
                        <div key={i}>
                            <div className="text-4xl font-extrabold text-brand-600 mb-1">{stat.val}</div>
                            <div className="text-slate-500 font-medium uppercase text-xs tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. LOCAL SERVICES GRID */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <SectionHeading
                        subtitle="Our Expertise"
                        title={`Complete Plumbing Solutions for ${data.city}`}
                        description={`From historic homes in downtown ${data.city} to new constructions in the suburbs, we have the specific experience to handle your plumbing needs.`}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* We map specific services relevant to the city - limiting to 6 for the home page */}
                        {services.slice(0, 6).map((service, i) => (
                            <ServiceCard
                                key={i}
                                title={service.title}
                                description={service.shortDescription} // Use a short localized description if available
                                image={service.image}
                                href={`/services/${service.slug}`} // Links to the SILO page
                            />
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link href="/services" className="text-brand-600 font-bold hover:underline underline-offset-4 text-lg">
                            View All {data.city} Services &rarr;
                        </Link>
                    </div>
                </div>
            </section>

            {/* 4. EMERGENCY BANNER (The "Hook") */}
            <section className="py-20 bg-accent-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                    <div className="text-white text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Plumbing Disaster in {data.city}?</h2>
                        <p className="text-accent-100 text-xl max-w-xl">
                            Don't let water damage destroy your home. We have trucks patrolling {data.city} right now.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 w-full sm:w-auto">
                        <GlowingButton
                            href={`tel:${data.phone.replace(/\D/g, '')}`}
                            text="Get Emergency Help"
                            variant="primary"
                            className="bg-white text-accent-700 hover:bg-slate-100 shadow-none"
                        />
                        <p className="text-white/80 text-sm text-center font-medium">Average arrival time: 45 mins</p>
                    </div>
                </div>
            </section>

            {/* 5. LOCAL SEO CONTENT & MESH (The "Silo" Engine) */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-16">
                    {/* Left: AI-Generated Local Context */}
                    <div className="lg:w-2/3 prose prose-lg prose-slate">
                        <h3>Why {data.city} Homeowners Choose DesertEdge</h3>
                        <p>
                            Finding a reliable plumber in <strong>{data.city}, {data.state}</strong> shouldn't be a gamble.
                            Unlike national franchises that treat you like a number, DesertEdge is deeply rooted in the local community.
                        </p>
                        <p>
                            We understand the unique plumbing challenges here—whether it's the hard water affecting water heaters in
                            {data.city}'s older neighborhoods or the specific sewer line issues caused by local tree species.
                        </p>

                        <div className="my-8 p-6 bg-blue-50 border-l-4 border-brand-500 rounded-r-xl">
                            <h4 className="text-brand-800 font-bold m-0">Our {data.city} Promise</h4>
                            <p className="m-0 text-brand-700">
                                If we don't fix your issue right the first time, we come back and fix it for free. No questions asked.
                            </p>
                        </div>

                        <h3>Serving All Neighborhoods in {data.city}</h3>
                        <p>
                            Our service vehicles are fully stocked mobile warehouses, meaning we can finish most jobs in a single visit.
                            We are frequently in the area and ready to serve.
                        </p>
                    </div>

                    {/* Right: The Silo Mesh Component */}
                    <div className="lg:w-1/3">
                        <SiloMesh cities={data.nearby} currentCity={data.city} />
                    </div>
                </div>
            </section>

            {/* 6. REVIEWS SECTION */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <div className="flex justify-center mb-6">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-8 h-8 text-yellow-400 fill-current" />)}
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">"{data.city}'s Best Kept Secret"</h2>
                    <blockquote className="text-2xl text-slate-600 italic leading-relaxed mb-8">
                        "I called three other plumbers in {data.city} and none could come out until Monday. DesertEdge was here in 40 minutes and fixed the leak for half the price the others quoted."
                    </blockquote>
                    <div className="font-bold text-brand-600">— Jennifer M., {data.city} Resident</div>
                </div>
            </section>

            {/* 7. FAQ (Localized) */}
            {/* ... (Implement specific localized FAQ here similar to main site but with City Name injections) ... */}

        </div>
    );
}