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
