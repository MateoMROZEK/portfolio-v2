import Image from "next/image";
import { Montserrat } from "next/font/google";
import "./assets/css/globals.css";
import "./assets/libs/devicon/devicon.min.css";
import type { Metadata } from "next";

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

export default function Home() {
  const dateActuelle: Date = new Date();
  const age = dateActuelle.getFullYear() - 2001;

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
                  <div className="mb-8">
                    <h3
                      className={
                        montserrat_black.className +
                        " text-mateo nom-service font-bold"
                      }
                    >
                      Qui suis-je ?
                    </h3>
                    {/* <h4 className="text-mateo font-bold"></h4> */}

                    <p className="text-white">
                      Je suis Matéo, j&#39;ai {age} ans, je suis développeur web
                      autodidacte depuis 2012. Créateur de gros projet,
                      personnels, comme professionnels. Chaque projet sur lequel
                      je travaille est une extension de ma curiosité, me
                      poussant à résoudre des problèmes de manière innovante.
                      Outre le développement web, j&#39;ai comme passion
                      l&#39;informatique. L&#39;installation, la configuration
                      d&#39;ordinateur sont des missions du quotidienne.
                    </p>
                  </div>
                  <div className="mb-8">
                    <h3
                      className={
                        montserrat_black.className +
                        " text-mateo nom-service font-bold"
                      }
                    >
                      Mes études
                    </h3>
                    <p className="text-white">
                      Après la 3ème, je choisi la filière professionnelle pour
                      des études de Géomètre Topographe, car l&#39;informatique
                      ainsi que le développement sont des simples passions.
                      J&#39;obtiens le BEP ainsi que le Bac Pro. Je continue
                      ainsi mes études dans le domaine du Travaux Publics,
                      j&#39;obtiens donc le BTS en 2022.
                    </p>
                  </div>
                  <div className="mb-8">
                    <h3
                      className={
                        montserrat_black.className +
                        " text-mateo nom-service font-bold"
                      }
                    >
                      Après les études
                    </h3>
                    <p className="text-white">
                      À partir de juillet 2022, je commence à faire de nombreux
                      gros projets du Web. Je travaille également dans le
                      domaine des Travaux Publics jusqu&#39;en juin 2023. Enfin,
                      dès octobre 2023, je commence à travailler dans
                      l&#39;informatique dans un Lycée. Je gère donc tout le
                      parc informatique du lycée.
                    </p>
                  </div>

                  <div className="mb-8">
                    <h3
                      className={
                        montserrat_black.className +
                        " text-mateo nom-service font-bold"
                      }
                    >
                      L&#39;avenir
                    </h3>
                    <p className="text-white">
                      Il est dur de prédire l&#39;avenir, mais mon rêve serait
                      de travailler dans l&#39;un de mes domaines (Web,
                      Informatique et le TP), aux États-Unis ou au Canada.
                    </p>
                  </div>
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
                  <div className="mb-8">
                    <h3
                      className={
                        montserrat_black.className +
                        " text-white nom-service2 font-bold"
                      }
                    >
                      Développeur pour le YouTuber Garryschool
                    </h3>
                    <h4
                      className={montserrat_regular.className + " text-white"}
                    >
                      Juillet 2023 - Septembre 2023
                    </h4>
                  </div>
                  <div className="mb-8">
                    <h3
                      className={
                        montserrat_black.className +
                        " text-white nom-service2 font-bold"
                      }
                    >
                      Développeur pour l’association Elkir
                    </h3>
                    <h4
                      className={montserrat_regular.className + " text-white"}
                    >
                      Juin 2020 - Octobre 2023
                    </h4>
                  </div>
                  <div className="mb-8">
                    <h3
                      className={
                        montserrat_black.className +
                        " text-white nom-service2 font-bold"
                      }
                    >
                      Bénévolat au Secours Populaires à Carvin
                    </h3>
                    <h4
                      className={montserrat_regular.className + " text-white"}
                    >
                      Juin 2019
                    </h4>
                  </div>
                  <div className="mb-8">
                    <h3
                      className={
                        montserrat_black.className +
                        " text-white nom-service2 font-bold"
                      }
                    >
                      Développeur pour l’entreprise Badblock
                    </h3>
                    <h4
                      className={montserrat_regular.className + " text-white"}
                    >
                      Juillet 2017 - Mars 2020
                    </h4>
                  </div>
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
                  <div className="mb-8">
                    <h3
                      className={
                        montserrat_black.className +
                        " text-mateo nom-service font-bold"
                      }
                    >
                      BTS TRAVAUX PUBLICS
                    </h3>
                    <h4
                      className={
                        montserrat_semiblack.className + " text-mateo font-bold"
                      }
                    >
                      Lycée Louis Pasteur - Henin Beaumont
                    </h4>
                    <p className={montserrat_regular.className + " text-white"}>
                      Obtention du BTS TP en Juillet 2022
                    </p>
                  </div>
                  <div className="mb-8">
                    <h3
                      className={
                        montserrat_black.className +
                        " text-mateo nom-service font-bold"
                      }
                    >
                      BAC PRO T.G.T.
                    </h3>
                    <h4
                      className={
                        montserrat_semiblack.className + " text-mateo font-bold"
                      }
                    >
                      Lycée Louis Pasteur - Henin Beaumont
                    </h4>
                    <p className={montserrat_regular.className + " text-white"}>
                      Obtention du Bac Pro Technicien Géomètre Topographe en
                      Juillet 2020. BEP en 2019.{" "}
                    </p>
                  </div>
                  <div className="mb-8">
                    <h3
                      className={
                        montserrat_black.className +
                        " text-mateo nom-service font-bold"
                      }
                    >
                      BREVET DES COLLÈGES
                    </h3>
                    <h4
                      className={
                        montserrat_semiblack.className + " text-mateo font-bold"
                      }
                    >
                      Collège Léonard de Vinci - Carvin
                    </h4>
                    <p className={montserrat_regular.className + " text-white"}>
                      Obtention du Brevet des collèges en juillet 2017.
                    </p>
                  </div>
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
                      {/* Web */}
                      <div className="relative group flex flex-col items-center justify-center aspect-square bg-[#7e2e2a] rounded-xl z-0 hover:bg-[#33201f] transition duration-300 ease-in-out w-20 flex-none lg:flex-1">
                        <i className="devicon-html5-plain text-[34px] md:text-[50px]"></i>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                          <p
                            className={
                              montserrat_black.className + " text-white"
                            }
                          >
                            HTML5
                          </p>
                        </div>
                      </div>
                      <div className="relative group flex flex-col items-center justify-center aspect-square bg-[#7e2e2a] rounded-xl z-0 hover:bg-[#33201f] transition duration-300 ease-in-out w-20 flex-none lg:flex-1">
                        <i className="devicon-css3-plain text-[34px] md:text-[50px]"></i>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                          <p
                            className={
                              montserrat_black.className + " text-white"
                            }
                          >
                            CSS3
                          </p>
                        </div>
                      </div>
                      <div className="relative group flex flex-col items-center justify-center aspect-square bg-[#7e2e2a] rounded-xl z-0 hover:bg-[#33201f] transition duration-300 ease-in-out w-20 flex-none lg:flex-1">
                        <i className="devicon-php-plain text-[34px] md:text-[50px]"></i>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                          <p
                            className={
                              montserrat_black.className + " text-white"
                            }
                          >
                            PHP
                          </p>
                        </div>
                      </div>
                      <div className="relative group flex flex-col items-center justify-center aspect-square bg-[#7e2e2a] rounded-xl z-0 hover:bg-[#33201f] transition duration-300 ease-in-out w-20 flex-none lg:flex-1">
                        <i className="devicon-mysql-plain text-[34px] md:text-[50px]"></i>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                          <p
                            className={
                              montserrat_black.className + " text-white"
                            }
                          >
                            MySQL
                          </p>
                        </div>
                      </div>
                      <div className="relative group flex flex-col items-center justify-center aspect-square bg-[#7e2e2a] rounded-xl z-0 hover:bg-[#33201f] transition duration-300 ease-in-out w-20 flex-none lg:flex-1">
                        <i className="devicon-codeigniter-plain text-[34px] md:text-[50px]"></i>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                          <p
                            className={
                              montserrat_black.className + " text-white"
                            }
                          >
                            CodeIgniter 4
                          </p>
                        </div>
                      </div>
                      <div className="relative group flex flex-col items-center justify-center aspect-square bg-[#7e2e2a] rounded-xl z-0 hover:bg-[#33201f] transition duration-300 ease-in-out w-20 flex-none lg:flex-1">
                        <i className="devicon-javascript-plain text-[34px] md:text-[50px]"></i>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                          <p
                            className={
                              montserrat_black.className + " text-white"
                            }
                          >
                            JavaScript
                          </p>
                        </div>
                      </div>

                      {/* Web Design */}
                      <div className="relative group flex flex-col items-center justify-center aspect-square bg-[#7e2e2a] rounded-xl z-0 hover:bg-[#33201f] transition duration-300 ease-in-out w-20 flex-none lg:flex-1">
                        <i className="devicon-figma-plain text-[34px] md:text-[50px]"></i>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                          <p
                            className={
                              montserrat_black.className + " text-white"
                            }
                          >
                            Figma
                          </p>
                        </div>
                      </div>
                      <div className="relative group flex flex-col items-center justify-center aspect-square bg-[#7e2e2a] rounded-xl z-0 hover:bg-[#33201f] transition duration-300 ease-in-out w-20 flex-none lg:flex-1">
                        <i className="devicon-tailwindcss-original-wordmark text-[34px] md:text-[50px]"></i>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                          <p
                            className={
                              montserrat_black.className + " text-white"
                            }
                          >
                            Tailwind CSS
                          </p>
                        </div>
                      </div>
                      <div className="relative group flex flex-col items-center justify-center aspect-square bg-[#7e2e2a] rounded-xl z-0 hover:bg-[#33201f] transition duration-300 ease-in-out w-20 flex-none lg:flex-1">
                        <i className="devicon-bootstrap-plain text-[34px] md:text-[50px]"></i>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                          <p
                            className={
                              montserrat_black.className + " text-white"
                            }
                          >
                            Bootstrap
                          </p>
                        </div>
                      </div>

                      {/* Web Node.js */}
                      <div className="relative group flex flex-col items-center justify-center aspect-square bg-[#7e2e2a] rounded-xl z-0 hover:bg-[#33201f] transition duration-300 ease-in-out w-20 flex-none lg:flex-1">
                        <i className="devicon-nextjs-plain text-[34px] md:text-[50px]"></i>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                          <p
                            className={
                              montserrat_black.className + " text-white"
                            }
                          >
                            Next.js
                          </p>
                        </div>
                      </div>
                      <div className="relative group flex flex-col items-center justify-center aspect-square bg-[#7e2e2a] rounded-xl z-0 hover:bg-[#33201f] transition duration-300 ease-in-out w-20 flex-none lg:flex-1">
                        <i className="devicon-nodejs-plain text-[34px] md:text-[50px]"></i>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                          <p
                            className={
                              montserrat_black.className + " text-white"
                            }
                          >
                            Node.js
                          </p>
                        </div>
                      </div>
                      <div className="relative group flex flex-col items-center justify-center aspect-square bg-[#7e2e2a] rounded-xl z-0 hover:bg-[#33201f] transition duration-300 ease-in-out w-20 flex-none lg:flex-1">
                        <i className="devicon-react-plain text-[34px] md:text-[50px]"></i>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                          <p
                            className={
                              montserrat_black.className + " text-white"
                            }
                          >
                            React
                          </p>
                        </div>
                      </div>
                      <div className="relative group flex flex-col items-center justify-center aspect-square bg-[#7e2e2a] rounded-xl z-0 hover:bg-[#33201f] transition duration-300 ease-in-out w-20 flex-none lg:flex-1">
                        <i className="devicon-typescript-plain text-[34px] md:text-[50px]"></i>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                          <p
                            className={
                              montserrat_black.className + " text-white"
                            }
                          >
                            TypeScript
                          </p>
                        </div>
                      </div>
                      <div className="relative group flex flex-col items-center justify-center aspect-square bg-[#7e2e2a] rounded-xl z-0 hover:bg-[#33201f] transition duration-300 ease-in-out w-20 flex-none lg:flex-1">
                        <i className="devicon-discordjs-plain text-[34px] md:text-[50px]"></i>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                          <p
                            className={
                              montserrat_black.className + " text-white"
                            }
                          >
                            Discord.js
                          </p>
                        </div>
                      </div>
                      {/* Informatique */}
                      <div className="relative group flex flex-col items-center justify-center aspect-square bg-[#7e2e2a] rounded-xl z-0 hover:bg-[#33201f] transition duration-300 ease-in-out w-20 flex-none lg:flex-1">
                        <i className="devicon-linux-plain text-[34px] md:text-[50px]"></i>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                          <p
                            className={
                              montserrat_black.className + " text-white"
                            }
                          >
                            Linux
                          </p>
                        </div>
                      </div>
                      <div className="relative group flex flex-col items-center justify-center aspect-square bg-[#7e2e2a] rounded-xl z-0 hover:bg-[#33201f] transition duration-300 ease-in-out w-20 flex-none lg:flex-1">
                        <i className="devicon-debian-plain text-[34px] md:text-[50px]"></i>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                          <p
                            className={
                              montserrat_black.className + " text-white"
                            }
                          >
                            Debian
                          </p>
                        </div>
                      </div>
                      <div className="relative group flex flex-col items-center justify-center aspect-square bg-[#7e2e2a] rounded-xl z-0 hover:bg-[#33201f] transition duration-300 ease-in-out w-20 flex-none lg:flex-1">
                        <i className="devicon-ubuntu-plain text-[34px] md:text-[50px]"></i>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                          <p
                            className={
                              montserrat_black.className + " text-white"
                            }
                          >
                            Ubuntu
                          </p>
                        </div>
                      </div>
                      <div className="relative group flex flex-col items-center justify-center aspect-square bg-[#7e2e2a] rounded-xl z-0 hover:bg-[#33201f] transition duration-300 ease-in-out w-20 flex-none lg:flex-1">
                        <i className="devicon-windows8-plain text-[34px] md:text-[50px]"></i>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                          <p
                            className={
                              montserrat_black.className + " text-white"
                            }
                          >
                            Windows
                          </p>
                        </div>
                      </div>
                      <div className="relative group flex flex-col items-center justify-center aspect-square bg-[#7e2e2a] rounded-xl z-0 hover:bg-[#33201f] transition duration-300 ease-in-out w-20 flex-none lg:flex-1">
                        <i className="devicon-bash-plain text-[34px] md:text-[50px]"></i>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                          <p
                            className={
                              montserrat_black.className + " text-white"
                            }
                          >
                            Bash
                          </p>
                        </div>
                      </div>
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
