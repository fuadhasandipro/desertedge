// app/main-sitemap.xml/route.ts
// Served at: rootdomain.com/main-sitemap.xml
//
// NOTE: Next.js sitemap convention only supports the filename "sitemap".
// main-sitemap.xml must use a Route Handler. Mirrors app/sitemap.ts output.

export const dynamic = "force-dynamic";

const US_STATES = [
    "al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga",
    "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md",
    "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj",
    "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc",
    "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy",
];

function randomLastmod(): string {
    const now = Date.now();
    const fiveDaysAgo = now - 5 * 24 * 60 * 60 * 1000;
    const ts = new Date(fiveDaysAgo + Math.random() * (now - fiveDaysAgo));
    return ts.toISOString().replace(/\.\d{3}Z$/, "+00:00");
}

export async function GET() {
    const ROOT_DOMAIN =
        process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

    const rootLastmod = randomLastmod();
    const urlEntries: string[] = [];

    urlEntries.push(`
  <url>
    <loc>https://${ROOT_DOMAIN}/</loc>
    <lastmod>${rootLastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`);

    for (const state of US_STATES) {
        const lastmod = randomLastmod();
        urlEntries.push(`
  <url>
    <loc>https://${state}.${ROOT_DOMAIN}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://${state}.${ROOT_DOMAIN}/sitemap.xml</loc>
    <lastmod>${lastmod}</lastmod>
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