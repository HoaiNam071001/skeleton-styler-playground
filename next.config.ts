import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingIncludes: {
    '/api/types': ['./node_modules/skeleton-styler/dist/**/*'],
  },
};

export default nextConfig;
