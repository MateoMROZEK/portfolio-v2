"use client";

import { useLanguage } from "@/context/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import type { GithubRepo } from "@/lib/github";

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  "C++": "#f34b7d",
  HTML: "#e34c26",
  CSS: "#563d7c",
  PHP: "#4F5D95",
};

export function GithubRepos({ org, repos }: { org: string; repos: GithubRepo[] }) {
  const { t, lang } = useLanguage();
  if (repos.length === 0) return null;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-4">
        <SectionHeading>{t.projects.githubRepos}</SectionHeading>
        <a
          href={`https://github.com/${org}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] font-semibold text-gold hover:underline"
        >
          github.com/{org} →
        </a>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {repos.map((repo) => (
          <Card key={repo.name} className="flex flex-col p-4">
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-bold text-navy-950 hover:text-gold"
            >
              {repo.name}
            </a>
            {repo.description && (
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">{repo.description}</p>
            )}
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-3 text-[11.5px] text-ink-faint">
              {repo.language && (
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? "#91959e" }}
                  />
                  {repo.language}
                </span>
              )}
              <span>★ {repo.stars}</span>
              <span>
                {t.projects.updatedOn.replace(
                  "{date}",
                  new Date(repo.pushedAt).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB")
                )}
              </span>
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  {repo.homepage.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
