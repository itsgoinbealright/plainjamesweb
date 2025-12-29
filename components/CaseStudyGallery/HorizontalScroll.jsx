"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function HorizontalScroll({ images }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      const diff = targetRef.current - currentRef.current;
      currentRef.current += diff * 0.03;
      setTranslateX(currentRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const rect = container.getBoundingClientRect();
      const maxTranslate = track.scrollWidth - window.innerWidth;
      const scrollable = container.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);

      // Stop at 85% scroll to let animation catch up
      const progress = Math.min(1, scrolled / (scrollable * 0.85));

      targetRef.current = progress * maxTranslate;
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[700vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div
          ref={trackRef}
          className="flex gap-5 pr-[5em] pl-[25vw]"
          style={{ transform: `translateX(-${translateX}px)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col items-center pt-8"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={2400}
                height={1600}
                className="h-[75vh] w-auto object-contain"
                sizes="100vw"
                quality={100}
                priority={index < 2}
              />
              {image.caption && (
                <p className="mt-4 text-sm text-black">{image.caption}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
