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

    return (
        <>
            <footer className="bg-brand-900 text-white pt-16 pb-8 px-6">
                {/* Main Content Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="bg-white p-2 rounded-lg inline-block shadow-soft">
                            <img
                                src="https://ik.imagekit.io/kreimr9tq/Screenshot_8.png"
                                alt={locationTitle}
                                className="h-12 w-auto"
                            />
                        </div>
                        <p className="font-bold text-lg">{locationTitle}</p>
                    </div>

                    {/* Contact Column */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold uppercase tracking-wider text-accent-500">Contact Info</h3>
                        <ul className="space-y-4 text-brand-100">
                            <li className="flex items-center gap-3">
                                <MapPin className="text-accent-500 w-5 h-5 shrink-0" />
                                <span>{locationPros}.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-accent-500 w-5 h-5 shrink-0" />
                                <a href={`${PHONE_NUMBER_TEL}`} className="hover:text-white transition-colors">
                                    {phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Mail className="text-accent-500 w-5 h-5 shrink-0" />
                                <a href="mailto:info@mybuddytheplumberparkcity.com" className="break-all hover:text-white transition-colors">
                                    info@mybuddytheplumberparkcity.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock className="text-accent-500 w-5 h-5 shrink-0" />
                                <span>08:00am-6:00pm</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold uppercase tracking-wider text-accent-500">Subscribe To Newsletter</h3>
                        <p className="text-brand-100 text-sm">Join our subscribers list to get the latest news and special offers.</p>
                        <div className="flex flex-col space-y-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-white text-slate-900 px-4 py-3 rounded-md w-full focus:ring-2 focus:ring-brand-500 outline-none"
                            />
                            <button className="bg-accent-600 hover:bg-accent-500 text-white font-bold py-3 rounded-md transition-all shadow-soft">
                                Subscribe Now
                            </button>
                        </div>
                        <div className="flex gap-4 pt-2 text-brand-100">
                            <Facebook className="w-5 h-5 cursor-pointer hover:text-accent-500 transition-colors" />
                            <Instagram className="w-5 h-5 cursor-pointer hover:text-accent-500 transition-colors" />
                            <Twitter className="w-5 h-5 cursor-pointer hover:text-accent-500 transition-colors" />
                            <Linkedin className="w-5 h-5 cursor-pointer hover:text-accent-500 transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-brand-100/60">
                    <p>
                        Copyright © <Link href="/" className="text-accent-500 font-semibold hover:underline">Plumbing Services Near Me</Link> {locationPros} February, 2026.
                    </p>
                </div>
            </footer>

            {/* FLOATING CALL BUTTON */}
            <a
                href={`${PHONE_NUMBER_TEL}`}
                className="fixed md:bottom-8 md:right-8 bottom-3 right-3 z-50 bg-brand-500 text-white p-5 rounded-full shadow-glow animate-float hover:bg-brand-700 hover:scale-110 active:scale-95 transition-all duration-300 group"
                aria-label="Call Now"
            >
                <PhoneCall className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                <span className="absolute right-20 top-1/2 -translate-y-1/2 bg-brand-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-soft border border-brand-700">
                    EMERGENCY CALL
                </span>
            </a>
        </>
    );
}