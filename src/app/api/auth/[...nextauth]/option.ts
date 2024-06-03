import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";

const prisma = new PrismaClient();

type UserWithPassword = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  username: string | null;
  password: string | null;
};

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your-email@example.com" },
        username: { label: "Username", type: "text", placeholder: "your username" },
        password: { label: "Password", type: "password", placeholder: "your password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const username = credentials?.username as string;
        const password = credentials?.password as string;

        if (!email || !password) {
          throw new Error("Email and Password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            username: true,
            password: true, // Include the password in the query
          }
        }) as UserWithPassword | null;

        if (user) {
          // User exists, check password
          const isValid = await compare(password, user.password || "");
          if (!isValid) {
            throw new Error("Invalid password");
          }
          return { ...user, password: undefined }; // Remove password before returning user
        } else {
          if (!username) {
            throw new Error("Username is required for new users");
          }
          // User doesn't exist, create new user
          const hashedPassword = await hash(password, 10);
          const newUser = await prisma.user.create({
            data: {
              email,
              username,
              password: hashedPassword,
              name: username,
            },
          });
          return { ...newUser, password: undefined }; // Remove password before returning user
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};
