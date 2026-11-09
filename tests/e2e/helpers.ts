import type { Page } from "@playwright/test";

/** Navega y espera a que la página termine de cargar e hidratarse antes de interactuar. */
export async function gotoReady(page: Page, url: string) {
  const res = await page.goto(url);
  await page.waitForLoadState("networkidle");
  return res;
}
