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
export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { date: 'desc' },
      select: {
        id: true,
        title: true,
        summary: true,
        date: true,
      },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
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
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
} 