import { expect, test } from "vitest";
import { t } from "@/lib/localize";

test("t devuelve el texto del idioma pedido", () => {
  expect(t({ es: "Hola", en: "Hi" }, "en")).toBe("Hi");
  expect(t({ es: "Hola", en: "Hi" }, "es")).toBe("Hola");
});
