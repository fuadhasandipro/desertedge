// app/robots.ts
// Served at: rootdomain.com/robots.txt
// Tailored for Next.js subdomain architecture — no PHP, clean URLs

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const ROOT_DOMAIN =
    process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

  return {
    rules: [
      // ── Global: allow search crawling, block AI scrapers ──────────────────
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/_next/",        // Next.js internals
          "/api/",          // any API routes
          "/data/",         // raw JSON data directory — never expose
          "/*.json",        // block direct JSON file access
        ],
      },

      // ── Block AI training bots ─────────────────────────────────────────────
      { userAgent: "GPTBot", disallow: ["/"] },
      { userAgent: "Google-Extended", disallow: ["/"] },
      { userAgent: "ClaudeBot", disallow: ["/"] },
      { userAgent: "Amazonbot", disallow: ["/"] },
      { userAgent: "Applebot-Extended", disallow: ["/"] },
      { userAgent: "Bytespider", disallow: ["/"] },
      { userAgent: "CCBot", disallow: ["/"] },
      { userAgent: "meta-externalagent", disallow: ["/"] },
      { userAgent: "Diffbot", disallow: ["/"] },
      { userAgent: "omgili", disallow: ["/"] },
      { userAgent: "omgilibot", disallow: ["/"] },
      { userAgent: "FacebookBot", disallow: ["/"] },
      { userAgent: "anthropic-ai", disallow: ["/"] },
      { userAgent: "cohere-ai", disallow: ["/"] },
    ],

    sitemap: [
      `https://${ROOT_DOMAIN}/sitemap.xml`,
      `https://${ROOT_DOMAIN}/sitemap-index.xml`,
      `https://${ROOT_DOMAIN}/main-sitemap.xml`,
    ],

    host: `https://${ROOT_DOMAIN}`,
  };
}