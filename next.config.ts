import type { NextConfig } from "next";
import { redirects } from "./src/data/redirects";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return redirects;
  },
};

export default nextConfig;
