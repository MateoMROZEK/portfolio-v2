import type { Metadata } from "next";
import api from "public/api.json";
import { ProjectsGrid } from "@/components/project/ProjectsGrid";

export const metadata: Metadata = {
  title: "Mateo M. — Projets",
  description: "Découvrez les projets réalisés par Mateo M., développeur et informaticien.",
};

export default function ProjectsPage() {
  return <ProjectsGrid projects={api.projects} />;
}
