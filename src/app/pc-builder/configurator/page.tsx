import type { Metadata } from "next";
import { Suspense } from "react";
import { PCConfigurator, type ConfiguratorPreset } from "@/components/pc-builder/PCConfigurator";
import { COMPONENT_CATALOG, PC_BUILDS } from "@/lib/pcbuilder";

export const metadata: Metadata = {
  title: "Mateo M. — Concepteur de PC",
  description:
    "Composez votre PC sur mesure à partir des composants sélectionnés par Mateo M., avec le prix total en direct.",
};

export default function ConfiguratorPage() {
  const presets: ConfiguratorPreset[] = PC_BUILDS.map((build) => ({
    slug: build.slug,
    name: build.name,
    components: build.components.map(({ category, id }) => ({ category, id })),
  }));

  return (
    // The configurator reads its state from the URL (useSearchParams), which needs a Suspense boundary.
    <Suspense>
      <PCConfigurator catalog={COMPONENT_CATALOG} presets={presets} />
    </Suspense>
  );
}
