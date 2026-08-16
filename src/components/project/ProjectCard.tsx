"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@heroui/react";
import { fadeUp } from "@/lib/motion";
import { useLanguage } from "@/context/LanguageProvider";

type ProjectCardProps = {
  name: string;
  slug: string;
  image?: string;
  released: boolean;
  description?: string;
  releaseType?: string;
  categories: string[];
};

export function ProjectCard({
  name,
  slug,
  image,
  released,
  description,
  releaseType,
  categories,
}: ProjectCardProps) {
  const { t } = useLanguage();

  return (
    <motion.div variants={fadeUp}>
      <Link
        href={`/project/${slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_3px_rgba(16,28,48,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-soft hover:shadow-[0_16px_32px_rgba(16,28,48,0.1)]"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-900">
          {image && (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <span
            className={cn(
              "absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase",
              released ? "bg-white/90 text-navy-950" : "bg-gold/90 text-navy-950"
            )}
          >
            {releaseType ?? (released ? t.projects.released : "")}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-5">
          <h3 className="text-[15px] font-bold text-navy-950">{name}</h3>
          {description && (
            <p className="line-clamp-2 text-[13px] leading-relaxed text-ink-soft">{description}</p>
          )}
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {categories.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="rounded-full bg-line-soft px-2 py-0.5 text-[10px] font-semibold tracking-wide text-ink-soft uppercase"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
