import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import { lexend } from "../fonts";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function GamesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <p className="text-lg">Loading...</p>
        </div>
      }
    >
      <GamesPageComponent />
    </Suspense>
  );
}

type Game = {
  name: string;
  description?: string;
  inDevelopment: boolean;
  backgroundUrl?: string;
};

const Games: Game[] = [
  {
    name: "CHAMPIONS",
    description: "Battle it out in a 5 vs 5 team duel!",
    inDevelopment: true,
    backgroundUrl: "/images/games/champions-background.png",
  },
  {
    name: "KIT PVP",
    description:
      "Want to prove you are better than your friends? Challenge them in a duel to the death!",
    inDevelopment: true,
    backgroundUrl: "/images/games/kit-pvp-background.png",
  },
  {
    name: "HOMES",
    description:
      "Kick back and relax while building on your own plot. Invite friends or explore other player's builds!",
    inDevelopment: true,
    backgroundUrl: "/images/games/homes-background.png",
  },
  {
    name: "AND MORE...",
    description:
      "Our team keeps exploring new possibilities every day to bring the best experiences to you!",
    inDevelopment: false,
  },
];

export function GameCardComponent(game: Game) {
  const { name, description, inDevelopment, backgroundUrl } = game;
  return (
    <Card
      variant={"hytale"}
      className="w-full aspect-video relative overflow-hidden"
    >
      {backgroundUrl && (
        <div className="absolute inset-0.5">
          <Image
            src={backgroundUrl}
            alt={`${name} background`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>
      )}
      <CardContent className="w-full h-full flex flex-col justify-center items-center relative z-10">
        {inDevelopment && (
          <Badge className="rounded-md text-white mb-1 border-none">
            IN DEVELOPMENT
          </Badge>
        )}
        <h2
          className={`text-3xl ${lexend.className} runefall-text-gradient font-bold`}
        >
          {name}
        </h2>
        <p className="text-center">{description}</p>
      </CardContent>
    </Card>
  );
}

function GamesPageComponent() {
  return (
    <div className="-mt-24 relative flex flex-col items-center gap-10 bg-[url('/images/background/home-background-2.png')] bg-position-[center_-8rem] md:bg-position-[center_top] w-full bg-no-repeat min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-5xl pt-32">
        <h1
          className={`text-5xl runefall-text-gradient font-bold text-center mb-2 ${lexend.className}`}
        >
          GAMES
        </h1>
        <p className="text-center text-xl">Explore our unique games.</p>

        {/* <CustomSeparator className="my-12" /> */}

        <div className="container max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-8 items-end my-12">
          {Games.map((game: Game) => (
            <div key={game.name} className="flex-1">
              <GameCardComponent {...game} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
