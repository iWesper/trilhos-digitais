import localFont from "next/font/local";

// Fontes self-hosted via next/font: nomes com hash, sem salto de layout ao carregar.
// Effra é a fonte da marca (pré-carregada); as decorativas só carregam na página que as usa.
export const effra = localFont({
  src: [
    { path: "./Effra.ttf", weight: "400", style: "normal" },
    { path: "./Effra-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-effra",
  display: "swap",
});

export const tomatoes = localFont({ src: "./Tomatoes.ttf", variable: "--font-tomatoes", display: "swap", preload: false });
export const loveDays = localFont({ src: "./LoveDays.ttf", variable: "--font-lovedays", display: "swap", preload: false });
export const beautifulEveryTime = localFont({
  src: "./BeautifulEveryTime.ttf",
  variable: "--font-beautiful",
  display: "swap",
  preload: false,
});
