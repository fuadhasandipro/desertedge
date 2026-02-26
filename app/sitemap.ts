// app/sitemap.ts
// Served at: rootdomain.com/sitemap.xml
// Lists: root homepage + every state subdomain homepage + state sitemap.xml reference

import type { MetadataRoute } from "next";

const US_STATES = [
    "al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga",
    "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md",
    "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj",
    "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc",
    "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy",
];

function randomRecentDate(): Date {
    const now = Date.now();
    const fiveDaysAgo = now - 5 * 24 * 60 * 60 * 1000;
    return new Date(fiveDaysAgo + Math.random() * (now - fiveDaysAgo));
}

export default function sitemap(): MetadataRoute.Sitemap {
    const ROOT_DOMAIN =
        process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

    const entries: MetadataRoute.Sitemap = [];

    // 1. Root homepage — priority 1.0
    entries.push({
        url: `https://${ROOT_DOMAIN}/`,
        lastModified: randomRecentDate(),
        changeFrequency: "weekly",
        priority: 1.0,
    });

    // 2. Each state: homepage (0.8) + sitemap.xml reference (0.6)
    for (const state of US_STATES) {
        const stateDate = randomRecentDate();

        entries.push({
            url: `https://${state}.${ROOT_DOMAIN}/`,
            lastModified: stateDate,
            changeFrequency: "weekly",
            priority: 0.8,
        });

        entries.push({
            url: `https://${state}.${ROOT_DOMAIN}/sitemap.xml`,
            lastModified: stateDate,
            changeFrequency: "weekly",
            priority: 0.6,
        });
    }

    return entries;
}