"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useLanguage } from "@/context/LanguageProvider";
import cv from "@/data/cv.json";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

export function ServicesContent() {
  const { t, pick } = useLanguage();

  return (
    <div>
      <SectionHeading className="mb-2">{t.services.title}</SectionHeading>
      <p className="mt-4 mb-10 max-w-2xl text-[14px] text-ink-soft">{t.services.subtitle}</p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {cv.services.map((service, i) => (
          <motion.div key={i} variants={fadeUp}>
            <Card className="flex h-full flex-col">
              <h3 className="mb-3 text-[16px] font-bold text-navy-950">{pick(service.name)}</h3>
              <div
                className="flex-1 text-[13.5px] leading-relaxed text-ink-soft [&_strong]:text-navy-900 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{ __html: pick(service.description) }}
              />
              <div className="mt-4 border-t border-line pt-3 text-[13px] font-semibold text-gold">
                {t.services.priceFrom} {service.minimumPrice}&nbsp;€
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
