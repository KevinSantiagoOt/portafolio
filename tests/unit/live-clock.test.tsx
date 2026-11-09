import { act } from "react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LiveClock } from "@/components/layout/LiveClock";
import { IntlWrapper } from "./helpers/intl";

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
  expect(html).not.toContain("11:13");
});

test("en el cliente muestra la hora y se actualiza", async () => {
  render(
    <IntlWrapper locale="en">
      <LiveClock />
    </IntlWrapper>,
  );
  await act(async () => {});
  expect(screen.getByText(/11:13/)).toBeInTheDocument();
  await act(async () => {
    vi.advanceTimersByTime(60_000);
  });
  expect(screen.getByText(/11:14/)).toBeInTheDocument();
});
