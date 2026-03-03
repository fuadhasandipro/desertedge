// app/(main)/page.tsx
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Star, Clock } from "lucide-react";
import ServiceCard from "@/components/shared/ServiceCard";
import GlowingButton from "@/components/shared/GlowingButton";
import { getAllStates } from "@/lib/city-data";
import { PHONE_NUMBER, PHONE_NUMBER_TEL } from "@/lib/constants";
import { getServices } from "@/lib/services";

export const revalidate = 86400;

const services = getServices("Near Me");

export default async function Home() {
  const states = await getAllStates();
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-32 lg:pt-48 lg:pb-48 bg-brand-900 z-20 overflow-hidden">
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
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>24/7 Emergency Response Available</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-white mb-4 lg:mb-6 leading-tight drop-shadow-md">
                Trusted <span className="text-brand-200">Plumbing Experts</span>{" "}
                <br />in the USA
              </h1>

              <p className="text-xl text-brand-50 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 drop-shadow-sm font-medium">
                Don&apos;t let a leak ruin your day. Our{" "}
                <strong>licensed &amp; insured</strong> team provides fast, reliable,
                and affordable plumbing solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <GlowingButton
                  href={PHONE_NUMBER_TEL}
                  text={`Call ${PHONE_NUMBER}`}
                  icon="phone"
                  variant="secondary"
                />
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center lg:justify-start gap-8 text-base font-medium text-brand-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-accent-400" aria-hidden="true" />
                  <span>Licensed All Over USA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-accent-400" aria-hidden="true" />
                  <span>4.9/5 Star Rated</span>
                </div>
              </div>
            </div>

            {/* Floating trust card */}
            <div className="relative w-full max-w-md hidden lg:block">
              <div className="absolute inset-0 bg-brand-500 rounded-[2rem] rotate-6 blur-2xl opacity-40" />
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] shadow-2xl text-white">
                <ul className="space-y-4">
                  {[
                    "Upfront, Flat-Rate Pricing",
                    "No Hidden Fees or OT Charges",
                    "Background Checked Pros",
                    "100% Satisfaction Guarantee",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-lg font-medium">
                      <div className="bg-green-500/20 p-1 rounded-full">
                        <CheckCircle2 className="w-5 h-5 text-green-400" aria-hidden="true" />
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
        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-10" aria-hidden="true">
          <svg
            className="relative block w-[calc(100%+1.3px)] h-[80px] lg:h-[120px] rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-white"
            />
          </svg>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-12 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-accent-600 font-bold uppercase tracking-widest mb-3">What We Do</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Complete Plumbing Solutions Near Me
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                href={null}
              />
            ))}
          </div>
        </div>
      </section>

      {/* STATES WE SERVE */}
      <section className="py-12 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            Serving Plumbing Services Nationwide
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
            {states.map((state) => (
              <Link
                href={`https://${state.state.toLowerCase()}.${rootDomain}`}
                key={state.state}
                title={`Plumbing services in ${state.state_name}`}
              >
                <div className="group bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-300 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center">
                  <h3 className="font-bold text-slate-900 text-sm md:text-base group-hover:text-brand-700 transition-colors">
                    {state.state_name}
                  </h3>
                  <p className="text-slate-400 text-xs mt-1">{state.count} Cities</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="h-[500px] w-full relative z-0" aria-label="Service area map">
        <iframe
          src="https://maps.google.com/maps?q=United%20States&z=4&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          title="US Plumbing Service Area Map"
          className="w-full h-full grayscale-[50%]"
        />
      </section>
    </div>
  );
}