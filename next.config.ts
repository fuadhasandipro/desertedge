import type { NextConfig } from "next";

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
const rootHost = ROOT_DOMAIN.replace(/:.*$/, ""); // strip port for hostname matching

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }, {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      }, {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.transparenttextures.com',
      },
    ],
    // Serve WebP/AVIF automatically — better LCP scores
    formats: ["image/avif", "image/webp"],

    // Cache optimized images for 30 days
    minimumCacheTTL: 2592000,

    // Reasonable device sizes for a service/landing page site
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  async headers() {
    return [
      // ── Block indexing of internal rewrite paths ──────────────────────────
      // CRITICAL: /city-sites/* and /state-sites/* are internal Next.js paths.
      // If Google somehow crawls them directly (before middleware redirects),
      // they'd be duplicate pages of your subdomains. noindex prevents this.
      {
        source: "/city-sites/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "x-city-site", value: "true" }, // keep your custom header
        ],
      },
      {
        source: "/state-sites/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "x-state-site", value: "true" },
        ],
      },

      // ── Security headers — applied to all routes ──────────────────────────
      {
        source: "/:path*",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Stop MIME sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Force HTTPS
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          // Basic referrer policy
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Permissions policy — disable unnecessary browser features
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },

      // ── Cache static assets aggressively ─────────────────────────────────
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },

      // ── Cache sitemap and robots files ────────────────────────────────────
      {
        source: "/:filename(sitemap.*|robots.*|main-sitemap.*|sitemap-index.*|services-sitemap.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
        ],
      },
    ];
  },

  // ── 3. REDIRECTS ───────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Redirect www to non-www root (canonical)
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${rootHost}` }],
        destination: `https://${ROOT_DOMAIN}/:path*`,
        permanent: true,
      },
    ];
  },

  // ── 3.5 REWRITES ───────────────────────────────────────────────────────────
  async rewrites() {
    return [
      {
        source: "/main-sitemap.xml",
        destination: "/sitemap.xml",
      },
      {
        source: "/services-sitemap.xml",
        destination: "/sitemap.xml",
      },
      {
        source: "/sitemap-index.xml",
        destination: "/sitemap.xml",
      },
    ];
  },

  // ── 4. COMPILER OPTIONS ────────────────────────────────────────────────────
  compiler: {
    // Remove console.log in production — reduces bundle size
    removeConsole: process.env.NODE_ENV === "production",
  },

  // ── 5. EXPERIMENTAL ────────────────────────────────────────────────────────
  experimental: {
    // Faster builds — only recompile changed packages
    optimizePackageImports: ["lucide-react"],
  },

  // ── 6. TYPESCRIPT & ESLINT ─────────────────────────────────────────────────
  // Don't fail production builds on type errors (handle separately in CI)
  typescript: {
    ignoreBuildErrors: false, // keep true safety in production
  },

  // ── 7. OUTPUT ──────────────────────────────────────────────────────────────
  // If deploying to a Node server (not Vercel), uncomment:
  // output: "standalone",

  // ── 8. POWERED BY HEADER ───────────────────────────────────────────────────
  // Don't advertise you're using Next.js (minor security hardening)
  poweredByHeader: false,
};

export default nextConfig;



