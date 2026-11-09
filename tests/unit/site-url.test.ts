import { afterEach, expect, test, vi } from "vitest";
import { resolveSiteUrl } from "@/data/site";

afterEach(() => vi.unstubAllEnvs());

test("usa NEXT_PUBLIC_SITE_URL limpiando espacios, saltos de línea y barra final", () => {
  expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "https://kevinotalvaro.vercel.app/\n" })).toBe("https://kevinotalvaro.vercel.app");
});

test("sin variable propia usa el dominio de producción que da Vercel", () => {
  expect(resolveSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: "kevinotalvaro.vercel.app" })).toBe("https://kevinotalvaro.vercel.app");
});

test("variable vacía o en blanco no cuenta", () => {
  expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "  \n", VERCEL_PROJECT_PRODUCTION_URL: "kevinotalvaro.vercel.app" })).toBe(
    "https://kevinotalvaro.vercel.app",
  );
});

test("en local, sin nada, usa localhost", () => {
  expect(resolveSiteUrl({})).toBe("http://localhost:3000");
});
