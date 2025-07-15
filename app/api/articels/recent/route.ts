import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"; // 👈 get logged-in user

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ articles: [] }); // Unauthorized users see nothing
    }

    const articles = await prisma.articles.findMany({
      where: {
        author: {
          clerkId: userId,
        },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        comments: true,
      },
    });

    const formatted = articles.map((article) => ({
      id: article.id,
      title: article.title,
      status: "Published", // static for now
      comments: article.comments.length,
      date: article.createdAt.toISOString().split("T")[0],
    }));

    return NextResponse.json({ articles: formatted });
  } catch (error) {
    console.error("Error fetching recent articles:", error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}
