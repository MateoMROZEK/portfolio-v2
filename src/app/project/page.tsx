import ProjectCard from "@/components/project/ProjectCard";
import type { Metadata } from "next";
import api from "public/api.json";

export const metadata: Metadata = {
  title: "Mateo M. - Projets",
  description: "Découvrez les projets réalisés par Mateo M., développeur et informaticien.",
};

export default function ProjectsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">My clients' projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {api.projects.map((project, idx) => (
          <ProjectCard
            key={idx}
            name={project.name}
            slug={project.slug}
            released={project.released}
            description={project.lite_description}
            release_type={project.release_type}
            categories={project.categorie}
            projectLink={project.domain_url ?? null}
          />
        ))}
      </div>
    </div>
  );
}
