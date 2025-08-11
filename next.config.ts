import type { NextConfig } from "next";

const ContentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' https: data: blob:",
  "media-src 'self' https: data: blob:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
  "connect-src 'self' https:",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    // Use proxy/relative paths for external images; no remote hosts are needed here
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: ContentSecurityPolicy },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Permissions-Policy",
            value: "camera=(), geolocation=(), microphone=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/bookmarks",
        destination: "/bookmarks/all",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
