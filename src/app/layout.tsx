import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import Navbar from "@/components/Navbar/Navbar";
import { getServerSession } from "next-auth"
import { options } from "./api/auth/[...nextauth]/option"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keja App",
  description: "Real Estate  app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(options)
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        <Navbar user={session?.user} pagetype="Home" />
          <main className="flex justify-center items-start p-6 min-h-screen">
            {children}
          </main>
        </AuthProvider>
       
        </body>
    </html>
  );
}
