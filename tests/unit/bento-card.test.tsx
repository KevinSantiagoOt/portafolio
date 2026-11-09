import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@/i18n/navigation", async () => (await import("./helpers/mock-navigation")).navigationMock);

import { BentoCard } from "@/components/home/BentoCard";

test("con href es un enlace con nombre accesible", () => {
  render(<BentoCard title="About" href="/about" />);
  const link = screen.getByRole("link", { name: /about/i });
  expect(link).toHaveAttribute("href", "/about");
  expect(screen.getByTestId("bento-arrow")).toBeInTheDocument();
});

test("con onClick es un botón y llama al handler", async () => {
  const onClick = vi.fn();
  render(<BentoCard title="Contact" onClick={onClick} />);
  await userEvent.click(screen.getByRole("button", { name: /contact/i }));
  expect(onClick).toHaveBeenCalledOnce();
});

test("sin href ni onClick no es interactiva ni tiene flecha", () => {
  render(<BentoCard title="Stack" />);
  expect(screen.queryByRole("link")).toBeNull();
  expect(screen.queryByRole("button")).toBeNull();
  expect(screen.queryByTestId("bento-arrow")).toBeNull();
});
