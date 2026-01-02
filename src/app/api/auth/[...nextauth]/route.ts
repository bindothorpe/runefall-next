import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"

//TODO: Use Prisma for database objects
// Add custom User type that includes id
declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        }
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
    ],
    pages: {
        signIn: '/signin',
        error: '/signin',
        signOut: '/'
    },
    debug: process.env.NODE_ENV === 'development',
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
    secret: process.env.NEXTAUTH_SECRET
};
// Create the handler using the auth options
const handler = NextAuth(authOptions);
// Export the handler functions for GET and POST requests
export { handler as GET, handler as POST };