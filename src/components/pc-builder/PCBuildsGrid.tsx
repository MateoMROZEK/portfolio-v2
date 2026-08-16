"use client";

import { motion } from "motion/react";
import { staggerContainer } from "@/lib/motion";
import { useLanguage } from "@/context/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PCBuild } from "@/lib/pcbuilder";
import { PCBuildCard } from "./PCBuildCard";

export function PCBuildsGrid({ builds }: { builds: PCBuild[] }) {
  const { t } = useLanguage();

  return (
    <div>
      <SectionHeading className="mb-2">{t.pcBuilder.title}</SectionHeading>
      <p className="mt-4 mb-10 max-w-2xl text-[14px] text-ink-soft">{t.pcBuilder.subtitle}</p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {builds.map((build) => (
          <PCBuildCard key={build.slug} build={build} />
        ))}
      </motion.div>
    </div>
  );
}
