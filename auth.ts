import NextAuth from "next-auth";
import { prisma } from "@/prisma"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Email from "next-auth/providers/nodemailer";
import { sendVerificationRequest } from "@/utils/send-verification-request";
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    Email({
      server: process.env.EMAIL_SERVER as string,
      from: process.env.EMAIL_FROM as string,
      sendVerificationRequest: sendVerificationRequest,
    }),
    ...authConfig.providers,
  ],
});