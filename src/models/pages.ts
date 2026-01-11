import { featureFlags } from "@/lib/featureFlags";

export type Page = {
  label: string;
  navigationUrl: string;
  featureFlag?: keyof typeof featureFlags;
};

export const pages: Page[] = [
  {
	label: "GAMES",
	navigationUrl: "/games",
	featureFlag: "games",
  },
  {
	label: "LEADERBOARDS",
	navigationUrl: "/leaderboards",
	featureFlag: "leaderboards",
  },
  {
	label: "ROADMAP",
	navigationUrl: "/roadmap",
	featureFlag: "roadmap",
  },
  {
	label: "STORE",
	navigationUrl: "/store",
	featureFlag: "store",
  },
  {
	label: "SUPPORT",
	navigationUrl: "/support",
  },
];