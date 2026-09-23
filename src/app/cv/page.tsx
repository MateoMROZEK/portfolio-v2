import type { Metadata } from "next";
import { CvContent } from "@/components/cv/CvContent";
import { getAge } from "@/lib/age";

export const metadata: Metadata = {
  title: "Mateo Mrozek — CV",
  description:
    "CV de Mateo Mrozek : parcours, formation et compétences en développement web et informatique.",
};

export default function CvPage() {
  // Age is computed server-side so the birth date itself never reaches the client bundle.
  const age = getAge("2001-03-18");

  return <CvContent age={age} />;
}
