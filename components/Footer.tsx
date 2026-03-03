// components/Footer.tsx
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin, PhoneCall } from "lucide-react";
import { PHONE_NUMBER, PHONE_NUMBER_TEL, CONTACT_EMAIL } from "@/lib/constants";
import LogoMark from "@/components/shared/LogoMark";

interface FooterProps {
    /** State or region name shown in footer copy (defaults to "USA"). */
    stateName?: string;
}

export default function SiteFooter({ stateName = "USA" }: FooterProps) {
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
    const locationTitle = `${stateName} Plumbing Service`;
    const locationPros = `${stateName} Plumbing Service Pros`;
    const currentYear = new Date().getFullYear();

    return (
        <>
            <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-6 border-t border-slate-800">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <LogoMark dark />
                        <p className="font-semibold text-lg text-slate-100">{locationTitle}</p>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Licensed, bonded, and insured plumbers serving communities across the USA — 24/7.
                        </p>
                    </div>

                    {/* Contact Column */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500">Contact Info</h3>
                        <ul className="space-y-4 text-slate-300">
                            <li className="flex items-center gap-3">
                                <MapPin className="text-blue-500 w-5 h-5 shrink-0" aria-hidden="true" />
                                <span>{locationPros}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-blue-500 w-5 h-5 shrink-0" aria-hidden="true" />
                                <a href={PHONE_NUMBER_TEL} className="hover:text-white transition-colors">
                                    {PHONE_NUMBER}
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Mail className="text-blue-500 w-5 h-5 shrink-0" aria-hidden="true" />
                                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white transition-colors break-all">
                                    {CONTACT_EMAIL}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock className="text-blue-500 w-5 h-5 shrink-0" aria-hidden="true" />
                                <span>24/7 Emergency Service</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Column */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500">Follow Us</h3>
                        <p className="text-slate-400 text-sm">Stay connected for tips, offers, and plumbing updates.</p>
                        <div className="flex gap-5 text-slate-400">
                            <a href="#" aria-label="Facebook" className="hover:text-blue-500 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" aria-label="Instagram" className="hover:text-blue-500 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" aria-label="Twitter / X" className="hover:text-blue-500 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" aria-label="LinkedIn" className="hover:text-blue-500 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Legal Disclaimer */}
                <div className="border-t border-slate-800 pt-8 mb-6">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl px-6 py-4 flex gap-3 items-start">
                        <span className="shrink-0 text-base mt-0.5">ℹ️</span>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            {locationPros} is a free service to assist homeowners in connecting with local service
                            providers. All contractors/providers are independent and {locationPros} does not warrant
                            or guarantee any work performed. It is the responsibility of the homeowner to verify
                            that the hired contractor furnishes the necessary license and insurance required for the
                            work being performed. All persons depicted in a photo or video are actors or models and
                            not contractors listed on {locationPros}.
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
                    <p>
                        Copyright &copy; {currentYear}{" "}
                        <Link href={`https://${rootDomain}`} className="text-blue-500 font-semibold hover:text-blue-400 transition-colors">
                            {locationPros}
                        </Link>
                        . All rights reserved.
                    </p>
                </div>
            </footer>

            {/* Floating Call Button */}
            <a
                href={PHONE_NUMBER_TEL}
                className="fixed md:bottom-8 md:right-8 bottom-3 right-3 z-50 bg-blue-600 text-white p-5 rounded-full shadow-xl shadow-blue-600/20 animate-bounce hover:bg-blue-700 hover:scale-110 active:scale-95 transition-all duration-300 group ring-4 ring-white/20"
                aria-label="Call us now for emergency plumbing"
            >
                <PhoneCall className="w-7 h-7 group-hover:rotate-12 transition-transform" aria-hidden="true" />
                <span className="absolute right-20 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-slate-800">
                    EMERGENCY CALL
                </span>
            </a>
        </>
    );
}