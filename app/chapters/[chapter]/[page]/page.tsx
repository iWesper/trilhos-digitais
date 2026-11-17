import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allChapterPages, chapterSlug, findChapterPage } from "@/lib/chapters";

type Params = Promise<{ chapter: string; page: string }>;

// Só existem as páginas do registo; qualquer outro URL dá 404 a sério (antes era 200 com o componente de erro)
export const dynamicParams = false;

export function generateStaticParams() {
  return allChapterPages().map(({ chapter, page }) => ({ chapter: chapterSlug(chapter), page: String(page) }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { chapter, page } = await params;
  const found = findChapterPage(chapter, page);
  return found ? { title: `Capítulo ${found.chapter} · ${found.title}` } : {};
}

export default async function ChapterPage({ params }: { params: Params }) {
  const { chapter, page } = await params;
  const found = findChapterPage(chapter, page);
  if (!found) notFound();
  const { default: Page } = await found.load();
  return <Page />;
}
