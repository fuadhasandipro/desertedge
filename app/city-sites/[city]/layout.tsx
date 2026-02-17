import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Use params to get city name if you want to pass it to header
export default async function CityLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { city: string }
}) {
    // formatting city name from slug (e.g. "new-york" -> "New York")

    const { city } = await params

    const cityName = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <div className="flex min-h-screen flex-col font-sans">
            {/* Pass city name for "Serving [City]" and hide locations menu */}
            <Header showLocations={false} city={cityName} />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}