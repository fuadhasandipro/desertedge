// components/Footer.tsx (or wherever your SiteFooter is located)
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin, PhoneCall } from 'lucide-react';
import { PHONE_NUMBER, PHONE_NUMBER_TEL } from '@/data/constants';

interface FooterProps {
    stateName?: string;
    phone?: string;
}

export default function SiteFooter({
    stateName = "USA",
    phone = PHONE_NUMBER
}: FooterProps) {

    // Dynamically set based on the props passed (Defaults to USA)
    const locationTitle = `${stateName} Plumbing Service`;
    const locationPros = `${stateName} Plumbing Service Pros`;

    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

    return (
        <>
            <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-6 border-t border-slate-800">
                {/* Main Content Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        {/* Identical Logo From Header */}
                        <div className="flex items-center gap-2 group cursor-default">
                            <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-md">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-white tracking-tight leading-none">
                                    DesertEdge
                                </span>
                                <span className="text-sm font-bold text-blue-500 leading-none">Plumbing</span>
                            </div>
                        </div>
                        <p className="font-semibold text-lg text-slate-100">{locationTitle}</p>
                    </div>

                    {/* Contact Column */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500">Contact Info</h3>
                        <ul className="space-y-4 text-slate-300">
                            <li className="flex items-center gap-3">
                                <MapPin className="text-blue-500 w-5 h-5 shrink-0" />
                                <span>{locationPros}.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-blue-500 w-5 h-5 shrink-0" />
                                <a href={`${PHONE_NUMBER_TEL}`} className="hover:text-white transition-colors">
                                    {phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Mail className="text-blue-500 w-5 h-5 shrink-0" />
                                <a href="mailto:info@mybuddytheplumberparkcity.com" className="break-all hover:text-white transition-colors">
                                    info@desertedgefoundation.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock className="text-blue-500 w-5 h-5 shrink-0" />
                                <span>08:00am-6:00pm</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500">Subscribe To Newsletter</h3>
                        <p className="text-slate-400 text-sm">Join our subscribers list to get the latest news and special offers.</p>
                        <div className="flex flex-col space-y-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-500"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-all shadow-lg active:scale-[0.98]">
                                Subscribe Now
                            </button>
                        </div>
                        <div className="flex gap-5 pt-3 text-slate-400">
                            <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors" />
                            <Instagram className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors" />
                            <Twitter className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors" />
                            <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
                    <p>
                        Copyright © <Link href={`https://${rootDomain}`} className="text-blue-500 font-semibold hover:text-blue-400 transition-colors">Plumbing Services Near Me</Link> {locationPros} February, 2026.
                    </p>
                </div>
            </footer>

            {/* FLOATING CALL BUTTON */}
            <a
                href={`${PHONE_NUMBER_TEL}`}
                className="fixed md:bottom-8 md:right-8 bottom-3 right-3 z-50 bg-blue-600 text-white p-5 rounded-full shadow-xl shadow-blue-600/20 animate-bounce hover:bg-blue-700 hover:scale-110 active:scale-95 transition-all duration-300 group ring-4 ring-white/20"
                aria-label="Call Now"
            >
                <PhoneCall className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                <span className="absolute right-20 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-slate-800">
                    EMERGENCY CALL
                </span>
            </a>
        </>
    );
}