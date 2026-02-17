import Image from "next/image";
import Link from "next/link";
import { Phone, CheckCircle2, ArrowRight, Star, Clock, ShieldCheck, MapPin, Wrench, Droplet, Flame, AlertTriangle, Hammer, Bath, Thermometer, ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* 1. HERO SECTION: Fixed Text Visibility & Wave (Rotated) */}
      <section className="relative pt-32 pb-32 lg:pt-48 lg:pb-48 bg-brand-900 z-20 overflow-hidden">

        {/* Background Layer - Fixed Opacity */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://www.gdprofessionalplumbing.com/hero-bg.jpg"
            alt="Licensed Emergency Plumber Repairing Pipe"
            fill
            className="object-cover opacity-30"
            priority
          />
          {/* Darker Gradient for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/90 to-brand-800/80 mix-blend-multiply" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left: Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500 text-white font-bold text-sm mb-8 uppercase tracking-wider shadow-lg shadow-accent-500/20">
                <Clock className="w-4 h-4" />
                <span>24/7 Emergency Response Available</span>
              </div>

              <h1 className="text-4xl lg:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-md">
                Trusted <span className="text-brand-200">Plumbing Experts</span> <br />in the US
              </h1>

              <p className="text-xl text-brand-50 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 drop-shadow-sm font-medium">
                Don't let a leak ruin your day. Our <strong>licensed & insured</strong> team provides fast, reliable, and affordable plumbing solutions for residential and commercial properties.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <a href="tel:+18336090936" className="flex items-center justify-center gap-3 bg-accent-600 hover:bg-accent-500 text-white font-bold text-xl px-8 py-5 rounded-xl shadow-xl shadow-accent-600/20 transition-all transform hover:-translate-y-1">
                  <Phone className="w-6 h-6 animate-pulse" />
                  <span>Call (833) 609-0936</span>
                </a>
                <Link href="/services" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xl px-8 py-5 rounded-xl backdrop-blur-md border border-white/20 transition-all">
                  Our Services <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center lg:justify-start gap-8 text-base font-medium text-brand-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-accent-400" />
                  <span>Licensed #98765</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-accent-400" />
                  <span>4.9/5 Star Rated</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-accent-400" />
                  <span>Local & Operated</span>
                </div>
              </div>
            </div>

            {/* Right: Service Card */}
            <div className="relative w-full max-w-md hidden lg:block">
              {/* Decorative Glow */}
              <div className="absolute inset-0 bg-brand-500 rounded-[2rem] rotate-6 blur-2xl opacity-40"></div>

              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] shadow-2xl text-white">
                <div className="flex items-center gap-5 mb-8 border-b border-white/10 pb-6">
                  <div className="bg-white p-4 rounded-2xl shadow-lg">
                    <Image
                      src="https://www.gdprofessionalplumbing.com/plumber-icon.png"
                      alt="Expert Plumber Icon"
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Fast Dispatch</h3>
                    <p className="text-brand-100">Trucks in your area now</p>
                  </div>
                </div>
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

        {/* Fixed Wave Divider - Seamless Connection (Rotated) */}
        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-10">
          <svg className="relative block w-[calc(100%+1.3px)] h-[80px] lg:h-[120px] transform rotate-180" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* 2. TRUSTED AUTHORITY SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-brand-100 rounded-2xl rotate-2"></div>
              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://ik.imagekit.io/nang9yead/Smiling%20Plumber%20Holding%20Wrench%20in%20Kitchen.png?updatedAt=1756066963942"
                  alt="Trusted Plumber"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur p-6 rounded-xl shadow-lg border border-slate-100">
                  <p className="font-bold text-slate-900 text-lg">"Fixed my burst pipe at 2AM. Lifesavers!"</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex text-accent-500"><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /></div>
                    <span className="text-slate-500 text-sm">- Sarah Jenkins, Local Homeowner</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-accent-600 font-bold uppercase tracking-wider mb-2">Since 1973</h4>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">More Than Just A <br /><span className="text-brand-600">Plumbing Company</span></h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                At DesertEdge Plumbing, we believe in doing the job right the first time. We aren't a national franchise; we are your neighbors. When you call us, you get a licensed professional who cares about your home as much as you do.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Whether it's a dripping faucet or a major sewer line collapse, we have the advanced tools and decades of experience to solve it efficiently.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Licensed & Insured", icon: ShieldCheck },
                  { label: "Upfront Pricing", icon: CheckCircle2 },
                  { label: "24/7 Availability", icon: Clock },
                  { label: "Locally Owned", icon: MapPin },
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="bg-brand-50 p-2 rounded-lg text-brand-600">
                      <feat.icon className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-slate-800">{feat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXTENDED SERVICES GRID */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-accent-600 font-bold uppercase tracking-widest mb-3">What We Do</h2>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Complete Plumbing Solutions</h2>
            <p className="text-xl text-slate-600">
              Residential or Commercial, we have the tools and talent to handle any plumbing challenge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Emergency Repairs",
                img: "https://ik.imagekit.io/nang9yead/Old%20Rusty%20Pipe%20Dripping%20Water.png?updatedAt=1756066951741",
                desc: "Burst pipes, gas leaks, and flooding don't wait. Neither do we. 24/7 rapid response.",
                link: "emergency-plumbing"
              },
              {
                title: "Drain Cleaning",
                img: "https://ik.imagekit.io/nang9yead/plumber%20clearing%20blocked%20sink%20with%20water?updatedAt=1756066954284",
                desc: "Hydro-jetting and advanced snaking to clear the toughest clogs and tree roots.",
                link: "drain-cleaning"
              },
              {
                title: "Water Heaters",
                img: "https://ik.imagekit.io/nang9yead/Plumber%20Fixing%20Leaking%20Sink%20Pipe%20with%20Wrench.png?updatedAt=1756066955385",
                desc: "Repair and installation of tankless, gas, and electric water heater systems.",
                link: "water-heaters"
              },
              {
                title: "Leak Detection",
                img: "https://ik.imagekit.io/nang9yead/PVC%20Pipe%20Installation%20in%20Soil.png?updatedAt=1756066962271",
                desc: "State-of-the-art electronic detection to find hidden leaks behind walls and under slabs.",
                link: "leak-detection"
              },
              {
                title: "Sewer Line Repair",
                img: "https://ik.imagekit.io/nang9yead/Old%20Rusty%20Underground%20Pipeline.png?updatedAt=1756066953091",
                desc: "Trenchless technology to repair sewer lines without destroying your landscape.",
                link: "sewer-repair"
              },
              {
                title: "Commercial Plumbing",
                img: "https://ik.imagekit.io/nang9yead/Industrial%20Green%20and%20Orange%20Water%20Pipelines?updatedAt=1756066950649",
                desc: "Heavy-duty plumbing solutions for offices, restaurants, and industrial facilities.",
                link: "commercial-plumbing"
              },
              {
                title: "Toilet Repair",
                img: "https://ik.imagekit.io/nang9yead/Plumber%20Using%20Plunger%20on%20Toilet%20Bowl%20worker%20in%20orange%20uniform%20unclogging%20toilet?updatedAt=1756066962119",
                desc: "Fixing running toilets, leaks, and clogs, or installing new water-efficient models.",
                link: "toilet-repair"
              },
              {
                title: "Gas Line Services",
                img: "https://ik.imagekit.io/nang9yead/Industrial%20Green%20and%20Orange%20Water%20Pipelines?updatedAt=1756066950649",
                desc: "Safe, code-compliant gas line installation and repair for stoves, dryers, and heaters.",
                link: "gas-lines"
              },
              {
                title: "Repiping",
                img: "https://ik.imagekit.io/nang9yead/Maintenance%20Worker%20Adjusting%20Copper%20Plumbing%20Pipes.png?updatedAt=1756066948233",
                desc: "Whole-home PEX or Copper repiping to replace old, corroded galvanized pipes.",
                link: "repiping"
              },
            ].map((service, i) => (
              <div key={i} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                  <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white z-10 drop-shadow-md">{service.title}</h3>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <p className="text-slate-600 mb-8 leading-relaxed flex-1">
                    {service.desc}
                  </p>
                  <Link href={`/services/${service.link}`} className="inline-flex items-center text-brand-600 font-bold uppercase tracking-wider text-sm hover:text-brand-800 transition-colors">
                    <span>View Service Details</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/services" className="inline-block bg-brand-600 text-white font-bold py-4 px-10 rounded-full hover:bg-brand-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              View All Plumbing Services
            </Link>
          </div>
        </div>
      </section>

      {/* 4. COMMON ISSUES SECTION (New Content) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Common Plumbing Problems We Solve Daily</h2>
              <p className="text-lg text-slate-600 mb-8">
                If you're noticing any of these signs, don't wait. Small issues can turn into costly repairs if ignored.
              </p>
              <a href="tel:+18336090936" className="flex items-center gap-4 p-6 bg-brand-50 rounded-2xl border border-brand-100 hover:bg-brand-100 transition cursor-pointer group">
                <div className="bg-brand-600 text-white p-3 rounded-full group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Speak to a Plumber</div>
                  <div className="text-brand-600 font-bold text-xl">(833) 609-0936</div>
                </div>
              </a>
            </div>

            <div className="lg:w-2/3 grid md:grid-cols-2 gap-6">
              {[
                { title: "No Hot Water", desc: "Could be a failing heating element, thermostat, or sediment buildup.", icon: Thermometer },
                { title: "Low Water Pressure", desc: "Often caused by hidden leaks, pipe corrosion, or clog buildup.", icon: Droplet },
                { title: "Slow Drains", desc: "Early warning sign of a main sewer line blockage or root intrusion.", icon: AlertTriangle },
                { title: "Dripping Faucets", desc: "Wastes hundreds of gallons a year and increases your water bill.", icon: Droplet },
                { title: "Running Toilets", desc: "Usually a worn flapper or valve issue that needs quick replacement.", icon: Bath },
                { title: "Noisy Pipes", desc: "Banging or rattling pipes (water hammer) can damage connections.", icon: Hammer },
              ].map((issue, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                  <div className="flex-shrink-0">
                    <div className="bg-accent-100 text-accent-600 w-12 h-12 rounded-xl flex items-center justify-center">
                      <issue.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">{issue.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{issue.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESS SECTION */}
      <section className="py-24 bg-brand-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">How We Work</h2>
            <p className="text-brand-100 text-lg max-w-2xl mx-auto">No guesswork. Just a proven system to get your plumbing back to normal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Contact Us", text: "Call our 24/7 hotline. A real person answers." },
              { num: "02", title: "Diagnosis", text: "We inspect the issue and provide a flat-rate quote." },
              { num: "03", title: "Repair", text: "Our pros fix it right the first time, keeping your home clean." },
              { num: "04", title: "Satisfaction", text: "We don't leave until you're 100% happy with the work." }
            ].map((step, i) => (
              <div key={i} className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all group text-center md:text-left">
                <div className="text-5xl font-black text-brand-800 mb-4 inline-block">{step.num}</div>
                <h3 className="text-2xl font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-brand-100 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION STRIP */}
      <section className="py-20 bg-accent-500 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight drop-shadow-md">
            Don't Let a Small Leak Become a <br className="hidden md:block" /> Big Expense.
          </h2>
          <div className="bg-white rounded-3xl p-8 max-w-5xl mx-auto shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left flex-1">
                <div className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider mb-2">New Customer Special</div>
                <h3 className="text-3xl font-bold text-slate-900">$50 OFF Any Repair Service</h3>
                <p className="text-slate-600 mt-2 text-lg">Valid for first-time customers. Mention code <strong>"WEB50"</strong>.</p>
              </div>
              <a href="tel:+18336090936" className="flex-shrink-0 bg-brand-600 text-white font-bold text-xl px-12 py-5 rounded-xl shadow-glow hover:bg-brand-700 transition-all animate-pulse-slow">
                Call to Claim: (833) 609-0936
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600 text-lg">Everything you need to know about our services.</p>
          </div>

          <div className="space-y-4">
            {[
              { q: "How quickly can you arrive for an emergency?", a: "We strive for a 60-minute response time for all emergency calls within our primary service area. Our dispatch team is available 24/7." },
              { q: "Do you charge by the hour or job?", a: "We use Flat-Rate Pricing. You'll know the exact cost of the job UPFRONT before we start any work, regardless of how long the repair takes. No surprise bills." },
              { q: "Are your plumbers licensed?", a: "Yes, every technician is fully licensed, bonded, insured, and thoroughly background-checked for your safety and peace of mind." },
              { q: "Do you offer warranties on your work?", a: "Absolutely. We stand behind our workmanship with a 100% satisfaction guarantee, and most parts come with manufacturer warranties." },
              { q: "Do you service commercial properties?", a: "Yes, we work with restaurants, office buildings, retail stores, and property management companies for all plumbing needs." },
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <summary className="flex justify-between items-center p-6 font-bold text-lg text-slate-900 cursor-pointer select-none">
                  {faq.q}
                  <span className="bg-brand-50 text-brand-600 rounded-full w-8 h-8 flex items-center justify-center group-open:rotate-180 transition-transform">
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8. MAP SECTION (Full Color Fixed) */}
      <section className="h-[500px] w-full relative z-0">
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

        {/* Overlay Box */}
        <div className="absolute top-10 left-10 bg-white p-8 rounded-2xl shadow-2xl max-w-sm hidden md:block border border-slate-100">
          <h3 className="font-bold text-xl text-slate-900 mb-2 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent-500" /> Service Area
          </h3>
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">
            We proudly serve the entire metropolitan area and surrounding suburbs. Check our locations page for specific city details.
          </p>
          <Link href="/locations" className="w-full block text-center bg-brand-600 text-white font-bold py-3 rounded-lg hover:bg-brand-700 transition">
            Find Your Local Plumber
          </Link>
        </div>
      </section>

    </div>
  );
}