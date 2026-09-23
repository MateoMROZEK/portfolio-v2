import type { Metadata } from "next";
import { PCBuildsGrid } from "@/components/pc-builder/PCBuildsGrid";
import { PC_BUILDS } from "@/lib/pcbuilder";

export const metadata: Metadata = {
  title: "Mateo M. — Configurations PC",
  description: "Configurations PC pensées sur mesure par Mateo M., pour lui-même et ses clients.",
};

export default function PCBuilderPage() {
  return <PCBuildsGrid builds={PC_BUILDS} />;
}
