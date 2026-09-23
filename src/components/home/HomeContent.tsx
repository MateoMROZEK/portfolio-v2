"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useLanguage } from "@/context/LanguageProvider";
import cv from "@/data/cv.json";
import type { PCBuild } from "@/lib/pcbuilder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ProjectCard } from "@/components/project/ProjectCard";
import { PCBuildCard } from "@/components/pc-builder/PCBuildCard";

type Project = {
  name: string;
  slug: string;
  image?: string;
  released: boolean;
  lite_description?: string;
  release_type?: string;
  categorie?: string[];
};

type HomeContentProps = {
  stats: { years: number; projects: number; builds: number };
  latestProjects: Project[];
  latestBuilds: PCBuild[];
};

// Stroke icons (24×24) for the "what I do" cards.
const PILLAR_ICONS = {
  web: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  pc: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>',
  services:
    '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  software:
    '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
};

const PILLARS = [
  { key: "web", href: "/project" },
  { key: "pc", href: "/pc-builder" },
  { key: "services", href: "/services" },
  { key: "software", href: "/software" },
] as const;

const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-[13px] font-semibold text-navy-950 transition-colors hover:bg-gold-soft";
const outlineButton =
  "inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:border-gold hover:text-gold-soft";

export function HomeContent({ stats, latestProjects, latestBuilds }: HomeContentProps) {
  const { t, pick } = useLanguage();

  const statItems = [
    { value: `${stats.years}+`, label: t.home.statYears },
    { value: stats.projects, label: t.home.statProjects },
    { value: stats.builds, label: t.home.statBuilds },
  ];

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="relative -mx-6 -mt-12 overflow-hidden bg-navy-900 px-6 py-20 text-white md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage: "radial-gradient(rgba(203,179,137,0.14) 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-[1440px]"
        >
          <p className="text-sm font-semibold tracking-[0.25em] text-gold uppercase">
            {t.home.greeting}
          </p>
          <h1 className="mt-3 text-4xl leading-tight font-extrabold tracking-wide md:text-6xl">
            {cv.identity.name}
          </h1>
          <p className="gold-underline mt-3 text-sm font-semibold tracking-[0.25em] text-gold-soft uppercase md:text-base">
            {pick(cv.identity.title)}
          </p>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/75">{t.home.pitch}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/project" className={primaryButton}>
              {t.home.ctaProjects} →
            </Link>
            <Link href="/pc-builder/configurator" className={outlineButton}>
              {t.home.ctaConfigurator}
            </Link>
            <Link href="/cv" className={outlineButton}>
              {t.home.ctaCv}
            </Link>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/10 pt-8">
            {statItems.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-3xl font-extrabold text-gold-soft">{stat.value}</dd>
                <dd className="mt-1 text-[12px] tracking-wide text-white/60 uppercase">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </section>

      {/* What I do */}
      <section>
        <SectionHeading className="mb-8">{t.home.whatIDo}</SectionHeading>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PILLARS.map(({ key, href }) => (
            <motion.div key={key} variants={fadeUp}>
              <Link href={href} className="group block h-full">
                <Card className="flex h-full flex-col">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-navy-900">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 stroke-navy-900"
                      fill="none"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      dangerouslySetInnerHTML={{ __html: PILLAR_ICONS[key] }}
                    />
                  </div>
                  <h3 className="text-[15px] font-bold text-navy-950">
                    {t.home.pillars[key].title}
                  </h3>
                  <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-ink-soft">
                    {t.home.pillars[key].text}
                  </p>
                  <span className="mt-4 text-[13px] font-semibold text-gold group-hover:underline">
                    {t.home.discover} →
                  </span>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Latest projects */}
      <section>
        <SectionHeader
          title={t.home.latestProjects}
          href="/project"
          linkLabel={t.home.allProjects}
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {latestProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              name={project.name}
              slug={project.slug}
              image={project.image}
              released={project.released}
              description={project.lite_description}
              releaseType={project.release_type}
              categories={project.categorie ?? []}
            />
          ))}
        </motion.div>
      </section>

      {/* Configurator call-to-action */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="relative overflow-hidden rounded-2xl border-t-[3px] border-gold bg-navy-950 px-8 py-12 text-white md:px-12"
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold md:text-3xl">{t.home.configuratorTitle}</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-white/70">
              {t.home.configuratorText}
            </p>
          </div>
          <Link
            href="/pc-builder/configurator"
            className={`${primaryButton} shrink-0 self-start md:self-auto`}
          >
            {t.configurator.open} →
          </Link>
        </div>
      </motion.section>

      {/* Latest builds */}
      <section>
        <SectionHeader
          title={t.home.latestBuilds}
          href="/pc-builder"
          linkLabel={t.home.allBuilds}
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {latestBuilds.map((build) => (
            <PCBuildCard key={build.slug} build={build} />
          ))}
        </motion.div>
      </section>
    </div>
  );
}

function SectionHeader({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <SectionHeading>{title}</SectionHeading>
      <Link href={href} className="text-[13px] font-semibold text-gold hover:underline">
        {linkLabel} →
      </Link>
    </div>
  );
}
