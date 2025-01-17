import type { Config } from "tailwindcss"
const { fontFamily } = require("tailwindcss/defaultTheme")

const config = {
  darkMode: ["class"],
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        effra: ["Effra", "sans-serif"],
        tomatoes: ["Tomatoes", "sans-serif"],
        lovedays: ["LoveDays", "sans-serif"],
        beautifulEveryTime:["BeautifulEveryTime", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          foreground: "hsl(var(--tertiary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        hover: {
          DEFAULT: "hsl(var(--hover))",
          foreground: "hsl(var(--hover-foreground))",
          primary: "hsl(var(--hover-primary))",

        },
        golden: {
          DEFAULT: "hsl(var(--golden))",
          foreground: "hsl(var(--golden-foreground))",

        },
        
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        'comboioParallaxFundo1': "url('/img/comboio/comboioParallaxFundo1.svg')",
        'comboioParallaxFundo2': "url('/img/comboio/comboioParallaxFundo2.svg')",
        'comboioParallaxFundo3': "url('/img/comboio/comboioParallaxFundo3.svg')",
        'comboioParallaxFundo4': "url('/img/comboio/comboioParallaxFundo4.svg')",
        'comboioParallaxFundo5': "url('/img/comboio/comboioParallaxFundo5.svg')",
        'comboioParallaxEstacao': "url('/img/comboio/comboioParallaxEstacao.svg')",

        'BadgesBG': "url('/img/badges/fundo_badges.svg')",
        'quadroBadges': "url('/img/badges/quadroBadges.svg')",
        'papelBadges1': "url('/img/badges/fundo_badges_paper1.svg')",
        'papelBadges2': "url('/img/badges/fundo_badges_paper2.svg')",
        'papelBadges3': "url('/img/badges/fundo_badges_paper3.svg')",
        'papelBadges4': "url('/img/badges/fundo_badges_paper4.svg')",
        'BadgeDetailsBG': "url('/img/badges/fundo_badge_detalhes.svg')",
        'papelMaisBadges': "url('/img/badges/fundo_mais_badges.svg')",

        'chapter1StartBG': "url('/img/fundo_arte_inicial.svg')",
        'chapter1BG': "url('/img/fundo_arte.svg')",

        'chapter2StartBG': "url('/img/fundo_design_inicial.svg')",
        'chapter2BG': "url('/img/fundo_design.svg')",
        'espremedorBG': "url('/img/chapter2/chapter2espremedor.svg')",
        'chapter2BGTexto1': "url('/img/chapter2/chapter2BGTexto1.svg')",
        'chapter2BGTexto2': "url('/img/chapter2/chapter2BGTexto2.svg')",
        'chapter2BGTexto3': "url('/img/chapter2/chapter2BGTexto3.svg')",

        'chapter3StartBG': "url('/img/fundo_comunicacao_inicial.svg')",
        'chapter3BG': "url('/img/fundo_comunicacao.svg')",

        'chapter4StartBG':"url('/img/fundo_tecnologia_inicial.svg')",
        'chapter4BG': "url('/img/fundo_tecnologia.svg')",

        '404PageBG': "url('/img/fundoerro404.svg')",
      },
      
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config;