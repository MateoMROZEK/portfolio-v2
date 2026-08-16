"use client";

import { motion } from "motion/react";
import { cn } from "@heroui/react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useLanguage } from "@/context/LanguageProvider";
import cv from "@/data/cv.json";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

export function SoftwareContent() {
  const { t, pick } = useLanguage();

  return (
    <div>
      <SectionHeading className="mb-2">{t.software.title}</SectionHeading>
      <p className="mt-4 mb-10 max-w-2xl text-[14px] text-ink-soft">{t.software.subtitle}</p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {cv.software.map((item, i) => (
          <motion.div key={i} variants={fadeUp}>
            <Card className="flex h-full flex-col">
              <div className="mb-3 flex items-start justify-between gap-3">
                <h3 className="text-[16px] font-bold text-navy-950">{pick(item.name)}</h3>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase",
                    item.released ? "bg-navy-900 text-white" : "bg-line-soft text-ink-soft"
                  )}
                >
                  {item.released ? t.software.released : t.software.inDevelopment}
                </span>
              </div>

              <div
                className="flex-1 text-[13.5px] leading-relaxed text-ink-soft [&_strong]:text-navy-900 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{ __html: pick(item.description) }}
              />

              <div className="mt-4 border-t border-line pt-3 text-[13px] font-semibold text-gold">
                {item.price && item.price !== 0 ? (
                  <span>{item.price}&nbsp;€</span>
                ) : (
                  item.downloadLink && (
                    <a href={item.downloadLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {t.software.freeDownload}
                    </a>
                  )
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
