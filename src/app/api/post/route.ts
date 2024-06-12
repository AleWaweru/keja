import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function POST (request: Request){
  
  const body = await request.json();
  const {title, description, imageUrl, location } = body

  const post = await prisma.post.create({
    data: {
      title,
      description,
      image: imageUrl,
      location,
    },
  });

  return NextResponse.json(post)
}

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

