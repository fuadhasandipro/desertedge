// app/city-sites/[city]/sitemap-index.xml/route.ts
//
// Served at:  dallas-tx.rootdomain.com/sitemap-index.xml
// Middleware: dallas-tx.rootdomain.com/sitemap-index.xml → /city-sites/dallas-tx/sitemap-index.xml
//
// Uses <sitemapindex> format — points to the two child sitemaps

export const dynamic = "force-dynamic";

import { getCityBySlug } from "@/lib/city-data";

function randomRecentDate(): string {
    const now = Date.now();
    const fiveDaysAgo = now - 5 * 24 * 60 * 60 * 1000;
    return new Date(fiveDaysAgo + Math.random() * (now - fiveDaysAgo))
        .toISOString()
        .replace(/\.\d{3}Z$/, "+00:00");
}

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ city: string }> }
) {
    const { city } = await params;
    const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

    const cityData = getCityBySlug(city);
    if (!cityData) return new Response("Not Found", { status: 404 });

    const base = `https://${city}.${ROOT_DOMAIN}`;
    const lastmod = randomRecentDate();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${base}/main-sitemap.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${base}/services-sitemap.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
</sitemapindex>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
    });
}