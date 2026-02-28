// app/state-sites/[state]/sitemap-index.xml/route.ts
export const dynamic = "force-dynamic";

import { getCitiesForState } from "@/lib/city-data";

function getCurrentTimestamp(): string {
    // Generates: 2026-02-26T06:50:33+00:00
    return new Date().toISOString().replace(/\.\d{3}Z$/, "+00:00");
}

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ state: string }> }
) {
    const { state } = await params;
    const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
    const timestamp = getCurrentTimestamp();

    // 1. Fetch cities belonging specifically to THIS state (e.g., 'tx')
    const cities = getCitiesForState(state.toLowerCase());

    if (!cities || cities.length === 0) {
        return new Response("Not Found", { status: 404 });
    }

    const sitemapEntries: string[] = [];

    // 2. Add the main sitemap entry from the root domain at the top
    sitemapEntries.push(`
    <sitemap>
        <loc>https://${state}.${ROOT_DOMAIN}/main-sitemap.xml</loc>
        <lastmod>${timestamp}</lastmod>
    </sitemap>`);

    // 3. Add entries for every CITY in this state
    // Format: https://city-st.mybuddytheplumberparkcity.com/sitemap.xml
    for (const city of cities) {
        sitemapEntries.push(`
    <sitemap>
        <loc>https://${city.slug}.${ROOT_DOMAIN}/sitemap.xml</loc>
        <lastmod>${timestamp}</lastmod>
    </sitemap>`);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemapEntries.join("")}
</sitemapindex>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
    });
}