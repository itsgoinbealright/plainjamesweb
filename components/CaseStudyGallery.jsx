'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

/**
 * CaseStudyGallery
 * 
 * Horizontal scroll gallery for case study pages.
 * 
 * Props:
 * - images: Array of { src, alt, caption } or strings
 * - mode: "story" | "static" (default: "story")
 */

export default function CaseStudyGallery({ images = [], mode = 'story' }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const imageCount = images.length;
  
  const entryHold = 30;
  const exitHold = 50;

  useEffect(() => {
    if (imageCount === 0) return;

    let rafId = null;
    let currentTranslate = 0;
    let targetTranslate = 0;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      currentTranslate = lerp(currentTranslate, targetTranslate, 0.1);

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${currentTranslate}vw)`;
      }

      if (Math.abs(currentTranslate - targetTranslate) > 0.01) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = null;
      }
    };

    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = container.offsetHeight;

      const inView = rect.top <= 0 && rect.bottom >= windowHeight;
      setIsInView(inView);

      const scrollableDistance = containerHeight - windowHeight;
      const scrolled = -rect.top;
      
      const entryHoldPx = (entryHold * windowHeight) / 100;
      const exitHoldPx = (exitHold * windowHeight) / 100;
      
      const scrollAfterEntry = Math.max(0, scrolled - entryHoldPx);
      const activeScrollDistance = scrollableDistance - entryHoldPx - exitHoldPx;
      const imageProgress = Math.max(0, Math.min(1, scrollAfterEntry / activeScrollDistance));
      
      const fullProgress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      setScrollProgress(fullProgress);

      const galleryWidth = imageCount * 100;
      targetTranslate = imageProgress * (galleryWidth - 100);

      const newIndex = Math.min(
        Math.floor(imageProgress * imageCount),
        imageCount - 1
      );
      setCurrentIndex(newIndex);

      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [imageCount, entryHold, exitHold]);

  const formattedImages = images.map((img, index) => ({
    src: typeof img === 'string' ? img : img.src,
    alt: typeof img === 'string' ? `Image ${index + 1}` : (img.alt || `Image ${index + 1}`),
    caption: typeof img === 'string' ? '' : (img.caption || ''),
  }));

  const totalHeight = (imageCount * 100) + entryHold + exitHold;

  if (imageCount === 0) return null;

  return (
    <>
      {/* Spacer before gallery */}
      <div className="h-[15vh] md:h-[20vh] bg-white" />
      
      {/* Isolation wrapper */}
      <div 
        style={{ 
          display: 'block', 
          position: 'relative',
          overflow: 'visible',
          flexShrink: 0,
          flexGrow: 0,
          flexBasis: 'auto',
        }}
      >
        {/* Scroll container */}
        <div
          ref={containerRef}
          className="bg-white z-10"
          style={{ 
            height: `${totalHeight}vh`,
            position: 'relative',
            display: 'block',
          }}
        >
          {/* Sticky element */}
          <div 
            style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Image Track - 88vh */}
            <div className="h-[88vh] overflow-hidden bg-white pt-8 md:pt-10 px-4 md:px-6 lg:px-8 pb-4">
              <div
                ref={trackRef}
                className="flex h-full will-change-transform gap-4 md:gap-6 lg:gap-8"
              >
                {formattedImages.map((image, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 h-full flex items-center justify-start w-[calc(100vw-3rem)] lg:w-[calc(100vw-4rem)]"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="max-h-full max-w-full w-auto h-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Caption Area - 12vh */}
            <div className="h-[12vh] px-5 md:px-10 lg:px-16 flex items-center bg-white">
              <div className="w-full max-w-[1400px] mx-auto">
                {mode === 'story' ? (
                  <StoryCaption
                    images={formattedImages}
                    currentIndex={currentIndex}
                    imageCount={imageCount}
                  />
                ) : (
                  <Counter
                    currentIndex={currentIndex}
                    imageCount={imageCount}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacer after gallery */}
      <div className="h-[15vh] md:h-[20vh] bg-white" />

      {/* Progress Bar */}
      <div
        className={`fixed bottom-0 left-0 w-full h-[2px] bg-stone-200/30 z-50 transition-opacity duration-300 ${
          isInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="h-full bg-stone-800 transition-[width] duration-75 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
    </>
  );
}


function StoryCaption({ images, currentIndex, imageCount }) {
  return (
    <div className="w-full flex justify-between items-start">
      <div className="flex gap-6 md:gap-12 flex-1">
        <span className="text-[13px] text-stone-400 tabular-nums pt-0.5">
          {String(currentIndex + 1).padStart(2, '0')}
        </span>

        <div className="flex-1 max-w-[520px] relative min-h-[60px]">
          {images.map((image, index) => (
            <p
              key={index}
              className={`text-[14px] md:text-[15px] leading-[1.7] text-stone-600 absolute top-0 left-0 transition-opacity duration-300 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {image.caption}
            </p>
          ))}
        </div>
      </div>

      <span className="text-[11px] text-stone-400 tabular-nums">
        {String(imageCount).padStart(2, '0')}
      </span>
    </div>
  );
}


function Counter({ currentIndex, imageCount }) {
  return (
    <div className="w-full flex justify-end items-center">
      <div className="flex items-baseline gap-1 tabular-nums text-stone-400">
        <span className="text-[13px]">
          {String(currentIndex + 1).padStart(2, '0')}
        </span>
        <span className="text-[11px]">/</span>
        <span className="text-[11px]">
          {String(imageCount).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}