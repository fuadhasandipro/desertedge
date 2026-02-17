import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Ensure we don't accidentally index the internal paths
  async headers() {
    return [
      {
        source: '/city-sites/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex', // Prevents Google from indexing the internal rewrite path directly
          },
        ],
      },
    ];
  },
};

export default nextConfig;