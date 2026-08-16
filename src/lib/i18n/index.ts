import { en } from "./en";
import { fr } from "./fr";
import type { Locale } from "./types";

export const dictionaries = { fr, en } satisfies Record<Locale, unknown>;

export type { Locale, Bilingual, Dictionary } from "./types";
