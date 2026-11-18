export type GithubRepo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
};

type RawRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

/** GitHub data is refreshed at most once an hour (60 unauthenticated requests/hour per IP). */
const REVALIDATE_SECONDS = 3600;

/**
 * Public repositories of a GitHub organization, most recently pushed first (forks and archived
 * repos left out). Returns [] when GitHub is unreachable or rate-limited, so the page still renders.
 * Set GITHUB_TOKEN to raise the rate limit.
 */
export async function getOrgRepos(org: string): Promise<GithubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/orgs/${encodeURIComponent(org)}/repos?per_page=100&sort=pushed`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }),
        },
        next: { revalidate: REVALIDATE_SECONDS },
      }
    );
    if (!res.ok) return [];
    const repos = (await res.json()) as RawRepo[];
    return repos
      .filter((repo) => !repo.fork && !repo.archived)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        stars: repo.stargazers_count,
        pushedAt: repo.pushed_at,
      }));
  } catch {
    return [];
  }
}
