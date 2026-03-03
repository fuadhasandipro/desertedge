"use client";

import Link from "next/link";
import { Phone, MapPin, Clock, Menu, X } from "lucide-react";
import { useState } from "react";
import { PHONE_NUMBER, PHONE_NUMBER_TEL } from "@/lib/constants";
import LogoMark from "@/components/shared/LogoMark";

interface HeaderProps {
    /** City name shown in the top bar (e.g. "Dallas"). Omit for nationwide. */
    city?: string;
    /** When false, hides the Locations nav link (used on subdomain pages). */
    showLocations?: boolean;
}

export default function Header({ city, showLocations = true }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);

    const locationLabel = city ? `Serving ${city}` : "Nationwide Service";

    return (
        <>
            {/* Top Bar — trust signals, hidden on mobile */}
            <div className="bg-slate-900 text-white text-xs py-2 hidden md:block">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex gap-4">
                        <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-blue-400" aria-hidden="true" />
                            {locationLabel}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-blue-400" aria-hidden="true" />
                            24/7 Emergency Response
                        </span>
                    </div>
                    <div className="font-semibold text-blue-400 tracking-wide">
                        ⭐ LICENSED • BONDED • INSURED
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <Link href="/" aria-label="DesertEdge Plumbing — Home">
                        <LogoMark />
                    </Link>

                    {/* Desktop Nav */}
                    <nav
                        className="hidden md:flex items-center gap-8 font-medium text-slate-600 text-sm uppercase tracking-wide"
                        aria-label="Main navigation"
                    >
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
                        {showLocations && (
                            <Link href="/locations" className="hover:text-blue-600 transition-colors">Locations</Link>
                        )}
                        <Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
                        <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
                    </nav>

                    {/* CTA + Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <a
                            href={PHONE_NUMBER_TEL}
                            className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full font-bold shadow-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300"
                            aria-label={`Call us at ${PHONE_NUMBER}`}
                        >
                            <Phone className="w-4 h-4 animate-pulse" aria-hidden="true" />
                            <span>{PHONE_NUMBER}</span>
                        </a>

                        <button
                            className="md:hidden text-slate-800 p-1"
                            onClick={() => setIsMenuOpen((o) => !o)}
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t bg-white absolute w-full left-0 shadow-xl z-40">
                        <nav
                            className="flex flex-col p-4 space-y-4 font-medium text-slate-600 uppercase tracking-wide"
                            aria-label="Mobile navigation"
                        >
                            <Link href="/" onClick={closeMenu} className="hover:text-blue-600 transition-colors">Home</Link>
                            <Link href="/services" onClick={closeMenu} className="hover:text-blue-600 transition-colors">Services</Link>
                            {showLocations && (
                                <Link href="/locations" onClick={closeMenu} className="hover:text-blue-600 transition-colors">Locations</Link>
                            )}
                            <Link href="/about" onClick={closeMenu} className="hover:text-blue-600 transition-colors">About Us</Link>
                            <Link href="/contact" onClick={closeMenu} className="hover:text-blue-600 transition-colors">Contact</Link>
                            <a
                                href={PHONE_NUMBER_TEL}
                                className="flex items-center gap-2 text-blue-600 font-bold"
                                onClick={closeMenu}
                            >
                                <Phone className="w-4 h-4" aria-hidden="true" />
                                Call {PHONE_NUMBER}
                            </a>
                        </nav>
                    </div>
                )}
            </header>
        </>
    );
}