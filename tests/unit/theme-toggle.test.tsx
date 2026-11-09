import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { THEME_STORAGE_KEY } from "@/components/providers/ThemeScript";
import { renderWithIntl } from "./helpers/intl";

beforeEach(() => {
  document.documentElement.dataset.theme = "dark";
  localStorage.clear();
});
afterEach(() => vi.restoreAllMocks());

test("alterna entre oscuro y claro y lo guarda", async () => {
  renderWithIntl(<ThemeToggle />);
  const btn = screen.getByRole("button", { name: /tema/i });
  await userEvent.click(btn);
  expect(document.documentElement.dataset.theme).toBe("light");
  expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
  await userEvent.click(btn);
  expect(document.documentElement.dataset.theme).toBe("dark");
  expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
});

test("si localStorage falla, el tema cambia igual", async () => {
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new Error("blocked");
  });
  renderWithIntl(<ThemeToggle />);
  await userEvent.click(screen.getByRole("button", { name: /tema/i }));
  expect(document.documentElement.dataset.theme).toBe("light");
});
