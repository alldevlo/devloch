import { caseStudySlugRedirects } from "./src/lib/case-study-slug-redirects.shared.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-site",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    const caseStudyRedirects = Object.entries(caseStudySlugRedirects).map(([legacySlug, canonicalSlug]) => ({
      source: `/etudes-de-cas/${legacySlug}`,
      destination: `/etudes-de-cas/${canonicalSlug}`,
      permanent: true,
    }));

    return [
      ...caseStudyRedirects,
    ];
  },
};

export default nextConfig;
