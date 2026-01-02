import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

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

// For demo purposes - in a real app, you would use a database
const users = [
    {
        id: "1",
        name: "Demo User",
        email: "demo@example.com",
        password: "password123", // Never store plain text passwords in a real app!
        image: "https://via.placeholder.com/150"
    }
];

// Define the auth options with proper typing
export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Email and Password",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "hello@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }
                // In a real application, you would look this up in a database
                const user = users.find(user => user.email === credentials.email);
                if (!user || user.password !== credentials.password) {
                    return null;
                }
                // Return user without the password
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            }
        })
    ],
    pages: {
        signIn: '/signin',
        error: '/signin',
        signOut: '/'
    },
    session: {
        strategy: "jwt", // Use JSON Web Tokens for session handling
        maxAge: 30 * 24 * 60 * 60, // 30 days
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