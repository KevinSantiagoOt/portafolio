import { expect, test } from "@playwright/test";
import { gotoReady } from "./helpers";

test.describe("idioma por defecto", () => {
  test.use({ locale: "es-MX" });
  test("/ redirige a /es con navegador en español", async ({ page }) => {
    await gotoReady(page, "/");
    await expect(page).toHaveURL(/\/es$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Kevin");
  });
});

test.describe("idioma inglés", () => {
  test.use({ locale: "en-US" });
  test("/ redirige a /en con navegador en inglés", async ({ page }) => {
    await gotoReady(page, "/");
    await expect(page).toHaveURL(/\/en$/);
  });
});

test("navega del home a cada página y vuelve", async ({ page }) => {
  await gotoReady(page, "/es");

  await page.getByRole("link", { name: "Sobre mí" }).click();
  await expect(page).toHaveURL(/\/es\/about$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sobre mí");

  await page.getByRole("link", { name: /Inicio/ }).click();
  await expect(page).toHaveURL(/\/es$/);

  await page.getByRole("link", { name: "Portafolio" }).click();
  await expect(page).toHaveURL(/\/es\/portfolio$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("proyectos");

  await page.getByRole("link", { name: /Inicio/ }).click();
  await page.getByRole("link", { name: "CV" }).click();
  await expect(page).toHaveURL(/\/es\/resume$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Currículum");
  await expect(page.getByRole("link", { name: /Descargar PDF/ })).toHaveAttribute("href", "/cv-es.pdf");
});

for (const path of ["/fr", "/es/no-existe", "/en/a/b/c"]) {
  test(`${path} responde 404 con página de error`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(404);
    await expect(page.getByText(/no encontrada|not found/i).first()).toBeVisible();
  });
}

test("el PDF del CV existe", async ({ request }) => {
  for (const l of ["es", "en"]) {
    const res = await request.get(`/cv-${l}.pdf`);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("application/pdf");
  }
});
