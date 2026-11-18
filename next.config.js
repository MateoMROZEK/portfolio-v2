/** @type {import('next').NextConfig} */
const nextConfig = {
  // PC builds renamed on 2026-11-18: keep the links already shared working.
  async redirects() {
    return [
      {
        source: "/pc-builder/kingdeath-computer-2026",
        destination: "/pc-builder/gaming-rtx-5070-ti-2026",
        permanent: true,
      },
      {
        source: "/pc-builder/kingdeath-computer-rtx-5080-2026",
        destination: "/pc-builder/gaming-rtx-5080-2026",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.oghub.fr",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.oghub.fr",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static-cdn.jtvnw.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tailwindui.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
