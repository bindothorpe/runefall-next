// app/api/leaderboard/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Mock data - later replace with real DB connection
const leaderboardData = [
  { id: 1, ranking: 1, username: "ShadowBlade", wins: 847, losses: 203 },
  { id: 2, ranking: 2, username: "DragonSlayer99", wins: 792, losses: 241 },
  { id: 3, ranking: 3, username: "MysticWarrior", wins: 731, losses: 268 },
  { id: 4, ranking: 4, username: "ThunderStrike", wins: 689, losses: 295 },
  { id: 5, ranking: 5, username: "PhoenixRising", wins: 654, losses: 312 },
  { id: 6, ranking: 6, username: "IceQueen", wins: 621, losses: 334 },
  { id: 7, ranking: 7, username: "NightHawk", wins: 598, losses: 356 },
  { id: 8, ranking: 8, username: "CrimsonFury", wins: 567, losses: 378 },
  { id: 9, ranking: 9, username: "StormBreaker", wins: 543, losses: 401 },
  { id: 10, ranking: 10, username: "VoidWalker", wins: 521, losses: 419 },
  { id: 11, ranking: 11, username: "SilentAssassin", wins: 498, losses: 437 },
  { id: 12, ranking: 12, username: "BlazingPhoenix", wins: 476, losses: 454 },
  { id: 13, ranking: 13, username: "FrostBite", wins: 455, losses: 471 },
  { id: 14, ranking: 14, username: "DarkKnight", wins: 434, losses: 488 },
  { id: 15, ranking: 15, username: "LightningBolt", wins: 413, losses: 505 },
  { id: 16, ranking: 16, username: "SteelGuardian", wins: 392, losses: 522 },
  { id: 17, ranking: 17, username: "MoonWalker", wins: 371, losses: 539 },
  { id: 18, ranking: 18, username: "StarGazer", wins: 350, losses: 556 },
  { id: 19, ranking: 19, username: "EarthShaker", wins: 329, losses: 573 },
  { id: 20, ranking: 20, username: "WindRunner", wins: 308, losses: 590 },
  { id: 21, ranking: 21, username: "FireStorm", wins: 287, losses: 607 },
  { id: 22, ranking: 22, username: "WaterBender", wins: 266, losses: 624 },
  { id: 23, ranking: 23, username: "ShadowHunter", wins: 245, losses: 641 },
  { id: 24, ranking: 24, username: "GoldenEagle", wins: 224, losses: 658 },
  { id: 25, ranking: 25, username: "SilverWolf", wins: 203, losses: 675 },
  { id: 26, ranking: 26, username: "BronzeTitan", wins: 182, losses: 692 },
  { id: 27, ranking: 27, username: "CrystalMage", wins: 161, losses: 709 },
  { id: 28, ranking: 28, username: "BloodRaven", wins: 140, losses: 726 },
  { id: 29, ranking: 29, username: "IronFist", wins: 119, losses: 743 },
  { id: 30, ranking: 30, username: "VenomStrike", wins: 98, losses: 760 },
  { id: 31, ranking: 31, username: "RapidFire", wins: 489, losses: 465 },
  { id: 32, ranking: 32, username: "GhostRider", wins: 467, losses: 482 },
  { id: 33, ranking: 33, username: "NeonNinja", wins: 445, losses: 499 },
  { id: 34, ranking: 34, username: "CosmicWarrior", wins: 423, losses: 516 },
  { id: 35, ranking: 35, username: "ToxicAvenger", wins: 401, losses: 533 },
  { id: 36, ranking: 36, username: "RadiantKing", wins: 379, losses: 550 },
  { id: 37, ranking: 37, username: "ViciousViper", wins: 357, losses: 567 },
  { id: 38, ranking: 38, username: "MightyThor", wins: 335, losses: 584 },
  { id: 39, ranking: 39, username: "SavageBeard", wins: 313, losses: 601 },
  { id: 40, ranking: 40, username: "EliteSniper", wins: 291, losses: 618 },
  { id: 41, ranking: 41, username: "BerserkWarrior", wins: 269, losses: 635 },
  { id: 42, ranking: 42, username: "FallenAngel", wins: 247, losses: 652 },
  { id: 43, ranking: 43, username: "QuantumLeap", wins: 225, losses: 669 },
  { id: 44, ranking: 44, username: "ZenMaster", wins: 203, losses: 686 },
  { id: 45, ranking: 45, username: "ApexPredator", wins: 181, losses: 703 },
  { id: 46, ranking: 46, username: "NovaBlast", wins: 159, losses: 720 },
  { id: 47, ranking: 47, username: "EchoWarrior", wins: 137, losses: 737 },
  { id: 48, ranking: 48, username: "PrismKnight", wins: 115, losses: 754 },
  { id: 49, ranking: 49, username: "RuneSeeker", wins: 93, losses: 771 },
  { id: 50, ranking: 50, username: "MythicLegend", wins: 71, losses: 788 },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const game = searchParams.get('game') || 'CHAMPIONS';

  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  // Get paginated data
  const paginatedData = leaderboardData.slice(startIndex, endIndex);
  
  // Return response with pagination metadata
  return NextResponse.json({
    data: paginatedData,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(leaderboardData.length / limit),
      totalItems: leaderboardData.length,
      itemsPerPage: limit,
      hasNextPage: endIndex < leaderboardData.length,
      hasPreviousPage: page > 1,
    },
    game,
  });
}

// Example of how you'd later switch to a real DB:
/*
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const game = searchParams.get('game') || 'CHAMPIONS';

  // Replace with your DB query
  const totalItems = await db.leaderboard.count({ where: { game } });
  const data = await db.leaderboard.findMany({
    where: { game },
    orderBy: { ranking: 'asc' },
    skip: (page - 1) * limit,
    take: limit,
  });

  return NextResponse.json({
    data,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      itemsPerPage: limit,
      hasNextPage: page * limit < totalItems,
      hasPreviousPage: page > 1,
    },
    game,
  });
}
*/