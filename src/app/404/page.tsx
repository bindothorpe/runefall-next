"use client";

import CustomSeparator from "@/app/components/CustomSeparator";
import { lexend } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="container mx-auto px-6 max-w-md pt-12 -mb-20 flex flex-col gap-6 min-h-screen">
      <h1
        className={`text-5xl font-bold text-center mb-6 ${lexend.className} runefall-text-gradient`}
      >
        404 Not Found
      </h1>
      <Card
        variant="hytale"
        className="gap-0 justify-between bg-[#322059] shadow-[0_0_20px_rgba(0,0,0,0.3)]"
      >
        <CustomSeparator className="mb-6 px-12" />
        <CardContent className="flex flex-col gap-4">
          <p className="self-center text-center">
            Could not find the page you are looking for.
          </p>

          <p className="self-center text-center">
            If you think this is an issue. Please contact us.
          </p>
        </CardContent>
        <CustomSeparator className="my-6 px-12" />
        <CardFooter>
          <div className="flex flex-col grow">
            <Link href={"/"} className="w-full flex justify-center self-center">
              <Button variant="outline" className="w-full md:w-auto">
                Return to home
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
