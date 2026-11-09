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

test("secciones; Experiencia solo si hay entradas", () => {
  renderWithIntl(<ResumeView />, "en");
  expect(screen.getByRole("heading", { name: "Education" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Skills" })).toBeInTheDocument();
  const exp = screen.queryByRole("heading", { name: "Experience" });
  if (resume.experience.length === 0) {
    expect(exp).toBeNull();
  } else {
    expect(within(exp!.closest("section")!).getAllByRole("article")).toHaveLength(resume.experience.length);
  }
  const edu = screen.getByRole("heading", { name: "Education" }).closest("section")!;
  expect(within(edu).getAllByRole("article")).toHaveLength(resume.education.length);
});
