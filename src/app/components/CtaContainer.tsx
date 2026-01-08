import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function CtaContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className="relative h-20 bg-[url(/images/components/cta-container.png)] bg-no-repeat bg-center flex justify-center items-center w-full"
      style={{ backgroundSize: "auto 100%" }}
    >
      <div className={cn("w-64", className)}>{children}</div>
    </div>
  );
}
