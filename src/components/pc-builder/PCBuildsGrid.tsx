"use client";

import Link from "next/link";
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
      <div className="mt-4 mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-[14px] text-ink-soft">{t.pcBuilder.subtitle}</p>
        <Link
          href="/pc-builder/configurator"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-gold px-5 py-2.5 text-[13px] font-semibold text-navy-950 transition-colors hover:bg-gold-soft sm:self-auto"
        >
          {t.configurator.open} →
        </Link>
      </div>

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
