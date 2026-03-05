// lib/city-data.ts
import { cache } from "react";
import type { CityData, StateSummary, CityEntry } from "@/lib/types";
import { US_STATE_NAMES } from "@/lib/constants";

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

function getBaseUrl(): string {
    return process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : `https://${ROOT_DOMAIN}`;
}

/**
 * Fetches a JSON asset from the public/ directory.
 * Wrapped in React cache() so identical calls within the same render tree
 * (e.g. layout + page both requesting the same state-cities file) share one
 * HTTP request — critical for staying within Cloudflare free-tier CPU limits.
 */
const fetchJson = cache(async (urlPath: string): Promise<unknown> => {
    const url = `${getBaseUrl()}${urlPath}?v=2`;
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

// ── Single city by slug ────────────────────────────────────────────────────────
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