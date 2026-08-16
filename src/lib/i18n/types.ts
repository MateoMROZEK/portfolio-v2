import type { fr } from "./fr";

export type Locale = "fr" | "en";

export type Bilingual = {
  fr: string;
  en: string;
};

export type Dictionary = typeof fr;
