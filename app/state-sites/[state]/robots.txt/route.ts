// app/state-sites/[state]/robots.txt/route.ts
//
// Served at:  tx.rootdomain.com/robots.txt
// Middleware: tx.rootdomain.com/robots.txt → /state-sites/tx/robots.txt
//
// MetadataRoute.Robots doesn't support dynamic params so we use a Route Handler.
// Output is plain text matching robots.txt spec exactly.

export const dynamic = "force-dynamic";

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ state: string }> }
) {
    const { state } = await params;
    const ROOT_DOMAIN =
        process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

    const host = `https://${state.toLowerCase()}.${ROOT_DOMAIN}`;

    const content = `# ============================================================
# robots.txt — ${host}
# State-level plumbing directory subdomain
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
`;

    return new Response(content, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
        },
    });
}