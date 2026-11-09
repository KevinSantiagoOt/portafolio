import { expect, test } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { SITE_URL } from "@/data/site";

test("sitemap: 4 páginas x 2 idiomas con hreflang es/en", () => {
  const entries = sitemap();
  expect(entries).toHaveLength(8);
  for (const e of entries) {
    expect(e.url.startsWith(SITE_URL)).toBe(true);
    expect(Object.keys(e.alternates?.languages ?? {}).sort()).toEqual(["en", "es"]);
  }
  expect(entries.map((e) => e.url)).toContain(`${SITE_URL}/en/portfolio`);
});

test("robots permite todo y apunta al sitemap", () => {
  const r = robots();
  const rules = Array.isArray(r.rules) ? r.rules[0] : r.rules;
  expect(rules.allow).toBe("/");
  expect(r.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
});
