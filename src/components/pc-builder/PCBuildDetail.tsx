"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { fadeUp } from "@/lib/motion";
import { useLanguage } from "@/context/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline, TimelineItem } from "@/components/ui/Timeline";
import { SkillChip } from "@/components/ui/SkillChip";
import { Card } from "@/components/ui/Card";
import { Lightbox } from "@/components/project/Lightbox";
import {
  COMPONENT_LABELS,
  COMPONENT_ORDER,
  extractComponentInfo,
  type PCBuild,
} from "@/lib/pcbuilder";

export function PCBuildDetail({ build }: { build: PCBuild }) {
  const { t, pick } = useLanguage();
  const mainImage = build.image[0];

  const stats = [
    build.performance_score != null && {
      label: t.pcBuilder.performance,
      value: `${build.performance_score}/100`,
    },
    build.power_consumption != null && {
      label: t.pcBuilder.power,
      value: `${build.power_consumption} W`,
    },
    build.cooling_score != null && {
      label: t.pcBuilder.cooling,
      value: `${build.cooling_score}/100`,
    },
    build.noise_level != null && { label: t.pcBuilder.noise, value: `${build.noise_level} dB` },
  ].filter((s): s is { label: string; value: string } => Boolean(s));

  return (
    <div className="space-y-12">
      <Link
        href="/pc-builder"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-soft hover:text-gold"
      >
        ← {t.pcBuilder.back}
      </Link>

      <section className="relative h-[360px] w-full overflow-hidden rounded-2xl border border-line md:h-[440px]">
        {mainImage && (
          <Image src={mainImage} alt={build.name} fill priority className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-x-0 bottom-0 p-6 md:p-8"
        >
          <p className="mb-2 inline-block rounded-full bg-gold px-3 py-1 text-[11px] font-semibold tracking-wide text-navy-950 uppercase">
            {build.type_project ?? "PC Build"}
          </p>
          <h1 className="max-w-3xl text-3xl leading-tight font-extrabold text-white md:text-4xl">
            {build.name}
          </h1>
          {(build.lite_description ?? build.description) && (
            <p className="mt-2 max-w-2xl text-sm text-white/80">
              {build.lite_description ?? build.description}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold text-white">
              {build.price.toLocaleString()}&nbsp;€
            </span>
            {stats.map((stat) => (
              <span
                key={stat.label}
                className="rounded-full bg-white/10 px-3 py-1 text-[12px] text-white/90"
              >
                {stat.label}: {stat.value}
              </span>
            ))}
          </div>

          {build.best_for && build.best_for.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {build.best_for.map((usage) => (
                <span
                  key={usage}
                  className="rounded-full bg-gold/90 px-2.5 py-1 text-[11px] font-semibold text-navy-950"
                >
                  {usage}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </section>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <section>
            <SectionHeading className="mb-4">{t.pcBuilder.components}</SectionHeading>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {COMPONENT_ORDER.map((key) => {
                const info = extractComponentInfo(build.components[key]);
                if (!info) return null;
                return (
                  <Card key={key} hoverable={false} className="p-4">
                    <div className="mb-1 text-[11px] font-bold tracking-wide text-gold uppercase">
                      {pick(COMPONENT_LABELS[key])}
                    </div>
                    <div className="text-[13.5px] font-medium text-navy-950">{info.name}</div>
                    <div className="mt-1 flex items-center gap-3 text-[12px]">
                      {info.price && <span className="text-ink-soft">{info.price}</span>}
                      {info.link && (
                        <a
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold hover:underline"
                        >
                          {t.pcBuilder.viewOnAmazon}
                        </a>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          {build.description && (
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <SectionHeading className="mb-4">{t.pcBuilder.about}</SectionHeading>
              <div
                className="text-[14px] leading-relaxed text-ink-soft [&_a]:text-gold [&_strong]:text-navy-900"
                dangerouslySetInnerHTML={{ __html: build.description }}
              />
            </motion.section>
          )}

          {build.changelog && build.changelog.length > 0 && (
            <section>
              <SectionHeading className="mb-4">{t.pcBuilder.changelog}</SectionHeading>
              <Timeline>
                {build.changelog.map((entry, i) => (
                  <TimelineItem
                    key={i}
                    title={entry.name}
                    dates={entry.date}
                    description={entry.list.join(" · ")}
                  />
                ))}
              </Timeline>
            </section>
          )}

          {build.other_images && build.other_images.length > 0 && (
            <Lightbox images={build.other_images} alt={build.name} />
          )}
        </div>

        <aside className="space-y-6">
          <Card>
            <h4 className="mb-3 text-[12px] font-bold tracking-wide text-navy-950 uppercase">
              {t.pcBuilder.quickInfo}
            </h4>
            <dl className="space-y-2 text-[13px]">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-faint">{t.pcBuilder.type}</dt>
                <dd className="text-right font-medium text-navy-900">
                  {build.type_project ?? "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-faint">{t.pcBuilder.status}</dt>
                <dd className="text-right font-medium text-navy-900">
                  {build.released ? t.pcBuilder.available : t.pcBuilder.inProgress}
                </dd>
              </div>
              {build.release_date && (
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-faint">{t.pcBuilder.releasedDate}</dt>
                  <dd className="text-right font-medium text-navy-900">{build.release_date}</dd>
                </div>
              )}
              <div className="flex justify-between gap-4 border-t border-line pt-2">
                <dt className="font-semibold text-navy-950">{t.pcBuilder.totalBudget}</dt>
                <dd className="text-right text-[15px] font-bold text-gold">
                  {build.price.toLocaleString()}&nbsp;€
                </dd>
              </div>
            </dl>
          </Card>

          {build.best_for && build.best_for.length > 0 && (
            <Card>
              <h4 className="mb-3 text-[12px] font-bold tracking-wide text-navy-950 uppercase">
                {t.pcBuilder.bestFor}
              </h4>
              <div className="flex flex-wrap gap-2">
                {build.best_for.map((usage) => (
                  <SkillChip key={usage}>{usage}</SkillChip>
                ))}
              </div>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}
