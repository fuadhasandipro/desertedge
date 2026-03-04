// lib/city-data.ts
// Reads JSON data files directly from disk (public/data/) instead of making
// HTTP self-calls. This eliminates Worker→Worker self-requests that were
// doubling the request count on every page render.

import { cache } from "react";
import type { CityData, StateSummary, CityEntry } from "@/lib/types";
import { US_STATE_NAMES } from "@/lib/constants";
import { headers } from "next/headers";

// In Cloudflare Workers (via OpenNext), __dirname is not available.
// Data files are in public/data/ and are bundled as static assets.
// We check for Node.js environment first (local dev), then fall back
// to fetching from the self URL (Cloudflare Worker runtime).

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

async function getBaseUrl(): Promise<string> {
    if (process.env.NODE_ENV === "development") {
        return "http://localhost:3000";
    }

    // In Cloudflare Worker SSR, fetch using the exact incoming request host
    // to keep OpenNext recognizing it as an internal request (avoids Error 1000 Zone Loop).
    try {
        const headersList = await headers();
        const host = headersList.get("host") || headersList.get("x-forwarded-host");
        if (host) {
            const protocol = headersList.get("x-forwarded-proto") || "https";
            return `${protocol}://${host}`;
        }
    } catch (e) {
        // Fallback for build time where headers() is not available
    }

    return `https://${ROOT_DOMAIN}`;
}

/**
 * Reads a JSON file from the public/data directory.
 *
 * - In LOCAL DEV (Node.js): reads directly from disk using fs — zero network requests.
 * - In CLOUDFLARE (Worker): falls back to fetch() against the ASSETS binding,
 *   which is served from Cloudflare's edge with no Worker invocation, so it
 *   does NOT count against the 100k/day Worker request limit.
 *
 * Wrapped in React cache() to deduplicate within a single render pass.
 */


const fetchJson = cache(async (urlPath: string): Promise<unknown> => {
    const baseUrl = await getBaseUrl();
    const url = `${baseUrl}${urlPath}`;

    try {

        const res = await fetch(url, {


            cache: "force-cache",
            next: { revalidate: 86400 },
        });
        if (!res.ok) {
            console.warn(`[city-data] HTTP ${res.status} — ${url}`);
            return null;
        }
        return res.json();
    } catch (err) {
        console.warn(`[city-data] Fetch failed — ${url}`, err);
        return null;
    }
});


export const getCityBySlug = cache(
    async (slug: string): Promise<CityData | null> =>
        fetchJson(`/data/cities/${slug.toLowerCase()}.json`) as Promise<CityData | null>
);

// ── All unique states ──────────────────────────────────────────────────────────
export async function getAllStates(): Promise<StateSummary[]> {
    const data = await fetchJson("/data/states.json");
    return (data as StateSummary[]) ?? [];
}

// ── Cities for one state — deduplicated per render via React cache() ───────────
export const getCitiesForState = cache(
    async (stateShort: string): Promise<CityEntry[]> => {
        const data = await fetchJson(`/data/state-cities/${stateShort.toUpperCase()}.json`);
        return (data as CityEntry[]) ?? [];
    }
);

// ── State name lookup — zero fetch cost (dictionary) ─────────────────────────
export function getStateName(stateShort: string): string {
    return US_STATE_NAMES[stateShort.toUpperCase()] ?? stateShort.toUpperCase();
}

// ── All city slugs (generateStaticParams) ─────────────────────────────────────
// Returns [] — dynamicParams = true handles on-demand ISR.
export function getAllCitySlugs(): string[] {
    return [];
}