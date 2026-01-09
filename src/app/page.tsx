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
import { GameCardComponent } from "./games/page";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { CopyButton } from "@/components/ui/shadcn-io/copy-button";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";
import BackgroundImage from "./components/BackgroundImage";

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
  const { setScrollTarget } = useScrollToSection();
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
    <div className="-mt-24 relative flex flex-col items-center gap-10 w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <BackgroundImage
        url="/images/background/home-background-2.png"
        alt="Home Background"
      />

      {/* Content */}
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
          <Button
            variant={"hytale"}
            className="w-64"
            size={"hytale"}
            onClick={() => setScrollTarget("server-ip")}
          >
            PLAY NOW
          </Button>
        </CtaContainer>
      </div>
      <div className="relative z-10 container max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-20 px-4 md:px-8 items-end">
        <div className="flex flex-col flex-1 gap-8">
          <h1
            className={`text-4xl font-bold text-center runefall-text-highlight-gradient ${lexend.className}`}
          >
            What is Runefall
          </h1>
          <div className="flex flex-col gap-4">
            <p className="text-center">
              Runefall is a premium Hytale server dedicated to high-quality
              competitive minigames and community-driven experiences.
            </p>
            <p className="text-center">
              Jump into intense 5v5 battles in Champions, test your skills in
              Kit PVP duels, or unwind in Homes where you can build and
              socialize with friends. Designed for both casual and competitive
              players, Runefall offers polished, pick-up-and-play gameplay
              without long commitments.
            </p>
            <p className="text-center">
              Join a growing community where friendships flourish, and your
              skills shine in the world of Hytale.
            </p>
          </div>
        </div>
        <div className="flex-1">
          <GameCardComponent
            name={"TRAILER COMING SOON"}
            inDevelopment={false}
          />
        </div>
      </div>

      <CustomSeparator className="my-12 relative z-10" />

      <div className="relative z-10 container max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 px-4 md:px-8 items-end">
        <h1
          className={`text-4xl font-bold text-center runefall-text-gradient md:col-span-2 ${lexend.className}`}
        >
          What makes us special
        </h1>
        <div className="flex-1">
          <GameCardComponent
            name={"High-Quality Minigames"}
            description="Polished, competitive gameplay experiences crafted with attention to detail"
            inDevelopment={false}
          />
        </div>
        <div className="flex-1">
          <GameCardComponent
            name={"Pick Up and Play"}
            description="Jump in anytime without long commitments or grinds, perfect for quick sessions"
            inDevelopment={false}
          />
        </div>
        <div className="flex-1">
          <GameCardComponent
            name={"Community First"}
            description="Build friendships, team up with players, and be part of a welcoming social environment"
            inDevelopment={false}
          />
        </div>
        <div className="flex-1">
          <GameCardComponent
            name={"Casual to Competitive"}
            description="Whether you're playing for fun or climbing the ranks, there's a place for everyone"
            inDevelopment={false}
          />
        </div>
      </div>

      <CustomSeparator className="my-12 relative z-10" />

      <div
        id="server-ip"
        className="relative z-10 flex flex-col gap-20 mb-48 px-4 md:px-8 items-center w-full"
      >
        <h1
          className={`max-w-6xl text-4xl font-bold text-center runefall-text-gradient md:col-span-2 ${lexend.className}`}
        >
          Join our server
        </h1>

        <div className="w-full">
          <CtaContainer>
            <InputGroup className="w-full h-12!">
              <InputGroupInput
                placeholder="eu.runefall.net"
                readOnly
                className="text-xl!"
              />
              <InputGroupAddon align="inline-end">
                <CopyButton
                  content="eu.runefall.net"
                  size="md"
                  variant={"ghost"}
                />
              </InputGroupAddon>
              <InputGroupAddon align="inline-start">
                <div className="w-10 flex justify-center text-lg px-1 py-2 text-muted-foreground">
                  {/* ip */}
                </div>
              </InputGroupAddon>
            </InputGroup>
          </CtaContainer>
        </div>
      </div>
    </div>
  );
}
