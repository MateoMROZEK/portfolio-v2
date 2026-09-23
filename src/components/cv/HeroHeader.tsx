"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/context/LanguageProvider";
import cv from "@/data/cv.json";

export function HeroHeader() {
  const { pick } = useLanguage();

  return (
    <section className="-mx-6 -mt-12 mb-16 bg-navy-900 px-6 py-16 text-white md:-mt-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-[1440px]"
      >
        <h1 className="text-4xl leading-tight font-extrabold tracking-wide md:text-5xl">
          {cv.identity.name.toUpperCase()}
        </h1>
        <p className="gold-underline mt-3 text-sm font-semibold tracking-[0.25em] text-gold-soft uppercase md:text-base">
          {pick(cv.identity.title)}
        </p>
      </motion.div>
    </section>
  );
}
