// components/MaterialCarousel.jsx
"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const formatType = (type) => {
  if (!type || type.length === 0) return null;
  return type.map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" & ");
};

export default function MaterialCarousel({
  items = [],
  title,
  showType = false,
  size = "default",
}) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScroll);
      return () => ref.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = size === "small" ? 200 : 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  if (items.length === 0) return null;

  const itemWidth = size === "small" ? "w-32 md:w-40" : "w-56 md:w-64";

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-bold tracking-tight">{title}</h4>
      </div>

      <div className="relative group">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Scroll left"
          >
            ←
          </button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Scroll right"
          >
            →
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex-shrink-0 snap-start ${itemWidth}`}
            >
              <div className="aspect-square relative bg-gray-100 mb-2">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h5 className="font-medium tracking-tight text-sm">
                {item.name}
              </h5>
              {showType && item.type && (
                <p className="text-xs text-gray-400 tracking-tight">
                  {formatType(item.type)}
                </p>
              )}
              {item.description && (
                <p className="text-xs text-gray-500 tracking-tight leading-snug mt-1">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
