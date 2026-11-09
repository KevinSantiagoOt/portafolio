// Capturas para revisión visual. Uso: node scripts/shot.mjs <url> <out-prefix> [light]
import { chromium } from "@playwright/test";
const [, , url, out, theme] = process.argv;
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || undefined });
for (const [name, viewport] of [["desktop", { width: 1366, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: "reduce" });
  if (theme === "light") await ctx.addInitScript(() => localStorage.setItem("theme", "light"));
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${out}-${name}.png`, fullPage: true });
  if (errors.length) console.log(name, "ERRORS:", errors);
  await ctx.close();
}
await browser.close();
console.log("ok");
