// app/sitemap.ts
// Each subdomain (state OR city) gets its own /sitemap.xml with correct URLs.

import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getCityBySlug, getCitiesForState } from "@/lib/city-data";

const US_STATES = new Set([
    "al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga", "hi", "id", "il", "in",
    "ia", "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv",
    "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc", "sd", "tn",
    "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy",
]);

function getSubdomainInfo(
    hostname: string,
    rootDomain: string
): { type: "root" | "state" | "city"; sub: string } {
    const h = hostname.replace(/:.*$/, "").toLowerCase();
    const r = rootDomain.replace(/:.*$/, "").toLowerCase();

    if (!h.endsWith(`.${r}`) || h === `www.${r}`) return { type: "root", sub: "" };

    const sub = h.slice(0, h.length - r.length - 1);
    if (sub.length === 2 && US_STATES.has(sub)) return { type: "state", sub };
    return { type: "city", sub };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const headersList = await headers();
    const hostname = headersList.get("host") || "";
    const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

    const { type, sub } = getSubdomainInfo(hostname, ROOT_DOMAIN);
    const baseUrl = `https://${hostname}`;
    const now = new Date();

    // ── State subdomain: az.domain.com ────────────────────────────────────────
    if (type === "state") {
        const cities = getCitiesForState(sub);
        const urls: MetadataRoute.Sitemap = [
            // State homepage
            { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
        ];
        // Link to each city subdomain (helps Google discover them via state sitemaps)
        for (const city of cities) {
            urls.push({
                url: `https://${city.slug}.${ROOT_DOMAIN}`,
                lastModified: now,
                changeFrequency: "weekly",
                priority: 0.8,
            });
        }
        return urls;
    }

    // ── City subdomain: american-canyon-ca.domain.com ─────────────────────────
    if (type === "city") {
        const cityData = getCityBySlug(sub);
        if (!cityData) return [];

        const urls: MetadataRoute.Sitemap = [
            { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
            { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
            { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        ];

        for (const service of cityData.services ?? []) {
            urls.push({
                url: `${baseUrl}/services/${service.service_id}`,
                lastModified: now,
                changeFrequency: "monthly",
                priority: 0.8,
            });
        }

        return urls;
    }

    // ── Root domain ───────────────────────────────────────────────────────────
    return [
        { url: baseUrl, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    ];
}