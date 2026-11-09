// Captura del modal de contacto + envío real a la API (sin RESEND_API_KEY solo se registra).
import { chromium } from "@playwright/test";
const [, , url, out] = process.argv;
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || undefined });
for (const [name, viewport] of [["desktop", { width: 1366, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
  const page = await browser.newPage({ viewport, reducedMotion: "reduce" });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(url, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /contact/i }).first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}-${name}.png` });
  if (name === "desktop") {
    await page.getByLabel("Nombre", { exact: true }).fill("Prueba");
    await page.getByLabel("Email", { exact: true }).fill("prueba@example.com");
    await page.getByText("Proyecto freelance").click();
    await page.getByLabel("Mensaje", { exact: true }).fill("Mensaje de prueba desde el script.");
    await page.getByRole("button", { name: "Enviar mensaje" }).click();
    await page.getByText("¡Gracias!").waitFor({ timeout: 5000 });
    console.log("submit ok");
  }
  if (errors.length) console.log(name, "ERRORS:", errors);
  await page.close();
}
await browser.close();
