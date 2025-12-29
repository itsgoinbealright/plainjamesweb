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

  return (
    <nav
      className={`absolute top-6 left-6 right-6 sm:top-5 sm:left-5 sm:right-5 z-50 ${textColor}`}
    >
      <div className="flex justify-between items-start">
        {/* Mobile: Logo on Left */}
        <Link href="/" className="relative sm:hidden w-[75%]">
          <Image
            src="/logo.svg"
            alt="Plain James"
            width={350}
            height={58}
            className={`transition-all duration-300 ${logoFilter} w-full h-auto`}
            priority
          />
        </Link>

        {/* Mobile: Hamburger + Dropdown on Right */}
        <div className="sm:hidden flex flex-col items-end">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2"
            aria-label="Menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {isOpen && (
            <div className="flex flex-col items-end gap-2 mt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-bold tracking-tight ${
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
