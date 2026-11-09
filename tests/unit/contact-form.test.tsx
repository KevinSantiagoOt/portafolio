import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/data/site";
import { renderWithIntl } from "./helpers/intl";

const fetchMock = vi.fn();
beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => vi.unstubAllGlobals());

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Nombre"), "Ana López");
  await user.type(screen.getByLabelText("Email"), "ana@example.com");
  await user.click(screen.getByRole("radio", { name: "Proyecto freelance" }));
  await user.type(screen.getByLabelText("Mensaje"), "Necesito una web para mi negocio.");
}

const reply = (status: number, body: unknown) => ({ ok: status < 400, status, json: async () => body });

test("enviar vacío muestra errores traducidos y no llama a fetch", async () => {
  const user = userEvent.setup();
  renderWithIntl(<ContactForm />);
  await user.click(screen.getByRole("button", { name: "Enviar mensaje" }));
  expect(screen.getByText("Escribe tu nombre (mínimo 2 caracteres).")).toBeInTheDocument();
  expect(screen.getByText("Escribe un email válido.")).toBeInTheDocument();
  expect(screen.getByText("Elige un tipo de consulta.")).toBeInTheDocument();
  expect(fetchMock).not.toHaveBeenCalled();
});

test("envío correcto muestra el mensaje de éxito", async () => {
  const user = userEvent.setup();
  fetchMock.mockResolvedValue(reply(200, { ok: true }));
  renderWithIntl(<ContactForm />);
  await fillValid(user);
  await user.click(screen.getByRole("button", { name: "Enviar mensaje" }));
  expect(fetchMock).toHaveBeenCalledWith("/api/contact", expect.objectContaining({ method: "POST" }));
  const sent = JSON.parse(fetchMock.mock.calls[0][1].body);
  expect(sent).toMatchObject({ name: "Ana López", type: "freelance" });
  expect(await screen.findByText("¡Gracias! Te respondo pronto.")).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "Enviar mensaje" })).toBeNull();
});

test("error 500 ofrece el email directo", async () => {
  const user = userEvent.setup();
  fetchMock.mockResolvedValue(reply(500, { ok: false, error: "send_failed" }));
  renderWithIntl(<ContactForm />);
  await fillValid(user);
  await user.click(screen.getByRole("button", { name: "Enviar mensaje" }));
  expect(await screen.findByText(/No se pudo enviar el mensaje/)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: site.email })).toHaveAttribute("href", `mailto:${site.email}`);
});

test("error de red también ofrece el email directo", async () => {
  const user = userEvent.setup();
  fetchMock.mockRejectedValue(new TypeError("offline"));
  renderWithIntl(<ContactForm />);
  await fillValid(user);
  await user.click(screen.getByRole("button", { name: "Enviar mensaje" }));
  expect(await screen.findByText(/No se pudo enviar el mensaje/)).toBeInTheDocument();
});

test("429 muestra el aviso de límite", async () => {
  const user = userEvent.setup();
  fetchMock.mockResolvedValue(reply(429, { ok: false, error: "rate_limited" }));
  renderWithIntl(<ContactForm />);
  await fillValid(user);
  await user.click(screen.getByRole("button", { name: "Enviar mensaje" }));
  expect(await screen.findByText(/demasiados mensajes/)).toBeInTheDocument();
});

test("el botón se deshabilita mientras envía", async () => {
  const user = userEvent.setup();
  let resolve!: (v: unknown) => void;
  fetchMock.mockReturnValue(new Promise((r) => (resolve = r)));
  renderWithIntl(<ContactForm />);
  await fillValid(user);
  await user.click(screen.getByRole("button", { name: "Enviar mensaje" }));
  expect(screen.getByRole("button", { name: "Enviando…" })).toBeDisabled();
  resolve(reply(200, { ok: true }));
  expect(await screen.findByText("¡Gracias! Te respondo pronto.")).toBeInTheDocument();
});

test("el honeypot existe pero está oculto", () => {
  const { container } = renderWithIntl(<ContactForm />);
  const hp = container.querySelector('input[name="website"]')!;
  expect(hp).not.toBeNull();
  expect(hp).toHaveAttribute("tabindex", "-1");
  expect(hp).toHaveAttribute("autocomplete", "off");
  expect(hp.closest('[aria-hidden="true"]')).not.toBeNull();
});
