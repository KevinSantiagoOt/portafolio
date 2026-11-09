import { describe, expect, test } from "vitest";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { resume } from "@/data/resume";
import es from "@/messages/es.json";
import en from "@/messages/en.json";

type Loc = { es: string; en: string };

function isLocalized(v: unknown): v is Loc {
  if (!v || typeof v !== "object" || Array.isArray(v)) return false;
  const keys = Object.keys(v).sort();
  return keys.length === 2 && keys[0] === "en" && keys[1] === "es";
}

function collectLocalized(v: unknown, path = "$", out: [string, Loc][] = []) {
  if (isLocalized(v)) out.push([path, v]);
  else if (Array.isArray(v)) v.forEach((x, i) => collectLocalized(x, `${path}[${i}]`, out));
  else if (v && typeof v === "object")
    for (const [k, x] of Object.entries(v)) collectLocalized(x, `${path}.${k}`, out);
  return out;
}

function flattenKeys(o: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(o).flatMap(([k, v]) =>
    v && typeof v === "object" ? flattenKeys(v as Record<string, unknown>, `${prefix}${k}.`) : [`${prefix}${k}`],
  ).sort();
}

describe("integridad de datos", () => {
  test.each([
    ["site", site],
    ["projects", projects],
    ["resume", resume],
  ])("%s: todo texto Localized tiene es y en", (_name, data) => {
    const found = collectLocalized(data);
    expect(found.length).toBeGreaterThan(0);
    for (const [path, loc] of found) {
      expect(loc.es.trim(), `${path}.es`).not.toBe("");
      expect(loc.en.trim(), `${path}.en`).not.toBe("");
    }
  });

  test("al menos 1 proyecto, slugs únicos e imágenes en /images/", () => {
    expect(projects.length).toBeGreaterThanOrEqual(1);
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
    for (const p of projects) expect(p.image.startsWith("/images/")).toBe(true);
  });

  test("es.json y en.json tienen las mismas claves", () => {
    expect(flattenKeys(es)).toEqual(flattenKeys(en));
  });

  test("la zona horaria del sitio es válida", () => {
    expect(() => new Intl.DateTimeFormat("es", { timeZone: site.timeZone })).not.toThrow();
  });
});
