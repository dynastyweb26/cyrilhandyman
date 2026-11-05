import type { NextConfig } from "next";
import { redirects } from "./src/data/redirects";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Trailing-slash normalisation moves into middleware.ts, so a retired town URL
  // like /service-areas/heath/ gets one 301 to the hub instead of a 308 hop.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return redirects;
  },
};

export default nextConfig;
