import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Star, Clock } from "lucide-react";
import ServiceCard from "@/components/shared/ServiceCard";
import GlowingButton from "@/components/shared/GlowingButton";
import { getAllStates } from "@/lib/city-data";

export const services = [
  {
    title: "Emergency Plumbing Near Me",
    description: "24/7 rapid response for urgent issues in near me.",
  },
  {
    title: "Leak Repair Near Me",
    description: "Pinpoint hidden water leaks quickly.",
  },
  {
    title: "Drain Cleaning Near Me",
    description: "Clear clogged sinks, tubs, and main lines.",
  },
  {
    title: "Pipe Installation & Repiping Near Me",
    description: "Upgrade aging or corroded piping.",
  },
  {
    title: "Sump Pump Services Near Me",
    description: "Keep basements dry year-round.",
  },
  {
    title: "Water Softener Installation Near Me",
    description: "Eliminate hard-water scale and stains.",
  },
  {
    title: "Gas Line Services Near Me",
    description: "Safe gas pipe installs and leak repairs.",
  },
  {
    title: "Commercial Plumbing Maintenance Near Me",
    description: "Preventive care for businesses and facilities.",
  },
  {
    title: "24/7 Service Near Me",
    description: "Plumbing support around the clock.",
  },
  {
    title: "Leak Detection Near Me",
    description: "Pinpoint hidden water leaks.",
  },
  {
    title: "Burst Pipe Repair Near Me",
    description: "Stop damaging pipe ruptures fast.",
  },
  {
    title: "Water Line Repair Near Me",
    description: "Restore clean water supply lines.",
  },
  {
    title: "Sewer Line Repair Near Me",
    description: "Fix broken or blocked sewers.",
  },
  {
    title: "Sewer Line Replacement Near Me",
    description: "Full upgrade of failing sewer mains.",
  },
  {
    title: "Trenchless Sewer Repair Near Me",
    description: "No-dig solution for damaged pipes.",
  },
  {
    title: "Clogged Drain Service Near Me",
    description: "Emergency unclogging for backups.",
  },
  {
    title: "Hydro-Jetting Near Me",
    description: "High-pressure pipe scouring.",
  },
  {
    title: "Video Pipe Inspection Near Me",
    description: "See exactly what’s wrong underground.",
  },
  {
    title: "Water Heater Repair Near Me",
    description: "Quick fixes for no-hot-water woes.",
  },
  {
    title: "Water Heater Installation Near Me",
    description: "New standard tank systems installed.",
  },
  {
    title: "Tankless Water Heater Installation Near Me",
    description: "Endless hot water, space-saving design.",
  },
  {
    title: "Water Heater Maintenance Near Me",
    description: "Annual tune-ups for peak performance.",
  },
  {
    title: "Toilet Repair Near Me",
    description: "Fix leaks, clogs, and running tanks.",
  },
  {
    title: "Toilet Installation Near Me",
    description: "Upgrade to modern, water-saving toilets.",
  },
  {
    title: "Faucet Repair Near Me",
    description: "Stop drips and squeaks.",
  },
  {
    title: "Faucet Installation Near Me",
    description: "Stylish new taps installed flawlessly.",
  },
  {
    title: "Sink Repair Near Me",
    description: "Mend chips, leaks, and loose mounts.",
  },
  {
    title: "Sink Installation Near Me",
    description: "Fresh sinks for kitchens & vanities.",
  },
  {
    title: "Garbage Disposal Repair Near Me",
    description: "Quiet, efficient grinding restored.",
  },
  {
    title: "Garbage Disposal Installation Near Me",
    description: "New disposers fitted securely.",
  },
  {
    title: "Shower & Tub Repair Near Me",
    description: "Fix leaks, valves, and worn caulk.",
  },
  {
    title: "Shower & Tub Installation Near Me",
    description: "Spa-quality bathing upgrades.",
  },
  {
    title: "Sump Pump Installation Near Me",
    description: "New primary or backup pumps installed.",
  },
  {
    title: "Backflow Prevention Near Me",
    description: "Stop contaminated water reversal.",
  },
  {
    title: "Backflow Testing Near Me",
    description: "Annual certification for code compliance.",
  },
  {
    title: "Gas Line Services Near Me",
    description: "Safe gas piping and appliance hookups.",
  },
  {
    title: "Gas Leak Detection Near Me",
    description: "Locate dangerous gas escapes fast.",
  },
  {
    title: "Fixture Installation Near Me",
    description: "Professional install of any plumbing fixture.",
  },
  {
    title: "New Construction Plumbing Near Me",
    description: "Complete rough-in and finish plumbing.",
  },
  {
    title: "Remodel Plumbing Near Me",
    description: "Plumbing relocations for renovations.",
  },
  {
    title: "Water Filtration Systems Near Me",
    description: "Whole-house or point-of-use filtration.",
  },
  {
    title: "Boiler Services Near Me",
    description: "Boiler repair, replacement, and tuning.",
  },
  {
    title: "Commercial Plumbing Near Me",
    description: "Plumbing solutions for businesses.",
  },
  {
    title: "Grease Trap Cleaning Near Me",
    description: "Keep commercial kitchens code-compliant.",
  },
];

const states = getAllStates()
const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-32 lg:pt-48 lg:pb-48 bg-brand-900 z-20 overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80"
            alt="Licensed Emergency Plumber Repairing Pipe"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/95 to-brand-800/80 mix-blend-multiply" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500 text-white font-bold text-sm mb-8 uppercase tracking-wider shadow-lg shadow-accent-500/20">
                <Clock className="w-4 h-4" />
                <span>24/7 Emergency Response Available</span>
              </div>

              <h1 className="text-4xl lg:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-md">
                Trusted <span className="text-brand-200">Plumbing Experts</span> <br />in the USA
              </h1>

              <p className="text-xl text-brand-50 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 drop-shadow-sm font-medium">
                Don't let a leak ruin your day. Our <strong>licensed & insured</strong> team provides fast, reliable, and affordable plumbing solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <GlowingButton href="tel:+18336090936" text="Call (833) 609-0936" icon="phone" variant="secondary" />
                <GlowingButton href="/services" text="Our Services" icon="arrow" variant="outline" />
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center lg:justify-start gap-8 text-base font-medium text-brand-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-accent-400" />
                  <span>Licensed All Over USA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-accent-400" />
                  <span>4.9/5 Star Rated</span>
                </div>
              </div>
            </div>

            {/* Right: Floating Card */}
            <div className="relative w-full max-w-md hidden lg:block">
              <div className="absolute inset-0 bg-brand-500 rounded-[2rem] rotate-6 blur-2xl opacity-40"></div>
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] shadow-2xl text-white">
                <ul className="space-y-4">
                  {[
                    "Upfront, Flat-Rate Pricing",
                    "No Hidden Fees or OT Charges",
                    "Background Checked Pros",
                    "100% Satisfaction Guarantee"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-lg font-medium">
                      <div className="bg-green-500/20 p-1 rounded-full">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-10">
          <svg className="relative block w-[calc(100%+1.3px)] h-[80px] lg:h-[120px] transform rotate-180" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </section>


      {/* 3. SERVICES GRID */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-accent-600 font-bold uppercase tracking-widest mb-3">What We Do</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Complete Plumbing Solutions Near Me</h2>
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

      {/* 4. COMMON ISSUES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Serving Plumbing Service services Nation Wide</h2>
          <div className="grid grid-cols-5 gap-4">
            {states.map((state, i) => (
              <Link href={`https://${state.state}.${rootDomain}`} key={i} title={`Plumbing services in ${state.state_name}`}>
                <div
                  className="group bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-300 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center"
                >

                  <h4 className="font-bold text-slate-900 text-sm md:text-base group-hover:text-brand-700 transition-colors">
                    {state.state_name}
                  </h4>
                  <p>{state.count} Cities</p>
                </div>
              </Link>
            ))}

          </div>
        </div>
      </section>

      {/* 8. MAP (Generic) */}
      <section className="h-[500px] w-full relative z-0">
        <iframe
          src="https://maps.google.com/maps?q=United%20States&z=4&output=embed"
          width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy"
          className="w-full h-full grayscale-[50%]"
        ></iframe>
      </section>
    </div>
  );
}