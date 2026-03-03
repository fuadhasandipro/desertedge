// lib/city-data.ts
import { cache } from "react";

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

function getBaseUrl(): string {
    if (process.env.NODE_ENV === "development") {
        return "http://localhost:3000";
    }
    return `https://${ROOT_DOMAIN}`;
}

/**
 * React cache() ensures that within a single render pass, multiple components
 * calling fetchJson with the same URL (e.g., layout + page both fetching
 * the same state-cities JSON) only make ONE actual HTTP request.
 * This is the primary fix for the Cloudflare Workers free-tier CPU limit (1102).
 */
const fetchJson = cache(async (urlPath: string): Promise<any> => {
    const url = `${getBaseUrl()}${urlPath}`;
    try {
        const res = await fetch(url, {
            cache: "force-cache",
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
});

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

// ── Hardcoded state name map — ZERO fetch cost, eliminates states.json HTTP call ──
// All 50 US states + DC + PR. A dictionary lookup is instant; no network needed.
const US_STATE_NAMES: Record<string, string> = {
    AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas",
    CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware",
    FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho",
    IL: "Illinois", IN: "Indiana", IA: "Iowa", KS: "Kansas",
    KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
    MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
    MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada",
    NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York",
    NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma",
    OR: "Oregon", PA: "Pennsylvania", PR: "Puerto Rico", RI: "Rhode Island",
    SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas",
    UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington",
    WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming", DC: "Washington D.C.",
};

// ── Lookup full state name — instant dictionary lookup, no fetch ───────────────
export function getStateName(stateShort: string): string {
    return US_STATE_NAMES[stateShort.toUpperCase()] ?? stateShort.toUpperCase();
}

// ── Single city by slug (ASYNC) ───────────────────────────────────────────────
export const getCityBySlug = cache(async (slug: string): Promise<CityData | null> => {
    return fetchJson(`/data/cities/${slug.toLowerCase()}.json`) as Promise<CityData | null>;
});

// ── All unique states present in your data (ASYNC) ───────────────────────────
export async function getAllStates(): Promise<StateSummary[]> {
    const data = await fetchJson(`/data/states.json`);
    return (data as StateSummary[]) || [];
}

// ── Cities for one state (ASYNC) — deduplicated per render via React cache() ──
export const getCitiesForState = cache(async (stateShort: string): Promise<CityData[]> => {
    const data = await fetchJson(`/data/state-cities/${stateShort.toUpperCase()}.json`);
    return (data as CityData[]) || [];
});

// ── All city slugs (for generateStaticParams) ─────────────────────────────────
// Returns empty array — dynamicParams = true handles on-demand rendering.
export function getAllCitySlugs(): string[] {
    return [];
}