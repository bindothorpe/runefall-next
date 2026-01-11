import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import { lexend } from "../fonts";
import VerticalEventTimeline from "@/components/vertical-event-timeline";
import CustomSeparator from "../components/CustomSeparator";
import BackgroundImage from "../components/BackgroundImage";

export default function RoadmapPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <p className="text-lg">Loading...</p>
        </div>
      }
    >
      <RoadmapPageComponent />
    </Suspense>
  );
}

function RoadmapPageComponent() {
  return (
    <div className="-mt-24 relative flex flex-col items-center gap-10 w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <BackgroundImage
        url="/images/background/home-background-2.png"
        alt="Games Background"
        opacity="opacity-10"
      />
      <div className="container mx-auto px-4 py-12 max-w-5xl pt-32 z-10">
        <h1
          className={`text-5xl runefall-text-gradient font-bold text-center mb-2 ${lexend.className}`}
        >
          ROADMAP
        </h1>
        <p className="text-center text-xl">
          See what our vision is for the future of Runefall
        </p>

        <CustomSeparator className="my-12" />

        <VerticalEventTimeline />
      </div>
    </div>
  );
}
