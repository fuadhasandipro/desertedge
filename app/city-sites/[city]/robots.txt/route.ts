// app/city-sites/[city]/robots.txt/route.ts
//
// Served at:  dallas-tx.rootdomain.com/robots.txt
// Middleware: dallas-tx.rootdomain.com/robots.txt → /city-sites/dallas-tx/robots.txt
//
// City-level robots — allows all service pages, blocks internals + AI bots.
// Lists all 4 city sitemap variants so crawlers discover everything.

export const dynamic = "force-dynamic";

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ city: string }> }
) {
    const { city } = await params;
    const ROOT_DOMAIN =
        process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

    const host = `https://${city.toLowerCase()}.${ROOT_DOMAIN}`;

    const content = `# ============================================================
# robots.txt — ${host}
# City-level plumbing service subdomain
# ============================================================

# ── Content Signal Declaration ───────────────────────────────────────────────
# search:   YES  — index pages and return results
# ai-input: NO   — do not use content for real-time AI answers
# ai-train: NO   — do not train AI/ML models on this content
#
# ANY RESTRICTIONS ARE EXPRESS RESERVATIONS OF RIGHTS UNDER
# ARTICLE 4, EU DIRECTIVE 2019/790 (DSM COPYRIGHT DIRECTIVE).

# ── Default: allow legitimate crawlers ───────────────────────────────────────
User-agent: *
Allow: /
Allow: /services/
Allow: /about-us
Allow: /contact-us
Disallow: /_next/
Disallow: /api/
Disallow: /data/
Disallow: /*.json$

# ── Block AI training & scraping bots ────────────────────────────────────────
User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Amazonbot
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: meta-externalagent
Disallow: /

User-agent: Diffbot
Disallow: /

User-agent: omgili
Disallow: /

User-agent: omgilibot
Disallow: /

User-agent: FacebookBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: cohere-ai
Disallow: /

# ── Sitemaps ─────────────────────────────────────────────────────────────────
Sitemap: ${host}/sitemap.xml
Sitemap: ${host}/sitemap-index.xml
Sitemap: ${host}/main-sitemap.xml
Sitemap: ${host}/services-sitemap.xml
`;

    return new Response(content, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
        },
    });
}