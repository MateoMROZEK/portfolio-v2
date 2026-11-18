import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project/ProjectDetail";
import { getOrgRepos } from "@/lib/github";
import { TECHNOLOGIES, getChapters, getProject } from "@/lib/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

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
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <ProjectDetail
      project={project}
      chapters={getChapters(project)}
      technologies={TECHNOLOGIES}
      repos={project.github_org ? await getOrgRepos(project.github_org) : []}
    />
  );
}
