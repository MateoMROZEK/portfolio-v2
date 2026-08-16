"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <motion.ul
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="relative m-0 list-none p-0 before:absolute before:top-2 before:bottom-5 before:left-[6px] before:w-px before:bg-line"
    >
      {children}
    </motion.ul>
  );
}

type TimelineItemProps = {
  title: string;
  meta?: string;
  dates?: string;
  description?: string;
};

export function TimelineItem({ title, meta, dates, description }: TimelineItemProps) {
  return (
    <motion.li
      variants={fadeUp}
      className="relative mb-4 pl-8 before:absolute before:top-1.5 before:left-0 before:h-[13px] before:w-[13px] before:rounded-full before:border-[3px] before:border-gold before:bg-white"
    >
      <p className="m-0 text-[15px] font-semibold text-navy-950">{title}</p>
      {(meta ?? dates) && (
        <div className="mt-0.5 mb-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 text-[13px]">
          {meta && <span className="font-medium text-gold">{meta}</span>}
          {dates && <span className="text-ink-faint">{dates}</span>}
        </div>
      )}
      {description && <p className="m-0 text-[13px] leading-relaxed text-ink-soft">{description}</p>}
    </motion.li>
  );
}
