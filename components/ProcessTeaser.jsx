import Image from "next/image";
import Link from "next/link";

export default function ProcessTeaser() {
  return (
    <>
      {/* White space break */}
      <div className="h-12 bg-white" />

      <section className="bg-white pt-[20vh]">
        {/* Full-width image */}
        <div className="w-full">
          <Image
            src="/images/site.jpg"
            alt="Collaborative team"
            width={1920}
            height={1080}
            className="w-full h-auto"
          />
        </div>

        {/* Content section */}
        <div className="p-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Collaborative Craftsmen
          </h2>
          <p className="text-xl md:text-2xl text-black mb-8 leading-relaxed">
            We believe successful projects are collaborative and built on open
            communication.
          </p>
          <Link
            href="/process"
            className="text-lg font-medium text-black hover:text-forest-green transition-colors"
          >
            See Our Process
          </Link>
        </div>
      </section>
    </>
  );
}
