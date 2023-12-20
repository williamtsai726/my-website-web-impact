"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  if (pathname != "/studio") {
    return (
      <nav className="border-b sticky top-0 bg-primary-900 text-primary-100 border-primary-800 z-10">
        <div className="h-14 max-w-7xl p-4 mx-auto flex items-center justify-between">
          <Link href="/" className="font-medium text-lg md:hover:underline">
            My Website
          </Link>
          <ul className="hidden md:flex items-center justify-end space-x-4 text-sm font-medium">
            <li className="md:hover:underline">
              <Link href="/blog">Blog</Link>
            </li>
            <li className="md:hover:underline">
              <Link href="/photos">Photos</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}