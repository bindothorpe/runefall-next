import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth"

export default {
  providers: [
    GitHub,
    Google
  ],
  pages: {
    signIn: "/signin",
    error: "/signin",
    signOut: "/",
    verifyRequest: "/auth/verify-request",
  },
  trustHost: true,
  // Add this callback to fix the URL generation
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Force production URL
      const productionUrl = process.env.AUTH_URL || baseUrl;
      
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${productionUrl}${url}`;
      
      // Allows callback URLs on the same origin
      if (new URL(url).origin === productionUrl) return url;
      
      return productionUrl;
    },
  },
} satisfies NextAuthConfig;