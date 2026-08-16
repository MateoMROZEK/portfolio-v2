"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@heroui/react";
import { useLanguage } from "@/context/LanguageProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.projects, href: "/project" },
    { name: t.nav.pcBuilder, href: "/pc-builder" },
    { name: t.nav.services, href: "/services" },
    { name: t.nav.software, href: "/software" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-gold bg-navy-900/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6">
        <Link
          href="/"
          className="font-bold tracking-[0.08em] text-white"
          onClick={() => setIsOpen(false)}
        >
          {t.nav.brand}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative text-sm font-medium tracking-wide transition-colors",
                  isActive ? "text-gold" : "text-white/80 hover:text-gold-soft"
                )}
              >
                {item.name}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px bg-gold transition-all",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-label="Menu"
            className="flex h-9 w-9 items-center justify-center rounded-md text-gold-soft md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 h-px w-5 bg-current transition-all",
                  isOpen ? "top-[7px] rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[7px] h-px w-5 bg-current transition-opacity",
                  isOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-px w-5 bg-current transition-all",
                  isOpen ? "top-[7px] -rotate-45" : "top-[14px]"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10 bg-navy-950 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "rounded-md px-2 py-2.5 text-sm font-medium",
                    pathname === item.href ? "text-gold" : "text-white/85"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-2 border-t border-white/10 pt-3">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
