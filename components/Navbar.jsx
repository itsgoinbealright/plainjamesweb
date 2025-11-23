"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar({ theme = "dark" }) {
  const pathname = usePathname();

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
      className={`absolute top-6 left-6 right-6 md:top-5 md:left-5 md:right-5 z-50 ${textColor}`}
    >
      <div className="flex justify-between items-center lg:items-start">
        {/* Mobile/Tablet: Logo on Left */}
        <Link href="/" className="relative lg:hidden w-[50%]">
          <Image
            src="/logo.svg"
            alt="Plain James"
            width={350}
            height={58}
            className={`transition-all duration-300 ${logoFilter} w-full h-auto`}
            priority
          />
        </Link>

        {/* Mobile/Tablet: Shapes on Right */}
        <div className="flex gap-[2vw] lg:hidden items-center">
          {navLinks.map((link, index) => {
            const shapeColor = isActive(link.path)
              ? "#2d5016"
              : theme === "dark"
              ? "#ffffff"
              : "#000000";

            return (
              <Link
                key={link.path}
                href={link.disabled ? "#" : link.path}
                className={`relative w-[10vw] h-[10vw] transition-all duration-300 ${
                  link.disabled ? "opacity-30 cursor-not-allowed" : ""
                } ${isActive(link.path) ? "scale-110" : ""}`}
                onClick={(e) => link.disabled && e.preventDefault()}
                aria-label={link.name}
              >
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  {index === 0 && (
                    <rect
                      x="4"
                      y="4"
                      width="18"
                      height="18"
                      fill={shapeColor}
                      className="transition-all duration-300 hover:fill-[#2d5016]"
                    />
                  )}
                  {index === 1 && (
                    <polygon
                      points="12,2 22,22 2,22"
                      fill={shapeColor}
                      className="transition-all duration-300 hover:fill-[#2d5016]"
                    />
                  )}
                  {index === 2 && (
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill={shapeColor}
                      className="transition-all duration-300 hover:fill-[#2d5016]"
                    />
                  )}
                </svg>
              </Link>
            );
          })}
        </div>

        {/* Desktop: Nav Links on Left */}
        <div className="hidden lg:flex flex-col gap-1 mt-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.disabled ? "#" : link.path}
              className={`
                text-lg font-bold leading-tight tracking-tighter
                ${link.disabled ? "opacity-30 cursor-not-allowed" : ""}
                hover:text-forest-green transition-colors duration-300
              `}
              onClick={(e) => link.disabled && e.preventDefault()}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop: Logo on Right */}
        <Link href="/" className="relative hidden lg:block">
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