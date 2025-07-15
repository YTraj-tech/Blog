import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('Handling GET request for /api/articles/top');
    const articles = await prisma.articles.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        content: true,
        category: true,
        featuredImage: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            email: true,
            imageUrl: true,
          },
        },
        comments: {
          select: { id: true },
        },
      },
    });

    const formattedArticles = articles.map((article) => ({
      ...article,
      author: {
        name: article.author.name || 'Unknown',
        email: article.author.email,
        imageUrl: article.author.imageUrl,
      },
    }));

    return NextResponse.json(
      { success: true, articles: formattedArticles },
      { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } }
    );
  } catch (error: unknown) {
    console.error('❌ Error fetching top articles:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}