import type { Metadata } from "next";
import {
  Button,
  HeroUIProvider,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "./assets/libs/devicon/devicon.min.css";
import NavbarCustom from "../components/layouts/NavbarCustom";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "z3k.dev - Portfolio de Mateo Mrozek",
  description: "Développeur Web & Fullstack - Portfolio personnel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="bg-mateo-unique text-text-primary">
      <body className={`${inter.className} antialiased`}>
        <HeroUIProvider>
          <div className="relative min-h-screen flex flex-col overflow-hidden">
            {/* Background dégradé animé */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-mateo-primary via-mateo-unique to-mateo-secondary bg-[length:200%_200%] animate-gradient" />

            {/* Header moderne */}
            <NavbarCustom />

            {/* Main */}
            <main className="relative flex-1 z-10 max-w-6xl mx-auto w-full px-6 py-12">
              {children}
            </main>

            {/* Footer */}
            <footer className="w-full relative z-10 bg-mateo-unique/90 text-text-primary py-6 mt-12 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-mateo-secondary/30 via-transparent to-mateo-primary/20 opacity-50"></div>
              <div className="relative max-w-6xl mx-auto text-center">
                <p className="text-sm tracking-wider">
                  © 2013-{new Date().getFullYear()}{" "}
                  <span className="text-mateo-primary font-semibold">Mateo Mrozek</span> · All
                  rights reserved by z3k.dev
                </p>
                <div className="mt-2 flex justify-center gap-4 text-lg">
                  <a
                    href="https://github.com/MateoMROZEK"
                    target="_blank"
                    className="hover:text-mateo-primary transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://x.com/MateoMROZEK"
                    target="_blank"
                    className="hover:text-mateo-primary transition-colors"
                  >
                    X / Twitter
                  </a>
                  <a
                    href="mailto:contact@z3k.dev"
                    className="hover:text-mateo-primary transition-colors"
                  >
                    Email
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </HeroUIProvider>
      </body>
    </html>
  );
}
