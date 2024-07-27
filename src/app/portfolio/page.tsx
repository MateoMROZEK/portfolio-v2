import { Montserrat } from "next/font/google";
import dynamic from "next/dynamic";
import Link from "next/link";

import Image from "next/image";

import { fetchData } from "./../../../utils/api";
import projects from "../../../public/api.json";
import "./../assets/css/globals.css";
import "./../assets/libs/devicon/devicon.min.css";

const montserrat_thin = Montserrat({
  weight: ["100"],
  style: ["normal"],
  subsets: ["latin"],
});
const montserrat_regular = Montserrat({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});
const montserrat_semiblack = Montserrat({
  weight: ["700"],
  style: ["normal"],
  subsets: ["latin"],
});
const montserrat_black = Montserrat({
  weight: ["900"],
  style: ["normal"],
  subsets: ["latin"],
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mateo M. - Portfolio",
  description:
    "Découvrez mon portfolio, là où je montre tous les projets auxquels j'ai participé. Développeur Web depuis 2013, j'ai réalisé de nombreux projets, mais seuls les plus gros projets sont affichés.",
};

export interface Root {
  projects: Project[];
  reviews: Review[];
  staffs: Staff[];
  clients: string[];
  technologies: Technology[];
}

export interface Project {
  name: string;
  slug: string;
  image: string;
  released: boolean;
  domain_url: string;
  release_type: string;
  release_date: string;
  lite_description: string;
  description: string;
  categorie: string[];
  changelog?: Changelog[];
  technologie: string[];
  columns: number;
  type_project: string;
  other_images?: string[];
}

export interface Changelog {
  name: string;
  date?: string;
  list: List[];
}

export interface List {
  text: string;
}

export interface Review {
  name: string;
  job: string;
  content: string;
  image: string;
  note: string[];
}

export interface Staff {
  name: string;
  job: string;
  icon: string;
}

export interface Technology {
  name: string;
  slug: string;
  icon: string;
}
export default async function PortfolioPage() {
  const data = projects as Root;
  return (
    <main className={montserrat_regular.className}>
      <div className="flex flex-col gap-32 my-48 max-w-[1520px] px-10 mx-auto flex-1 w-full skewY-0">
        <div className="relative p-5">
          <span className={`${montserrat_thin.className} prenom`}>Mateo</span>
          <span className={`${montserrat_black.className} nom`}>MROZEK</span>
        </div>
      </div>
      <div className="mateo-grid bg-mateo-unique h-[100%]">
        <div className="flex flex-col gap-24 my-32 max-w-[1520px] px-6 mx-auto flex-1 w-full skewY-0 top-[-7rem] relative">
          <div className="w-full columns-1">
            <h1 className={montserrat_black.className + " titre"}>Portfolio</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.projects.map((project, index) => (
              <div
                key={index}
                className={`relative group overflow-hidden bg-[#7e2e2a] hover:bg-[#33201f] rounded-[40px] w-full flex items-center justify-center z-0 col-span-1 aspect-square cursor-pointer ${
                  project.columns === 1 ? "" : "lg:col-span-2 lg:aspect-auto"
                }`}
                tabIndex={0}
                style={{ transform: "none" }}
              >
                <canvas
                  id={project.slug}
                  className="absolute inset-0 z-[-1] w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                  width="1024"
                  height="600"
                ></canvas>
                <div className="absolute top-6 -right-full bg-white rounded-full p-2 group-hover:right-6 transition-all duration-300">
                  <Link key={index} href={`/project/${project.slug}`}>
                    <Image
                      alt="arrow"
                      fetchPriority="high"
                      width="1000"
                      height="1000"
                      decoding="async"
                      data-nimg="1"
                      className="w-7 h-7"
                      src="/assets/icons/arrow.svg"
                      style={{ color: "transparent" }}
                    />
                  </Link>
                </div>
                <Image
                  alt="logo"
                  loading="lazy"
                  width="1000"
                  height="1000"
                  decoding="async"
                  data-nimg="1"
                  className="h-28 w-auto max-w-[200px] object-contain"
                  src={`${project.image}&v=1`}
                  style={{ color: "transparent" }}
                />
                <div className="absolute bottom-5 text-white text-sm text-center uppercase">
                  {project.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
