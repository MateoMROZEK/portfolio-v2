import { Card, CardBody, CardFooter, Divider, Chip, Link } from "@heroui/react";

type ProjectCardProps = {
  name: string;
  slug: string;
  released: boolean;
  description: string;
  release_type: string;
  categories: string[];
  projectLink?: string | null;
};

export default function ProjectCard({
  name,
  slug,
  released,
  description,
  release_type,
  categories,
  projectLink,
}: ProjectCardProps) {
  return (
    <Card className="relative max-w-[320px] bg-gradient-to-br from-mateo-secondary to-mateo-tertiary rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Corps de la card */}
      <CardBody className="flex flex-col gap-3 p-5">
        {/* Nom + chip release */}
        <div className="flex items-center justify-between">
          <h2 className="text-white text-lg font-bold truncate">{name}</h2>
          <Chip color={released ? "success" : "warning"} size="sm">
            {release_type}
          </Chip>
        </div>

        {/* Description */}
        <p className="text-white/90 text-sm">{description}</p>

        {/* Catégories */}
        <div className="flex flex-wrap gap-2 mt-2">
          {categories.map((cat, i) => (
            <Chip
              key={i}
              className="bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors duration-200"
              size="sm"
            >
              {cat.toUpperCase()}
            </Chip>
          ))}
        </div>
      </CardBody>

      {/* Footer avec lien */}
      <Divider className="border-white/20" />
      <CardFooter className="justify-center">
        <Link
          showAnchorIcon
          href={`project/${slug}`}
          className="text-white font-medium hover:text-mateo-accent transition-colors duration-200"
        >
          More information
        </Link>
      </CardFooter>
    </Card>
  );
}
