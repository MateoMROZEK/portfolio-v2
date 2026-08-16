import type { Metadata } from "next";
import projectsData from "public/api.json";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project/ProjectDetail";

type Changelog = { name: string; date?: string; list: string[] };
type Project = {
  name: string;
  slug: string;
  image?: string;
  other_images?: string[];
  released: boolean;
  domain_url?: string;
  release_type?: string;
  release_date?: string;
  lite_description?: string;
  description?: string;
  categorie?: string[];
  changelog?: Changelog[];
  technologie?: string[];
  type_project?: string;
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = (projectsData.projects as Project[]).find((p) => p.slug === slug);

  if (!project) {
    return { title: "Projet — Mateo M.", description: "Projet introuvable" };
  }

  const description = project.lite_description ?? project.description ?? `Projet ${project.name}`;
  const image = project.image ?? "/logo.png";

  return {
    title: `Mateo M. — ${project.name}`,
    description,
    openGraph: {
      title: `Mateo M. — ${project.name}`,
      description,
      images: [{ url: image, alt: project.name }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = (projectsData.projects as Project[]).find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} technologies={projectsData.technologies} />;
}
