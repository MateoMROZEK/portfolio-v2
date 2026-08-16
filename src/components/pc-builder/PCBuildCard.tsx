"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { fadeUp } from "@/lib/motion";
import { useLanguage } from "@/context/LanguageProvider";
import type { PCBuild } from "@/lib/pcbuilder";

export function PCBuildCard({ build }: { build: PCBuild }) {
  const { t } = useLanguage();
  const image = build.image[0];

  return (
    <motion.div variants={fadeUp}>
      <Link
        href={`/pc-builder/${build.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_3px_rgba(16,28,48,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-soft hover:shadow-[0_16px_32px_rgba(16,28,48,0.1)]"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-900">
          {image && (
            <Image
              src={image}
              alt={build.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {build.performance_score && (
            <span className="absolute top-3 right-3 rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold tracking-wide text-navy-950 uppercase">
              {build.performance_score}/100
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[15px] font-bold text-navy-950">{build.name}</h3>
            <span className="shrink-0 text-[15px] font-bold text-gold">
              {build.price.toLocaleString()}&nbsp;€
            </span>
          </div>
          {(build.lite_description ?? build.description) && (
            <p className="line-clamp-2 text-[13px] leading-relaxed text-ink-soft">
              {build.lite_description ?? build.description}
            </p>
          )}
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {(build.best_for ?? []).slice(0, 3).map((usage) => (
              <span
                key={usage}
                className="rounded-full bg-line-soft px-2 py-0.5 text-[10px] font-semibold tracking-wide text-ink-soft uppercase"
              >
                {usage}
              </span>
            ))}
            {!build.released && (
              <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-gold uppercase">
                {t.pcBuilder.inProgress}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
