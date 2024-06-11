import { DEFAULT } from "@react-three/fiber/dist/declarations/src/core/utils";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#000",
          100: "#000411"
        },
        white: {
          DEFAULT: "#fff",
          100: "#FAF2E7"
        },
        primary: {
          DEFAULT: "#87BE42", //VERDE
        },
        secondary: {
          DEFAULT: "#456FB5", //AZUL NORMAL
        },
        tertiary: {
          DEFAULT: "#F59C1B", //LARANJA
        },
        quaternary: {
          DEFAULT: "#87529C", //ROXO
        },
        quinternary: {
          DEFAULT:"#122B3E", //AZUL MARINHO
        },
        senary: {
          DEFAULT: "#FCE3C1", //BEJE
        },
      }
    },
  },
  plugins: [],
};
export default config;
