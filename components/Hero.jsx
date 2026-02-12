"use client";

import Navbar from "./Navbar";

export default function Hero() {
  return (
    <section className="relative w-full h-[75vh] md:h-screen overflow-hidden">
      {/* Video Background - Fixed Position */}
      <div className="fixed inset-0 w-full h-screen -z-10">
        {/* Mobile: Portrait video (default, up to 1200px) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="[@media(width>=1200px)]:hidden absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Desktop: Rotated 90° for landscape display (1200px+) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="hidden [@media(width>=1200px)]:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 w-[100vh] h-[100vw] object-cover"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Navbar */}
      <Navbar theme="dark" />
    </section>
  );
}
