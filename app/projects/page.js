import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import { getAllProjects } from "@/lib/projectsData";

export default function ProjectsPage() {
  const allProjects = getAllProjects();

  return (
    <>
      <Navbar theme="light" />
      <div className="h-[30vh] bg-white" />
      <main className="flex-grow py-24 px-5 md:px-10 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="hidden md:block" /> {/* Empty first cell */}
          {allProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              image={project.mainImage}
              title={project.title}
              subtitle={project.subtitle}
              accentTitle={project.accentTitle}
              slug={project.slug}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
