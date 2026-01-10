import NextAuth from "next-auth";
import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Email from "next-auth/providers/nodemailer";
import { sendVerificationRequest } from "@/utils/send-verification-request";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GitHub,
    Google,
    Email({
      server: process.env.EMAIL_SERVER as string,
      from: process.env.EMAIL_FROM as string,
      sendVerificationRequest: sendVerificationRequest,
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/auth/error",
    signOut: "/",
    verifyRequest: "/auth/verify-request",
  },
  trustHost: true,
});
