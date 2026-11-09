import { expect, test } from "vitest";
import { formatClock } from "@/lib/time";

const date = new Date("2026-01-01T17:13:00Z");

test("formatea en la zona horaria indicada (en)", () => {
  const out = formatClock(date, "America/Mexico_City", "en");
  expect(out).toContain("11:13");
  expect(out).toContain("AM");
});

test("usa la zona del sitio, no la del visitante", () => {
  expect(formatClock(date, "Africa/Cairo", "en")).toContain("7:13");
});
