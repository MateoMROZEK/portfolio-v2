"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@heroui/react";
import { useLanguage } from "@/context/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { SpecChips } from "@/components/pc-builder/SpecChips";
import {
  checkCompatibility,
  estimatePowerDraw,
  componentGroup,
  conflictsWith,
  type SelectedPart,
} from "@/lib/pc-compatibility";
import {
  COMPONENT_LABELS,
  COMPONENT_ORDER,
  ESSENTIAL_CATEGORIES,
  MULTI_SLOT_CATEGORIES,
  PERIPHERAL_CATEGORIES,
  formatPrice,
  shortComponentName,
  sumPrices,
  type CatalogItem,
  type ComponentCatalog,
  type ComponentCategory,
} from "@/lib/pcbuilder";

export type ConfiguratorPreset = {
  slug: string;
  name: string;
  components: { category: ComponentCategory; id: string }[];
};

/** Selected catalog ids per category; "" is an empty slot waiting for a choice. */
type Selection = Partial<Record<ComponentCategory, string[]>>;

const PRESET_PARAM = "preset";

/** Groups a category's catalog entries by socket / memory / panel, keeping catalog order. */
function groupItems(category: ComponentCategory, items: [string, CatalogItem][]) {
  const groups = new Map<string | null, [string, CatalogItem][]>();
  for (const entry of items) {
    const group = componentGroup(category, entry[1]);
    groups.set(group, [...(groups.get(group) ?? []), entry]);
  }
  return [...groups.entries()];
}

function selectionFromPreset(preset: ConfiguratorPreset): Selection {
  const selection: Selection = {};
  for (const { category, id } of preset.components) {
    (selection[category] ??= []).push(id);
  }
  return selection;
}

/** Reads `?processor=id&ssd=id1,id2` (or `?preset=slug`), ignoring ids missing from the catalog. */
function selectionFromParams(
  params: URLSearchParams,
  catalog: ComponentCatalog,
  presets: ConfiguratorPreset[]
): Selection {
  const preset = presets.find((p) => p.slug === params.get(PRESET_PARAM));
  if (preset) return selectionFromPreset(preset);

  const selection: Selection = {};
  for (const category of COMPONENT_ORDER) {
    const ids = (params.get(category) ?? "")
      .split(",")
      .filter((id) => id && catalog[category]?.[id]);
    if (ids.length) selection[category] = ids;
  }
  return selection;
}

function selectionToQuery(selection: Selection): string {
  const params = new URLSearchParams();
  for (const category of COMPONENT_ORDER) {
    const ids = (selection[category] ?? []).filter(Boolean);
    if (ids.length) params.set(category, ids.join(","));
  }
  return params.toString().replace(/%2C/g, ",");
}

export function PCConfigurator({
  catalog,
  presets,
}: {
  catalog: ComponentCatalog;
  presets: ConfiguratorPreset[];
}) {
  const { t, pick } = useLanguage();
  const searchParams = useSearchParams();
  const [selection, setSelection] = useState<Selection>(() =>
    selectionFromParams(new URLSearchParams(searchParams.toString()), catalog, presets)
  );
  const [copied, setCopied] = useState(false);

  // Keep the URL in sync so the build can be shared as a link.
  useEffect(() => {
    const query = selectionToQuery(selection);
    window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
  }, [selection]);

  const categories = COMPONENT_ORDER.filter(
    (category) => Object.keys(catalog[category] ?? {}).length > 0
  );
  const towerCategories = categories.filter((c) => !PERIPHERAL_CATEGORIES.includes(c));
  const peripheralCategories = categories.filter((c) => PERIPHERAL_CATEGORIES.includes(c));

  const chosen = useMemo(
    () =>
      COMPONENT_ORDER.flatMap((category) =>
        (selection[category] ?? []).flatMap((id) => {
          const item = catalog[category]?.[id];
          return item ? [{ ...item, id, category }] : [];
        })
      ),
    [selection, catalog]
  );

  const tower = sumPrices(chosen.filter((c) => !PERIPHERAL_CATEGORIES.includes(c.category)));
  const peripherals = sumPrices(chosen.filter((c) => PERIPHERAL_CATEGORIES.includes(c.category)));
  const parts: SelectedPart[] = chosen.map(({ category, ...item }) => ({ category, item }));
  const issues = checkCompatibility(parts);
  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");
  const powerDraw = estimatePowerDraw(parts);
  const psuWattage = parts.find((p) => p.category === "alimentation")?.item.wattage;
  const missing = ESSENTIAL_CATEGORIES.filter(
    (category) => categories.includes(category) && !chosen.some((c) => c.category === category)
  );

  const setSlot = (category: ComponentCategory, index: number, id: string) =>
    setSelection((prev) => {
      const slots = [...(prev[category] ?? [""])];
      slots[index] = id;
      return { ...prev, [category]: slots };
    });

  const addSlot = (category: ComponentCategory) =>
    setSelection((prev) => ({ ...prev, [category]: [...(prev[category] ?? []), ""] }));

  const removeSlot = (category: ComponentCategory, index: number) =>
    setSelection((prev) => ({
      ...prev,
      [category]: (prev[category] ?? []).filter((_, i) => i !== index),
    }));

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (permissions, insecure context): the URL bar still holds the link.
    }
  };

  const renderCategory = (category: ComponentCategory) => {
    const items = Object.entries(catalog[category] ?? {});
    const slots = selection[category]?.length ? selection[category] : [""];
    const multi = MULTI_SLOT_CATEGORIES.includes(category);
    const hasError = errors.some((issue) => issue.categories.includes(category));
    const hasWarning = warnings.some((issue) => issue.categories.includes(category));

    const renderOption = ([itemId, option]: [string, CatalogItem]) => {
      const conflict = conflictsWith(category, option, parts);
      const details = category === "screen" ? option.resolution : undefined;
      return (
        <option key={itemId} value={itemId}>
          {conflict && "⚠ "}
          {shortComponentName(option.name)}
          {details && ` · ${details}`}
          {option.price != null && ` — ${formatPrice(option.price)}`}
          {conflict && ` (${t.configurator.incompatible})`}
        </option>
      );
    };

    return (
      <Card
        key={category}
        hoverable={false}
        className={cn(
          "p-4",
          hasError ? "border-red-300 bg-red-50/40" : hasWarning && "border-gold-soft bg-gold/5"
        )}
      >
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold tracking-wide text-gold uppercase">
            {pick(COMPONENT_LABELS[category])}
          </span>
          {multi && slots.some(Boolean) && (
            <button
              type="button"
              onClick={() => addSlot(category)}
              className="text-[12px] font-semibold text-gold hover:underline"
            >
              + {t.configurator.add}
            </button>
          )}
        </div>

        <div className="space-y-3">
          {slots.map((id, index) => {
            const item: CatalogItem | undefined = id ? catalog[category]?.[id] : undefined;
            return (
              <div key={index}>
                <div className="flex items-center gap-2">
                  <select
                    value={id}
                    onChange={(e) => setSlot(category, index, e.target.value)}
                    title={item?.name}
                    className="w-full min-w-0 rounded-lg border border-line bg-white px-3 py-2 text-[13.5px] text-navy-950 focus:border-gold focus:outline-none"
                  >
                    <option value="">{t.configurator.choose}</option>
                    {groupItems(category, items).map(([group, entries]) =>
                      group ? (
                        <optgroup key={group} label={group}>
                          {entries.map(renderOption)}
                        </optgroup>
                      ) : (
                        entries.map(renderOption)
                      )
                    )}
                  </select>
                  {id && (
                    <button
                      type="button"
                      onClick={() => removeSlot(category, index)}
                      aria-label={t.configurator.remove}
                      title={t.configurator.remove}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-ink-faint transition-colors hover:border-gold hover:text-gold"
                    >
                      ×
                    </button>
                  )}
                </div>
                {item && <SpecChips item={item} className="mt-2 px-1" />}
                {item && (
                  <div className="mt-1.5 flex items-center gap-3 px-1 text-[12px]">
                    {item.price != null && (
                      <span className="font-semibold text-navy-900">{formatPrice(item.price)}</span>
                    )}
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold hover:underline"
                      >
                        {t.pcBuilder.viewOnAmazon}
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    );
  };

  return (
    <div>
      <Link
        href="/pc-builder"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-soft hover:text-gold"
      >
        ← {t.pcBuilder.back}
      </Link>

      <SectionHeading className="mt-8 mb-2">{t.configurator.title}</SectionHeading>
      <p className="mt-4 mb-8 max-w-2xl text-[14px] text-ink-soft">{t.configurator.subtitle}</p>

      <label className="mb-10 flex max-w-md flex-col gap-1.5">
        <span className="text-[12px] font-bold tracking-wide text-navy-950 uppercase">
          {t.configurator.startFrom}
        </span>
        <select
          defaultValue={searchParams.get(PRESET_PARAM) ?? ""}
          onChange={(e) => {
            const preset = presets.find((p) => p.slug === e.target.value);
            setSelection(preset ? selectionFromPreset(preset) : {});
          }}
          className="rounded-lg border border-line bg-white px-3 py-2 text-[13.5px] text-navy-950 focus:border-gold focus:outline-none"
        >
          <option value="">{t.configurator.startFromEmpty}</option>
          {presets.map((preset) => (
            <option key={preset.slug} value={preset.slug}>
              {preset.name}
            </option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <section>
            <SectionHeading as="h3" className="mb-4">
              {t.configurator.tower}
            </SectionHeading>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {towerCategories.map(renderCategory)}
            </div>
          </section>

          {peripheralCategories.length > 0 && (
            <section>
              <SectionHeading as="h3" className="mb-4">
                {t.configurator.peripherals}
              </SectionHeading>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {peripheralCategories.map(renderCategory)}
              </div>
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card hoverable={false}>
            <h4 className="mb-3 text-[12px] font-bold tracking-wide text-navy-950 uppercase">
              {t.configurator.summary}
            </h4>

            {chosen.length > 0 && (
              <ul className="mb-4 space-y-2 text-[12.5px]">
                {chosen.map((component, i) => (
                  <li key={`${component.category}-${i}`} className="flex justify-between gap-3">
                    <span className="min-w-0 truncate text-ink-soft" title={component.name}>
                      {shortComponentName(component.name)}
                    </span>
                    <span className="shrink-0 font-medium text-navy-900">
                      {component.price != null ? formatPrice(component.price) : "—"}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <dl className="space-y-2 border-t border-line pt-3 text-[13px]">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-faint">{t.pcBuilder.towerPrice}</dt>
                <dd className="font-medium text-navy-900">{formatPrice(tower)}</dd>
              </div>
              {peripherals > 0 && (
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-faint">{t.pcBuilder.peripheralsPrice}</dt>
                  <dd className="font-medium text-navy-900">{formatPrice(peripherals)}</dd>
                </div>
              )}
              <div className="flex justify-between gap-4 border-t border-line pt-2">
                <dt className="font-semibold text-navy-950">{t.pcBuilder.totalBudget}</dt>
                <dd className="text-[17px] font-bold text-gold">
                  {formatPrice(sumPrices([{ price: tower }, { price: peripherals }]))}
                </dd>
              </div>
            </dl>

            <div
              className={cn(
                "mt-4 rounded-lg px-3 py-2 text-[12.5px]",
                missing.length ? "bg-gold/10 text-navy-900" : "bg-line-soft text-ink-soft"
              )}
            >
              {missing.length
                ? `${t.configurator.missing} : ${missing.map((c) => pick(COMPONENT_LABELS[c]).toLowerCase()).join(", ")}`
                : t.configurator.complete}
            </div>

            {powerDraw != null && (
              <div className="mt-2 flex justify-between gap-4 px-1 text-[12.5px]">
                <span className="text-ink-faint">{t.configurator.powerDraw}</span>
                <span className="font-medium text-navy-900">
                  ≈ {powerDraw} W{psuWattage ? ` / ${psuWattage} W` : ""}
                </span>
              </div>
            )}

            {parts.some((p) => p.category === "processor" || p.category === "motherboard") && (
              <div
                className={cn(
                  "mt-2 rounded-lg px-3 py-2 text-[12.5px]",
                  errors.length
                    ? "bg-red-50 text-red-800"
                    : warnings.length
                      ? "bg-gold/10 text-navy-900"
                      : "bg-line-soft text-ink-soft"
                )}
              >
                {errors.length > 0 && (
                  <>
                    <p className="font-semibold">⚠ {t.configurator.incompatibleTitle}</p>
                    <ul className="mt-1 list-disc space-y-0.5 pl-4">
                      {errors.map((issue, i) => (
                        <li key={i}>{pick(issue.message)}</li>
                      ))}
                    </ul>
                  </>
                )}
                {warnings.length > 0 && (
                  <ul className={cn("space-y-0.5", errors.length > 0 && "mt-2")}>
                    {warnings.map((issue, i) => (
                      <li key={i}>⚡ {pick(issue.message)}</li>
                    ))}
                  </ul>
                )}
                {issues.length === 0 && `✓ ${t.configurator.compatible}`}
              </div>
            )}

            <button
              type="button"
              onClick={copyLink}
              disabled={chosen.length === 0}
              className="mt-4 w-full rounded-full bg-gold px-5 py-2.5 text-[13px] font-semibold text-navy-950 transition-colors hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copied ? t.configurator.copied : t.configurator.copyLink}
            </button>
            <p className="mt-2 text-center text-[11.5px] leading-relaxed text-ink-faint">
              {t.configurator.shareHint}
            </p>

            {chosen.length > 0 && (
              <button
                type="button"
                onClick={() => setSelection({})}
                className="mt-3 w-full text-[12px] font-medium text-ink-soft hover:text-gold"
              >
                {t.configurator.reset}
              </button>
            )}
          </Card>

          <p className="mt-4 text-[11.5px] leading-relaxed text-ink-faint">
            {t.configurator.disclaimer}
          </p>
          <p className="mt-2 text-[11.5px] leading-relaxed text-ink-faint">
            {t.pcBuilder.affiliateNotice}
          </p>
        </aside>
      </div>
    </div>
  );
}
