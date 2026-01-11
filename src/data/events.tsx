import { Events } from "@/types/events";
import {
  Balloon,
  Check,
  Gamepad,
  Hammer,
  HeartHandshake,
  PartyPopper,
} from "lucide-react";

export const events: Events = [
  {
    title: "Planning & Development",
    description:
      "Creating the website, setting up the discord and starting a community.",
    isCompleted: true,
    timelineTimestamp: "2025",
    icon: <Hammer />,
  },
  {
    title: "Growing the community",
    description: "Engaging with people, making connections and finding talent.",
    isCompleted: false,
    isCurrent: true,
    timelineTimestamp: "Now",
    icon: <HeartHandshake />,
  },
  {
    title: "Initial release",
    description:
      "Hytale is released to the public. Our survival server is online from day one!",
    isCompleted: false,
    timelineTimestamp: "Jan 13, 2026",
    icon: <PartyPopper />,
  },
  {
    title: "Minigame Development",
    description: "The first minigames get developed, tested, and fine-tuned.",
    isCompleted: false,
    timelineTimestamp: "Q1 2026",
    icon: <Gamepad />,
  },
  {
    title: "Launch Party",
    description:
      "We celebrate the release of our first minigames with a launch party event!",
    isCompleted: false,
    timelineTimestamp: "2026",
    icon: <Balloon />,
  },
];
