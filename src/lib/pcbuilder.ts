import type { Bilingual } from "@/lib/i18n";

export type PCComponents = {
  motherboard?: string[];
  processor?: string[];
  "graphic-card"?: string[];
  ssd1?: string[];
  ssd2?: string[];
  ssd3?: string[];
  ram1?: string[];
  ram2?: string[];
  ram3?: string[];
  aio?: string[];
  alimentation?: string[];
  boitier?: string[];
  screen1?: string[];
  screen2?: string[];
  screen3?: string[];
  microphone?: string[];
  keyboard?: string[];
  wheel1?: string[];
  wheel2?: string[];
  wheel?: string[];
  ventilateurs1?: string[];
};

export type PCChangelog = { name: string; date?: string; list: string[] };

export type PCBuild = {
  name: string;
  slug: string;
  image: string[];
  other_images?: string[];
  price: number;
  performance_score?: number;
  power_consumption?: number;
  cooling_score?: number;
  noise_level?: number;
  best_for?: string[];
  components: PCComponents;
  description?: string;
  lite_description?: string;
  release_date?: string;
  released?: boolean;
  type_project?: string;
  changelog?: PCChangelog[];
};

export const COMPONENT_LABELS: Record<keyof PCComponents, Bilingual> = {
  motherboard: { fr: "Carte mère", en: "Motherboard" },
  processor: { fr: "Processeur", en: "Processor" },
  "graphic-card": { fr: "Carte graphique", en: "Graphics card" },
  ssd1: { fr: "Stockage 1", en: "Storage 1" },
  ssd2: { fr: "Stockage 2", en: "Storage 2" },
  ssd3: { fr: "Stockage 3", en: "Storage 3" },
  ram1: { fr: "Mémoire vive", en: "RAM" },
  ram2: { fr: "Mémoire vive 2", en: "RAM 2" },
  ram3: { fr: "Mémoire vive 3", en: "RAM 3" },
  aio: { fr: "Refroidissement", en: "Cooling" },
  alimentation: { fr: "Alimentation", en: "Power supply" },
  boitier: { fr: "Boîtier", en: "Case" },
  screen1: { fr: "Écran 1", en: "Screen 1" },
  screen2: { fr: "Écran 2", en: "Screen 2" },
  screen3: { fr: "Écran 3", en: "Screen 3" },
  microphone: { fr: "Microphone", en: "Microphone" },
  keyboard: { fr: "Clavier", en: "Keyboard" },
  wheel1: { fr: "Volant 1", en: "Wheel 1" },
  wheel2: { fr: "Volant 2", en: "Wheel 2" },
  wheel: { fr: "Volant", en: "Wheel" },
  ventilateurs1: { fr: "Ventilateurs", en: "Case fans" },
};

export const COMPONENT_ORDER = Object.keys(COMPONENT_LABELS) as (keyof PCComponents)[];

export type ComponentInfo = { name: string; link: string | null; price: string | null };

export function extractComponentInfo(item?: string[]): ComponentInfo | null {
  if (!item || item.length === 0) return null;
  return {
    name: item[0] ?? "—",
    link: item[1] ?? null,
    price: item[2] ?? null,
  };
}
