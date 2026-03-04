import { US_STATES_LC } from "@/lib/constants";

// app/sitemap-index.xml/route.ts
export const dynamic = "force-dynamic";

function getCurrentTimestamp(): string {
    // Generates format: 2026-02-26T06:18:32+00:00
    return new Date().toISOString().replace(/\.\d{3}Z$/, "+00:00");
}

export async function GET() {
    const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "mybuddytheplumberparkcity.com";
    const timestamp = getCurrentTimestamp();
    const sitemapEntries: string[] = [];

    // 1. Add the main sitemap entry
    sitemapEntries.push(`
    <sitemap>
        <loc>https://${ROOT_DOMAIN}/main-sitemap.xml</loc>
        <lastmod>${timestamp}</lastmod>
    </sitemap>`);

    // 2. Add all state subdomain sitemaps
    for (const state of US_STATES_LC) {
        sitemapEntries.push(`
    <sitemap>
        <loc>https://${state}.${ROOT_DOMAIN}/sitemap.xml</loc>
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