import Link from 'next/link';
import { Wrench, PhoneCall } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlowingButton from '@/components/shared/GlowingButton';

export default function NotFound() {
    // Replace with your actual default emergency phone number
    const emergencyPhone = "1-800-555-0199";
    const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

    return (
        <div className="flex min-h-screen flex-col font-sans bg-slate-50">
            {/* 1. Inherit your standard navigation */}
            <Header showLocations={false} />

            {/* 2. Custom Plumber-Themed 404 Content */}
            <main className="flex-1 flex flex-col items-center justify-center py-24 px-6 relative overflow-hidden">

                {/* Decorative background glows (using your theme's blue/slate) */}
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

                <div className="relative z-10 text-center space-y-6 max-w-2xl mx-auto">

                    {/* Playful 404 Visual Icon */}
                    <div className="flex justify-center mb-8 relative">
                        <div className="relative w-36 h-36 flex items-center justify-center bg-blue-50 rounded-full border-[6px] border-white shadow-xl">
                            <span className="text-6xl font-black text-blue-600 tracking-tighter">404</span>
                            {/* Plumber wrench overlapping the circle */}
                            <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-lg border border-slate-100">
                                <Wrench className="w-8 h-8 text-blue-600 rotate-12" />
                            </div>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                        Looks like this pipe leads nowhere!
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto">
                        The page you're looking for might have been removed, had its URL changed, or is temporarily out of service.
                    </p>

                    {/* 3. Call to Actions (Back Home & Emergency Call) */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                        <GlowingButton
                            href={`https://${ROOT_DOMAIN}`}
                            text="Back to Homepage"
                            variant="primary"
                            icon="arrow"
                        />

                        <Link
                            href={`tel:${emergencyPhone.replace(/\D/g, '')}`}
                            className="group flex items-center justify-center gap-2 px-6 py-3 text-slate-700 bg-white border-2 border-slate-200 rounded-full hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-all font-semibold w-full sm:w-auto shadow-sm"
                        >
                            <PhoneCall className="w-5 h-5 text-blue-600 group-hover:animate-pulse" />
                            Need an Emergency Plumber?
                        </Link>
                    </div>
                </div>
            </main>

            {/* 4. Inherit your standard footer */}
            <Footer />
        </div>
    );
}