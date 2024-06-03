// lib/prisma.ts

import { PrismaClient } from '@prisma/client';

declare global {
  // Allow the global `prisma` to survive module reloads in development mode
  // without causing multiple Prisma Client instances to be created.
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
