import { act } from "react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LiveClock } from "@/components/layout/LiveClock";
import { IntlWrapper } from "./helpers/intl";
import { site } from "@/data/site";
import { formatClock } from "@/lib/time";

// Hora esperada en la zona del sitio (no la del equipo que corre los tests).
const at = (iso: string) => formatClock(new Date(iso), site.timeZone, "en");

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-01-01T17:13:00Z"));
});
afterEach(() => vi.useRealTimers());

test("en el servidor muestra --:-- (sin hora, evita errores de hidratación)", () => {
  const html = renderToString(
    <IntlWrapper locale="en">
      <LiveClock />
    </IntlWrapper>,
  );
  expect(html).toContain("--:--");
  expect(html).not.toContain(at("2026-01-01T17:13:00Z"));
});

test("en el cliente muestra la hora y se actualiza", async () => {
  render(
    <IntlWrapper locale="en">
      <LiveClock />
    </IntlWrapper>,
  );
  await act(async () => {});
  expect(screen.getByText(at("2026-01-01T17:13:00Z"), { exact: false })).toBeInTheDocument();
  await act(async () => {
    vi.advanceTimersByTime(60_000);
  });
  expect(screen.getByText(at("2026-01-01T17:14:00Z"), { exact: false })).toBeInTheDocument();
});
