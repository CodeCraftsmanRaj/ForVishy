import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  experimental: {
    // @ts-expect-error - Turbopack root config is supported by runtime but types may be missing
    turbopack: {
      // Explicitly set the root to the current directory (client folder)
      root: path.join(__dirname),
    },
  },
};

export default nextConfig;