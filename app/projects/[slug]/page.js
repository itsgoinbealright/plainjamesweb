// app/projects/[slug]/page.jsx

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProject, projectsData } from "@/lib/projectsData";
import CaseStudyInfo from "@/components/CaseStudyInfo";
import CaseStudyScroller from "@/components/CaseStudyScroller";

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  // Format images for the scroller
  const scrollerImages = project.images.map((src, index) => ({
    src,
    alt: `${project.title} - Image ${index + 1}`,
  }));

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

      {/* Case Study Info - Credits & Description */}
      <CaseStudyInfo
        type={project.type}
        architect={project.architect}
        engineer={project.engineer}
        trades={project.trades}
        photography={project.photography}
        description={project.description}
      />

      {/* Case Study Scroller - Image Gallery */}
      <section className="relative bg-white z-10">
        <CaseStudyScroller images={scrollerImages} />
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