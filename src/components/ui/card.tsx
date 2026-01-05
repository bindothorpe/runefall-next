"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva(
  "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        hytale: "border-0 relative rounded-xs inset-ring-2 inset-ring-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Card({
  variant = "default",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  if (variant === "hytale") {
    return (
      <div
        data-slot="card"
        className={cn(cardVariants({ variant, className }))}
        {...props}
      >
        <span className="absolute inset-0 pointer-events-none before:content-[''] before:bg-no-repeat before:block before:absolute before:z-80 before:w-[14.5px] before:h-[14.5px] before:bg-[url('/images/components/container-corner.png')] before:bg-size-[14.5px] before:top-0 before:left-0 before:-rotate-180 after:bg-no-repeat after:content-[''] after:block after:absolute after:z-80 after:w-[14.5px] after:h-[14.5px] after:bg-[url('/images/components/container-corner.png')] after:bg-size-[14.5px] after:top-0 after:right-0 after:-rotate-90" />
        <span className="absolute inset-0 pointer-events-none before:content-[''] before:bg-no-repeat before:block before:absolute before:z-80 before:w-[14.5px] before:h-[14.5px] before:bg-[url('/images/components/container-corner.png')] before:bg-size-[14.5px] before:bottom-0 before:left-0 before:rotate-90 after:bg-no-repeat after:content-[''] after:block after:absolute after:z-80 after:w-[14.5px] after:h-[14.5px] after:bg-[url('/images/components/container-corner.png')] after:bg-size-[14.5px] after:bottom-0 after:right-0 -after:rotate-180" />
        {children}
      </div>
    );
  }

  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, className }))}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
