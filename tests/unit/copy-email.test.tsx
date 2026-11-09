import { afterEach, expect, test, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CopyEmailButton } from "@/components/contact/CopyEmailButton";
import { renderWithIntl } from "./helpers/intl";

const email = "hola@ejemplo.dev";

function setClipboard(value: unknown) {
  Object.defineProperty(navigator, "clipboard", { value, configurable: true, writable: true });
}

afterEach(() => setClipboard(undefined));

test("copia y muestra 'Copiado'", async () => {
  const user = userEvent.setup();
  const writeText = vi.fn().mockResolvedValue(undefined);
  renderWithIntl(<CopyEmailButton email={email} />);
  setClipboard({ writeText }); // después de setup(): userEvent instala su propio portapapeles
  await user.click(screen.getByRole("button", { name: /copiar email/i }));
  expect(writeText).toHaveBeenCalledWith(email);
  expect(await screen.findByText("Copiado")).toBeInTheDocument();
});

test("sin portapapeles no falla ni dice 'Copiado' y el email sigue visible", async () => {
  const user = userEvent.setup();
  renderWithIntl(<CopyEmailButton email={email} />);
  setClipboard(undefined);
  await user.click(screen.getByRole("button", { name: /copiar email/i }));
  expect(screen.queryByText("Copiado")).toBeNull();
  expect(screen.getByText(email)).toBeInTheDocument();
});

test("si writeText rechaza, no dice 'Copiado'", async () => {
  const user = userEvent.setup();
  renderWithIntl(<CopyEmailButton email={email} />);
  setClipboard({ writeText: vi.fn().mockRejectedValue(new Error("denied")) });
  await user.click(screen.getByRole("button", { name: /copiar email/i }));
  await new Promise((r) => setTimeout(r, 0));
  expect(screen.queryByText("Copiado")).toBeNull();
});
