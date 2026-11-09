import { expect, test } from "vitest";
import { createRateLimiter, getClientKey } from "@/lib/rate-limit";

test("5 envíos por ventana de 10 minutos y por clave", () => {
  let now = 0;
  const rl = createRateLimiter({ limit: 5, windowMs: 600_000, now: () => now });
  for (let i = 0; i < 5; i++) expect(rl.check("a")).toBe(true);
  expect(rl.check("a")).toBe(false);
  expect(rl.check("b")).toBe(true);
  now = 600_001;
  expect(rl.check("a")).toBe(true);
});

test("sin cabeceras de IP usa 'unknown' sin lanzar", () => {
  expect(getClientKey(new Headers())).toBe("unknown");
});

test("toma la primera IP de x-forwarded-for, luego x-real-ip", () => {
  expect(getClientKey(new Headers({ "x-forwarded-for": "1.1.1.1, 2.2.2.2" }))).toBe("1.1.1.1");
  expect(getClientKey(new Headers({ "x-real-ip": "3.3.3.3" }))).toBe("3.3.3.3");
});
