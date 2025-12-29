import Image from "next/image";

const spanClasses = {
  half: "col-span-12 md:col-span-6",
  third: "col-span-12 md:col-span-4",
  quarter: "col-span-6 md:col-span-3",
  full: "col-span-12",
};

export default function MobileGrid({ images }) {
  return (
    <div className="grid grid-cols-12 gap-5">
      {images.map((image, index) => (
        <div
          key={index}
          className={spanClasses[image.width] || spanClasses.full}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={2400}
            height={1600}
            className="w-full h-auto"
            sizes="100vw"
            quality={100}
          />
        </div>
      ))}
    </div>
  );
}
