import { ReactNode } from "react";

export default function CtaContainer({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative h-20 bg-[url(/images/components/cta-container.png)] bg-no-repeat bg-center flex justify-center items-center w-full"
      style={{ backgroundSize: "auto 100%" }}
    >
      {children}
    </div>
  );
}
