// Genera public/cv-es.pdf y public/cv-en.pdf imprimiendo la página /resume (tema claro).
// Uso: con el sitio corriendo (npm run build && npm run start), ejecuta:
//   node scripts/make-cv-pdf.mjs [baseUrl]
// Si Chromium de Playwright no arranca en tu equipo, usa Edge: PW_CHANNEL=msedge node scripts/make-cv-pdf.mjs
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:3000";
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || undefined });

for (const locale of ["es", "en"]) {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  await ctx.addInitScript(() => localStorage.setItem("theme", "light"));
  const page = await ctx.newPage();
  await page.goto(`${base}/${locale}/resume`, { waitUntil: "networkidle" });
  // Oculta lo que no tiene sentido en papel y fuerza que todo sea visible.
  await page.addStyleTag({
    content: `
      header, [download], [aria-hidden="true"].fixed { display: none !important; }
      article { opacity: 1 !important; transform: none !important; }
      html, body { background: #fff !important; }
      body * { min-height: 0 !important; }
      body > div > div { box-shadow: none !important; border: 0 !important; background: #fff !important; padding: 0 !important; }
      section { break-inside: avoid; }
    `,
  });
  await page.pdf({
    path: `public/cv-${locale}.pdf`,
    format: "A4",
    printBackground: true,
    margin: { top: "12mm", bottom: "12mm", left: "10mm", right: "10mm" },
  });
  console.log(`public/cv-${locale}.pdf`);
  await ctx.close();
}

await browser.close();
