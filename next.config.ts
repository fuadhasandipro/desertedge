import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }, {
        protocol: 'https',
        hostname: 'www.gdprofessionalplumbing.com',
      },
      {
        protocol: 'https',
        hostname: 'austin.gdprofessionalplumbing.com',
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
  },
  // Ensure we don't accidentally index the internal paths
  // async headers() {
  //   return [
  //     {
  //       source: '/city-sites/:path*',
  //       headers: [
  //         {
  //           key: 'X-Robots-Tag',
  //           value: 'noindex', // Prevents Google from indexing the internal rewrite path directly
  //         },
  //       ],
  //     },
  //   ];
  // },

  async headers() {
    return [
      {
        // Apply to all city-sites routes
        source: "/city-sites/:path*",
        headers: [
          {
            key: "x-city-site",
            value: "true",
          },
        ],
      },
    ];
  },
};

export default nextConfig;



