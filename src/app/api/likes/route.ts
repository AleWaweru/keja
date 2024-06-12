import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return createLike(req, res);
  } else if (req.method === 'DELETE') {
    return deleteLike(req, res);
  } else {
    res.setHeader('Allow', ['POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function createLike(req: NextApiRequest, res: NextApiResponse) {
  const { postId, userId } = req.body;

  try {
    const like = await prisma.like.create({
      data: {
        postId,
        userId,
      },
    });

    res.status(201).json(like);
  } catch (error) {
    console.error('Error creating like:', error);
    res.status(500).json({ error: 'Error creating like' });
  }
}

async function deleteLike(req: NextApiRequest, res: NextApiResponse) {
  const { postId, userId } = req.body;

  try {
    await prisma.like.deleteMany({
      where: {
        postId,
        userId,
      },
    });

    res.status(200).json({ message: 'Like removed' });
  } catch (error) {
    console.error('Error deleting like:', error);
    res.status(500).json({ error: 'Error deleting like' });
  }
}
