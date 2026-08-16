"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useLanguage } from "@/context/LanguageProvider";
import cv from "@/data/cv.json";
import { HeroHeader } from "./HeroHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillChip } from "@/components/ui/SkillChip";
import { Card } from "@/components/ui/Card";
import { TechIcon } from "@/components/ui/TechIcon";

export function HomeContent({ age }: { age: number }) {
  const { t, pick } = useLanguage();

  return (
    <div className="space-y-16">
      <HeroHeader />

      <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-[1.5fr_1fr]">
        {/* Left column */}
        <div className="space-y-14">
          <section>
            <SectionHeading className="mb-6">{t.home.about}</SectionHeading>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-6"
            >
              {cv.about.map((item, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <h3 className="mb-1.5 text-[13px] font-bold tracking-wide text-gold uppercase">
                    {pick(item.name)}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-ink-soft">
                    {pick(item.description).replace("{age}", String(age))}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          <section>
            <SectionHeading className="mb-6">{t.home.otherExperience}</SectionHeading>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="m-0 list-none space-y-1 p-0"
            >
              {cv.otherExperience.map((item, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  className="relative py-2.5 pl-5 before:absolute before:top-[15px] before:left-0 before:h-2 before:w-2 before:bg-gold"
                >
                  <span className="block text-[14px] font-semibold text-navy-950">
                    {pick(item.title)}
                  </span>
                  <span className="text-[12.5px] text-ink-faint">{pick(item.dates)}</span>
                </motion.li>
              ))}
            </motion.ul>
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-14 border-line lg:border-l lg:pl-12">
          <section>
            <SectionHeading className="mb-4">{t.home.profile}</SectionHeading>
            <p className="text-[14px] leading-relaxed text-ink-soft">{pick(cv.profile)}</p>
          </section>

          <section>
            <SectionHeading className="mb-6">{t.home.education}</SectionHeading>
            <div className="space-y-4">
              {cv.education.map((item, i) => (
                <div key={i}>
                  <div className="text-[12px] font-semibold tracking-wide text-gold">
                    {item.dates}
                  </div>
                  <div className="mt-0.5 text-[14px] font-semibold text-navy-950">
                    {pick(item.title)}
                  </div>
                  <div className="text-[12.5px] text-ink-soft">{item.school}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading className="mb-6">{t.home.skills}</SectionHeading>
            <div className="space-y-6">
              <SkillGroup pick={pick} items={cv.skills.dev} />
              <SkillGroup pick={pick} items={cv.skills.software} />
              <SkillGroup pick={pick} items={cv.skills.infrastructure} />
            </div>
          </section>

          <section>
            <SectionHeading className="mb-4">{t.home.certifications}</SectionHeading>
            <div className="flex flex-wrap gap-2">
              {cv.certifications.map((cert) => (
                <SkillChip key={cert}>{cert}</SkillChip>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading className="mb-6">{t.home.hobbies}</SectionHeading>
            <div className="flex flex-wrap gap-6">
              {cv.hobbies.map((hobby, i) => (
                <div key={i} className="w-16 text-center">
                  <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-navy-900">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 stroke-navy-900"
                      fill="none"
                      strokeWidth={2}
                      dangerouslySetInnerHTML={{ __html: hobby.icon }}
                    />
                  </div>
                  <span className="text-[11px] text-ink-soft">{pick(hobby.name)}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Card hoverable={false} className="flex items-start gap-5 bg-transparent shadow-none">
        <span className="font-serif text-5xl leading-[0.5] text-gold-soft">&ldquo;</span>
        <p className="flex-1 pt-3 text-center text-[15px] font-medium text-navy-900">
          {pick(cv.closingQuote)}
        </p>
      </Card>
    </div>
  );
}

type SkillItem = { name: string | { fr: string; en: string }; devicon?: string };

function SkillGroup({
  items,
  pick,
}: {
  items: SkillItem[];
  pick: (v: { fr: string; en: string }) => string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => {
        const label = typeof item.name === "string" ? item.name : pick(item.name);
        return (
          <SkillChip
            key={i}
            icon={item.devicon && <TechIcon deviconClass={item.devicon} label={label} size={14} />}
          >
            {label}
          </SkillChip>
        );
      })}
    </div>
  );
}
