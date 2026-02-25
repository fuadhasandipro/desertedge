// app/robots.ts

import { MetadataRoute } from "next";
import { headers } from "next/headers";

const US_STATES = new Set([
    "al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga", "hi", "id", "il", "in",
    "ia", "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv",
    "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc", "sd", "tn",
    "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy",
]);

function detectSubdomainType(
    hostname: string,
    rootDomain: string
): "root" | "state" | "city" {
    const h = hostname.replace(/:.*$/, "").toLowerCase();
    const r = rootDomain.replace(/:.*$/, "").toLowerCase();

    if (!h.endsWith(`.${r}`) || h === `www.${r}`) return "root";

    const sub = h.slice(0, h.length - r.length - 1);
    if (sub.length === 2 && US_STATES.has(sub)) return "state";
    return "city";
}

export default async function robots(): Promise<MetadataRoute.Robots> {
    const headersList = await headers();
    const hostname = headersList.get("host") || "";
    const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
    const type = detectSubdomainType(hostname, ROOT_DOMAIN);

    const disallowInternal = ["/city-sites/", "/state-sites/"];

    if (type === "state" || type === "city") {
        return {
            rules: {
                userAgent: "*",
                allow: "/",
                disallow: disallowInternal,
            },
            sitemap: `https://${hostname}/sitemap.xml`,
        };
    }

    // Root domain
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: disallowInternal,
        },
        sitemap: `https://${hostname}/sitemap.xml`,
    };
}