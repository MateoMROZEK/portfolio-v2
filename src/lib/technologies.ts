/**
 * Maps api.json technology slugs to an official Devicon icon class.
 * Verified against devicon's published manifest (devicons/devicon) — only
 * slugs with a real matching icon get an entry; everything else renders
 * as a plain text chip (no fabricated/guessed icon classes).
 */
export const TECH_DEVICON_CLASS: Record<string, string> = {
  php8: "devicon-php-plain",
  php7: "devicon-php-plain",
  javascript: "devicon-javascript-plain",
  html: "devicon-html5-plain",
  css: "devicon-css3-plain",
  codeigniter3: "devicon-codeigniter-plain",
  codeigniter4: "devicon-codeigniter-plain",
  bootstrap5: "devicon-bootstrap-plain",
  mysql: "devicon-mysql-original",
  discordjs13: "devicon-discordjs-plain",
  discordjs14: "devicon-discordjs-plain",
  nodejs: "devicon-nodejs-plain",
  figma: "devicon-figma-plain",
  jquery: "devicon-jquery-plain",
  photoshop: "devicon-photoshop-plain",
  illustrator: "devicon-illustrator-plain",
  androidstudio: "devicon-androidstudio-plain",
  java: "devicon-java-plain",
  kotlin: "devicon-kotlin-plain",
  json: "devicon-json-plain",
  tailwindcss: "devicon-tailwindcss-original",
  typescript: "devicon-typescript-plain",
  reactjs: "devicon-react-original",
  next: "devicon-nextjs-plain",
  electronjs: "devicon-electron-original",
  // No official Devicon icon exists for: discord, api, nextauth, nextui,
  // heroui, http1, http1.1, http2, http3, grapejs — rendered as text only.
};

export function getTechDeviconClass(slug: string): string | undefined {
  return TECH_DEVICON_CLASS[slug.toLowerCase()];
}
