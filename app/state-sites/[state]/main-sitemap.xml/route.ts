// app/state-sites/[state]/main-sitemap.xml/route.ts
//
// Served at:  tx.rootdomain.com/main-sitemap.xml
// Middleware rewrites  tx.rootdomain.com/main-sitemap.xml
//                   →  /state-sites/tx/main-sitemap.xml
//
// NOTE: Next.js sitemap convention only supports the filename "sitemap".
// Mirrors app/state-sites/[state]/sitemap.ts output exactly.

export const dynamic = "force-dynamic";

import { getCitiesForState } from "@/lib/city-data";

function randomLastmod(): string {
    const now = Date.now();
    const fiveDaysAgo = now - 5 * 24 * 60 * 60 * 1000;
    const ts = new Date(fiveDaysAgo + Math.random() * (now - fiveDaysAgo));
    return ts.toISOString().replace(/\.\d{3}Z$/, "+00:00");
}

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ state: string }> }
) {
    const { state } = await params;
    const ROOT_DOMAIN =
        process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

    const cities = getCitiesForState(state);

    if (!cities.length) {
        return new Response("Not Found", { status: 404 });
    }

    const stateLastmod = randomLastmod();
    const urlEntries: string[] = [];

    urlEntries.push(`
  <url>
    <loc>https://${state}.${ROOT_DOMAIN}/</loc>
    <lastmod>${stateLastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`);

    for (const city of cities) {
        const cityLastmod = randomLastmod();
        const citySubdomain = `${city.slug}.${ROOT_DOMAIN}`;

        urlEntries.push(`
  <url>
    <loc>https://${citySubdomain}/</loc>
    <lastmod>${cityLastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://${citySubdomain}/sitemap.xml</loc>
    <lastmod>${cityLastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlEntries.join("")}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
    });
}