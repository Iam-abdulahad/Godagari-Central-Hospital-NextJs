import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phones/tablets on the local network to load dev assets and hydrate.
  // Without this, Next.js 16 blocks cross-origin /_next/* requests from LAN IPs,
  // so client JS (menu, "Available today" toggle) never runs on mobile.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.16.*.*", "*.local"],
};

export default nextConfig;