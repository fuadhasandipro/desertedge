// lib/city-data.ts
import locations from '@/data/locations.json';

export type CityData = typeof locations[0];

export function getCityBySlug(slug: string): CityData | undefined {
    return locations.find((l) => l.slug === slug);
}

export function getAllCitySlugs() {
    return locations.map((l) => l.slug);
}

// Helper to generate schema for any city page
export function generateLocalBusinessSchema(city: CityData) {
    return {
        "@context": "https://schema.org",
        "@type": "PlumbingService",
        "name": `DesertEdge Plumbing ${city.city}`,
        "image": city.hero_image,
        "telephone": city.phone,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": city.city,
            "addressRegion": city.state,
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": city.geo.lat,
            "longitude": city.geo.lng
        },
        "url": `https://${city.slug}.desertedgeplumbing.com`,
        "priceRange": "$$"
    };
}