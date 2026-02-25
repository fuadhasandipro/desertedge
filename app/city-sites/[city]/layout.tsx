// app/city-sites/[city]/layout.tsx
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

function getCityData(slug: string): CityData | null {
    try {
        const filePath = path.join(process.cwd(), 'data', 'cities', `${slug.toLowerCase()}.json`);
        const raw = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(raw) as CityData;
    } catch {
        return null;
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ city: string }>;
}): Promise<Metadata> {
    const { city } = await params;
    const cityData = getCityData(city);
    if (!cityData) return {};

    const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
    const canonicalBase = `https://${cityData.slug}.${ROOT_DOMAIN}`;

    const data = getCityData(city);

    if (!data) return { title: "Plumber Near Me" };

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
    const cityData = getCityData(city);

    if (!cityData) {
        console.error(`[CityLayout] No city JSON found for slug: "${city}".`);
        return notFound();
    }

    return (
        <div className="flex flex-col min-h-screen">

            <Header
                city={cityData.city}
                phone={cityData.phone}
                showLocations={false}
            />
            <main className="flex-grow">
                {children}
            </main>
            <Footer stateName={cityData.state} />
        </div>
    );
}