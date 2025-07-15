import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ liked: false });
    }

    const url = new URL(req.url);
    const articleId = url.searchParams.get("articleId");

    if (!articleId) {
      return NextResponse.json({ error: "Missing article ID" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return NextResponse.json({ liked: false });
    }

    const like = await prisma.like.findUnique({
      where: {
        userId_articleId: {
          userId: user.id,
          articleId,
        },
      },
    });

    return NextResponse.json({ liked: !!like });
  } catch (err) {
    console.error("❌ Error fetching like status:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
