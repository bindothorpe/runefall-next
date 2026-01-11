"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { events } from "@/data/events";
import { lexend } from "@/app/fonts";

function getBackgroundColor(event: {
  title: string;
  description: string;
  timelineTimestamp: string;
  isCompleted: boolean;
  isCurrent?: boolean;
  icon: React.ReactNode;
}) {
  if (event.isCurrent) {
    return "bg-runefall-highlight-gradient";
  }

  if (event.isCompleted) {
    return "bg-primary";
  }

  return "bg-card";
}

export default function VerticalEventTimeline() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const currentEventIndex = events.findIndex((e) => e.isCurrent);
  const filledHeight =
    currentEventIndex >= 0
      ? isMobile
        ? `${currentEventIndex * 13.5 + 2}rem`
        : `${currentEventIndex * 10.5 + 2}rem`
      : "0rem";

  return (
    <div className="mx-auto px-4 py-12 max-w-5xl">
      <div className="relative">
        {/* Timeline line - unfilled */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 z-0">
          <div className="h-full w-full bg-linear-to-b from-primary/20 from-90% to-100% to-transparent"></div>
        </div>
        {/* Timeline line - filled up to current event */}
        <motion.div
          className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-0.5 bg-primary z-0"
          initial={{ height: 0 }}
          animate={{
            height: filledHeight,
          }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
        ></motion.div>

        {events.map((event, index) => (
          <motion.div
            key={index}
            className={`mb-12 relative z-10 flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {/* Timeline dot */}
            <motion.div
              className={`${getBackgroundColor(event)} ${event.isCurrent ? "drop-shadow-[0_0_8px_rgba(216,98,237,0.8)]" : ""} absolute left-0 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full z-10 flex justify-center items-center`}
              animate={
                event.isCurrent
                  ? {
                      scale: [1, 1.15, 1],
                    }
                  : {}
              }
              transition={
                event.isCurrent
                  ? {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
                  : {}
              }
            >
              {React.cloneElement(event.icon as React.ReactElement, {
                className: "w-4 h-4",
              })}
            </motion.div>

            {/* Date badge - visible on mobile and on appropriate side for desktop */}
            <div
              className={`md:w-1/2 flex  pl-8 ${
                index % 2 === 0
                  ? "md:justify-end md:pr-8"
                  : "md:justify-start md:pl-8"
              }`}
            >
              <motion.div className="mb-4 md:mb-0">
                <Badge
                  variant="outline"
                  className={`text-sm py-1 px-3 bg-primary/5 border-primary/20 ${event.isCurrent ? "drop-shadow-[0_0_8px_rgba(216,98,237,0.8)]" : ""}`}
                >
                  <Calendar className="w-4 h-4 mr-1" />
                  {event.timelineTimestamp}
                </Badge>
              </motion.div>
            </div>

            {/* Card - takes full width on mobile, half width on desktop */}
            <div
              className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pl-8" : "md:pr-8"}`}
            >
              <motion.div
                layout
                className="w-full"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  variant={"hytale"}
                  className="overflow-hidden border-primary/10 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardContent className="p-0">
                    <div className="p-6 pt-0 pb-0 cursor-default flex justify-between items-center">
                      <div>
                        <h3
                          className={`text-xl font-bold runefall-text-gradient ${lexend.className}`}
                        >
                          {event.title}
                        </h3>
                        <p className="h-12">{event.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
