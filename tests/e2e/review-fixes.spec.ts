import { expect, test, type Page } from "@playwright/test";
import { gotoReady } from "./helpers";

test("cambiar de idioma conserva el tema claro y actualiza lang", async ({ page }) => {
  await gotoReady(page, "/es");
  const html = page.locator("html");
  await page.getByRole("button", { name: /tema/i }).click();
  await expect(html).toHaveAttribute("data-theme", "light");

  await page.getByRole("button", { name: "en", exact: true }).click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(html).toHaveAttribute("lang", "en");
  await expect(html).toHaveAttribute("data-theme", "light");

  await page.getByRole("button", { name: "es", exact: true }).click();
  await expect(page).toHaveURL(/\/es$/);
  await expect(html).toHaveAttribute("lang", "es");
  await expect(html).toHaveAttribute("data-theme", "light");
});

test("un modal abierto al salir no reaparece al volver", async ({ page }) => {
  await gotoReady(page, "/es");
  await page.getByRole("link", { name: "Portafolio" }).click();
  await expect(page).toHaveURL(/\/es\/portfolio$/);
  await page.getByRole("button", { name: /Travel Easy/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();

  await page.goBack(); // gesto "atrás" del móvil con el modal abierto
  await expect(page).toHaveURL(/\/es$/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("link", { name: "Portafolio" }).click();
  await expect(page).toHaveURL(/\/es\/portfolio$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

function luminance(rgb: string) {
  const [r, g, b] = rgb.match(/\d+(\.\d+)?/g)!.slice(0, 3).map(Number).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const contrast = (a: string, b: string) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

async function openContactWithErrors(page: Page) {
  await gotoReady(page, "/es");
  await page.getByRole("button", { name: /Contacto/ }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Enviar mensaje" }).click();
  return page.getByText("Escribe un email válido.");
}

for (const theme of ["dark", "light"] as const) {
  test(`errores del formulario con contraste AA en tema ${theme}`, async ({ page }) => {
    await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
    const err = await openContactWithErrors(page);
    await expect(err).toBeVisible();
    // Tailwind 4 usa oklch(): el navegador lo convierte a RGB pintándolo en un canvas.
    const toRgb = (color: string) =>
      page.evaluate((c) => {
        const ctx = document.createElement("canvas").getContext("2d")!;
        ctx.fillStyle = c;
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
        return `rgb(${r}, ${g}, ${b})`;
      }, color);
    const fg = await toRgb(await err.evaluate((el) => getComputedStyle(el).color));
    const bg = await toRgb(await page.getByRole("dialog").evaluate((el) => getComputedStyle(el).backgroundColor));
    expect(contrast(fg, bg)).toBeGreaterThanOrEqual(4.5);
  });
}

test("los campos del formulario usan ≥16px (iOS no hace zoom)", async ({ page }) => {
  await gotoReady(page, "/es");
  await page.getByRole("button", { name: /Contacto/ }).click();
  for (const label of ["Nombre", "Email", "Mensaje"]) {
    const size = await page.getByLabel(label, { exact: true }).evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    expect(size, label).toBeGreaterThanOrEqual(16);
  }
});

test("el modal de proyecto no se vacía durante la animación de cierre", async ({ page }) => {
  await gotoReady(page, "/es/portfolio");
  await page.getByRole("button", { name: /Travel Easy/ }).click();
  await expect(page.getByRole("dialog")).toContainText("Travel Easy");
  const textDuringExit = await page.evaluate(async () => {
    (document.querySelector('[role="dialog"] button[aria-label="Cerrar"]') as HTMLButtonElement).click();
    await new Promise((r) => setTimeout(r, 60));
    return document.querySelector('[role="dialog"]')?.textContent ?? "(sin diálogo)";
  });
  expect(textDuringExit).toContain("Travel Easy");
});
