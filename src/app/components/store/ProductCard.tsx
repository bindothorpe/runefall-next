"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { lexend } from "@/app/fonts";

interface ProductCardProps {
  product: Stripe.Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const price = product.default_price as Stripe.Price;
  const amount = price?.unit_amount ? price.unit_amount / 100 : 0;
  const currency = price?.currency?.toUpperCase() || "USD";
  return (
    <Card
      className={cn(
        "aspect-3/4 gap-0 justify-between bg-[#322059] border-0 relative rounded-xs inset-ring-2 inset-ring-border shadow-[0_0_20px_rgba(0,0,0,0.8)] scale-100 hover:scale-[102%] transition-all overflow-visible",
        className
      )}
    >
      <span className="absolute inset-0 pointer-events-none before:content-[''] before:bg-no-repeat before:block before:absolute before:z-80 before:w-[14.5px] before:h-[14.5px] before:bg-[url('/images/components/container-corner.png')] before:bg-size-[14.5px] before:top-0 before:left-0 before:-rotate-180 after:bg-no-repeat after:content-[''] after:block after:absolute after:z-80 after:w-[14.5px] after:h-[14.5px] after:bg-[url('/images/components/container-corner.png')] after:bg-size-[14.5px] after:top-0 after:right-0 after:-rotate-90" />
      <span className="absolute inset-0 pointer-events-none before:content-[''] before:bg-no-repeat before:block before:absolute before:z-80 before:w-[14.5px] before:h-[14.5px] before:bg-[url('/images/components/container-corner.png')] before:bg-size-[14.5px] before:bottom-0 before:left-0 before:rotate-90 after:bg-no-repeat after:content-[''] after:block after:absolute after:z-80 after:w-[14.5px] after:h-[14.5px] after:bg-[url('/images/components/container-corner.png')] after:bg-size-[14.5px] after:bottom-0 after:right-0 -after:rotate-180" />
      <CardContent className="w-full">
        {/* Product Image */}
        <div className="relative w-full aspect-square">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority={false}
              quality={85}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col align-middle justify-end">
        <p className={`text-xl font-bold text-white ${lexend.className}`}>
          {product.name}
        </p>
        {product.description && (
          <p className=" mb-4 grow text-center">{product.description}</p>
        )}
      </CardFooter>
      <CardAction className="w-full px-6">
        <Link href={`/checkout?priceId=${price?.id}`}>
          <Button variant={"hytale"} className="w-full" size={"hytale"}>
            {currency} {amount}
          </Button>
        </Link>
      </CardAction>
    </Card>
  );
}
