import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import EmailProvider, {
  SendVerificationRequestParams,
} from "next-auth/providers/email";
import type { NextAuthOptions, Theme } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";
import { createTransport } from "nodemailer";
import { sendVerificationRequest } from "@/utils/send-verification-request";

//TODO: Use Prisma for database objects
// Add custom User type that includes id
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

// Define the auth options with proper typing
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),

    EmailProvider({
      server: '',
      from: process.env.EMAIL_FROM as string,
      sendVerificationRequest: sendVerificationRequest,
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/signin",
    signOut: "/",
    verifyRequest: "/auth/verify-request",
  },
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    // Handle redirection after signin
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
// Create the handler using the auth options
const handler = NextAuth(authOptions);
// Export the handler functions for GET and POST requests
export { handler as GET, handler as POST };
