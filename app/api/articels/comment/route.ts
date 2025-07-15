import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

// POST /api/articels/comment
export async function POST(req: Request) {
  try {
    // 1. Authenticate user with Clerk
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse request body
    const body = await req.json();
    const { content, articleId } = body;

    if (!content || !articleId) {
      return NextResponse.json(
        { error: "Missing content or article ID" },
        { status: 400 }
      );
    }

    if (typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Comment content must not be empty" },
        { status: 400 }
      );
    }

    if (content.length > 1000) {
      return NextResponse.json(
        { error: "Comment is too long (max 1000 characters)" },
        { status: 400 }
      );
    }

    // 3. Verify user exists in your database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 4. Create the comment in DB
    const newComment = await prisma.comment.create({
      data: {
        content: content.trim(),
        articleId,
        authorId: user.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            imageUrl: true,
          },
        },
      },
    });

    // 5. Respond with created comment
    return NextResponse.json(
      {
        id: newComment.id,
        content: newComment.content,
        createdAt: newComment.createdAt,
        author: newComment.author,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error posting comment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}






export async function GET(req: NextRequest) {
  const articleId = req.nextUrl.searchParams.get("articleId");

  if (!articleId) {
    return NextResponse.json({ error: "Missing articleId" }, { status: 400 });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { articleId },
      include: {
        author: {
          select: {
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formatted = comments.map((c) => ({
      id: c.id,
      content: c.content,
      createdAt: c.createdAt,
      authorEmail: c.author.email,
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (error) {
    console.error("❌ Comment GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
