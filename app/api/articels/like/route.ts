import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { articleId } = body;

    if (!articleId) {
      return NextResponse.json({ error: "Missing article ID" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_articleId: {
          userId: user.id,
          articleId,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          userId_articleId: {
            userId: user.id,
            articleId,
          },
        },
      });

      return NextResponse.json({ liked: false }); // Disliked
    } else {
      await prisma.like.create({
        data: {
          userId: user.id,
          articleId,
        },
      });

      return NextResponse.json({ liked: true }); // Liked
    }
  } catch (error) {
    console.error("❌ Like toggle error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
