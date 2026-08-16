import type { Metadata } from "next";
import { SoftwareContent } from "@/components/software/SoftwareContent";

export const metadata: Metadata = {
  title: "Mateo M. — Logiciels",
  description: "Logiciels développés par Mateo M.",
};

export default function SoftwarePage() {
  return <SoftwareContent />;
}
