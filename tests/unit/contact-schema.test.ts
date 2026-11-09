import { describe, expect, test } from "vitest";
import { contactSchema } from "@/lib/contact-schema";

const valid = { name: "Ana López", email: "ana@example.com", type: "freelance", message: "Necesito una web para mi negocio.", website: "" };

function firstError(input: unknown, field: string) {
  const r = contactSchema.safeParse(input);
  expect(r.success).toBe(false);
  if (r.success) return;
  return r.error.issues.find((i) => i.path[0] === field)?.message;
}

describe("contactSchema", () => {
  test("acepta un mensaje válido", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });
  test("nombre de 1 carácter tras trim", () => {
    expect(firstError({ ...valid, name: " a " }, "name")).toBe("nameRequired");
  });
  test("nombre demasiado largo", () => {
    expect(firstError({ ...valid, name: "a".repeat(81) }, "name")).toBe("nameTooLong");
  });
  test("email inválido", () => {
    expect(firstError({ ...valid, email: "x@" }, "email")).toBe("emailInvalid");
  });
  test("mensaje de 9 caracteres", () => {
    expect(firstError({ ...valid, message: "123456789" }, "message")).toBe("messageTooShort");
  });
  test("mensaje de 2001 caracteres", () => {
    expect(firstError({ ...valid, message: "a".repeat(2001) }, "message")).toBe("messageTooLong");
  });
  test("tipo desconocido", () => {
    expect(firstError({ ...valid, type: "spam" }, "type")).toBe("typeRequired");
  });
});
