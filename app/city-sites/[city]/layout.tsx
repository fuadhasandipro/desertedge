import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCityBySlug } from '@/lib/city-data';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ city: string }>;
}): Promise<Metadata> {
    const { city } = await params;
    const cityData = getCityBySlug(city);
    if (!cityData) return {};

    const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
    const canonicalBase = `https://${cityData.slug}.${ROOT_DOMAIN}`;

    return {
        alternates: {
            canonical: canonicalBase,
        },
        other: {
            "geo.region": `US-${cityData.state.toUpperCase()}`,
            "geo.placename": cityData.city,
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
    const cityData = getCityBySlug(city);

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