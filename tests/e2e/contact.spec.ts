import { expect, test } from "@playwright/test";
import { gotoReady } from "./helpers";

test.beforeEach(async ({ page }) => {
  await page.route("**/api/contact", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) }),
  );
});

test("abrir, rellenar y enviar el formulario", async ({ page }) => {
  await gotoReady(page, "/es");
  await page.getByRole("button", { name: /Contacto/ }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  await dialog.getByLabel("Nombre", { exact: true }).fill("Ana López");
  await dialog.getByLabel("Email", { exact: true }).fill("ana@example.com");
  await dialog.getByText("Proyecto freelance").click();
  await dialog.getByLabel("Mensaje", { exact: true }).fill("Necesito una web para mi negocio.");
  await dialog.getByRole("button", { name: "Enviar mensaje" }).click();

  await expect(dialog.getByText("¡Gracias! Te respondo pronto.")).toBeVisible();
});

test("Escape cierra y el foco vuelve a la tarjeta Contacto; el fondo no hace scroll", async ({ page }) => {
  await gotoReady(page, "/es");
  const card = page.getByRole("button", { name: /Contacto/ });
  await card.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");

  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(card).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("el CTA de About abre el contacto en el home", async ({ page }) => {
  await gotoReady(page, "/es/about");
  await page.getByRole("link", { name: /Hablemos/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page).toHaveURL(/\/es$/);
});
