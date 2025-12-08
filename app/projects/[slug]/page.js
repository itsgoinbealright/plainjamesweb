// app/projects/[slug]/page.jsx

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { getProject, projectsData } from "@/lib/projectsData";
import CaseStudyGallery from "@/components/CaseStudyGallery";
import CaseStudyInfo from "@/components/CaseStudyInfo";

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
     
      <Navbar theme="light" />
      
      {/* Spacer to match projects listing page */}
      <div className="h-[30vh] bg-white" />
      
      {/* Project Info after gallery */}
      <CaseStudyInfo project={project} />
      
      {/* Gallery first - let the work lead */}
      <CaseStudyGallery images={project.images} mode="story" />
      
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({ slug }));
}