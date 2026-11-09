import type { Resume } from "./types";

export const resume: Resume = {
  // Pendiente: experiencia laboral o proyectos freelance (puesto, empresa, fechas, logros).
  experience: [],
  education: [
    {
      title: { es: "Ingeniería en Desarrollo de Software", en: "B.S. in Software Development Engineering" },
      org: "UNIMINUTO",
      period: { es: "En curso", en: "In progress" },
      bullets: [],
    },
    {
      title: { es: "Tecnólogo en Desarrollo de Software", en: "Software Development Technologist" },
      org: "ITM — Instituto Tecnológico Metropolitano",
      period: { es: "Graduado", en: "Graduated" },
      bullets: [],
    },
  ],
  skills: [
    { group: { es: "Lenguajes", en: "Languages" }, items: ["Java", "C#", "TypeScript"] },
    { group: { es: "Frontend", en: "Frontend" }, items: ["React", "Tailwind CSS 4"] },
    { group: { es: "Datos", en: "Data" }, items: ["Prisma", "MySQL", "PostgreSQL", "MySQL Workbench"] },
    {
      group: { es: "Herramientas", en: "Tools" },
      items: ["Git", "GitHub", "Insomnia", "VS Code", "Visual Studio", "Warp"],
    },
  ],
};
