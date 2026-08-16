"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { buttonVariants } from "@heroui/react";
import { fadeUp } from "@/lib/motion";
import { useLanguage } from "@/context/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline, TimelineItem } from "@/components/ui/Timeline";
import { SkillChip } from "@/components/ui/SkillChip";
import { Card } from "@/components/ui/Card";
import { TechIcon } from "@/components/ui/TechIcon";
import { getTechDeviconClass } from "@/lib/technologies";
import { Lightbox } from "./Lightbox";

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
type Technology = { name: string; slug: string; icon: string };

export function ProjectDetail({
  project,
  technologies,
}: {
  project: Project;
  technologies: Technology[];
}) {
  const { t } = useLanguage();
  const techBySlug = new Map(technologies.map((tech) => [tech.slug?.toLowerCase(), tech]));

  return (
    <div className="space-y-12">
      <Link
        href="/project"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-soft hover:text-gold"
      >
        ← {t.projects.back}
      </Link>

      <section className="relative h-[360px] w-full overflow-hidden rounded-2xl border border-line md:h-[440px]">
        {project.image && (
          <Image src={project.image} alt={project.name} fill priority className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-x-0 bottom-0 p-6 md:p-8"
        >
          <p className="mb-2 inline-block rounded-full bg-gold px-3 py-1 text-[11px] font-semibold tracking-wide text-navy-950 uppercase">
            {project.type_project ?? "Project"}
          </p>
          <h1 className="max-w-3xl text-3xl leading-tight font-extrabold text-white md:text-4xl">
            {project.name}
          </h1>
          {project.lite_description && (
            <p className="mt-2 max-w-2xl text-sm text-white/80">{project.lite_description}</p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {project.release_date && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-[12px] text-white/90">
                {t.projects.releasedDate} {project.release_date}
              </span>
            )}
            {project.domain_url?.startsWith("http") && (
              <a
                href={project.domain_url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "primary", size: "sm" })}
              >
                {t.projects.visit}
              </a>
            )}
          </div>
        </motion.div>
      </section>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <SectionHeading className="mb-4">{t.projects.about}</SectionHeading>
            <div
              className="text-[14px] leading-relaxed text-ink-soft [&_a]:text-gold [&_strong]:text-navy-900"
              dangerouslySetInnerHTML={{
                __html: project.description ?? project.lite_description ?? "",
              }}
            />
          </motion.section>

          {project.changelog && project.changelog.length > 0 && (
            <section>
              <SectionHeading className="mb-4">{t.projects.changelog}</SectionHeading>
              <Timeline>
                {project.changelog.map((entry, i) => (
                  <TimelineItem
                    key={i}
                    title={entry.name}
                    dates={entry.date}
                    description={entry.list.join(" · ")}
                  />
                ))}
              </Timeline>
            </section>
          )}

          {project.other_images && project.other_images.length > 0 && (
            <Lightbox images={project.other_images} alt={project.name} />
          )}
        </div>

        <aside className="space-y-6">
          <Card>
            <h4 className="mb-3 text-[12px] font-bold tracking-wide text-navy-950 uppercase">
              {t.projects.quickInfo}
            </h4>
            <dl className="space-y-2 text-[13px]">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-faint">{t.projects.type}</dt>
                <dd className="text-right font-medium text-navy-900">
                  {project.type_project ?? "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-faint">{t.projects.status}</dt>
                <dd className="text-right font-medium text-navy-900">
                  {project.release_type ?? (project.released ? t.projects.released : "—")}
                </dd>
              </div>
            </dl>
          </Card>

          {project.technologie && project.technologie.length > 0 && (
            <Card>
              <h4 className="mb-3 text-[12px] font-bold tracking-wide text-navy-950 uppercase">
                {t.projects.technologies}
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologie.map((slug, i) => {
                  const tech = techBySlug.get(slug.toLowerCase());
                  const label = tech?.name ?? slug;
                  const deviconClass = getTechDeviconClass(slug);
                  return (
                    <SkillChip
                      key={i}
                      icon={deviconClass && <TechIcon deviconClass={deviconClass} label={label} size={14} />}
                    >
                      {label}
                    </SkillChip>
                  );
                })}
              </div>
            </Card>
          )}

          {project.categorie && project.categorie.length > 0 && (
            <Card>
              <h4 className="mb-3 text-[12px] font-bold tracking-wide text-navy-950 uppercase">
                {t.projects.categories}
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.categorie.map((cat) => (
                  <SkillChip key={cat}>{cat}</SkillChip>
                ))}
              </div>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}
