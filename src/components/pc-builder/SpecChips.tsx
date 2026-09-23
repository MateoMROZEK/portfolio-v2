"use client";

import { cn } from "@heroui/react";
import { useLanguage } from "@/context/LanguageProvider";
import { componentSpecs, type SpecTone } from "@/lib/pc-compatibility";
import type { CatalogItem } from "@/lib/pcbuilder";

const TONE_CLASSES: Record<SpecTone, string> = {
  socket: "bg-navy-900 text-white",
  memory: "bg-navy-900/10 text-navy-900",
  power: "bg-gold/15 text-navy-900",
  oled: "bg-navy-950 text-gold-soft ring-1 ring-gold/60",
  miniled: "bg-gold/20 text-navy-950",
  neutral: "bg-line-soft text-ink-soft",
};

export function SpecChips({ item, className }: { item: CatalogItem; className?: string }) {
  const { pick } = useLanguage();
  const specs = componentSpecs(item);
  if (!specs.length) return null;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {specs.map((spec, i) => (
        <span
          key={i}
          className={cn(
            "rounded-full px-2 py-0.5 text-[10.5px] font-semibold tracking-wide",
            TONE_CLASSES[spec.tone]
          )}
        >
          {typeof spec.label === "string" ? spec.label : pick(spec.label)}
        </span>
      ))}
    </div>
  );
}
