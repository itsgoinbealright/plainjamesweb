"use client";

import MobileGrid from "./MobileGrid";
import HorizontalScroll from "./HorizontalScroll";

export default function CaseStudyGallery({ images = [] }) {
  if (images.length === 0) return null;

  const formattedImages = images.map((img, index) => ({
    src: typeof img === "string" ? img : img.src,
    alt:
      typeof img === "string"
        ? `Image ${index + 1}`
        : img.alt || `Image ${index + 1}`,
    width: typeof img === "string" ? "full" : img.width || "full",
    caption: typeof img === "string" ? "" : img.caption || "",
  }));

  return (
    <>
      <div className="lg:hidden px-5 md:px-5 pb-7">
        <MobileGrid images={formattedImages} />
      </div>
      <div className="hidden lg:block">
        <HorizontalScroll images={formattedImages} />
      </div>
    </>
  );
}
