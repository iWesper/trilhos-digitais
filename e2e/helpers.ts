import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Page } from "@playwright/test";

// Lista de páginas de capítulos lida do próprio registo da app, para os testes acompanharem novas páginas
export function chapterPages(): { chapter: number; page: number }[] {
  const candidates = ["lib/chapters.ts", "app/chapters/[...slug]/page.tsx"];
  for (const file of candidates) {
    let src: string;
    try {
      src = readFileSync(join(__dirname, "..", file), "utf8");
    } catch {
      continue;
    }
    const found = [...src.matchAll(/Chapter(\d)Page(\d+)\b/g)].map((m) => `${m[1]}/${m[2]}`);
    const unique = [...new Set(found)];
    if (unique.length) {
      return unique.map((k) => {
        const [chapter, page] = k.split("/").map(Number);
        return { chapter, page };
      });
    }
  }
  throw new Error("Não encontrei o registo de capítulos");
}

// Erros que não são da app: chaves Firebase falsas e scripts da Vercel que só existem em produção
const IGNORED = [/Failed to load resource/, /API key not valid/, /identitytoolkit/, /firestore/i, /_vercel/];

export function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error" && !IGNORED.some((r) => r.test(m.text()))) errors.push(`console: ${m.text()}`);
  });
  // Ficheiros do próprio site que falham (imagem, modelo 3D, vídeo com caminho errado...)
  page.on("response", (r) => {
    const url = new URL(r.url());
    const sameOrigin = url.origin === new URL(page.url() || r.url()).origin;
    if (sameOrigin && r.status() >= 400 && !url.pathname.startsWith("/_vercel")) {
      errors.push(`${r.status()} ${url.pathname}`);
    }
  });
  return errors;
}

export async function signInForTests(page: Page) {
  await page.addInitScript(() => window.localStorage.setItem("e2e-auth", "1"));
}
