import Link from 'next/link';
import { ShieldCheck, Clock, Wrench, Star, Droplets, Flame, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <>
      {/* --- HERO SECTION --- */}
      <section className="relative bg-slate-900 py-24 lg:py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80" alt="Plumber working" className="w-full h-full object-cover" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-brand-900/50 border border-brand-500/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-accent-500 animate-pulse"></span>
            <span className="text-brand-100 text-sm font-semibold tracking-wide uppercase">Available 24/7 Nationwide</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
            Plumbing Problems? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">Fixed Today.</span>
          </h1>

          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            From leaky faucets to burst pipes, our licensed experts are ready to restore your home's comfort. $0 dispatch fee with any repair.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/locations" className="bg-brand-600 hover:bg-brand-700 text-white text-lg font-bold py-4 px-8 rounded-xl shadow-glow transition-all hover:scale-105 flex items-center justify-center gap-2">
              <Wrench className="w-5 h-5" /> Find A Plumber Near Me
            </Link>
            <Link href="/contact" className="bg-white hover:bg-slate-100 text-slate-900 text-lg font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2">
              Get A Quote <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- TRUST BAR --- */}
      <div className="bg-slate-50 border-b border-slate-200 py-8">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Replace with actual logos */}
          <span className="text-2xl font-bold text-slate-400 flex items-center gap-2"><ShieldCheck /> Angi Leads</span>
          <span className="text-2xl font-bold text-slate-400 flex items-center gap-2"><Star /> HomeAdvisor</span>
          <span className="text-2xl font-bold text-slate-400 flex items-center gap-2"><ShieldCheck /> BBB Accredited</span>
          <span className="text-2xl font-bold text-slate-400 flex items-center gap-2"><Star /> Google Guaranteed</span>
        </div>
      </div>

      {/* --- SERVICES GRID --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-brand-600 font-bold tracking-wider uppercase text-sm mb-3">What We Do</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Complete Home Plumbing</h3>
            <div className="w-24 h-1.5 bg-accent-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="group p-8 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-brand-200 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-100 text-brand-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Droplets className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-3">Leak Detection</h4>
              <p className="text-slate-600 mb-6 leading-relaxed">
                High-tech acoustic listening devices to find slab leaks without destroying your floors.
              </p>
              <Link href="/services/leak-detection" className="text-brand-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Service Card 2 */}
            <div className="group p-8 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-brand-200 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-amber-100 text-accent-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Flame className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-3">Water Heaters</h4>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Installation and repair of tankless and standard water heaters. Same-day replacement available.
              </p>
              <Link href="/services/water-heaters" className="text-brand-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Service Card 3 */}
            <div className="group p-8 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-brand-200 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-3">Emergency Response</h4>
              <p className="text-slate-600 mb-6 leading-relaxed">
                24/7 rapid response for overflowing toilets, burst pipes, and sewer backups.
              </p>
              <Link href="/services/emergency" className="text-brand-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}