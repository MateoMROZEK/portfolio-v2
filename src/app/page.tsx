import type { Metadata } from "next";
import cv from "public/cv.json";

export const metadata: Metadata = {
  title: "Mateo M. - Développeur / Informaticien",
  description: "Site officiel de Mateo M. Développeur Web et Informaticien depuis 2013.",
};

const getAge = (birthDate: string) => {
  const birth = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

export default async function Home() {
  const age = getAge("2001-03-18");
  return (
    <div className="space-y-16">
      {/* Section À propos */}
      <section>
        <h2 className="text-3xl font-bold text-mateo-primary mb-6">About me</h2>
        <div className="space-y-8">
          {cv.about.map((item, index) => (
            <div
              key={index}
              className="bg-mateo-unique/80 p-6 rounded-xl shadow-lg backdrop-blur-md"
            >
              <h3 className="text-xl font-semibold text-mateo-primary mb-2">{item.name}</h3>
              <p className="text-text-primary leading-relaxed">
                {item.description.replace("{age}", age.toString())}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section Diplômes */}
      <section>
        <h2 className="text-3xl font-bold text-mateo-primary mb-6">Education</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {cv.diplomes.map((diplome, index) => (
            <div
              key={index}
              className="bg-mateo-unique/80 p-6 rounded-xl shadow-lg backdrop-blur-md"
            >
              <h3 className="text-xl font-semibold text-mateo-primary">{diplome.name}</h3>
              <p className="text-text-primary">
                {diplome.school} - {diplome.city}
              </p>
              <p className="mt-2 text-text-primary">{diplome.about}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section Expériences */}
      <section>
        <h2 className="text-3xl font-bold text-mateo-primary mb-6">Experiences</h2>
        <div className="space-y-4">
          {cv.other.map((exp, index) => (
            <div
              key={index}
              className="bg-mateo-unique/80 p-4 rounded-lg shadow-md backdrop-blur-md flex justify-between items-center"
            >
              <span className="text-text-primary font-medium">{exp.name}</span>
              <span className="text-text-primary/70 italic">{exp.dates}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section Compétences */}
      <section>
        <h2 className="text-3xl font-bold text-mateo-primary mb-6">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {cv.competences.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-mateo-unique/80 rounded-xl shadow-md backdrop-blur-md hover:scale-105 transition-transform"
            >
              <i className={`${skill.icon} text-4xl text-mateo-primary mb-2`}></i>
              <span className="text-text-primary text-center text-sm">{skill.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
