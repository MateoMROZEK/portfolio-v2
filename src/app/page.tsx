import type { Metadata } from "next";
import { HomeContent } from "@/components/home/HomeContent";
import { getAge } from "@/lib/age";

export const metadata: Metadata = {
  title: "Mateo Mrozek — Technicien Informatique & Développeur Web",
  description: "Portfolio officiel de Mateo Mrozek, développeur web et technicien informatique depuis 2013.",
};

export default function Home() {
  // Age is computed server-side so the birth date itself never reaches the client bundle.
  const age = getAge("2001-03-18");

  return <HomeContent age={age} />;
}
