import api from "public/api.json";

export type Changelog = { name: string; date?: string; list: string[] };

export type Project = {
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
  /** Key of the project family in `groups` (Dev-Time, OGHub…): its entries become chapters. */
  group?: string;
};

export type Chapter = Pick<Project, "slug" | "name" | "release_date" | "released">;

/** A card of the projects list: a standalone project, or the latest chapter of a group. */
export type ProjectListItem = Project & { chapterCount: number };

/** api.json lists projects from oldest to newest. */
export const PROJECTS = api.projects as Project[];
/** `main`: the entry whose image, description and page represent the family (default: the latest one). */
type ProjectGroup = { name: string; main?: string };
const GROUPS = (api as { groups?: Record<string, ProjectGroup> }).groups ?? {};

export const TECHNOLOGIES = api.technologies;

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** Every entry of the project's group in chronological order, or [] for a standalone project. */
export function getChapters(project: Project): Chapter[] {
  if (!project.group) return [];
  return PROJECTS.filter((p) => p.group === project.group).map(
    ({ slug, name, release_date, released }) => ({
      slug,
      name,
      // api.json uses "" for an unknown date.
      release_date: release_date === "" ? undefined : release_date,
      released,
    })
  );
}

/**
 * One card per project family, placed where its latest entry sits in the timeline.
 * The card shows the family name with the content of its main entry.
 */
export function listProjects(projects: Project[] = PROJECTS): ProjectListItem[] {
  return projects.flatMap((project, index) => {
    if (!project.group) return [{ ...project, chapterCount: 1 }];
    const chapters = projects.filter((p) => p.group === project.group);
    const latest = chapters[chapters.length - 1]!;
    if (projects.lastIndexOf(latest) !== index) return [];
    const group = GROUPS[project.group];
    const main = chapters.find((p) => p.slug === group?.main) ?? latest;
    return [{ ...main, name: group?.name ?? main.name, chapterCount: chapters.length }];
  });
}
