// app/robots.ts
// Served at: rootdomain.com/robots.txt

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const ROOT_DOMAIN =
    process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

  return {
    rules: [
      // ── All crawlers (Google, Bing, etc.) ─────────────────────────────────
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: [
          "/_next/",
          "/api/",
          "/data/",
          "/*.json",
        ],
      },

      // ── Bingbot — allow everything ─────────────────────────────────────────
      {
        userAgent: "Bingbot",
        allow: ["/"],
        disallow: [
          "/_next/",
          "/api/",
          "/data/",
          "/*.json",
        ],
      },
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/_next/",       // Next.js internals
          "/api/",         // API routes
          "/data/",        // raw JSON data — never expose
          "/*.json",       // block direct JSON file access
        ],
      },

      // ── Allow AI citation crawlers (OpenAI, Anthropic, Google Gemini etc.) ─
      // These read your llms.txt and page content for AI answers/citations
      { userAgent: "GPTBot", allow: ["/"] },
      { userAgent: "Google-Extended", allow: ["/"] },
      { userAgent: "ClaudeBot", allow: ["/"] },
      { userAgent: "anthropic-ai", allow: ["/"] },
      { userAgent: "PerplexityBot", allow: ["/"] },
      { userAgent: "cohere-ai", allow: ["/"] },
      { userAgent: "Applebot-Extended", allow: ["/"] },

      // ── Block pure scrapers / bulk harvesters (not citation bots) ─────────
      { userAgent: "Bytespider", disallow: ["/"] },
      { userAgent: "CCBot", disallow: ["/"] },
      { userAgent: "Diffbot", disallow: ["/"] },
      { userAgent: "omgili", disallow: ["/"] },
      { userAgent: "omgilibot", disallow: ["/"] },
    ],

    sitemap: [
      `https://${ROOT_DOMAIN}/sitemap.xml`,
      `https://${ROOT_DOMAIN}/sitemap-index.xml`,
    ],

    host: `https://${ROOT_DOMAIN}`,
  };
}