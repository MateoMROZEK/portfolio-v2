import { heroui } from "@heroui/react";
import { type Config } from "tailwindcss";

const config = {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.tsx",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mateo: {
          primary: "#ff4d4f", // rouge vif
          secondary: "#8b0000", // rouge foncé
          unique: "#1a0f0f", // très sombre
        },
        text: {
          primary: "#f0e6e6", // clair sur sombre
        },
      },
      keyframes: {
        gradient: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
      },
      animation: {
        gradient: "gradient 20s ease infinite",
      },
    },
  },
  plugins: [heroui()],
} satisfies Config;

export default config;
