import Image from "next/image";
import Link from "next/link";

export default function ImpactTeaser() {
  return (
    <section className="bg-white">
      {/* Full-width image */}
      <div className="w-full">
        <Image
          src="/images/impact-building.jpg"
          alt="Sustainable building"
          width={1920}
          height={1080}
          className="w-full h-auto"
        />
      </div>

      {/* Content section */}
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-forest-green mb-6">
          Architecture that lasts
        </h2>
        <p className="text-xl md:text-2xl text-black mb-8 leading-relaxed">
          We see a world where buildings are valued for their lasting impact,
          and craftsmanship and materials are respected.
        </p>
        <Link
          href="/impact"
          className="text-lg font-medium text-black hover:text-forest-green transition-colors"
        >
          See Our Impact
        </Link>
      </div>
    </section>
  );
}
