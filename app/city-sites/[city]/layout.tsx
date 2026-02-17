import { notFound } from 'next/navigation';
import locations from '@/data/locations.json';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CityLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { city: string };
}) {
    // 1. Find the city data based on the URL slug
    const cityData = locations.find((loc) => loc.slug === params.city);

    // 2. If city doesn't exist in JSON, return 404 (prevents bad indexing)
    if (!cityData) return notFound();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Pass city-specific phone and name to Header */}
            <Header city={cityData.city} phone={cityData.phone} />

            <main>{children}</main>

            {/* Footer links back to main domain for SEO silo strength */}
            <Footer />
        </div>
    );
}