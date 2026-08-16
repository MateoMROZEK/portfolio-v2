"use client";

import { cn } from "@heroui/react";
import { useLanguage } from "@/context/LanguageProvider";
import type { Locale } from "@/lib/i18n";

const OPTIONS: { value: Locale; label: string }[] = [
  { value: "fr", label: "FR" },
  { value: "en", label: "EN" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-gold-soft/60 bg-white/5 p-0.5",
        className
      )}
      role="group"
      aria-label={t.common.language}
    >
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setLang(option.value)}
          aria-pressed={lang === option.value}
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wider transition-colors",
            lang === option.value
              ? "bg-gold text-navy-950"
              : "text-gold-soft hover:text-white"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
