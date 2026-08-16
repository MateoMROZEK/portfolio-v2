"use client";

import { createContext, use, useCallback, useEffect, useMemo, useState } from "react";
import { dictionaries, type Bilingual, type Dictionary, type Locale } from "@/lib/i18n";

type LanguageContextValue = {
  lang: Locale;
  setLang: (lang: Locale) => void;
  t: Dictionary;
  pick: (value: Bilingual) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "mateo-portfolio-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Locale>("fr");

  useEffect(() => {
    // One-off sync from browser-only APIs (localStorage/navigator) right after mount.
    // Must happen in an effect (not a lazy initializer) to keep server/client markup
    // identical on hydration; the resulting re-render is intentional here.
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "en") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(stored);
      return;
    }
    const browserLang = window.navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
    setLangState(browserLang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = useCallback((next: Locale) => setLangState(next), []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t: dictionaries[lang],
      pick: (entry) => entry[lang],
    }),
    [lang, setLang]
  );

  return <LanguageContext value={value}>{children}</LanguageContext>;
}

export function useLanguage() {
  const ctx = use(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
