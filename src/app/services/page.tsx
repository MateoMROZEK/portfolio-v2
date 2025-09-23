import type { Metadata } from "next";
import cv from "public/cv.json";

export const metadata: Metadata = {
  title: "Mateo M. - Services",
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
        <h2 className="text-3xl font-bold text-mateo-primary mb-6">Services</h2>
        <div className="space-y-8">
          {cv.services.map((item, index) => (
            <div
              key={index}
              className="bg-mateo-unique/80 p-6 rounded-2xl shadow-xl backdrop-blur-md border border-mateo-unique/30 transform transition hover:scale-105 hover:shadow-2xl"
            >
              <h3 className="text-xl font-semibold text-mateo-primary mb-3">{item.name}</h3>

              <p
                className="text-text-primary leading-relaxed mb-4"
                dangerouslySetInnerHTML={{ __html: item.descriptionEN }}
              ></p>

              {/* Optionnel : fourchette de prix */}
              <div className="mt-2 text-sm text-mateo-primary font-medium">
                {item.minimumPrice && item.maximumPrice && (
                  <span>
                    Price: €{item.minimumPrice} - €{item.maximumPrice}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
