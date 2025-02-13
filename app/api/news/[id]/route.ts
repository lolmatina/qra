/* eslint-disable no-console */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single article
export async function GET(
  _request: Request, 
  context: { params: Promise<any> }
) {
  const params = await context.params;
  const { id } = params;
  try {
    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Failed to fetch article:', error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

// UPDATE article
export async function PUT(
  request: Request, 
  context: { params: Promise<any> }
) {
  const params = await context.params;
  const { id } = params;
  try {
    const article = await request.json();

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        title: article.title,
        summary: article.summary,
        content: article.content,
        preview_image: article.preview_image,
      },
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error('Failed to update article:', error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

// DELETE article
export async function DELETE(
  _request: Request, 
  context: { params: Promise<any> }
) {
  const params = await context.params;
  const { id } = params;
  try {
    await prisma.article.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Failed to delete article:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
