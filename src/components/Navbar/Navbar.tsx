"use client"

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-blue-200 px-[6rem] py-4">
            <ul className="flex justify-between  text-xl font-bold">
                <li><Link href="/">Home</Link></li>
                <li className="relative">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none mr-45rem">
                        Menu
                    </button>
                    {menuOpen && (
                        <ul className="absolute left-0 mt-2 w-32">
                            <li className="bg-blue-800 p-2 text-sm"><Link href="/api/auth/signin">Sign In</Link></li>
                            <li className="bg-blue-800 p-2 text-sm"><Link href="/api/auth/signout">Sign Out</Link></li>
                            <li className="bg-blue-800 p-2 text-sm"><Link href="/dashboard">DASHBOARD</Link></li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
}
