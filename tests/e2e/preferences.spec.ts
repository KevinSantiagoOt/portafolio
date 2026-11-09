import { expect, test } from "@playwright/test";
import { gotoReady } from "./helpers";

test("cambiar a EN conserva la página", async ({ page }) => {
  await gotoReady(page, "/es/about");
  await page.getByRole("button", { name: "en", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/about$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("About");
});

test("el tema claro persiste al recargar", async ({ page }) => {
  await gotoReady(page, "/es");
  const html = page.locator("html");
  await expect(html).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: /tema/i }).click();
  await expect(html).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "light");
});
