/* eslint-disable no-console */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Types
export interface NewsItem {
  id: number;
  title: string;
  date: string;
  summary: string;
  preview_image: string;
}

// GET all articles
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '4', 10);
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalArticles = await prisma.article.count();
    const totalPages = Math.ceil(totalArticles / limit);

    const articles = await prisma.article.findMany({
      orderBy: { date: 'desc' },
      skip,
      take: limit,
      select: {
        id: true,
        title: true,
        summary: true,
        date: true,
        preview_image: true
      },
    });

    if (!articles) {
      return NextResponse.json({ items: [], pagination: { totalPages: 0 } });
    }

    return NextResponse.json({
      items: articles,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalArticles,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const article = await request.json();

    const newArticle = await prisma.article.create({
      data: {
        title: article.title,
        summary: article.summary,
        content: article.content,
        preview_image: article.preview_image,
        date: new Date(article.date),
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error('Failed to create article:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
