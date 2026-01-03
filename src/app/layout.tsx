import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend } from "next/font/google";
import "./globals.css";
import { AuthProvider, ThemeProvider } from "./providers";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const lexend = Lexend({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Runefall",
  description: "Learn authentication with Next.js and NextAuth.js",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={lexend.className} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            <main className="container mx-auto p-4">{children}</main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
