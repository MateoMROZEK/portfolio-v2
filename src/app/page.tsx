import Image from "next/image";
import { Montserrat } from "next/font/google";
import "./assets/css/globals.css";
import "./assets/libs/devicon/devicon.min.css";
import type { Metadata } from "next";
import axios from "axios";

export const metadata: Metadata = {
  title: "Mateo M. - Développeur / Informaticien",
  description:
    "Site officiel de Mateo M. Développeur Web et Informaticien depuis 2013.",
};

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

export interface Root {
  about: About[];
  diplomes: Diplome[];
  other: Other[];
  competences: Competence[];
}

export interface About {
  name: string;
  description: string;
}

export interface Diplome {
  name: string;
  school: string;
  city: string;
  about: string;
}

export interface Other {
  name: string;
  dates: string;
}

export interface Competence {
  name: string;
  icon: string;
}

export default async function Home() {
  const dateActuelle: Date = new Date();
  const age = dateActuelle.getFullYear() - 2001;

  //const response = await axios.get("https://mateo.oghub.fr/cv.json");
  //const cvApi = response.data as Root;

  const replaceAgePlaceholder = (text: string, age: number) => {
    return text.replace("{age}", String(age));
  };
  return (
    <main className={montserrat_regular.className}>
      <div className="flex flex-col gap-32 my-48 max-w-[1520px] px-10 mx-auto flex-1 w-full skewY-0">
        <div className="relative p-5">
          <span className={`${montserrat_thin.className} prenom`}>Mateo</span>
          <span className={`${montserrat_black.className} nom`}>MROZEK</span>
        </div>
      </div>
    </main>
  );
}
