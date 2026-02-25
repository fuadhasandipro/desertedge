import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
const canonicalBase = `https://${rootDomain}`;

export const metadata: Metadata = {
    title: "Emergency Plumber Near Me – Licensed & Insured | 24/7 USA Plumbing Service",
    description:
        "Need a plumber near you? Our licensed, insured plumbers offer 24/7 emergency plumbing, drain cleaning, leak repair, water heater service & more across the USA. Call now for fast, affordable help.",
    keywords: [
        "plumber near me",
        "emergency plumbing near me",
        "24/7 plumber USA",
        "drain cleaning near me",
        "leak repair near me",
        "water heater repair near me",
        "licensed plumber",
    ],
    openGraph: {
        title: "Emergency Plumber Near Me – Licensed & Insured | 24/7 USA Plumbing",
        description:
            "Fast, affordable plumbing services across the USA. Available 24/7 for emergencies. Licensed, insured, and background-checked pros.",
        url: "https://yoursite.com",
        siteName: "Plumbing Service USA",
        images: [
            {
                url: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=1200",
                width: 1200,
                height: 630,
                alt: "Licensed Emergency Plumber Repairing Pipe",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Emergency Plumber Near Me – 24/7 USA Plumbing Service",
        description:
            "Licensed & insured plumbers available 24/7 across the USA. Fast response for emergencies, leaks, drains & more.",
        images: [
            "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=1200",
        ],
    },
    alternates: {
        canonical: canonicalBase
    },
    other: {
        "geo.region": "US",
        "geo.placename": "USA",
    },
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}