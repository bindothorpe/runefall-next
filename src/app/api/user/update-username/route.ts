import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { hytaleUsername } = await req.json();

    // Validate username format
    if (hytaleUsername) {
      // Check length (3-16 characters)
      if (hytaleUsername.length < 3 || hytaleUsername.length > 16) {
        return NextResponse.json(
          { error: "Username must be between 3 and 16 characters" },
          { status: 400 }
        );
      }

      // Check format (only letters, numbers, and underscores)
      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      if (!usernameRegex.test(hytaleUsername)) {
        return NextResponse.json(
          { error: "Username can only contain letters, numbers, and underscores" },
          { status: 400 }
        );
      }
    }

    // Update user's Hytale username
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { hytaleUsername: hytaleUsername || null },
    });

    return NextResponse.json({
      success: true,
      hytaleUsername: updatedUser.hytaleUsername,
    });
  } catch (error) {
    console.error("Update username error:", error);
    return NextResponse.json(
      { error: "Failed to update username" },
      { status: 500 }
    );
  }
}