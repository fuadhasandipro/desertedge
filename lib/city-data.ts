// lib/city-data.ts
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

/**
 * Determines a reliable base URL for fetching static JSON assets.
 * 
 * On Cloudflare Workers/Pages:
 * - CF_PAGES_URL is only available at BUILD TIME, not at runtime.
 * - The worker can reach its own domain via Cloudflare internal routing.
 * - We use https://ROOT_DOMAIN in production, localhost in dev.
 * 
 * Static assets in public/ are served via the ASSETS binding, accessible
 * at https://ROOT_DOMAIN/data/... without leaving the Cloudflare network.
 */
function getBaseUrl(): string {
    if (process.env.NODE_ENV === "development") {
        return "http://localhost:3000";
    }
    // In production (Cloudflare Pages), always use the root domain.
    // The worker fetches from its own origin — no external round-trip.
    return `https://${ROOT_DOMAIN}`;
}

/**
 * Fetches a JSON file from the static assets (public/ directory).
 * Uses `cache: 'force-cache'` so Cloudflare caches responses at the edge,
 * avoiding repeated network calls for the same city/state data.
 */
async function fetchJson(urlPath: string): Promise<any> {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${urlPath}`;
    try {
        const res = await fetch(url, {
            cache: "force-cache",
            // Next.js ISR hint: revalidate every 24 hours
            next: { revalidate: 86400 },
        });
        if (!res.ok) {
            console.warn(`[city-data] HTTP ${res.status} for ${url}`);
            return null;
        }
        return await res.json();
    } catch (e) {
        console.warn(`[city-data] Fetch failed for ${url}:`, e);
        return null;
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
    return fetchJson(`/data/cities/${slug.toLowerCase()}.json`) as Promise<CityData | null>;
}

// ── All unique states present in your data (ASYNC) ───────────────────────────
export async function getAllStates(): Promise<StateSummary[]> {
    const data = await fetchJson(`/data/states.json`);
    return (data as StateSummary[]) || [];
}

// ── Lookup full state name from abbreviation (e.g. "AZ" → "Arizona") ─────────
export async function getStateName(stateShort: string): Promise<string> {
    const states = await getAllStates();
    const match = states.find(
        (s) => s.state.toUpperCase() === stateShort.toUpperCase()
    );
    return match?.state_name ?? stateShort.toUpperCase();
}

// ── Cities for one state (ASYNC) ──────────────────────────────────────────────
export async function getCitiesForState(stateShort: string): Promise<CityData[]> {
    const data = await fetchJson(`/data/state-cities/${stateShort.toUpperCase()}.json`);
    return (data as CityData[]) || [];
}

// ── All city slugs (for generateStaticParams) ─────────────────────────────────
// Returns empty array — dynamicParams = true handles on-demand rendering.
export function getAllCitySlugs(): string[] {
    return [];
}