// lib/types.ts — Single source of truth for all shared types across the project

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
    state: string;
    state_name: string;
    count: number;
}

/** Full city data shape — as stored in public/data/cities/{slug}.json */
export interface CityData {
    city: string;
    state: string;
    state_name: string;
    county_name: string;
    lat: number;
    lng: number;
    slug: string;
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

/** Slim city shape — as stored in public/data/state-cities/{STATE}.json */
export interface CityEntry {
    city: string;
    slug: string;
    state: string;
    zip_codes: string[];
}
