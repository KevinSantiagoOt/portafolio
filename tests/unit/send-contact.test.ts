// @vitest-environment node
import { afterEach, expect, test, vi } from "vitest";
import { sendContact } from "@/lib/send-contact";

const input = { name: "Ana", email: "ana@example.com", type: "job" as const, message: "Hola, tengo una vacante." };

afterEach(() => vi.unstubAllEnvs());

test("en desarrollo sin RESEND_API_KEY solo registra el mensaje", async () => {
  vi.stubEnv("NODE_ENV", "development");
  vi.stubEnv("RESEND_API_KEY", "");
  const info = vi.spyOn(console, "info").mockImplementation(() => {});
  await expect(sendContact(input)).resolves.toBeUndefined();
  expect(info).toHaveBeenCalled();
});

test("en producción sin RESEND_API_KEY falla (el visitante ve tu email en vez de perder el mensaje)", async () => {
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("RESEND_API_KEY", "");
  await expect(sendContact(input)).rejects.toThrow(/RESEND_API_KEY/);
});

const sendMock = vi.fn().mockResolvedValue({ error: null });
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({ emails: { send: sendMock } })),
}));

test("limpia espacios y saltos de línea de las variables pegadas en Vercel", async () => {
  vi.stubEnv("RESEND_API_KEY", " re_123\n");
  vi.stubEnv("CONTACT_TO_EMAIL", "kevinotalvaro@outlook.es\n");
  vi.stubEnv("CONTACT_FROM_EMAIL", " Portafolio <onboarding@resend.dev> ");
  const { Resend } = await import("resend");
  await sendContact(input);
  expect(Resend).toHaveBeenCalledWith("re_123");
  expect(sendMock).toHaveBeenCalledWith(
    expect.objectContaining({ to: "kevinotalvaro@outlook.es", from: "Portafolio <onboarding@resend.dev>", replyTo: "ana@example.com" }),
  );
});
