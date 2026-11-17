import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Content-Security-Policy (task a346ce37). Outside hosts: Google Analytics
// (gtag.js and its beacons), the demo iframes in blog posts, and the
// dsatoolkit.com cover image (blog/toolkit.mdx). zod probes eval with
// Function(""); the block is harmless (zod falls back), so no 'unsafe-eval'.
// Next.js inlines its bootstrap scripts, so script-src needs 'unsafe-inline';
// the host list still blocks scripts from any other server.
// Rollout: Report-Only from 2026-11-17, enforced after a headless Chrome check
// of each page type. To debug a block, set CSP_HEADER to
// "Content-Security-Policy-Report-Only" again.
const CSP_HEADER = "Content-Security-Policy";
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://dsatoolkit.com https://www.googletagmanager.com https://*.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
  "media-src 'self'",
  "frame-src https://isomux.com https://nmamano.github.io",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

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
    const headers = [
      {
        source: "/:path((?!api/|_next/).*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, s-maxage=300" }],
      },
    ];
    // Production only: the dev server needs eval and its own websocket.
    if (process.env.NODE_ENV === "production") {
      headers.push({
        source: "/:path*",
        headers: [{ key: CSP_HEADER, value: CSP }],
      });
    }
    return headers;
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
        source: "/blog/end-of-agents/:path*",
        destination: "/blog/decision-feed/:path*",
        permanent: true,
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
