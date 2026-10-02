import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enables static export
  images: {
    unoptimized: true, // Required for static exports if using Next.js Image component
  },
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.16.*.*", "*.local"],
};

export default nextConfig;
