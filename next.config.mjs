import { createRequire } from "module";
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: "standalone",
  experimental: {
    // webpackBuildWorker: true,
    // parallelServerBuildTraces: true,
    // parallelServerCompiles: true,
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  async redirects() {
    return [
      {
        source: "/toolkit",
        destination: "https://dsatoolkit.com",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
