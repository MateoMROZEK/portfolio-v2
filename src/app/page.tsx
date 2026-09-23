import type { Metadata } from "next";
import api from "public/api.json";
import { HomeContent } from "@/components/home/HomeContent";
import { PC_BUILDS } from "@/lib/pcbuilder";

export const metadata: Metadata = {
  title: "Mateo Mrozek — Technicien Informatique & Développeur Web",
  description:
    "Mateo Mrozek, développeur web et technicien informatique depuis 2012 : projets, configurations PC sur mesure et services.",
};

const CAREER_START_YEAR = 2012;

export default function Home() {
  const released = api.projects.filter((project) => project.released);

  return (
    <HomeContent
      stats={{
        years: new Date().getFullYear() - CAREER_START_YEAR,
        projects: released.length,
        builds: PC_BUILDS.length,
      }}
      // api.json is in chronological order: the newest entries are last.
      latestProjects={released.slice(-3).reverse()}
      latestBuilds={PC_BUILDS.slice(-3).reverse()}
    />
  );
}
