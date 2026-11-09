import { expect, test } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import type { Project } from "@/data/types";
import { renderWithIntl } from "./helpers/intl";

const projects: Project[] = [
  {
    slug: "a",
    title: "Alpha",
    category: { es: "App móvil", en: "Mobile App" },
    summary: { es: "Resumen A", en: "Summary A" },
    description: { es: "Descripción A", en: "Description A" },
    image: "/images/a.svg",
    stack: ["React", "Node.js"],
    demoUrl: "https://demo.example.com",
    repoUrl: "https://github.com/x/a",
  },
  {
    slug: "b",
    title: "Beta",
    category: { es: "Backend", en: "Backend API" },
    summary: { es: "Resumen B", en: "Summary B" },
    description: { es: "Descripción B", en: "Description B" },
    image: "/images/b.svg",
    stack: ["Go"],
    repoUrl: "https://github.com/x/b",
  },
];

test("una tarjeta por proyecto con título y categoría en el idioma activo", () => {
  renderWithIntl(<ProjectGrid projects={projects} />, "en");
  expect(screen.getByRole("button", { name: /Alpha/ })).toHaveTextContent("Mobile App");
  expect(screen.getByRole("button", { name: /Beta/ })).toHaveTextContent("Backend API");
});

test("clic abre el diálogo con descripción, stack y enlaces disponibles", async () => {
  const user = userEvent.setup();
  renderWithIntl(<ProjectGrid projects={projects} />, "en");
  await user.click(screen.getByRole("button", { name: /Alpha/ }));
  const dialog = screen.getByRole("dialog");
  expect(within(dialog).getByText("Description A")).toBeInTheDocument();
  expect(within(dialog).getByText("Node.js")).toBeInTheDocument();
  expect(within(dialog).getByRole("link", { name: /Live demo/ })).toHaveAttribute("href", "https://demo.example.com");
  expect(within(dialog).getByRole("link", { name: /Code/ })).toHaveAttribute("href", "https://github.com/x/a");
});

test("sin demoUrl no hay botón de demo", async () => {
  const user = userEvent.setup();
  renderWithIntl(<ProjectGrid projects={projects} />, "es");
  await user.click(screen.getByRole("button", { name: /Beta/ }));
  const dialog = screen.getByRole("dialog");
  expect(within(dialog).queryByRole("link", { name: /Ver demo/ })).toBeNull();
  expect(within(dialog).getByRole("link", { name: /Código/ })).toBeInTheDocument();
});

test("muestra la etiqueta de estado y la galería de capturas", async () => {
  const user = userEvent.setup();
  const withGallery: Project = {
    ...projects[0],
    status: { es: "Beta privada · Android", en: "Private beta · Android" },
    gallery: ["/images/s1.png", "/images/s2.png"],
  };
  renderWithIntl(<ProjectGrid projects={[withGallery]} />, "en");
  expect(screen.getByRole("button", { name: /Alpha/ })).toHaveTextContent("Private beta · Android");
  await user.click(screen.getByRole("button", { name: /Alpha/ }));
  const dialog = screen.getByRole("dialog");
  expect(within(dialog).getByText("Private beta · Android")).toBeInTheDocument();
  expect(within(dialog).getAllByRole("img", { name: /Alpha — screenshot/ })).toHaveLength(2);
});
