"use client";

import { useLanguage } from "@/context/LanguageProvider";
import cv from "@/data/cv.json";

const EMAIL = cv.identity.email;

export function Footer() {
  const { t, pick } = useLanguage();

  return (
    <footer className="mt-20 border-t-[3px] border-gold bg-navy-950 py-8 text-center text-white">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="text-sm font-bold tracking-[0.2em]">{cv.identity.name.toUpperCase()}</div>
        <div className="mt-2 text-xs tracking-wide text-gold-soft">
          {pick(cv.identity.title)}
        </div>
        <div className="mt-4 flex justify-center gap-5 text-sm">
          <a
            href="https://github.com/MateoMROZEK"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 transition-colors hover:text-gold"
          >
            GitHub
          </a>
          <a
            href="https://x.com/MateoMROZEK"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 transition-colors hover:text-gold"
          >
            X / Twitter
          </a>
          <a

            href="https://amzn.to/4wIZ71d"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 transition-colors hover:text-gold">Amazon Partner</a>
        </div>
        <p className="mt-5 text-[11px] text-white/40">
          © 2012–{new Date().getFullYear()} {cv.identity.name} · {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
