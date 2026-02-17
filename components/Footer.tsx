import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-brand-600">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Col 1: Brand */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">DesertEdge</h3>
                        <p className="text-sm leading-relaxed mb-6">
                            Professional plumbing services combining modern technology with old-school customer service. Licensed, bonded, and insured.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Icons Placeholder */}
                            <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-brand-600 transition">fb</div>
                            <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-brand-600 transition">in</div>
                            <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-brand-600 transition">tw</div>
                        </div>
                    </div>

                    {/* Col 2: Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/about" className="hover:text-brand-400 transition">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-brand-400 transition">Careers</Link></li>
                            <li><Link href="/reviews" className="hover:text-brand-400 transition">Customer Reviews</Link></li>
                            <li><Link href="/privacy" className="hover:text-brand-400 transition">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Col 3: Services */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Services</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/services/drain-cleaning" className="hover:text-brand-400 transition">Drain Cleaning</Link></li>
                            <li><Link href="/services/water-heaters" className="hover:text-brand-400 transition">Water Heaters</Link></li>
                            <li><Link href="/services/leak-detection" className="hover:text-brand-400 transition">Leak Detection</Link></li>
                            <li><Link href="/services/emergency" className="hover:text-brand-400 transition">Emergency Plumbing</Link></li>
                        </ul>
                    </div>

                    {/* Col 4: Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <span className="text-brand-500">📍</span>
                                <span>Headquarters: 1234 Main St<br />Scottsdale, AZ 85251</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-brand-500">📞</span>
                                <span className="font-bold text-white">(888) 555-0123</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-brand-500">📧</span>
                                <span>service@desertedge.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} DesertEdge Plumbing. All rights reserved.</p>
                    <div className="mt-4 md:mt-0">
                        <Link href="/locations" className="hover:text-brand-400">Service Area Directory</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}