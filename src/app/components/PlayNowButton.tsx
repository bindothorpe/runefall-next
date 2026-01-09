"use client";

import { Button } from "@/components/ui/button";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";

export default function PlayNowButton(props: { className?: string }) {
  const { className } = props;
  const { setScrollTarget } = useScrollToSection();

  return (
    <Button
      className={className}
      variant={"hytale"}
      onClick={() => {
        setScrollTarget("server-ip", "/");
      }}
    >
      PLAY NOW
    </Button>
  );
}
