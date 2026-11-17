import type { ComponentType } from "react";

// Registo dos capítulos: única fonte de verdade para rotas, títulos e páginas.
// Cada página é carregada à parte (import dinâmico), por isso só o código da página aberta vai para o browser.

type PageModule = { default: ComponentType };

export const CHAPTERS = {
  1: {
    title: "Arte",
    pages: {
      1: () => import("@/components/chapters/chapter1/Chapter1Page1") as Promise<PageModule>, // Chapter1Page1
      2: () => import("@/components/chapters/chapter1/Chapter1Page2") as Promise<PageModule>, // Chapter1Page2
      3: () => import("@/components/chapters/chapter1/Chapter1Page3") as Promise<PageModule>, // Chapter1Page3
      4: () => import("@/components/chapters/chapter1/Chapter1Page4") as Promise<PageModule>, // Chapter1Page4
      5: () => import("@/components/chapters/chapter1/Chapter1Page5") as Promise<PageModule>, // Chapter1Page5
      6: () => import("@/components/chapters/chapter1/Chapter1Page6") as Promise<PageModule>, // Chapter1Page6
      7: () => import("@/components/chapters/chapter1/Chapter1Page7") as Promise<PageModule>, // Chapter1Page7
    },
  },
  2: {
    title: "Design",
    pages: {
      1: () => import("@/components/chapters/chapter2/Chapter2Page1") as Promise<PageModule>, // Chapter2Page1
      2: () => import("@/components/chapters/chapter2/Chapter2Page2") as Promise<PageModule>, // Chapter2Page2
      3: () => import("@/components/chapters/chapter2/Chapter2Page3") as Promise<PageModule>, // Chapter2Page3
      4: () => import("@/components/chapters/chapter2/Chapter2Page4") as Promise<PageModule>, // Chapter2Page4
      5: () => import("@/components/chapters/chapter2/Chapter2Page5") as Promise<PageModule>, // Chapter2Page5
      6: () => import("@/components/chapters/chapter2/Chapter2Page6") as Promise<PageModule>, // Chapter2Page6
      7: () => import("@/components/chapters/chapter2/Chapter2Page7") as Promise<PageModule>, // Chapter2Page7
      8: () => import("@/components/chapters/chapter2/Chapter2Page8") as Promise<PageModule>, // Chapter2Page8
      9: () => import("@/components/chapters/chapter2/Chapter2Page9") as Promise<PageModule>, // Chapter2Page9
      10: () => import("@/components/chapters/chapter2/Chapter2Page10") as Promise<PageModule>, // Chapter2Page10
      11: () => import("@/components/chapters/chapter2/Chapter2Page11") as Promise<PageModule>, // Chapter2Page11
    },
  },
  3: {
    title: "Comunicação",
    pages: {
      1: () => import("@/components/chapters/chapter3/Chapter3Page1") as Promise<PageModule>, // Chapter3Page1
      2: () => import("@/components/chapters/chapter3/Chapter3Page2") as Promise<PageModule>, // Chapter3Page2
      3: () => import("@/components/chapters/chapter3/Chapter3Page3") as Promise<PageModule>, // Chapter3Page3
      4: () => import("@/components/chapters/chapter3/Chapter3Page4") as Promise<PageModule>, // Chapter3Page4
      5: () => import("@/components/chapters/chapter3/Chapter3Page5") as Promise<PageModule>, // Chapter3Page5
      6: () => import("@/components/chapters/chapter3/Chapter3Page6") as Promise<PageModule>, // Chapter3Page6
      7: () => import("@/components/chapters/chapter3/Chapter3Page7") as Promise<PageModule>, // Chapter3Page7
      8: () => import("@/components/chapters/chapter3/Chapter3Page8") as Promise<PageModule>, // Chapter3Page8
      9: () => import("@/components/chapters/chapter3/Chapter3Page9") as Promise<PageModule>, // Chapter3Page9
      10: () => import("@/components/chapters/chapter3/Chapter3Page10") as Promise<PageModule>, // Chapter3Page10
      11: () => import("@/components/chapters/chapter3/Chapter3Page11") as Promise<PageModule>, // Chapter3Page11
      12: () => import("@/components/chapters/chapter3/Chapter3Page12") as Promise<PageModule>, // Chapter3Page12
      13: () => import("@/components/chapters/chapter3/Chapter3Page13") as Promise<PageModule>, // Chapter3Page13
      14: () => import("@/components/chapters/chapter3/Chapter3Page14") as Promise<PageModule>, // Chapter3Page14
      15: () => import("@/components/chapters/chapter3/Chapter3Page15") as Promise<PageModule>, // Chapter3Page15
    },
  },
  4: {
    title: "Tecnologia",
    pages: {
      1: () => import("@/components/chapters/chapter4/Chapter4Page1") as Promise<PageModule>, // Chapter4Page1
      2: () => import("@/components/chapters/chapter4/Chapter4Page2") as Promise<PageModule>, // Chapter4Page2
      3: () => import("@/components/chapters/chapter4/Chapter4Page3") as Promise<PageModule>, // Chapter4Page3
      4: () => import("@/components/chapters/chapter4/Chapter4Page4") as Promise<PageModule>, // Chapter4Page4
      5: () => import("@/components/chapters/chapter4/Chapter4Page5") as Promise<PageModule>, // Chapter4Page5
    },
  },
} as const;

export type ChapterNumber = keyof typeof CHAPTERS;

// URLs mantêm o formato original: /chapters/chapter1/3
export const chapterSlug = (chapter: number) => `chapter${chapter}`;

export function allChapterPages() {
  return Object.entries(CHAPTERS).flatMap(([chapter, { pages }]) =>
    Object.keys(pages).map((page) => ({ chapter: Number(chapter), page: Number(page) }))
  );
}

export function findChapterPage(chapterSlugParam: string, pageParam: string) {
  const match = /^chapter(\d)$/.exec(chapterSlugParam);
  if (!match || !/^\d+$/.test(pageParam)) return null;
  const chapter = CHAPTERS[Number(match[1]) as ChapterNumber];
  if (!chapter) return null;
  const load = (chapter.pages as Record<number, (() => Promise<PageModule>) | undefined>)[Number(pageParam)];
  return load ? { title: chapter.title, chapter: Number(match[1]), page: Number(pageParam), load } : null;
}
