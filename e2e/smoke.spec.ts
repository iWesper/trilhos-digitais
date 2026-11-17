import { expect, test, devices } from "@playwright/test";
import { chapterPages, collectErrors, signInForTests } from "./helpers";

test.describe("sem sessão", () => {
  for (const path of ["/", "/chapters/chapter1/1", "/badges"]) {
    test(`${path} redireciona para o login`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveURL(/\/authentication$/);
      await expect(page.getByRole("heading", { name: "Bem-vindo!" })).toBeVisible();
    });
  }

  test("AR abre sem sessão num telemóvel (QR codes)", async ({ browser }) => {
    const context = await browser.newContext({ ...devices["Pixel 7"] });
    const page = await context.newPage();
    await page.goto("/ar/1");
    await expect(page).toHaveURL(/\/ar\/1$/);
    await expect(page.getByRole("button", { name: /AR/ })).toBeVisible();
    await context.close();
  });
});

test.describe("com sessão", () => {
  test.beforeEach(async ({ page }) => signInForTests(page));

  for (const { chapter, page: n } of chapterPages()) {
    test(`capítulo ${chapter}, página ${n} abre sem erros`, async ({ page }) => {
      const errors = collectErrors(page);
      const res = await page.goto(`/chapters/chapter${chapter}/${n}`);
      expect(res?.status()).toBe(200);
      await expect(page.locator("main")).toBeVisible();
      await page.waitForLoadState("networkidle");
      expect(errors).toEqual([]);
    });
  }

  test("comboio: 4 carruagens com nome e rodas presas ao carril", async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Capítulos" });
    for (const name of ["Capítulo 1: Arte", "Capítulo 2: Design", "Capítulo 3: Comunicação", "Capítulo 4: Tecnologia"]) {
      await expect(nav.getByRole("link", { name })).toBeVisible();
    }
    for (const x of [0, 900, 2400]) {
      await nav.locator("div.overflow-x-auto").evaluate((el, v) => (el.scrollLeft = v), x);
      await page.waitForTimeout(200);
      const worst = await page.evaluate(() => {
        const rail = document.querySelector("[data-rail]")!.getBoundingClientRect().top;
        let max = 0;
        for (const g of document.querySelectorAll("[data-wheel]")) {
          const svg = (g as SVGGElement).ownerSVGElement!;
          const k = svg.getBoundingClientRect().height / 300;
          const hub = g.querySelector("[data-hub]")!.getBoundingClientRect();
          const r = Number(g.firstElementChild!.querySelector("circle")!.getAttribute("r"));
          max = Math.max(max, Math.abs(hub.top + hub.height / 2 + r * k - rail));
        }
        return max;
      });
      expect(worst).toBeLessThan(0.5);
    }
    expect(errors).toEqual([]);
  });

  test("comboio: Tab foca cada carruagem e mostra-a por inteiro", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Capítulo 1: Arte" }).waitFor();
    for (let i = 0; i < 4; i++) {
      await page.getByRole("link", { name: /Capítulo \d/ }).nth(i).focus();
      await page.waitForTimeout(600);
      const box = await page.getByRole("link", { name: /Capítulo \d/ }).nth(i).boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(1440);
    }
  });

  test("insígnias abrem sem erros (fundos e modelos 3D)", async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto("/badges");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/badges$/);
    expect(errors).toEqual([]);
  });

  test("capítulo 2: arrastar uma fruta para o espremedor funciona", async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto("/chapters/chapter2/3");
    const feedback = page.locator("p.text-white.font-medium.mt-2");
    await expect(feedback).toHaveCount(0);
    await page.getByAltText("Fruta").first().dragTo(page.getByAltText("Foto de Um Espremedor de Citrinos"));
    await expect(feedback).toHaveCount(1);
    expect(errors).toEqual([]);
  });

  test("capítulo 4: o slider muda de slide com o teclado, nos dois sentidos", async ({ page }) => {
    await page.goto("/chapters/chapter4/2");
    const slider = page.getByRole("slider");
    const slide = page.locator("div.col-span-8.overflow-hidden");
    await expect(slide).toContainText("linguagem");
    await slider.focus();
    await page.keyboard.press("ArrowRight");
    await expect(slide).toContainText("escrita");
    await page.keyboard.press("ArrowLeft");
    await expect(slide).toContainText("linguagem");
    await expect(slider).toBeFocused();
  });
});
