import type { Metadata } from "next";
import pcbuilder from "public/pcbuilder.json";
import { notFound } from "next/navigation";
import { PCBuildDetail } from "@/components/pc-builder/PCBuildDetail";
import type { PCBuild } from "@/lib/pcbuilder";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const build = (pcbuilder.projects as PCBuild[]).find((b) => b.slug === slug);

  if (!build) {
    return { title: "Configuration PC — Mateo M.", description: "Configuration introuvable" };
  }

  const description = build.lite_description ?? build.description ?? `Configuration ${build.name}`;
  const image = build.image[0] ?? "/logo.png";

  return {
    title: `Mateo M. — ${build.name}`,
    description,
    openGraph: {
      title: `Mateo M. — ${build.name}`,
      description,
      images: [{ url: image, alt: build.name }],
    },
  };
}

export default async function PCBuildPage({ params }: Props) {
  const { slug } = await params;
  const build = (pcbuilder.projects as PCBuild[]).find((b) => b.slug === slug);

  if (!build) {
    notFound();
  }

  return <PCBuildDetail build={build} />;
}
