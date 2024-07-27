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

  const response = await axios.get("http://localhost:3000/cv.json");
  const cvApi = response.data as Root;

  const replaceAgePlaceholder = (text: string, age: string) => {
    return text.replace("{age}", age);
  };
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
          <div className="w-full grid p-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
            <div className="mateo-row-bg1 bg-grid-secondary w-full">
              <div className="mateo-row-bg1 bg-grid-primary mb-8">
                <div className="relative w-[7rem] h-12">
                  <h2
                    className={
                      montserrat_black.className +
                      " transform -rotate-90 absolute categorie uppercase"
                    }
                  >
                    A propos
                  </h2>
                </div>

                <div className="categorie-item" id="a-propos">
                  {cvApi.about.map((about) => (
                    <>
                      <div className="mb-8">
                        <h3
                          className={
                            montserrat_black.className +
                            " text-mateo nom-service font-bold"
                          }
                        >
                          {about.name}
                        </h3>
                        {/* <h4 className="text-mateo font-bold"></h4> */}

                        <p className="text-white">
                          {replaceAgePlaceholder(about.description, age)}
                        </p>
                      </div>
                    </>
                  ))}
                </div>
              </div>
              <div className="mateo-row-bg1 mb-12">
                <div className="relative w-12 h-12">
                  <h2
                    className={
                      montserrat_black.className +
                      " transform -rotate-90 absolute categorie2 uppercase font-bold"
                    }
                  >
                    Autre
                  </h2>
                </div>

                <div className="categorie-item2">
                  {cvApi.other.map((other) => (
                    <>
                      <div className="mb-8">
                        <h3
                          className={
                            montserrat_black.className +
                            " text-white nom-service2 font-bold"
                          }
                        >
                          {other.name}
                        </h3>
                        <h4
                          className={
                            montserrat_regular.className + " text-white"
                          }
                        >
                          {other.dates}
                        </h4>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full diplomes">
              <div className="mateo-row-bg2 bg-grid-primary">
                <div className="relative w-12 h-12">
                  <h2
                    className={
                      montserrat_black.className +
                      " transform -rotate-90 absolute categorie3 uppercase font-bold"
                    }
                  >
                    Diplômes
                  </h2>
                </div>

                <div className="categorie-item3">
                  {cvApi.diplomes.reverse().map((diplome) => (
                    <>
                      <div className="mb-8">
                        <h3
                          className={
                            montserrat_black.className +
                            " text-mateo nom-service font-bold"
                          }
                        >
                          {diplome.name}
                        </h3>
                        <h4
                          className={
                            montserrat_semiblack.className +
                            " text-mateo font-bold"
                          }
                        >
                          {diplome.school} - {diplome.city}
                        </h4>
                        <p
                          className={
                            montserrat_regular.className + " text-white"
                          }
                        >
                          {diplome.about}
                        </p>
                      </div>
                    </>
                  ))}
                </div>
              </div>
              <div className="mt-[-32px]">
                <div className="bg-grid-primary w-full diplomes">
                  <div className="mateo-row-bg3 bg-mateo-unique w-full custom2">
                    <h2
                      className={
                        montserrat_black.className +
                        " titre-competences uppercase font-bold text-mateo custom3 mb-5 text-[27px]"
                      }
                    >
                      Compétences
                    </h2>

                    <div className="flex grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-7 gap-2 custom-padding mt-[25px]">
                      {/* Competences */}
                      {cvApi.competences.map((competences) => (
                        <>
                          <div className="relative group flex flex-col items-center justify-center aspect-square bg-[#7e2e2a] rounded-xl z-0 hover:bg-[#33201f] transition duration-300 ease-in-out w-20 flex-none lg:flex-1">
                            <i
                              className={`${competences.icon} text-[34px] md:text-[50px]`}
                            ></i>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                              <p
                                className={
                                  montserrat_black.className +
                                  " text-white z-[1000]"
                                }
                              >
                                {competences.name}
                              </p>
                            </div>
                          </div>
                        </>
                      ))}
                      {/* End Competences */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
