// app/state-sites/[state]/layout.tsx
import { notFound } from "next/navigation";
import { getCitiesForState } from "@/lib/city-data";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Props {
    children: React.ReactNode;
    params: Promise<{ state: string }>;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ state: string }>;
}): Promise<Metadata> {
    const { state } = await params;
    const cities = getCitiesForState(state);

    if (!cities.length) return {};

    const stateName = cities[0].state_name;
    const stateShort = state.toUpperCase();
    const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
    const stateUrl = `https://${stateShort.toLowerCase()}.${ROOT_DOMAIN}`;

    return {
        title: `Emergency Plumbers in ${stateName} – 24/7 Local Plumbing Service`,
        description: `Need a plumber in ${stateName}? Fast, licensed, and insured plumbing services across ${cities.length} cities. 24/7 emergency repair, drains, and water heaters.`,
        keywords: [
            `plumber ${stateName}`,
            `emergency plumbing ${stateName}`,
            `24/7 plumber ${stateName}`,
            `licensed plumbers in ${stateName}`,
            "drain cleaning",
            "water heater repair",
        ],
        openGraph: {
            title: `Top-Rated Plumbing Services in ${stateName} | 24/7 Fast Response`,
            description: `Licensed and background-checked plumbing professionals serving all major cities in ${stateName}. Call now for immediate assistance.`,
            url: stateUrl,
            siteName: `Desert Edge Plumbing ${stateShort}`,
            images: [
                {
                    url: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=1200",
                    width: 1200,
                    height: 630,
                    alt: `Licensed Emergency Plumber in ${stateName}`,
                },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `24/7 Emergency Plumber in ${stateName}`,
            description: `Fast, affordable, and licensed plumbing services across ${stateName}. Available 24/7 for leaks, drains, and emergencies.`,
            images: ["https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=1200"],
        },
        alternates: {
            canonical: stateUrl,
        },
        other: {
            "geo.region": `US-${stateShort}`,
            "geo.placename": stateName,
        },
    };
}

export default async function StateLayout({ children, params }: Props) {
    const { state } = await params;
    const cities = getCitiesForState(state);

    if (!cities.length) notFound();

    const stateName = cities[0].state_name;
    const stateShort = state.toUpperCase();
    const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

    // State-level schema upgraded to PlumbingService for better local SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "PlumbingService",
        name: `Desert Edge Plumbing — ${stateName}`,
        description: `Professional, licensed 24/7 plumbing services across ${stateName}.`,
        telephone: "+18336090936", // Replace with your actual tracking number
        image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80",
        priceRange: "$$",
        openingHours: "Mo-Su 00:00-24:00",
        areaServed: {
            "@type": "State",
            name: stateName,
            addressCountry: "US",
        },
        url: `https://${stateShort.toLowerCase()}.${ROOT_DOMAIN}`,
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "169"
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}