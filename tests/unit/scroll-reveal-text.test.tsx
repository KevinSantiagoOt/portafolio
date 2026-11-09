import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { ScrollRevealText } from "@/components/about/ScrollRevealText";

test("una palabra por span (ocultas a lectores) + frase completa en sr-only", () => {
  const { container } = render(<ScrollRevealText text="Hola mundo bonito" />);
  const visible = container.querySelector('[aria-hidden="true"]')!;
  expect(visible.querySelectorAll("[data-word]")).toHaveLength(3);
  const sr = container.querySelector(".sr-only")!;
  expect(sr.textContent).toBe("Hola mundo bonito");
});
