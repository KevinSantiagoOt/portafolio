import { expect, test, vi } from "vitest";
import { render } from "@testing-library/react";

// Captura los rangos que cada palabra pasa a useTransform para comprobar la cascada.
const ranges: number[][] = [];
vi.mock("motion/react", async (orig) => {
  const mod = await orig<typeof import("motion/react")>();
  return {
    ...mod,
    useTransform: (value: unknown, input: number[], output: unknown) => {
      ranges.push(input);
      return mod.useTransform(value as never, input, output as never);
    },
  };
});

import { ScrollRevealText } from "@/components/about/ScrollRevealText";

test("una palabra por span (ocultas a lectores) + frase completa en sr-only", () => {
  const { container } = render(<ScrollRevealText text="Hola mundo bonito" />);
  const visible = container.querySelector('[aria-hidden="true"]')!;
  expect(visible.querySelectorAll("[data-word]")).toHaveLength(3);
  const sr = container.querySelector(".sr-only")!;
  expect(sr.textContent).toBe("Hola mundo bonito");
});

test("párrafos separados por línea en blanco se revelan en cascada, uno tras otro", () => {
  ranges.length = 0;
  const { container } = render(<ScrollRevealText text={"Uno dos\n\nTres cuatro"} />);
  expect(container.querySelectorAll("p")).toHaveLength(2);
  expect(container.querySelectorAll("[data-word]")).toHaveLength(4);
  // Un único progreso para todo el texto: la palabra 3 (1.ª del 2.º párrafo) empieza donde termina la 2.
  expect(ranges).toEqual([
    [0, 0.25],
    [0.25, 0.5],
    [0.5, 0.75],
    [0.75, 1],
  ]);
  expect(container.querySelector(".sr-only")!.textContent).toBe("Uno dos Tres cuatro");
});
