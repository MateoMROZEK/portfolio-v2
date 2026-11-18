"use client";

import { cn } from "@heroui/react";
import { useLanguage } from "@/context/LanguageProvider";
import { formatPrice, type CatalogItem } from "@/lib/pcbuilder";

/** Market price of a part, with its MSRP and the gap between both when known. */
export function PartPrice({
  item,
  className,
}: {
  item: Pick<CatalogItem, "price" | "msrp" | "msrp_currency" | "available">;
  className?: string;
}) {
  const { t } = useLanguage();
  if (item.price == null) return null;

  // A gap between a euro price and a dollar MSRP would be meaningless.
  const gap =
    item.msrp && !item.msrp_currency
      ? Math.round(((item.price - item.msrp) / item.msrp) * 100)
      : null;

  return (
    <span className={cn("inline-flex flex-wrap items-center gap-x-2 gap-y-0.5", className)}>
      <span className="font-semibold text-navy-900">{formatPrice(item.price)}</span>
      {item.available === false && (
        <span className="text-[11px] text-ink-faint">{t.pcBuilder.lastKnownPrice}</span>
      )}
      {item.msrp != null && (
        <span className="text-[11px] text-ink-faint">
          {t.pcBuilder.msrp} {formatPrice(item.msrp, item.msrp_currency)}
          {gap != null && gap !== 0 && (
            <span
              className={cn(
                "ml-1.5 rounded-full px-1.5 py-px font-semibold",
                gap < 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
              )}
            >
              {gap > 0 ? "+" : ""}
              {gap} %
            </span>
          )}
        </span>
      )}
    </span>
  );
}
