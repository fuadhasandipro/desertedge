// lib/city-data.ts
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

// Base URL for fetching our generated static JSON assets.
// During build/dev, we can fetch from localhost. In production, we fetch from the real domain.
const getBaseUrl = () => {
    if (typeof window !== "undefined") return ""; // Browser should use relative
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    // When running inside Cloudflare Pages locally via Wrangler
    if (process.env.CF_PAGES_URL) return process.env.CF_PAGES_URL;
    return process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : `https://${ROOT_DOMAIN}`;
};

// Fallback for Next.js generic static build phase where localhost:3000 is offline
async function fetchOrReadLocal(urlPath: string, localPath: string): Promise<any> {
    const url = `${getBaseUrl()}${urlPath}`;
    try {
        console.log(`[Edge City] Fetching: ${url}`);
        const res = await fetch(url, { next: { revalidate: 86400 } });
        if (!res.ok) throw new Error("HTTP Fetch failed");
        return await res.json();
    } catch (e) {
        // Fallback for Build Time Only
        console.warn(`[Edge City] Fetch failed for ${url}, falling back to local file read for build phase...`);
        try {
            // we use dynamic import so it doesn't break middleware/edge runtime immediately
            const fs = await import('fs');
            const path = await import('path');
            const fullPath = path.join(process.cwd(), 'public', localPath);
            const raw = fs.readFileSync(fullPath, 'utf-8');
            return JSON.parse(raw);
        } catch (fsErr) {
            console.error(`Local read fallback also failed for ${localPath}`, fsErr);
            return null;
        }
    }
}

export interface NearbyCity { name: string; slug: string; state: string; }
export interface Service { service_id: string; service_title: string; hero: { subheadline: string }; }
export interface StateSummary { state: string; state_name: string; count: number; }

export interface CityData {
    city: string; state: string; state_name: string; county_name: string;
    lat: number; lng: number; slug: string; phone: string;
    meta: { title: string; description: string };
    hero: { badge_text: string; h1_highlight: string; h1_main: string; subheadline: string; cta_label: string; hero_image_alt: string; };
    trust_bar: string[];
    about: { badge: string; h2: string; body_paragraphs: string[]; residential_box: { title: string; description: string }; commercial_box: { title: string; description: string }; badge_stat: string; badge_label: string; };
    why_choose_us: { badge: string; h2: string; body: string; points: { label: string; text: string }[]; };
    stats: { val: string; label: string }[];
    services_section: { h2_prefix: string; intro: string };
    zip_codes: string[];
    nearby_cities: NearbyCity[];
    faqs: { q: string; a: string }[];
    service_area_text: string;
    reviews: { id: number; source: string; author: string; date: string; text: string; rating: number; }[];
    services: Service[];
}

// ── Single city by slug (ASYNC) ───────────────────────────────────────────────
export async function getCityBySlug(slug: string): Promise<CityData | null> {
    return await fetchOrReadLocal(`/data/cities/${slug.toLowerCase()}.json`, `/data/cities/${slug.toLowerCase()}.json`) as CityData | null;
}

// ── All unique states present in your data (ASYNC) ───────────────────────────
export async function getAllStates(): Promise<StateSummary[]> {
    return await fetchOrReadLocal(`/data/states.json`, `/data/states.json`) as StateSummary[] || [];
}

// ── Cities for one state (ASYNC) ──────────────────────────────────────────────
export async function getCitiesForState(stateShort: string): Promise<CityData[]> {
    return await fetchOrReadLocal(`/data/state-cities/${stateShort.toUpperCase()}.json`, `/data/state-cities/${stateShort.toUpperCase()}.json`) as CityData[] || [];
}

// ── All city slugs (for generateStaticParams) ─────────────────────────────────
// Note: We return empty arrays for static gen since dynamicParams = true covers it.
export function getAllCitySlugs(): string[] {
    return [];
}