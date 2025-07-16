import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

// Define custom Cloudinary upload response type
interface CloudinaryUploadResponse {
  secure_url: string;
}

// Zod schema for validation
const updateSchema = z.object({
  title: z.string().min(3).max(100),
  category: z.string().min(3).max(50),
  content: z.string().min(10),
});

// GET: Fetch article by ID
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // Await the params

    const article = await prisma.articles.findUnique({
      where: { id },
      include: {
        author: true,
        comments: {
          include: {
            author: true,
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("❌ GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH: Update article
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params; // Await the params

    const formData = await req.formData();
    const title = formData.get("title")?.toString() || "";
    const category = formData.get("category")?.toString() || "";
    const content = formData.get("content")?.toString() || "";
    const imageFile = formData.get("featuredImage") as File | null;

    const validation = updateSchema.safeParse({ title, category, content });
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existingArticle = await prisma.articles.findUnique({
      where: { id },
      select: {
        author: { select: { clerkId: true } },
      },
    });

    if (!existingArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    if (existingArticle.author.clerkId !== userId) {
      return NextResponse.json({ error: "Forbidden: You do not own this article" }, { status: 403 });
    }

    let imageUrl: string | undefined;

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      const upload = await new Promise<CloudinaryUploadResponse>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: "articles",
            resource_type: "auto",
            quality: "auto",
            fetch_format: "auto",
          },
          (err, result) => {
            if (err || !result) return reject(err || new Error("Upload failed"));
            resolve(result as CloudinaryUploadResponse);
          }
        ).end(buffer);
      });

      imageUrl = upload.secure_url;
    }

    const updated = await prisma.articles.update({
      where: { id },
      data: {
        title: validation.data.title,
        category: validation.data.category,
        content: validation.data.content,
        featuredImage: imageUrl ?? undefined,
      },
    });

    return NextResponse.json({
      success: true,
      article: updated,
      message: "Article updated successfully.",
    });
  } catch (error) {
    console.error("❌ Update Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}




export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Authenticate user
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Check if the article exists and include author information
    const article = await prisma.articles.findUnique({
      where: { id },
      select: {
        id: true,
        author: {
          select: {
            clerkId: true,
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    // Verify that the authenticated user is the article's author
    if (article.author?.clerkId !== userId) {
      return NextResponse.json(
        { error: 'Forbidden: You can only delete your own articles' },
        { status: 403 }
      );
    }

    // Use transaction to delete likes, comments, and article atomically
    await prisma.$transaction(async (tx) => {
      // Delete all likes associated with the article
      await tx.like.deleteMany({
        where: { articleId: id },
      });

      // Delete all comments associated with the article
      await tx.comment.deleteMany({
        where: { articleId: id },
      });

      // Delete the article
      await tx.articles.delete({
        where: { id },
      });
    });

    return NextResponse.json({
      success: true,
      message: 'Article and all related comments and likes deleted successfully',
    });
  } catch (error) {
    console.error('❌ Delete error:', error);

    // Handle specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes('Foreign key constraint')) {
        return NextResponse.json(
          { error: 'Cannot delete article due to related data constraints' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}