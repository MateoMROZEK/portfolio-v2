import type { Bilingual } from "@/lib/i18n";
import type { CatalogItem, ComponentCategory } from "@/lib/pcbuilder";

export type SpecTone = "socket" | "memory" | "power" | "oled" | "miniled" | "neutral";

export type Spec = { label: string | Bilingual; tone: SpecTone };

/** Key specs shown as chips next to a part (socket, DDR generation, screen panel…). */
export function componentSpecs(item: CatalogItem): Spec[] {
  const specs: Spec[] = [];
  if (item.socket) specs.push({ label: item.socket, tone: "socket" });
  if (item.sockets?.length) specs.push({ label: item.sockets.join(" · "), tone: "socket" });
  if (item.memory) specs.push({ label: item.memory, tone: "memory" });
  if (item.wattage) specs.push({ label: `${item.wattage} W`, tone: "power" });
  if (item.panel) {
    const tone = item.panel === "OLED" ? "oled" : item.panel === "Mini LED" ? "miniled" : "neutral";
    specs.push({ label: item.panel, tone });
  }
  if (item.size) specs.push({ label: `${item.size}"`, tone: "neutral" });
  if (item.refresh) specs.push({ label: `${item.refresh} Hz`, tone: "neutral" });
  if (item.resolution) specs.push({ label: item.resolution, tone: "neutral" });
  if (item.curved) specs.push({ label: { fr: "Incurvé", en: "Curved" }, tone: "neutral" });
  return specs;
}

/** Option group of a part in the configurator selects: socket, memory generation or panel. */
export function componentGroup(category: ComponentCategory, item: CatalogItem): string | null {
  if (category === "processor" || category === "motherboard") {
    return item.socket ? `Socket ${item.socket}` : null;
  }
  if (category === "ram") return item.memory ?? null;
  if (category === "screen") return item.panel ?? null;
  return null;
}

export type SelectedPart = { category: ComponentCategory; item: CatalogItem };

export type CompatibilityIssue = {
  categories: [ComponentCategory, ComponentCategory];
  /** "error": the build cannot work; "warning": it works but with a thin margin. */
  severity: "error" | "warning";
  message: Bilingual;
};

/** Motherboard, RAM, storage, fans and pump, on top of the CPU and GPU draw. */
const BASE_SYSTEM_WATTAGE = 100;
/** Above this share of the PSU capacity, the build is flagged as running with a thin margin. */
const PSU_COMFORT_RATIO = 0.8;

/** Estimated peak draw in watts, or null when neither the CPU nor the GPU has a wattage. */
export function estimatePowerDraw(parts: SelectedPart[]): number | null {
  const drawing = parts.filter(
    (p) => (p.category === "processor" || p.category === "graphic-card") && p.item.wattage
  );
  if (!drawing.length) return null;
  return drawing.reduce((sum, p) => sum + (p.item.wattage ?? 0), BASE_SYSTEM_WATTAGE);
}

/**
 * Checks sockets (CPU ↔ motherboard ↔ cooler), memory generation (RAM ↔ motherboard)
 * and power supply capacity against the estimated CPU + GPU draw.
 * A rule is skipped when either part has no spec, so missing data never blocks a build.
 */
export function checkCompatibility(parts: SelectedPart[]): CompatibilityIssue[] {
  const all = (category: ComponentCategory) =>
    parts.filter((p) => p.category === category).map((p) => p.item);
  const [cpu] = all("processor");
  const [board] = all("motherboard");
  const issues: CompatibilityIssue[] = [];

  if (cpu?.socket && board?.socket && cpu.socket !== board.socket) {
    issues.push({
      categories: ["processor", "motherboard"],
      severity: "error",
      message: {
        fr: `Le processeur (${cpu.socket}) ne rentre pas sur la carte mère (${board.socket}).`,
        en: `The processor (${cpu.socket}) does not fit the motherboard (${board.socket}).`,
      },
    });
  }

  const socket = cpu?.socket ?? board?.socket;
  for (const cooler of all("aio")) {
    if (socket && cooler.sockets?.length && !cooler.sockets.includes(socket)) {
      issues.push({
        categories: ["aio", cpu?.socket ? "processor" : "motherboard"],
        severity: "error",
        message: {
          fr: `Le refroidissement ne se monte pas sur le socket ${socket}.`,
          en: `The cooler cannot be mounted on the ${socket} socket.`,
        },
      });
    }
  }

  for (const ram of all("ram")) {
    if (ram.memory && board?.memory && ram.memory !== board.memory) {
      issues.push({
        categories: ["ram", "motherboard"],
        severity: "error",
        message: {
          fr: `La mémoire ${ram.memory} n'est pas compatible avec la carte mère (${board.memory}).`,
          en: `${ram.memory} memory is not compatible with the motherboard (${board.memory}).`,
        },
      });
    }
  }

  const [psu] = all("alimentation");
  const draw = estimatePowerDraw(parts);
  if (psu?.wattage && draw) {
    const source = all("graphic-card").length ? "graphic-card" : "processor";
    if (draw > psu.wattage) {
      issues.push({
        categories: ["alimentation", source],
        severity: "error",
        message: {
          fr: `L'alimentation (${psu.wattage} W) est trop faible pour une consommation estimée à ${draw} W.`,
          en: `The power supply (${psu.wattage} W) is too weak for an estimated ${draw} W draw.`,
        },
      });
    } else if (draw > psu.wattage * PSU_COMFORT_RATIO) {
      issues.push({
        categories: ["alimentation", source],
        severity: "warning",
        message: {
          fr: `Marge faible : ${draw} W estimés sur ${psu.wattage} W. Une alimentation plus puissante est conseillée.`,
          en: `Thin margin: ${draw} W estimated out of ${psu.wattage} W. A stronger power supply is recommended.`,
        },
      });
    }
  }

  return issues;
}

/** Whether `item` would cause an error with the other selected parts if picked for `category`. */
export function conflictsWith(
  category: ComponentCategory,
  item: CatalogItem,
  parts: SelectedPart[]
): boolean {
  const others = parts.filter((p) => p.category !== category);
  return checkCompatibility([...others, { category, item }]).some(
    (issue) => issue.severity === "error" && issue.categories.includes(category)
  );
}
