"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

export default function CaseStudyScroller({ images }) {
  const sectionRef = useRef(null);
  const scrollerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);

  useEffect(() => {
    const updateMaxTranslate = () => {
      if (scrollerRef.current) {
        const totalWidth = scrollerRef.current.scrollWidth;
        const containerWidth = window.innerWidth - 32; // Account for p-4 (16px * 2)
        setMaxTranslate(Math.max(0, totalWidth - containerWidth));
      }
    };

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate how far we've scrolled through the section
      const scrolled = windowHeight - rect.top;
      
      // First 100vh is the buffer (first image stationary)
      // After that, horizontal scroll begins
      const bufferZone = windowHeight;
      const adjustedScrolled = Math.max(0, scrolled - bufferZone);
      const adjustedTotal = sectionHeight - bufferZone;
      
      const progress = Math.max(0, Math.min(1, adjustedScrolled / adjustedTotal));
      setScrollProgress(progress);
    };

    updateMaxTranslate();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateMaxTranslate);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateMaxTranslate);
    };
  }, [images]);

  const translateX = scrollProgress * maxTranslate;

  // Add extra height for the buffer zone (1 extra 100vh for the stationary first image)
  const sectionHeight = (images.length + 1) * 100;

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-white" 
      style={{ height: `${sectionHeight}vh` }}
    >
      {/* Sticky container - locks viewport in place */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        <div className="p-4 h-full">
          {/* Images - horizontal scroll only */}
          <div className="h-full overflow-hidden">
            <div
              ref={scrollerRef}
              className="flex h-full gap-4 w-max"
              style={{ 
                transform: `translateX(-${translateX}px)`,
                willChange: 'transform'
              }}
            >
              {images.map((image, index) => (
                <div key={index} className="relative h-full w-auto flex-shrink-0">
                  <Image
                    src={image.src}
                    alt={image.alt || `Project image ${index + 1}`}
                    width={1600}
                    height={1200}
                    className="h-full w-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}