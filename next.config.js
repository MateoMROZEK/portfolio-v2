/** @type {import('next').NextConfig} */
const nextConfig = {
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
