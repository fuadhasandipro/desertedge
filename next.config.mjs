/** @type {import('next').NextConfig} */

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
const rootHost = ROOT_DOMAIN.replace(/:.*$/, "");

const nextConfig = {
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

  // ── 3. REDIRECTS ───────────────────────────────────────────────────────────
  // Redirects moved to middleware.ts

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
  // We use Cloudflare Pages Edge rendering, NOT export

  // ── 8. POWERED BY HEADER ───────────────────────────────────────────────────
  // Don't advertise you're using Next.js (minor security hardening)
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },


  async headers() {
    return [
      {
        // Apply to all pages except Next.js internals and API routes
        source: "/((?!_next/|api/).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },

};


export default nextConfig;


