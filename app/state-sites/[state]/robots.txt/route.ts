// app/state-sites/[state]/robots.txt/route.ts
// Served at: [state].desertedgeplumbing.com/robots.txt

export const dynamic = "force-dynamic";

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ state: string }> }
) {
    const { state } = await params;
    const ROOT_DOMAIN =
        process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

    const host = `https://${state.toLowerCase()}.${ROOT_DOMAIN}`;

    const content = `# robots.txt — ${host}
# State-level plumbing directory subdomain

# ── Allow all legitimate crawlers ────────────────────────────────────────────
User-agent: *
Allow: /
Disallow: /_next/
Disallow: /api/
Disallow: /data/
Disallow: /*.json$

# ── Allow AI citation bots (needed for llms.txt indexing & AI citations) ─────
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Applebot-Extended
Allow: /

# ── Block pure scrapers / bulk harvesters ────────────────────────────────────
User-agent: Bytespider
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Diffbot
Disallow: /

User-agent: omgili
Disallow: /

User-agent: omgilibot
Disallow: /

User-agent: meta-externalagent
Disallow: /

User-agent: FacebookBot
Disallow: /

User-agent: Amazonbot
Disallow: /

# ── Sitemaps ─────────────────────────────────────────────────────────────────
Sitemap: ${host}/sitemap.xml
Sitemap: ${host}/sitemap-index.xml
`;

    return new Response(content, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
        },
    });
}