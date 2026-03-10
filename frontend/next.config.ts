import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix hydration mismatch for images in development
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
