import Image from "next/image";
import { Star, CheckCircle2, Facebook } from "lucide-react";

// Helper for rendering stars - Updated to use your accent-500 (Amber)
function StarRating({ count = 5, className = "w-5 h-5 text-accent-500 fill-current" }) {
    return (
        <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={`${className} ${i < count ? "" : "text-slate-300"}`} />
            ))}
        </div>
    );
}

// Simple Google Logo SVG
const GoogleLogo = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

// Facebook Brand Icon
const FacebookLogo = () => (
    <Facebook className="w-6 h-6 text-[#1877F2] fill-current" />
);

const reviews = [
    {
        id: 1,
        source: "Google",
        author: "Michael R.",
        date: "2 days ago",
        text: "I recently hired Plumber Experts for a leaking pipe repair in Phoenix, AZ. Their prompt service and expertise quickly solved my water issue, preventing further damage. The team was professional and knowledgeable, ensuring my plumbing was in top shape. I highly recommend Plumber Experts for any plumbing needs in Phoenix, AZ!",
        rating: 5
    },
    {
        id: 2,
        source: "Facebook",
        author: "Sarah Jenkins",
        date: "1 week ago",
        text: "I found Arizona Plumber Experts while searching for reliable plumbing services in Phoenix, AZ. Their website was user-friendly, and I quickly scheduled an appointment. The team was professional and resolved my plumbing issues efficiently. Highly recommend them for anyone needing a trustworthy plumber in Phoenix, AZ!",
        rating: 5
    },
    {
        id: 3,
        source: "Google",
        author: "David Chen",
        date: "3 weeks ago",
        text: "Honest plumbers. Another company told me I needed a whole new sewer line for $15k. These guys hydro-jetted it and it's been perfect since.",
        rating: 5
    }
];

export default function Reviews() {
    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4">

                {/* 1. Section Header & Aggregate Stats */}
                <div className="flex flex-col lg:flex-row gap-12 items-center justify-between mb-16">
                    <div className="max-w-2xl text-center lg:text-left">
                        <h2 className="text-brand-600 font-bold uppercase tracking-widest mb-3">Customer Reviews</h2>
                        <h2 className="text-4xl font-bold text-slate-900 mb-6">What Our Clients Say About Us</h2>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex gap-6 flex-wrap justify-center">
                        {/* Google Badge */}
                        <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-soft border border-slate-100">
                            <div className="bg-slate-50 p-3 rounded-full">
                                <GoogleLogo />
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 text-lg">4.9/5 Rating</div>
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <StarRating count={5} className="w-4 h-4 text-accent-500 fill-current" />
                                    <span>on Google</span>
                                </div>
                            </div>
                        </div>

                        {/* Facebook Badge */}
                        <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-soft border border-slate-100">
                            <div className="bg-slate-50 p-3 rounded-full">
                                <FacebookLogo />
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 text-lg">4.8/5 Rating</div>
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <StarRating count={5} className="w-4 h-4 text-accent-500 fill-current" />
                                    <span>on Facebook</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-xl transition-all duration-300 border border-slate-100 relative group">

                            {/* Source Icon (Top Right) */}
                            <div className="absolute top-8 right-8 opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                                {review.source === 'Google' ? <GoogleLogo /> : <FacebookLogo />}
                            </div>

                            {/* Stars */}
                            <div className="mb-6">
                                <StarRating count={review.rating} />
                            </div>

                            {/* Text */}
                            <p className="text-slate-600 leading-relaxed mb-8 min-h-[100px]">
                                "{review.text}"
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-lg">
                                    {review.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">{review.author}</div>
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <span>{review.date}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1 text-green-600 font-medium">
                                            <CheckCircle2 className="w-3 h-3" /> Verified Job
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}