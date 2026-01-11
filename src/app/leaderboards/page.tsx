// app/leaderboards/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { lexend } from "../fonts";
import BackgroundImage from "../components/BackgroundImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

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
];

type LeaderboardEntry = {
  id: number;
  ranking: number;
  username: string;
  wins: number;
  losses: number;
};

type LeaderboardResponse = {
  data: LeaderboardEntry[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  game: string;
};

function LeaderboardsTable({ game }: { game: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/leaderboard?page=${currentPage}&limit=${itemsPerPage}&game=${game}`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [currentPage, game]);

  // Reset to page 1 when game changes
  useEffect(() => {
    setCurrentPage(1);
  }, [game]);

  const getPageNumbers = () => {
    if (!data) return [];

    const pages = [];
    const totalPages = data.pagination.totalPages;
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="space-y-4 h-136.25">
      <Card variant={"hytale"}>
        <CardContent>
          {!data && !loading ? (
            <div className="text-center py-32">
              <p>Failed to load leaderboard data</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Ranking</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Wins</TableHead>
                  <TableHead>Losses</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading
                  ? [...Array(10)].map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Skeleton className="w-full h-5 rounded-sm" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-full h-5 rounded-sm" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-full h-5 rounded-sm" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-full h-5 rounded-sm" />
                        </TableCell>
                      </TableRow>
                    ))
                  : data?.data.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.ranking}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="font-medium">{item.username}</div>
                          </div>
                        </TableCell>
                        <TableCell>{item.wins}</TableCell>
                        <TableCell>{item.losses}</TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={loading || !data?.pagination.hasPreviousPage}
          className="h-9 w-9"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getPageNumbers().map((page, index) => (
          <div key={index}>
            {page === "ellipsis" ? (
              <div className="px-3 py-2 text-muted-foreground">...</div>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(page as number)}
                disabled={loading}
                className="h-9 w-9"
              >
                {page}
              </Button>
            )}
          </div>
        ))}

        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={loading || !data?.pagination.hasNextPage}
          className="h-9 w-9"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {data && (
        <div className="text-center text-sm text-muted-foreground">
          Page {data.pagination.currentPage} of {data.pagination.totalPages} (
          {data.pagination.totalItems} total players)
        </div>
      )}
    </div>
  );
}

export default function LeaderboardsPage() {
  const [selectedGame, setSelectedGame] = useState(Games[0].name);

  return (
    <div className="-mt-24 relative flex flex-col items-center gap-10 w-full min-h-screen overflow-hidden">
      <BackgroundImage
        url="/images/background/home-background-2.png"
        alt="Games Background"
      />
      <div className="relative container mx-auto px-4 py-12 max-w-5xl pt-32 z-10">
        <h1
          className={`text-5xl runefall-text-gradient font-bold text-center mb-2 ${lexend.className}`}
        >
          LEADERBOARDS
        </h1>
        <p className="text-center text-xl">
          See where you rank on the leaderboards
        </p>
        <Tabs
          defaultValue="CHAMPIONS"
          className="w-full items-center mt-12 relative"
          onValueChange={setSelectedGame}
        >
          <Card variant={"hytale"} className=" p-2 px-4">
            <CardContent className="p-0">
              <TabsList>
                {Games.map((game) => (
                  <TabsTrigger
                    key={game.name}
                    value={game.name}
                    className={`data-[state=active]:border-border data-[state=active]:shadow-none ${lexend.className}`}
                  >
                    {game.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </CardContent>
          </Card>

          {Games.map((game) => (
            <TabsContent
              key={game.name}
              value={game.name}
              className="w-full relative"
            >
              <div
                id="transparent-bg"
                className="absolute w-full h-full z-100 flex justify-center items-center"
                style={{
                  backgroundImage:
                    "linear-gradient(0deg, rgba(31, 19, 50, 0.95) 40%, rgba(31, 19, 50, 0.7) 100%)",

                  zIndex: 9999,
                }}
              >
                <div
                  className={`text-4xl font-bold runefall-text-gradient mb-10 ${lexend.className}`}
                  style={{ marginBottom: "60px" }}
                >
                  COMING SOON
                </div>
              </div>
              <LeaderboardsTable game={game.name} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
