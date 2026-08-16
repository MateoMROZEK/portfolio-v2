import type { Metadata } from "next";
import pcbuilder from "public/pcbuilder.json";
import { PCBuildsGrid } from "@/components/pc-builder/PCBuildsGrid";

export const metadata: Metadata = {
  title: "Mateo M. — Configurations PC",
  description: "Configurations PC assemblées sur mesure par Mateo M., pour lui-même et ses clients.",
};

export default function PCBuilderPage() {
  return <PCBuildsGrid builds={pcbuilder.projects} />;
}
