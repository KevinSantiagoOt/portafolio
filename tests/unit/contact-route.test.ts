// @vitest-environment node
import { beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("@/lib/send-contact", () => ({ sendContact: vi.fn() }));

import { sendContact } from "@/lib/send-contact";
import { POST } from "@/app/api/contact/route";
import { __resetRateLimit } from "@/lib/contact-limiter";

const valid = { name: "Ana López", email: "ana@example.com", type: "job", message: "Hola, tengo una vacante para ti.", website: "" };

function req(body: unknown, ip = "9.9.9.9") {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const send = vi.mocked(sendContact);

beforeEach(() => {
  send.mockReset();
  send.mockResolvedValue(undefined);
  __resetRateLimit();
});

describe("POST /api/contact", () => {
  test("válido → 200 y envía sin el honeypot", async () => {
    const res = await POST(req(valid));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(send).toHaveBeenCalledOnce();
    expect(send.mock.calls[0][0]).not.toHaveProperty("website");
    expect(send.mock.calls[0][0]).toMatchObject({ name: "Ana López", type: "job" });
  });

  test("inválido → 400 con errores por campo", async () => {
    const res = await POST(req({ ...valid, email: "nope" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("validation");
    expect(body.fields.email).toBe("emailInvalid");
    expect(send).not.toHaveBeenCalled();
  });

  test("honeypot relleno → 200 sin enviar", async () => {
    const res = await POST(req({ ...valid, website: "bot" }));
    expect(res.status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });

  test("body que no es JSON → 400", async () => {
    const res = await POST(req("{not json"));
    expect(res.status).toBe(400);
  });

  test("fallo de Resend → 500 send_failed", async () => {
    send.mockRejectedValueOnce(new Error("boom"));
    const res = await POST(req(valid));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ ok: false, error: "send_failed" });
  });

  test("6.º envío desde la misma IP → 429", async () => {
    for (let i = 0; i < 5; i++) expect((await POST(req(valid))).status).toBe(200);
    const res = await POST(req(valid));
    expect(res.status).toBe(429);
    expect(await res.json()).toEqual({ ok: false, error: "rate_limited" });
  });
});

describe("POST /api/contact — tipo de contenido", () => {
  test("rechaza cuerpos que no son application/json (POST simple entre sitios) → 415", async () => {
    const res = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "content-type": "text/plain", "x-forwarded-for": "8.8.8.8" },
        body: JSON.stringify(valid),
      }),
    );
    expect(res.status).toBe(415);
    expect(send).not.toHaveBeenCalled();
  });
});
