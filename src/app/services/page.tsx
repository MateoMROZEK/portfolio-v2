import type { Metadata } from "next";
import { ServicesContent } from "@/components/services/ServicesContent";

export const metadata: Metadata = {
  title: "Mateo M. — Services",
  description: "Services de développement web proposés par Mateo M.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
