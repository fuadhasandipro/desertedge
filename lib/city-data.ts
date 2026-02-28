// lib/city-data.ts
// Central helper — all pages import from here, never read fs directly.

import fs from "fs";
import path from "path";

export interface NearbyCity {
    name: string;
    slug: string;
    state: string;
}

export interface Service {
    service_id: string;
    service_title: string;
    hero: { subheadline: string };
}

export interface StateSummary {
    state: string;       // short code e.g. "CA"
    state_name: string;  // full name e.g. "California"
    count: number;       // number of cities in that state
}

export interface CityData {
    city: string;
    state: string;           // short e.g. "CA"
    state_name: string;      // full  e.g. "California"
    county_name: string;
    lat: number;
    lng: number;
    slug: string;            // e.g. "american-canyon-ca"
    phone: string;
    meta: { title: string; description: string };
    hero: {
        badge_text: string;
        h1_highlight: string;
        h1_main: string;
        subheadline: string;
        cta_label: string;
        hero_image_alt: string;
    };
    trust_bar: string[];
    about: {
        badge: string;
        h2: string;
        body_paragraphs: string[];
        residential_box: { title: string; description: string };
        commercial_box: { title: string; description: string };
        badge_stat: string;
        badge_label: string;
    };
    why_choose_us: {
        badge: string;
        h2: string;
        body: string;
        points: { label: string; text: string }[];
    };
    stats: { val: string; label: string }[];
    services_section: { h2_prefix: string; intro: string };
    zip_codes: string[];
    nearby_cities: NearbyCity[];
    faqs: { q: string; a: string }[];
    service_area_text: string;
    reviews: {
        id: number;
        source: string;
        author: string;
        date: string;
        text: string;
        rating: number;
    }[];
    services: Service[];
}

const CITIES_DIR = path.join(process.cwd(), "data", "cities");

// ── Single city by slug ────────────────────────────────────────────────────────
export function getCityBySlug(slug: string): CityData | null {
    try {
        const filePath = path.join(CITIES_DIR, `${slug.toLowerCase()}.json`);
        const raw = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(raw) as CityData;
    } catch {
        return null;
    }
}

// ── All city slugs (for generateStaticParams) ─────────────────────────────────
export function getAllCitySlugs(): string[] {
    try {
        return fs
            .readdirSync(CITIES_DIR)
            .filter((f) => f.endsWith(".json"))
            .map((f) => f.replace(".json", ""));
    } catch {
        return [];
    }
}

// ── All cities (lightweight — reads every file, use sparingly) ────────────────
export function getAllCities(): CityData[] {
    return getAllCitySlugs()
        .map((slug) => getCityBySlug(slug))
        .filter(Boolean) as CityData[];
}

// ── Cities grouped by state short code ────────────────────────────────────────
export function getCitiesByState(): Record<string, CityData[]> {
    const all = getAllCities();
    return all.reduce<Record<string, CityData[]>>((acc, city) => {
        const s = city.state.toUpperCase();
        if (!acc[s]) acc[s] = [];
        acc[s].push(city);
        return acc;
    }, {});
}

// ── All unique states present in your data ────────────────────────────────────
export function getAllStates(): StateSummary[] {
    const grouped = getCitiesByState();
    return Object.entries(grouped)
        .map(([state, cities]) => ({
            state,
            state_name: cities[0].state_name,
            count: cities.length,
        }))
        .sort((a, b) => a.state_name.localeCompare(b.state_name));
}

// ── Cities for one state ──────────────────────────────────────────────────────
export function getCitiesForState(stateShort: string): CityData[] {
    return getAllCities().filter(
        (c) => c.state.toUpperCase() === stateShort.toUpperCase()
    );
}