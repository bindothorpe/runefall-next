"use client";

import CustomSeparator from "@/app/components/CustomSeparator";
import { lexend } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

export default function VerifyRequest() {
  return (
    <div className="container mx-auto px-6 max-w-md pt-12 -mb-20 flex flex-col gap-6 min-h-screen">
      <h1
        className={`text-5xl font-bold text-center mb-6 ${lexend.className} runefall-text-gradient`}
      >
        EMAIL SENT
      </h1>
      <Card
        variant="hytale"
        className="gap-0 justify-between bg-[#322059] shadow-[0_0_20px_rgba(0,0,0,0.3)]"
      >
        <CustomSeparator className="mb-6 px-12">
          {/* <svg
            className="w-8 h-8 fill-[#4D475F]"
            data-name="1-Email"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            color="#ffffff"
          >
            <path
              color="#ffffff"
              d="M29 4H3a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h26a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.72 2L16 14.77 3.72 6zM30 25a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.23l13.42 9.58a1 1 0 0 0 1.16 0L30 7.23z"
            />
          </svg> */}
        </CustomSeparator>
        <CardContent className="flex flex-col gap-4">
          <p className="self-center text-center">
            A sign in link has been sent to your email address.
          </p>

          <p className="self-center text-center">
            Check your spam if you don't see it in your inbox.
          </p>
        </CardContent>
        <CustomSeparator className="my-6 px-12" />
        <CardFooter>
          <div className="flex flex-col grow">
            <Link
              href={"/signin"}
              className="w-full flex justify-center self-center"
            >
              <Button variant="outline" className="w-full md:w-auto">
                Return to sign-in
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
