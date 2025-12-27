// components/CaseStudyGallery.jsx
"use client";

export default function CaseStudyGallery({ images = [] }) {
  if (images.length === 0) return null;

  const formattedImages = images.map((img, index) => ({
    src: typeof img === "string" ? img : img.src,
    alt:
      typeof img === "string"
        ? `Image ${index + 1}`
        : img.alt || `Image ${index + 1}`,
  }));

  return (
    <div className="px-4 md:px-6 lg:px-8 pb-7">
      <div className="flex flex-col gap-7">
        {formattedImages.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="w-full h-auto"
          />
        ))}
      </div>
    </div>
  );
}
