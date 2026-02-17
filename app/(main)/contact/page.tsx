import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
                    <p className="text-slate-600">We are available 24/7 for emergency services.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Info Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm h-fit">
                        <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-brand-100 p-3 rounded-full text-brand-600">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500">Emergency Hotline</div>
                                    <a href="tel:8336090936" className="text-xl font-bold text-slate-900 hover:text-brand-600">(833) 609-0936</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-brand-100 p-3 rounded-full text-brand-600">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500">Email Us</div>
                                    <div className="text-lg font-medium text-slate-900">service@gdproplumbing.com</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-brand-100 p-3 rounded-full text-brand-600">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500">Service Area</div>
                                    <div className="text-lg font-medium text-slate-900">Nationwide (USA)</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
                        <h3 className="text-2xl font-bold mb-2">Request Service</h3>
                        <input type="text" placeholder="Your Name" className="w-full p-4 bg-slate-50 rounded-lg border border-slate-200 outline-brand-500" />
                        <input type="tel" placeholder="Phone Number" className="w-full p-4 bg-slate-50 rounded-lg border border-slate-200 outline-brand-500" />
                        <select className="w-full p-4 bg-slate-50 rounded-lg border border-slate-200 outline-brand-500">
                            <option>Water Heater Repair</option>
                            <option>Drain Cleaning</option>
                            <option>Leak Detection</option>
                            <option>Other Service</option>
                        </select>
                        <textarea placeholder="Describe your issue..." rows={4} className="w-full p-4 bg-slate-50 rounded-lg border border-slate-200 outline-brand-500"></textarea>
                        <button className="w-full bg-brand-600 text-white font-bold py-4 rounded-lg hover:bg-brand-700 transition">
                            Get Free Quote
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}