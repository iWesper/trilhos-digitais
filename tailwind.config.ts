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
          DEFAULT: "#5D439A",
        },
        secondary: {
          DEFAULT: "#93CAF2",
        },
        tertiary: {
          DEFAULT: "#FFB402",
        }
      }
    },
  },
  plugins: [],
};
export default config;
