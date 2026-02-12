import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projectsData";

export default function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section className="p-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {projects.map((project) => (
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

      <div className="text-right">
        <Link
          href="/projects"
          className="text-xl font-bold tracking-tight text-black hover:text-forest-green transition-colors"
        >
          See All Projects
        </Link>
      </div>
    </section>
  );
}
