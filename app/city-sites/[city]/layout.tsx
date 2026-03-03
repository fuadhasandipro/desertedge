// app/city-sites/[city]/layout.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCityBySlug } from "@/lib/city-data";

type CityData = {
    city: string;
    state: string;
    state_name: string;
    county_name: string;
    slug: string;
    phone: string;
    lat: number;
    lng: number;
    zip_codes: string[];
    meta: { title: string; description: string };
    reviews: { rating: number }[];
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ city: string }>;
}): Promise<Metadata> {
    const { city } = await params;
    // Properly await the async function
    const data = await getCityBySlug(city) as CityData | null;

    if (!data) return { title: "Plumber Near Me" };

    const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
    const canonicalBase = `https://${data.slug}.${ROOT_DOMAIN}`;

    return {
        alternates: {
            canonical: canonicalBase,
        },
        other: {
            "geo.region": `US-${data.state.toUpperCase()}`,
            "geo.placename": data.city,
        },
    };
}

export default async function CityLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ city: string }>;
}) {
    const { city } = await params;

    // Properly await the async getCityBySlug function
    const cityData = await getCityBySlug(city) as CityData | null;

    if (!cityData) {
        console.error(`[CityLayout] No city JSON found for slug: "${city}".`);
        return notFound();
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header
                city={cityData.city}
                showLocations={false}
            />
            <main className="flex-grow">
                {children}
            </main>
            <Footer stateName={cityData.state} />
        </div>
    );
}