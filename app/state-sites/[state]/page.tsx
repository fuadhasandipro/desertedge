// app/state-sites/[state]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ShieldCheck, Star, Clock } from "lucide-react";
import ServiceCard from "@/components/shared/ServiceCard";
import GlowingButton from "@/components/shared/GlowingButton";
import { getCitiesForState } from "@/lib/city-data";
import { PHONE_NUMBER, PHONE_NUMBER_TEL } from "@/data/constants";

export default async function StatePage({
    params,
}: {
    params: Promise<{ state: string }>;
}) {
    const { state } = await params;
    const cities = getCitiesForState(state);

    if (!cities.length) notFound();

    const stateName = cities[0].state_name;

    // Dynamic services array with state name appended to each
    const services = [
        {
            title: `Emergency Plumbing ${stateName}`,
            description: `24/7 rapid response for urgent issues in ${stateName}.`,
        },
        {
            title: `Leak Repair ${stateName}`,
            description: "Pinpoint hidden water leaks quickly.",
        },
        {
            title: `Drain Cleaning ${stateName}`,
            description: "Clear clogged sinks, tubs, and main lines.",
        },
        {
            title: `Pipe Installation & Repiping ${stateName}`,
            description: "Upgrade aging or corroded piping.",
        },
        {
            title: `Sump Pump Services ${stateName}`,
            description: "Keep basements dry year-round.",
        },
        {
            title: `Water Softener Installation ${stateName}`,
            description: "Eliminate hard-water scale and stains.",
        },
        {
            title: `Gas Line Services ${stateName}`,
            description: "Safe gas pipe installs and leak repairs.",
        },
        {
            title: `Commercial Plumbing Maintenance ${stateName}`,
            description: "Preventive care for businesses and facilities.",
        },
        {
            title: `24/7 Service ${stateName}`,
            description: "Plumbing support around the clock.",
        },
        {
            title: `Leak Detection ${stateName}`,
            description: "Pinpoint hidden water leaks.",
        },
        {
            title: `Burst Pipe Repair ${stateName}`,
            description: "Stop damaging pipe ruptures fast.",
        },
        {
            title: `Water Line Repair ${stateName}`,
            description: "Restore clean water supply lines.",
        },
        {
            title: `Sewer Line Repair ${stateName}`,
            description: "Fix broken or blocked sewers.",
        },
        {
            title: `Sewer Line Replacement ${stateName}`,
            description: "Full upgrade of failing sewer mains.",
        },
        {
            title: `Trenchless Sewer Repair ${stateName}`,
            description: "No-dig solution for damaged pipes.",
        },
        {
            title: `Clogged Drain Service ${stateName}`,
            description: "Emergency unclogging for backups.",
        },
        {
            title: `Hydro-Jetting ${stateName}`,
            description: "High-pressure pipe scouring.",
        },
        {
            title: `Video Pipe Inspection ${stateName}`,
            description: "See exactly what’s wrong underground.",
        },
        {
            title: `Water Heater Repair ${stateName}`,
            description: "Quick fixes for no-hot-water woes.",
        },
        {
            title: `Water Heater Installation ${stateName}`,
            description: "New standard tank systems installed.",
        },
        {
            title: `Tankless Water Heater Installation ${stateName}`,
            description: "Endless hot water, space-saving design.",
        },
        {
            title: `Water Heater Maintenance ${stateName}`,
            description: "Annual tune-ups for peak performance.",
        },
        {
            title: `Toilet Repair ${stateName}`,
            description: "Fix leaks, clogs, and running tanks.",
        },
        {
            title: `Toilet Installation ${stateName}`,
            description: "Upgrade to modern, water-saving toilets.",
        },
        {
            title: `Faucet Repair ${stateName}`,
            description: "Stop drips and squeaks.",
        },
        {
            title: `Faucet Installation ${stateName}`,
            description: "Stylish new taps installed flawlessly.",
        },
        {
            title: `Sink Repair ${stateName}`,
            description: "Mend chips, leaks, and loose mounts.",
        },
        {
            title: `Sink Installation ${stateName}`,
            description: "Fresh sinks for kitchens & vanities.",
        },
        {
            title: `Garbage Disposal Repair ${stateName}`,
            description: "Quiet, efficient grinding restored.",
        },
        {
            title: `Garbage Disposal Installation ${stateName}`,
            description: "New disposers fitted securely.",
        },
        {
            title: `Shower & Tub Repair ${stateName}`,
            description: "Fix leaks, valves, and worn caulk.",
        },
        {
            title: `Shower & Tub Installation ${stateName}`,
            description: "Spa-quality bathing upgrades.",
        },
        {
            title: `Sump Pump Installation ${stateName}`,
            description: "New primary or backup pumps installed.",
        },
        {
            title: `Backflow Prevention ${stateName}`,
            description: "Stop contaminated water reversal.",
        },
        {
            title: `Backflow Testing ${stateName}`,
            description: "Annual certification for code compliance.",
        },
        {
            title: `Gas Leak Detection ${stateName}`,
            description: "Locate dangerous gas escapes fast.",
        },
        {
            title: `Fixture Installation ${stateName}`,
            description: "Professional install of any plumbing fixture.",
        },
        {
            title: `New Construction Plumbing ${stateName}`,
            description: "Complete rough-in and finish plumbing.",
        },
        {
            title: `Remodel Plumbing ${stateName}`,
            description: "Plumbing relocations for renovations.",
        },
        {
            title: `Water Filtration Systems ${stateName}`,
            description: "Whole-house or point-of-use filtration.",
        },
        {
            title: `Boiler Services ${stateName}`,
            description: "Boiler repair, replacement, and tuning.",
        },
        {
            title: `Commercial Plumbing ${stateName}`,
            description: "Plumbing solutions for businesses.",
        },
        {
            title: `Grease Trap Cleaning ${stateName}`,
            description: "Keep commercial kitchens code-compliant.",
        },
    ];

    const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

    return (
        <>
            {/* HERO SECTION */}
            <section className="relative w-full py-16 md:py-24 bg-slate-50 overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 mb-4">
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                            <span className="text-sm font-semibold text-slate-700 ml-2">
                                Top-Rated in {stateName}
                            </span>
                        </div>

                        {/* SEO OPTIMIZED H1 */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
                            Emergency Plumbing Services in <span className="text-blue-600">{stateName}</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl">
                            Don&apos;t let plumbing issues ruin your day. Our licensed and insured experts are available 24/7 across {stateName} for fast, reliable, and affordable repairs.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <GlowingButton href={PHONE_NUMBER_TEL} text={`Call Now: ${PHONE_NUMBER}`} />
                        </div>

                        {/* TRUST BADGES */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="flex items-center gap-2 text-slate-700 font-medium">
                                <Clock className="w-5 h-5 text-blue-600" />
                                <span>24/7 Service</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-700 font-medium">
                                <ShieldCheck className="w-5 h-5 text-blue-600" />
                                <span>Licensed & Insured</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-700 font-medium">
                                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                <span>Upfront Pricing</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES SECTION */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <p className="text-blue-600 font-bold uppercase tracking-wider mb-2">
                            What We Do
                        </p>
                        {/* SEO OPTIMIZED H2 */}
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                            Complete Plumbing Solutions in {stateName}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={index}
                                title={service.title}
                                description={service.description}
                                href={null}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CITIES WE SERVE SECTION */}
            <section className="py-16 md:py-24 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">
                            Cities We Serve in {stateName}
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            We provide fast, local plumbing services to communities all across the state. Find your city below to get started.
                        </p>
                    </div>


                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {cities.map((city) => (
                            <Link
                                key={city.city}
                                href={`https://${city.slug}.${ROOT_DOMAIN}`}
                                title={`Plumbing services in ${city.city}, ${stateName}`}
                                className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md hover:border-blue-500 transition-all flex items-center justify-between group"
                            >
                                <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                                    {city.city || city.city}
                                </span>
                                <CheckCircle2 className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}