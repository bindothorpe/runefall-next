"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import CtaContainer from "./components/CtaContainer";
import { lexend } from "@/app/fonts";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  useEffect(() => {
    // If user is authenticated and there's a callback URL,
    // redirect to the callback URL
    if (status === "authenticated" && callbackUrl) {
      router.push(callbackUrl);
    }
  }, [status, callbackUrl, router]);
  return (
    <div className="relative flex flex-col items-center gap-10 bg-[url('/images/background/home-background.jpg')] bg-cover bg-center bg-no-repeat min-h-screen">
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#220548] via-[#22054880] to-transparent pointer-events-none"
        style={{ height: "50vh" }}
      ></div>
      <div className="relative z-10 flex flex-col items-center gap-10 w-full">
        <Image
          src="/images/branding/logo.png"
          width={800}
          height={800}
          alt="Picture of the author"
          className="pt-40 pb-12"
        />

        <div className="flex flex-col items-center justify-center gap-8">
          <h1 className={`text-3xl font-bold ${lexend.className}`}>
            Test your skills in our competitive games!
          </h1>
          <p className="text-xl font-light text-center">
            Explore different games and compete <br></br>with your friends
          </p>
        </div>

        <CtaContainer>
          <Button variant={"hytale"} className="w-64" size={"hytale"}>
            PLAY NOW
          </Button>
        </CtaContainer>
        {status === "loading" ? (
          <p className="text-lg">Loading...</p>
        ) : session ? (
          <div className="text-center">
            <p className="text-xl mb-4">
              You are signed in as {session.user?.name}
            </p>
            <p className="text-lg">
              Visit your{" "}
              <a href="/dashboard" className="text-blue-500 underline">
                Dashboard
              </a>
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl mb-6">
              Please sign in using the button in the top right corner
            </p>
            <p className="bg-yellow-100 p-4 rounded-lg border border-yellow-400">
              This app demonstrates how to build a login system with Next.js and
              NextAuth.js
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
