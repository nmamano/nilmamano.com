import { createRequire } from "module";
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The VPS image runs .next/standalone (Dockerfile); Vercel ignores this.
  output: "standalone",
  // Routes read blog/ and posts/ at run time (the chat, unknown slugs).
  outputFileTracingIncludes: {
    "/*": ["./blog/**/*", "./posts/**/*"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  experimental: {
    // webpackBuildWorker: true,
    // parallelServerBuildTraces: true,
    // parallelServerCompiles: true,
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // Cloudflare caches pages for 5 minutes at most, and each deploy purges the
  // zone. Without this, Next sends a one-year s-maxage on prerendered pages.
  async headers() {
    return [
      {
        source: "/:path((?!api/|_next/).*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, s-maxage=300" }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/toolkit",
        destination: "https://dsatoolkit.com",
        permanent: true,
      },
      {
        source: "/research",
        destination: "/papers",
        permanent: true,
      },
      {
        source: "/resume",
        destination: "/resume/resume_nilmamano.pdf",
        permanent: false,
      },
      {
        source: "/blog/personal-software-suites",
        destination: "/blog/personal-app-store",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
