import type { NextConfig } from "next";

/** Set STATIC_EXPORT=1 to produce a fully static GitHub Pages build (→ ./out) */
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  basePath: isStaticExport ? "/porte-shop" : undefined,
  trailingSlash: isStaticExport,
  // Keep the export build fully separate so a running production server in
  // .next is never disturbed.
  distDir: isStaticExport ? ".static-next" : ".next",
  images: {
    unoptimized: isStaticExport,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_STATIC_MODE: isStaticExport ? "true" : "false",
  },
};

export default nextConfig;
