import { sendVerificationRequest } from "@/utils/send-verification-request";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Email from "next-auth/providers/nodemailer";
import { prisma } from "@/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
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
    error: "/signin",
    signOut: "/",
    verifyRequest: "/auth/verify-request",
  },
});
