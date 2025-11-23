import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({
  image,
  hoverImage,
  title,
  subtitle,
  accentTitle = false,
  slug,
}) {
  if (!image) return null;

  const href = slug ? `/projects/${slug}` : "/projects";

  return (
    <Link href={href} className="block">
      <div className="group relative overflow-hidden mb-4">
        {/* Base Image */}
        <Image
          src={image}
          alt={title || "Project image"}
          width={800}
          height={533}
          className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover Image */}
        {hoverImage && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Image
              src={hoverImage}
              alt={`${title} - alternate view`}
              width={800}
              height={533}
              className="w-full h-auto"
            />
          </div>
        )}
      </div>

      <h3
        className={`text-lg font-bold mb-2 ${
          accentTitle ? "text-forest-green" : "text-black"
        }`}
      >
        {title}
      </h3>
      <p className="text-gray-500">{subtitle}</p>
    </Link>
  );
}
