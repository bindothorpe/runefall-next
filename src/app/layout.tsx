import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider, ThemeProvider } from "./providers";
import Navbar from "./components/Navbar";
import RunefallNavbar from "./components/RunefallNavbar";
import Footer from "./components/Footer";

const nunito_Sans = Nunito_Sans({
  variable: "--font-nunito-sans",
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
    <html lang="en" className={nunito_Sans.className} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <AuthProvider>
            {/* <Navbar /> */}
            <RunefallNavbar />
            <main className="mx-auto pt-24">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
