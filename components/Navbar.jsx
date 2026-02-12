"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar({ theme = "dark" }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Projects", path: "/projects" },
    { name: "Process", path: "/process" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => pathname === path;
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const logoFilter = theme === "dark" ? "brightness-0 invert" : "brightness-0";
  const circleBg = theme === "dark" ? "bg-white" : "bg-black";

  return (
    <nav className={`absolute top-5 left-5 right-5 z-50 ${textColor}`}>
      <div className="flex justify-between items-center sm:items-start">
        {/* Mobile: Logo on Left */}
        <Link href="/" className="relative sm:hidden -ml-1 w-[70%]">
          <Image
            src="/logo.svg"
            alt="Plain James"
            width={400}
            height={66}
            className={`w-full h-auto transition-all duration-300 ${logoFilter}`}
            priority
          />
        </Link>

        {/* Mobile: Circle Button + Dropdown on Right */}
        <div className="sm:hidden relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-[8vw] h-[8vw] min-w-8 min-h-8 max-w-12 max-h-12 rounded-full ${circleBg} transition-colors`}
            aria-label="Menu"
          />

          {isOpen && (
            <div className="absolute top-full right-0 flex flex-col items-end gap-3 mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-bold tracking-tight whitespace-nowrap ${
                    isActive(link.path) ? "text-forest-green" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Desktop: Nav Links on Left */}
        <div className="hidden sm:flex flex-col gap-1 mt-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="text-lg font-bold leading-tight tracking-tighter hover:text-forest-green transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop: Logo on Right */}
        <Link href="/" className="relative hidden sm:block">
          <Image
            src="/logo.svg"
            alt="Plain James"
            width={600}
            height={80}
            className={`transition-all duration-300 ${logoFilter}`}
            priority
          />
        </Link>
      </div>
    </nav>
  );
}
