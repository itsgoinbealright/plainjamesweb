import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProject, projectsData } from "@/lib/projectsData";

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Hero Section with Fixed Image and Navbar */}
      <section className="relative w-full h-[75vh] md:h-screen overflow-hidden">
        {/* Hero Image - Fixed Position */}
        <div className="fixed inset-0 w-full h-[75vh] md:h-screen -z-10">
          <Image
            src={project.mainImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Navbar */}
        <Navbar theme="dark" />
      </section>

      {/* About the Project - Glides Up Over Image */}
      <section className="relative py-24 px-5 md:px-10 bg-white z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-forest-green mb-8">
            About the Project
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {project.title}
          </h3>
          <p className="text-xl text-gray-600 mb-8">{project.subtitle}</p>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-gray-800">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Additional Project Images */}
      <section className="relative py-24 px-5 md:px-10 bg-white z-10">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            {project.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`${project.title} - Image ${index + 1}`}
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug: slug,
  }));
}
