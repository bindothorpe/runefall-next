import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [new URL('https://files.stripe.com/**')]
  }
};


export default nextConfig;