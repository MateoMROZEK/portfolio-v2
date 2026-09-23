import pcbuilder from "public/pcbuilder.json";
import type { Bilingual } from "@/lib/i18n";

export const COMPONENT_LABELS = {
  motherboard: { fr: "Carte mère", en: "Motherboard" },
  processor: { fr: "Processeur", en: "Processor" },
  "graphic-card": { fr: "Carte graphique", en: "Graphics card" },
  ssd: { fr: "Stockage", en: "Storage" },
  ram: { fr: "Mémoire vive", en: "RAM" },
  aio: { fr: "Refroidissement", en: "Cooling" },
  alimentation: { fr: "Alimentation", en: "Power supply" },
  boitier: { fr: "Boîtier", en: "Case" },
  ventilateurs: { fr: "Ventilateurs", en: "Case fans" },
  screen: { fr: "Écran", en: "Screen" },
  microphone: { fr: "Microphone", en: "Microphone" },
  keyboard: { fr: "Clavier", en: "Keyboard" },
  wheel: { fr: "Volant", en: "Wheel" },
} satisfies Record<string, Bilingual>;

export type ComponentCategory = keyof typeof COMPONENT_LABELS;

export const COMPONENT_ORDER = Object.keys(COMPONENT_LABELS) as ComponentCategory[];

/** Categories sold alongside the tower rather than inside it. */
export const PERIPHERAL_CATEGORIES: ComponentCategory[] = [
  "screen",
  "microphone",
  "keyboard",
  "wheel",
];

/** Parts a tower cannot boot without; the configurator flags the missing ones. */
export const ESSENTIAL_CATEGORIES: ComponentCategory[] = [
  "motherboard",
  "processor",
  "graphic-card",
  "ssd",
  "ram",
  "aio",
  "alimentation",
  "boitier",
];

/** Categories where a build can hold several parts (two SSDs, two screens…). */
export const MULTI_SLOT_CATEGORIES: ComponentCategory[] = ["ssd", "ram", "ventilateurs", "screen"];

export type ScreenPanel = "OLED" | "Mini LED" | "VA" | "IPS" | "Fast IPS";

/** A product in the shared catalog, defined once and referenced by id from builds. */
export type CatalogItem = {
  name: string;
  link?: string;
  price?: number;
  /** Processor and motherboard socket, e.g. "AM5". */
  socket?: string;
  /** Sockets a CPU cooler can be mounted on. */
  sockets?: string[];
  /** Watts: power draw for processors (TDP) and graphics cards (TGP), capacity for power supplies. */
  wattage?: number;
  /** Motherboard and RAM memory generation. */
  memory?: "DDR4" | "DDR5";
  /** Screen specs. */
  panel?: ScreenPanel;
  size?: number;
  refresh?: number;
  resolution?: string;
  curved?: boolean;
};

export type ComponentCatalog = Partial<Record<ComponentCategory, Record<string, CatalogItem>>>;

/** Build components as stored in the JSON: a catalog id, or several ids for multiple slots. */
export type PCComponentRefs = Partial<Record<ComponentCategory, string | string[]>>;

/** A catalog item resolved for display in a build. `index` is set when the category has several slots. */
export type ResolvedComponent = CatalogItem & {
  id: string;
  category: ComponentCategory;
  index?: number;
};

export type PCChangelog = { name: string; date?: string; list: string[] };

type PCBuildBase = {
  name: string;
  slug: string;
  image: string[];
  other_images?: string[];
  performance_score?: number;
  power_consumption?: number;
  cooling_score?: number;
  noise_level?: number;
  best_for?: string[];
  description?: string;
  lite_description?: string;
  release_date?: string;
  released?: boolean;
  type_project?: string;
  changelog?: PCChangelog[];
};

export type RawPCBuild = PCBuildBase & { components: PCComponentRefs };

export type PCBuild = PCBuildBase & {
  components: ResolvedComponent[];
  /** Sums of the catalog prices: the tower, the peripherals, and both. */
  price: { tower: number; peripherals: number; total: number };
};

export const COMPONENT_CATALOG = pcbuilder.components as ComponentCatalog;

function resolveComponents(build: RawPCBuild): ResolvedComponent[] {
  return COMPONENT_ORDER.flatMap((category) => {
    const ref = build.components[category];
    if (!ref) return [];
    const ids = Array.isArray(ref) ? ref : [ref];
    return ids.map((id, i) => {
      const item = COMPONENT_CATALOG[category]?.[id];
      if (!item) {
        throw new Error(`[pcbuilder] "${build.slug}": unknown ${category} "${id}"`);
      }
      return { ...item, id, category, index: ids.length > 1 ? i + 1 : undefined };
    });
  });
}

/** Generated placeholder visual for builds that have no photo yet. */
export const pcPlaceholderImage = (slug: string) => `/api/pc-image/${slug}`;

export const sumPrices = (components: Pick<CatalogItem, "price">[]) =>
  Math.round(components.reduce((sum, c) => sum + (c.price ?? 0), 0) * 100) / 100;

export const PC_BUILDS: PCBuild[] = (pcbuilder.projects as RawPCBuild[]).map((build) => {
  const components = resolveComponents(build);
  const tower = sumPrices(components.filter((c) => !PERIPHERAL_CATEGORIES.includes(c.category)));
  const peripherals = sumPrices(
    components.filter((c) => PERIPHERAL_CATEGORIES.includes(c.category))
  );
  return {
    ...build,
    image: build.image.length ? build.image : [pcPlaceholderImage(build.slug)],
    components,
    price: { tower, peripherals, total: Math.round((tower + peripherals) * 100) / 100 },
  };
});

export function getPCBuild(slug: string): PCBuild | undefined {
  return PC_BUILDS.find((b) => b.slug === slug);
}

/** Product name without the Amazon-style marketing tail ("…, Wi-Fi 7, 5G LAN"). */
export function shortComponentName(name: string): string {
  return (name.split(/ [–-] |,| \(| \/ /)[0] ?? name)
    .replace(/\s+(Carte (mère|Graphique)|Watercooling|Boîtier PC)\b.*$/i, "")
    .replace(/(^|\s)[ÉE]cran PC( Gaming)?\s+/i, "$1")
    .trim();
}

export function formatPrice(price: number): string {
  return price.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}
