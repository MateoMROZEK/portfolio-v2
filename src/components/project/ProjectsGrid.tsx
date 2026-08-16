"use client";

import { motion } from "motion/react";
import { staggerContainer } from "@/lib/motion";
import { useLanguage } from "@/context/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";

type Project = {
  name: string;
  slug: string;
  image?: string;
  released: boolean;
  lite_description?: string;
  release_type?: string;
  categorie?: string[];
};

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const { t } = useLanguage();

  return (
    <div>
      <SectionHeading className="mb-2">{t.projects.title}</SectionHeading>
      <p className="mt-4 mb-10 max-w-2xl text-[14px] text-ink-soft">{t.projects.subtitle}</p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
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
    </div>
  );
}
