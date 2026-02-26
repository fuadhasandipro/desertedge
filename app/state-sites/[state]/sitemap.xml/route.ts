// app/state-sites/[state]/sitemap.xml/route.ts
//
// IMPORTANT: Delete app/state-sites/[state]/sitemap.ts if it exists.
// Both files cannot coexist — they resolve to the same path and conflict.
//
// Served at:  tx.rootdomain.com/sitemap.xml
// Middleware: tx.rootdomain.com/sitemap.xml → /state-sites/tx/sitemap.xml

export const dynamic = "force-dynamic";

import { getCitiesForState } from "@/lib/city-data";

function randomRecentDate(): string {
    const now = Date.now();
    const fiveDaysAgo = now - 5 * 24 * 60 * 60 * 1000;
    return new Date(fiveDaysAgo + Math.random() * (now - fiveDaysAgo))
        .toISOString()
        .replace(/\.\d{3}Z$/, "+00:00");
}

// ✅ Named export — NOT default export
export async function GET(
    _req: Request,
    { params }: { params: Promise<{ state: string }> }
) {
    const { state } = await params;
    const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
    const cities = getCitiesForState(state);

    if (!cities.length) {
        return new Response("Not Found", { status: 404 });
    }

    const entries: string[] = [];

    entries.push(`  <url>
    <loc>https://${state}.${ROOT_DOMAIN}/</loc>
    <lastmod>${randomRecentDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`);

    for (const city of cities) {
        const d = randomRecentDate();
        const cityHost = `https://${city.slug}.${ROOT_DOMAIN}`;
        entries.push(`  <url>
    <loc>${cityHost}/</loc>
    <lastmod>${d}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${cityHost}/sitemap.xml</loc>
    <lastmod>${d}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
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