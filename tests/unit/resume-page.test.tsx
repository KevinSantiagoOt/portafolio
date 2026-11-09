import { expect, test } from "vitest";
import { screen, within } from "@testing-library/react";
import { ResumeView } from "@/components/resume/ResumeView";
import { resume } from "@/data/resume";
import { renderWithIntl } from "./helpers/intl";

test("descarga el PDF del idioma activo", () => {
  renderWithIntl(<ResumeView />, "en");
  const link = screen.getByRole("link", { name: /Download PDF/ });
  expect(link).toHaveAttribute("href", "/cv-en.pdf");
  expect(link).toHaveAttribute("download");
});

test("secciones y una entrada por experiencia", () => {
  renderWithIntl(<ResumeView />, "en");
  expect(screen.getByRole("heading", { name: "Experience" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Education" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Skills" })).toBeInTheDocument();
  const section = screen.getByRole("heading", { name: "Experience" }).closest("section")!;
  expect(within(section).getAllByRole("article")).toHaveLength(resume.experience.length);
});
