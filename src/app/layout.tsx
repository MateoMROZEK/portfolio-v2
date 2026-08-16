import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageProvider";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { DEVICON_CSS_URL } from "@/lib/devicon";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Mateo Mrozek — Technicien Informatique & Développeur Web",
  description:
    "Portfolio de Mateo Mrozek, technicien informatique et développeur web depuis 2013.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={montserrat.variable}>
      <head>
        <link rel="stylesheet" href={DEVICON_CSS_URL} />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <LanguageProvider>
          <Navbar />
          <main className="mx-auto w-full max-w-[1440px] flex-1 px-6 py-12">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
