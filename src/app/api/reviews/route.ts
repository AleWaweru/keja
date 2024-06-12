import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  const { username, rating, comment, postId } = body;

  const review = await prisma.review.create({
    data: {
      username,
      rating,
      comment,
      postId,
    },
  });

  return NextResponse.json(review);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  if (!postId) {
    return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
  }

  const reviews = await prisma.review.findMany({
    where: { postId },
  });

  return NextResponse.json(reviews);
}
