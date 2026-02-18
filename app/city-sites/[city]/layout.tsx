// app/city-sites/[city]/layout.tsx
import { notFound } from 'next/navigation';
import { getCityBySlug, generateLocalBusinessSchema } from '@/lib/city-data';
import Header from '@/components/Header';
import Footer from '@/components/Footer'; // Assuming you have a Footer component

export default async function CityLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ city: string }>;
}) {
    const { city } = await params;
    const cityData = getCityBySlug(city);

    if (!cityData) return notFound();

    // Generate Schema once for the whole layout
    const jsonLd = generateLocalBusinessSchema(cityData);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Inject Schema Globally for this City */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Localized Header */}
            <Header
                city={cityData.city}
                phone={cityData.phone}
                showLocations={false} // Hide "Locations" link on local sites to keep them in the silo
            />

            <main className="flex-grow">
                {children}
            </main>

            {/* Localized Footer (We will pass city props to footer later) */}
            <Footer cityData={cityData} />
        </div>
    );
}