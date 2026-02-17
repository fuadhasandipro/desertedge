import Link from 'next/link';
import { Phone, MapPin, Clock, Menu } from 'lucide-react';

export default function Header({ city, phone }: { city?: string, phone?: string }) {
    // Default fallback if on main domain
    const displayPhone = phone || "(888) 555-0123";
    const displayLocation = city ? `Serving ${city}` : "Nationwide Service";

    return (
        <>
            {/* Top Bar - Trust Signals */}
            <div className="bg-brand-900 text-white text-xs py-2 hidden md:block">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex gap-4">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-accent-500" /> {displayLocation}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-accent-500" /> 24/7 Emergency Response</span>
                    </div>
                    <div className="font-semibold text-accent-500 tracking-wide">
                        ⭐ LICENSED • BONDED • INSURED
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-soft border-b border-gray-100">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-brand-600 text-white p-1.5 rounded-lg">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-slate-800 tracking-tight group-hover:text-brand-600 transition-colors">
                            DesertEdge<span className="text-brand-600">Plumbing</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600 text-sm uppercase tracking-wide">
                        <Link href="/services" className="hover:text-brand-600 transition-colors">Services</Link>
                        <Link href="/locations" className="hover:text-brand-600 transition-colors">Locations</Link>
                        <Link href="/about" className="hover:text-brand-600 transition-colors">About Us</Link>
                        <Link href="/contact" className="hover:text-brand-600 transition-colors">Contact</Link>
                    </nav>

                    {/* CTA Button */}
                    <div className="flex items-center gap-4">
                        <a href={`tel:${displayPhone.replace(/\D/g, '')}`}
                            className="hidden md:flex items-center gap-2 bg-brand-600 text-white px-5 py-2.5 rounded-full font-bold shadow-glow hover:bg-brand-700 hover:scale-105 transition-all duration-300 group">
                            <Phone className="w-4 h-4 animate-pulse" />
                            <span>{displayPhone}</span>
                        </a>

                        {/* Mobile Menu Icon */}
                        <button className="md:hidden text-slate-800">
                            <Menu className="w-7 h-7" />
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}