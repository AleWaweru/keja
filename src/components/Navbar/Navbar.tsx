'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react'; 

type User = {
  id?: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
} | undefined;

type Props = {
  user: User;
  pagetype: string;
};

export default function Navbar({ user, pagetype }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const greeting = user?.name ? (
    <div className="font-bold text-xl text-black">
      Hello {user?.name}!
    </div>
  ) : null;

  const userImage = user?.image ? (
    <Image
      className="rounded-full"
      src={user?.image}
      width={30}
      height={30}
      alt={user?.name ?? "Profile Pic"}
      priority={true}
    />
  ) : null;

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="bg-blue-600 px-[6rem] py-4 sticky top-0 z-50">
      <ul className="flex justify-between items-center text-xl font-bold">
        <li><Link href="/">Comfort Home</Link></li>
        {user ? (
          <>
            <li className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
                Menu
              </button>
              {menuOpen && (
                <ul className="absolute left-0 mt-2 w-32 bg-blue-800">
                  <li className="p-2 text-sm"><button onClick={handleSignOut}>Sign Out</button></li>
                  <li className="p-2 text-sm"><Link href="/dashboard">Dashboard</Link></li>
                </ul>
              )}
            </li>
            <div className="flex items-center space-x-2">
              {greeting}
              {userImage}
            </div>
          </>
        ) : (
          <>
            <li><Link href="/api/auth/signin">Sign In</Link></li>
            <li><Link href="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
