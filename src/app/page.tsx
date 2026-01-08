"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import Image from "next/image";
import CtaContainer from "./components/CtaContainer";
import { lexend } from "@/app/fonts";
import { Card } from "@/components/ui/card";
import CustomSeparator from "./components/CustomSeparator";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <p className="text-lg">Loading...</p>
        </div>
      }
    >
      <HomePageComponent />
    </Suspense>
  );
}

export function HomePageComponent() {
  const { status } = useSession();
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
    // <div className="relative -mt-24 bg-[url('/images/background/store_background_with_gradient.png')] bg-position-[center_top] w-full bg-no-repeat min-h-screen"></div>
    <div className="-mt-24 relative flex flex-col items-center gap-10 bg-[url('/images/background/home-background-2.png')] bg-position-[center_-8rem] md:bg-position-[center_top] w-full bg-no-repeat min-h-screen">
      <div
        className="absolute inset-0 bg-linear-to-b from-[#220548] via-[#22054880] to-transparent pointer-events-none"
        style={{ height: "50vh" }}
      ></div>
      <div className="relative z-10 flex flex-col items-center gap-10 w-full">
        <Image
          src="/images/branding/logo.png"
          width={800}
          height={295}
          alt="Picture of the author"
          className="pt-40 pb-12"
        />

        <div className="flex flex-col items-center justify-center gap-8">
          <h1
            className={`text-3xl font-bold text-center runefall-text-gradient ${lexend.className}`}
          >
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
      </div>
      <div className="container max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-20 px-4 md:px-8 items-end">
        <div className="flex flex-col flex-1 gap-8">
          <h1
            className={`text-4xl font-bold text-center runefall-text-highlight-gradient ${lexend.className}`}
          >
            What is Runefall
          </h1>
          <p className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            perspiciatis id laboriosam sequi, blanditiis eveniet dignissimos
            ducimus accusamus perferendis dolores.
          </p>
          <p className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            perspiciatis id laboriosam sequi, blanditiis eveniet dignissimos
            ducimus accusamus perferendis dolores.
          </p>
          <p className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            perspiciatis id laboriosam sequi, blanditiis eveniet dignissimos
            ducimus accusamus perferendis dolores.
          </p>
        </div>
        <div className="flex-1">
          <Card variant={"hytale"} className="w-full aspect-video"></Card>
        </div>
      </div>

      <CustomSeparator className="my-12" />

      <div className="container max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-20 px-4 md:px-8 items-end">
        <h1
          className={`text-4xl font-bold text-center runefall-text-gradient md:col-span-2 ${lexend.className}`}
        >
          What makes us special
        </h1>
        <div className="flex-1">
          <Card variant={"hytale"} className="w-full aspect-video"></Card>
        </div>
        <div className="flex-1">
          <Card variant={"hytale"} className="w-full aspect-video"></Card>
        </div>
        <div className="flex-1">
          <Card variant={"hytale"} className="w-full aspect-video"></Card>
        </div>
        <div className="flex-1">
          <Card variant={"hytale"} className="w-full aspect-video"></Card>
        </div>
      </div>

      <CustomSeparator className="my-12" />

      <div className="flex flex-col gap-20 mb-48 px-4 md:px-8 items-center w-full">
        <h1
          className={`max-w-6xl text-4xl font-bold text-center runefall-text-gradient md:col-span-2 ${lexend.className}`}
        >
          Join our server
        </h1>

        <div className="w-full">
          <CtaContainer>
            <Button variant={"hytale"} className="w-64" size={"hytale"}>
              PLAY NOW
            </Button>
          </CtaContainer>
        </div>
      </div>
    </div>
  );
}
