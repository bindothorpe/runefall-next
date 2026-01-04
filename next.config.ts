import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [new URL('https://files.stripe.com/**'), new URL('https://lh3.googleusercontent.com/**')]
  //   {
  //       protocol: 'https',
  //       hostname: 'lh3.googleusercontent.com', // Google
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'avatars.githubusercontent.com', // GitHub
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'platform-lookaside.fbsbx.com', // Facebook
  //     },
  }
};


export default nextConfig;