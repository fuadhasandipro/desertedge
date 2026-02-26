// app/city-sites/[city]/services-sitemap.xml/route.ts
//
// Served at:  dallas-tx.rootdomain.com/services-sitemap.xml
// Middleware: dallas-tx.rootdomain.com/services-sitemap.xml → /city-sites/dallas-tx/services-sitemap.xml
//
// Contains: homepage, about, contact, services/ + every service page
// (mirrors main-sitemap.xml per reference format — both include full page list)

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
    const entries: string[] = [];

    // Core pages
    entries.push(`  <url>
    <loc>${base}/</loc>
    <lastmod>${randomRecentDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`);

    entries.push(`  <url>
    <loc>${base}/about</loc>
    <lastmod>${randomRecentDate()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);

    entries.push(`  <url>
    <loc>${base}/contact</loc>
    <lastmod>${randomRecentDate()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);

    entries.push(`  <url>
    <loc>${base}/services/</loc>
    <lastmod>${randomRecentDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`);

    // All individual service pages from city JSON
    for (const service of cityData.services ?? []) {
        entries.push(`  <url>
    <loc>${base}/services/${service.service_id}</loc>
    <lastmod>${randomRecentDate()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
    });
}