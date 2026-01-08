"use client";

import CustomSeparator from "@/app/components/CustomSeparator";
import { lexend } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.push("/404");
  });

  return (
    <div className="container mx-auto px-6 max-w-md pt-12 -mb-20 flex flex-col gap-6 min-h-screen"></div>
  );
}
