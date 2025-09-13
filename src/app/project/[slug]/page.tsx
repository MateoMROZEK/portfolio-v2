// app/project/[slug]/page.tsx
import type { Metadata, ResolvingMetadata } from "next";
import projectsData from "public/api.json";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardBody, CardFooter, Divider, Chip, Button } from "@heroui/react";
import ProjectGallery from "@/components/project/ProjectGallery";

type ChangelogItem = { text: string };
type Changelog = { name: string; date?: string; list: ChangelogItem[] };
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
  columns?: number;
  type_project?: string;
};

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = (projectsData.projects as Project[]).find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project — z3k.dev",
      description: "Project not found",
    };
  }

  const description = project.lite_description || project.description || `Project ${project.name}`;
  const image = project.image ?? "/logo.png";

  return {
    title: `Mateo M. - ${project.name}`,
    description,
    openGraph: {
      title: `Mateo M. - ${project.name}`,
      description,
      images: [{ url: image, alt: project.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Mateo M. - ${project.name}`,
      description,
      images: [image],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const allProjects = projectsData.projects as Project[];
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // helper: map tech slug -> nice name if available in global technologies list
  const techMap = new Map(
    (projectsData.technologies || []).map((t: any) => [t.slug?.toLowerCase(), t.name])
  );

  const otherProjects = allProjects.filter((p) => p.slug !== project!.slug).slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* HERO */}
      <section className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-2xl">
        <div className="relative w-full h-full shadow-2xl">
          <Image
            src={project!.image ?? "/logo.png"}
            alt={project!.name}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            priority
          />
          {/* overlay fondu comme OGHub */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
            <div className="max-w-3xl">
              <p className="inline-block text-sm px-3 py-1 rounded-full bg-mateo-unique/70 text-mateo-primary font-medium mb-3">
                {project!.type_project ?? "Project"}
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-sm">
                {project!.name}
              </h1>
              <p className="mt-3 text-sm text-white/80 max-w-2xl">
                {project!.lite_description ?? project!.description ?? "-"}
              </p>
              <div className="mt-4 flex flex-wrap gap-3 items-center">
                <Chip size="sm" className="!bg-mateo-primary !text-white">
                  {project!.release_type ?? (project!.released ? "Published" : "Draft")}
                </Chip>
                {project!.release_date && (
                  <Chip size="sm" className="!bg-mateo-unique/80 !text-white">
                    {project!.release_date}
                  </Chip>
                )}
                {project!.domain_url && project!.domain_url.startsWith("http") && (
                  <Button
                    as={Link}
                    href={project!.domain_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                    radius="md"
                    className="ml-2"
                  >
                    Visit project
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN + SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: description, changelog, gallery */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description card */}
          <Card className="bg-mateo-unique/80">
            <CardBody>
              <h2 className="text-2xl font-semibold text-mateo-primary mb-3">About the project</h2>
              <p
                className="text-text-primary leading-relaxed prose prose-invert max-w-none"
                // description may contain HTML in original JSON - render as HTML
                dangerouslySetInnerHTML={{
                  __html: project!.description || project!.lite_description || "",
                }}
              />
            </CardBody>
          </Card>

          {/* Changelog timeline */}
          {project!.changelog && project!.changelog.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold text-mateo-primary mb-4">Changelog</h3>
              <ol className="relative border-l border-mateo-primary/40 pl-6">
                {project!.changelog!.map((cl, i) => (
                  <li key={i} className="mb-8 relative">
                    <span className="absolute -left-9 top-2 w-5 h-5 rounded-full bg-mateo-primary border border-mateo-secondary"></span>
                    <div className="mb-1 text-sm text-text-primary/70">{cl.date ?? ""}</div>
                    <h4 className="text-lg font-semibold text-text-primary">{cl.name}</h4>
                    <ul className="mt-2 space-y-1 text-text-primary/90">
                      {cl.list.map((li, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="mt-0.5 text-mateo-primary">•</span>
                          <span dangerouslySetInnerHTML={{ __html: li.text }} />
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Gallery */}
          {project!.other_images && project!.other_images.length > 0 && (
            <ProjectGallery images={project!.other_images} projectName={project!.name} />
          )}
        </div>

        {/* Right: meta, technologies, categories */}
        <aside className="space-y-6">
          <Card className="p-4 bg-mateo-secondary/90">
            <CardBody>
              <h4 className="text-lg font-semibold text-white mb-2">Quick info</h4>
              <div className="flex flex-col gap-2 text-white/90">
                <div>
                  <strong>Type:</strong> {project!.type_project ?? "-"}
                </div>
                <div>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-semibold ${project!.released ? "text-green-400" : "text-amber-400"}`}
                  >
                    {project!.released ? "Released" : (project!.release_type ?? "Draft")}
                  </span>
                </div>
                {project!.release_date && (
                  <div>
                    <strong>Released:</strong> {project!.release_date}
                  </div>
                )}
                {project!.domain_url && (
                  <div className="mt-3">
                    {project!.domain_url.startsWith("http") ? (
                      <Button as={Link} href={project!.domain_url} target="_blank" size="sm">
                        Open website
                      </Button>
                    ) : (
                      <div className="text-sm text-text-primary/80">
                        Info: {project!.domain_url}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

          <Card className="p-4 bg-mateo-unique/70">
            <CardBody>
              <h4 className="text-lg font-semibold text-mateo-primary mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {(project!.technologie || []).map((t, i) => {
                  const name = techMap.get((t || "").toLowerCase()) || t;
                  return (
                    <Chip key={i} size="sm" className="!bg-[#111] !text-white">
                      {String(name)}
                    </Chip>
                  );
                })}
              </div>
            </CardBody>
          </Card>

          <Card className="p-4 bg-mateo-unique/70">
            <CardBody>
              <h4 className="text-lg font-semibold text-mateo-primary mb-3">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {(project!.categorie || []).map((c, i) => (
                  <Chip key={i} size="sm" className="bg-mateo-secondary !text-white">
                    {c.toUpperCase()}
                  </Chip>
                ))}
              </div>
            </CardBody>
          </Card>
        </aside>
      </div>
    </div>
  );
}
