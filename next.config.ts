import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/bookmarks/all",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
