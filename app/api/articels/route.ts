// import { NextResponse } from "next/server";
// import { z } from "zod";
// import { prisma } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import cloudinary from "@/lib/cloudinary";

// const createArticleSchema = z.object({
//   title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters"),
//   category: z.string().min(3, "Category must be at least 3 characters").max(50, "Category must be less than 50 characters"),
//   content: z.string().min(10, "Content must be at least 10 characters"),
// });

// export async function POST(req: Request) {
//   try {

//     const formData = await req.formData();

//     const title = formData.get("title")?.toString() || "";
//     const category = formData.get("category")?.toString() || "";
//     const content = formData.get("content")?.toString() || "";
//     // const hasImage = !!formData.get("featuredImage");

//     // const preview = content.substring(0, 100) + "...";

//     const result = createArticleSchema.safeParse({
//       title,
//       category,
//       content,
//     });


//     if (!result.success) {
//       console.error("❌ Validation failed:", result.error.flatten().fieldErrors);
//       return NextResponse.json(
//         {
//           error: "Validation failed",
//           issues: result.error.flatten().fieldErrors,
//         },
//         { status: 400 }
//       );
//     }

//     // Check authentication
//  // Check authentication
// const { userId } = await auth();  // ✅ FIXED
// if (!userId) {
//   console.error("❌ User not authenticated");
//   return NextResponse.json(
//     { error: "You must be logged in to create an article." },
//     { status: 401 }
//   );
// }



//     // Find user in database
//     const existingUser = await prisma.user.findUnique({
//       where: { clerkId: userId },
//     });

//     if (!existingUser) {
//       console.error("❌ User not found in database:", userId);
//       return NextResponse.json(
//         { error: "User not found. Please make sure your account is properly set up." },
//         { status: 404 }
//       );
//     }


//     // Handle image upload
//     let imageUrl: string | null = null;
//     const imageFile = formData.get("featuredImage") as File | null;

//     if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
//       try {
//         const arrayBuffer = await imageFile.arrayBuffer();
//         const buffer = Buffer.from(arrayBuffer);

//         // Upload to Cloudinary
//         const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
//           cloudinary.uploader
//             .upload_stream(
//               {
//                 folder: "articles",
//                 resource_type: "auto",
//                 quality: "auto",
//                 fetch_format: "auto"
//               },
//               (error, result) => {
//                 if (error || !result) {
//                   return reject(error || new Error("Upload failed"));
//                 }
//                 resolve(result as any);
//               }
//             )
//             .end(buffer);
//         });

//         imageUrl = uploadResult.secure_url;
//         console.log("✅ Image uploaded successfully:", imageUrl);
//       } catch (uploadError) {
//         console.error("❌ Image upload failed:", uploadError);
//         return NextResponse.json(
//           { error: "Failed to upload image. Please try again." },
//           { status: 500 }
//         );
//       }
//     }

//     // Create the article
//     const article = await prisma.articles.create({
//       data: {
//         title: result.data.title,
//         category: result.data.category,
//         content: result.data.content,
//         authorId: existingUser.id,
//         featuredImage: imageUrl || null,

//       },
//       include: {
//         author: {
//           select: {
//             id: true,
//             name: true,
//             email: true,
//           },
//         },
//       },
//     });






//     return NextResponse.json(
//       {
//         success: true,
//         article: {
//           id: article.id,
//           title: article.title,
//           category: article.category,
//           content: article.content,
//           featuredImage: article.featuredImage,
//           createdAt: article.createdAt,
//           author: article.author,
//         },
//         message: "Article created successfully!"
//       },
//       { status: 201 }
//     );

//   } catch (error) {
//     console.error("❌ Article creation error:", error);

//     // Handle specific Prisma errors
//     if (error instanceof Error) {
//       if (error.message.includes("Unique constraint")) {
//         return NextResponse.json(
//           { error: "An article with this title already exists." },
//           { status: 409 }
//         );
//       }

//       if (error.message.includes("Foreign key constraint")) {
//         return NextResponse.json(
//           { error: "Invalid user reference. Please try logging out and back in." },
//           { status: 400 }
//         );
//       }
//     }

//     return NextResponse.json(
//       {
//         error: "Internal server error. Please try again later.",

//       },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import cloudinary from "@/lib/cloudinary";

// Define custom Cloudinary upload response type
interface CloudinaryUploadResponse {
  secure_url: string;
}

const createArticleSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters"),
  category: z.string().min(3, "Category must be at least 3 characters").max(50, "Category must be less than 50 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

// Helper function to retry database operations
async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Ensure connection is active before operation
      await prisma.$connect();
      return await operation();
    } catch (error) {
      lastError = error as Error;
      console.warn(`Database operation failed (attempt ${attempt}/${maxRetries}):`, error);
      
      // Check if it's a connection error
      if (error && typeof error === 'object' && 'code' in error) {
        const prismaError = error;
        if (prismaError.code === 'P1001' || prismaError.code === 'P1017') {
          // Connection error - wait and retry
          if (attempt < maxRetries) {
            console.log(`Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2; // Exponential backoff
            continue;
          }
        }
      }
      
      // If not a connection error or max retries reached, throw
      if (attempt === maxRetries) {
        throw lastError;
      }
    }
  }
  
  throw lastError!;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title")?.toString() || "";
    const category = formData.get("category")?.toString() || "";
    const content = formData.get("content")?.toString() || "";

    const result = createArticleSchema.safeParse({
      title,
      category,
      content,
    });

    if (!result.success) {
      console.error("❌ Validation failed:", result.error.flatten().fieldErrors);
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      console.error("❌ User not authenticated");
      return NextResponse.json(
        { error: "You must be logged in to create an article." },
        { status: 401 }
      );
    }

    // Find user in database with retry logic
    const existingUser = await retryOperation(async () => {
      return await prisma.user.findUnique({
        where: { clerkId: userId },
      });
    });

    if (!existingUser) {
      console.error("❌ User not found in database:", userId);
      return NextResponse.json(
        { error: "User not found. Please make sure your account is properly set up." },
        { status: 404 }
      );
    }

    // Handle image upload
    let imageUrl: string | null = null;
    const imageFile = formData.get("featuredImage") as File | null;

    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
      try {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary
        const uploadResult = await new Promise<CloudinaryUploadResponse>((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "articles",
                resource_type: "auto",
                quality: "auto",
                fetch_format: "auto",
              },
              (error, result) => {
                if (error || !result) {
                  return reject(error || new Error("Upload failed"));
                }
                resolve(result as CloudinaryUploadResponse);
              }
            )
            .end(buffer);
        });

        imageUrl = uploadResult.secure_url;
        console.log("✅ Image uploaded successfully:", imageUrl);
      } catch (uploadError) {
        console.error("❌ Image upload failed:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload image. Please try again." },
          { status: 500 }
        );
      }
    }

    // Create the article with retry logic
    const article = await retryOperation(async () => {
      return await prisma.articles.create({
        data: {
          title: result.data.title,
          category: result.data.category,
          content: result.data.content,
          authorId: existingUser.id,
          featuredImage: imageUrl || null,
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    });

    return NextResponse.json(
      {
        success: true,
        article: {
          id: article.id,
          title: article.title,
          category: article.category,
          content: article.content,
          featuredImage: article.featuredImage,
          createdAt: article.createdAt,
          author: article.author,
        },
        message: "Article created successfully!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Article creation error:", error);

    // Handle specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        return NextResponse.json(
          { error: "An article with this title already exists." },
          { status: 409 }
        );
      }

      if (error.message.includes("Foreign key constraint")) {
        return NextResponse.json(
          { error: "Invalid user reference. Please try logging out and back in." },
          { status: 400 }
        );
      }
    }

    // Handle connection errors specifically
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error ;
      if (prismaError.code === 'P1001') {
        return NextResponse.json(
          { error: "Database connection failed. Please try again." },
          { status: 503 }
        );
      }
      if (prismaError.code === 'P1017') {
        return NextResponse.json(
          { error: "Database connection was lost. Please try again." },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      {
        error: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  } finally {
    // Ensure connection is closed
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.warn("Warning: Failed to disconnect from database:", disconnectError);
    }
  }
}