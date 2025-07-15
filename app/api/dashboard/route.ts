// app/api/dashboard/route.ts
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    // Find the user by Clerk ID
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Get article count for that user
    const articleCount = await prisma.articles.count({
      where: { authorId: user.id },
    });

    // Get comment count on that user's articles
    const commentCount = await prisma.comment.count({
      where: {
        article: {
          authorId: user.id,
        },
      },
    });

    return new Response(
      JSON.stringify({
        articleCount,
        commentCount,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Dashboard error:", err);
    return new Response(JSON.stringify({ error: "Server Error" }), { status: 500 });
  }
}
