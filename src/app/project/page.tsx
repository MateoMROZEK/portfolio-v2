import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/project/ProjectsGrid";
import { listProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Mateo M. — Projets",
  description: "Découvrez les projets réalisés par Mateo M., développeur et informaticien.",
};

export default function ProjectsPage() {
  return <ProjectsGrid projects={listProjects()} />;
}
