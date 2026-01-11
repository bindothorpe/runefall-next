// @/types/events.ts
import React from "react";

export type Events = Array<{
  title: string;
  description: string;
  timelineTimestamp: string;
  isCompleted: boolean;
  isCurrent?: boolean;
  icon: React.ReactNode;
}>;