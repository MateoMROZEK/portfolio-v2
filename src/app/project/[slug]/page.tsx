// pages/project/[slug].js
import { Montserrat, Anonymous_Pro } from 'next/font/google';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Head from 'next/head'; // Import correct de 'next/head'

import { fetchData } from './../../../../utils/api';
import Image from 'next/image';
import './../../assets/css/globals.css';
import './../../assets/libs/devicon/devicon.min.css';

const montserrat_thin = Montserrat({ weight: ['100'], style: ['normal'], subsets: ['latin'] });
const montserrat_regular = Montserrat({ weight: ['400'], style: ['normal'], subsets: ['latin'] });
const montserrat_semiblack = Montserrat({ weight: ['700'], style: ['normal'], subsets: ['latin'] });
const montserrat_black = Montserrat({ weight: ['900'], style: ['normal'], subsets: ['latin'] });

const anonymouspro_regular = Anonymous_Pro({ weight: ['400'], style: ['normal'], subsets: ['latin'] });

import { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch data
  const product = await fetchData('https://mateo.cybrico.de/api.json');

  // Find the index of the project with the matching slug
  const projectIndex = product.projects.findIndex((p) => p.slug === params.slug);

  if (projectIndex === -1) {
    // Handle the case where the project with the given slug is not found
    throw new Error(`Project not found for slug: ${params.slug}`);
  }

  // Access the project directly using the index
  const project_item = product.projects[projectIndex];

  return {
    title: `Mateo M. - ${project_item.name}`,
    description: project_item.lite_description,
  };
}



export default async function ProjectPage({ params, searchParams }: { params: { slug: string } }) {
  const data = await fetchData('https://mateo.cybrico.de/api.json');

  const projects = data.projects;
// Fonction pour obtenir un tableau d'indices de projets uniques et aléatoires
function getRandomProjectsIndices(numProjects: number): number[] {
  const randomIndices: number[] = [];
  while (randomIndices.length < numProjects) {
    const randomIndex = Math.floor(Math.random() * projects.length);
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex);
    }
  }
  return randomIndices;
}

// Utilisez la fonction pour obtenir un tableau d'indices aléatoires
const randomIndices = getRandomProjectsIndices(6);

  return (
    <main className={montserrat_regular.className}>
      {data.projects.map((project, index) => (
        params.slug === project.slug && (
            <div className="flex flex-col gap-32 my-48 max-w-[1520px] px-10 mx-auto flex-1 w-full skewY-0">

              {/* Utilisation de Head pour les métadonnées */}

              <div className="relative p-5">
                <span className={`${anonymouspro_regular.className} nom-projet`}><b className={anonymouspro_regular.className}>[</b>{project.type_project}<b className={anonymouspro_regular.className}>]</b></span>
                <span className={`${montserrat_black.className} description-projet`}>{project.name}</span>
                <div className="flex flex-row gap-2">
                {project.technologie.map((technologies, index) => (
                  data.technologies.map((technologie, index2) => (
                    technologies === technologie.slug && (
                  <p className="text-[#ddd] text-sm bg-[#222] px-2 py-1 rounded-md">{technologie.name}</p>
                    )
                  ))
                ))}
                </div>
                <div className="flex flex-row gap-2 mt-4">
                  <p className="text-[#33201f] text-xl px-2 py-1">{project.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {
              project.other_images != null && (
              project.other_images.map((other_images, index) => (
                <div key={index} className={`relative group overflow-hidden bg-[#7e2e2a] hover:bg-[#33201f] rounded-[40px] w-full flex items-center justify-center z-0 col-span-1 aspect-square cursor-pointer lg:col-span-2 lg:aspect-auto`} tabIndex={0} style={{ transform: 'none' }}>
                  <canvas id={project.slug} className="absolute inset-0 z-[-1] w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-300" width="1024" height="600"></canvas>
                  <img alt="image" loading="lazy" width="1000" height="1000" decoding="async" data-nimg="1" className="w-full object-contain rounded-[40px]" src={`${other_images}&v=1`} style={{ color: 'transparent' }} />
                </div>
              )))}
              </div>

              {project.changelog != null && (
              <ol className="relative border-s border-[#7e2e2a]">
                {project.changelog.map((changelog, index) => (              
                <li className="mb-10 ms-4" key={index}>
                  <div className="absolute w-3 h-3 bg-[#7e2e2a] rounded-full mt-1.5 -start-1.5 border border-[#7e2e2a]"></div>
                  <time className={anonymouspro_regular.className + " mb-1 nom-projet text-[#33201f]"}>{changelog.date}</time>
                  <h3 className={montserrat_black.className + " description-projet text-[#33201f]"}>{changelog.name}</h3>
                  <p className="mb-4 text-xl font-normal text-[#33201f]">
                  {changelog.list.map((listItem, listIndex) => (
                    <span key={listIndex} className="flex w-full">• {listItem.text}</span>
                  ))}
                  </p>
                </li>
                ))}
              </ol>
              )}


            </div>
            )
          ))}

            <div className="mateo-grid bg-mateo-unique h-[100%]">
              <div className="flex flex-col gap-24 my-32 max-w-[1520px] px-6 mx-auto flex-1 w-full skewY-0 top-[-7rem] relative">
                <div className="w-full columns-1">
                  <h2 className={montserrat_black.className + " description-projet"}>Autres projets</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {randomIndices.map((index) => (
                  <div key={index} className="relative group overflow-hidden bg-[#7e2e2a] hover:bg-[#33201f] rounded-[40px] w-full flex items-center justify-center z-0 col-span-1 cursor-pointer lg:col-span-2" tabIndex={0} style={{ transform: 'none', aspectRatio: '1 / 0.3' }}>
                    <canvas id={projects[index].slug} className="absolute inset-0 z-[-1] w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-300" width="1024" height="600"></canvas>
                    <div className="absolute top-6 -right-full bg-white rounded-full p-2 group-hover:right-6 transition-all duration-300">
                      <Link key={index} href={`/project/${projects[index].slug}`}>
                      
                        <img alt="arrow" fetchPriority="high" width="1000" height="1000" decoding="async" data-nimg="1" className="w-7 h-7" src="/assets/icons/arrow.svg" style={{ color: 'transparent' }} />
                      
                      </Link>
                    </div>
                    <img alt="logo" loading="lazy" width="1000" height="1000" decoding="async" data-nimg="1" className="h-28 w-auto max-w-[200px] object-contain" src={`${projects[index].image}&v=1`} style={{ color: 'transparent' }} />
                    <div className="absolute bottom-5 text-white text-sm text-center uppercase">{projects[index].name}</div>
                  </div>
                  ))}
                </div>
              </div>
            </div>
    </main>
  );
}