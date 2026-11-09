import type { Resume } from "./types";

// CV de ejemplo: reemplázalo con tu experiencia real.
export const resume: Resume = {
  experience: [
    {
      title: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
      org: "Freelance",
      period: { es: "2024 — Actualidad", en: "2024 — Present" },
      location: "Remote",
      bullets: [
        {
          es: "Desarrollo de sitios y aplicaciones web para clientes de distintos sectores.",
          en: "Built websites and web applications for clients across industries.",
        },
        {
          es: "Mejora del rendimiento de sitios existentes hasta 95+ en Lighthouse.",
          en: "Improved existing sites' performance to 95+ on Lighthouse.",
        },
      ],
    },
    {
      title: { es: "Desarrollador Frontend", en: "Frontend Developer" },
      org: "Empresa Ejemplo",
      period: { es: "2022 — 2024", en: "2022 — 2024" },
      bullets: [
        {
          es: "Construcción de un sistema de diseño en React usado por 4 equipos.",
          en: "Built a React design system used by 4 teams.",
        },
        {
          es: "Migración de una SPA a Next.js, reduciendo el tiempo de carga un 40 %.",
          en: "Migrated an SPA to Next.js, cutting load time by 40%.",
        },
      ],
    },
  ],
  education: [
    {
      title: { es: "Ingeniería en Sistemas", en: "B.S. in Computer Systems Engineering" },
      org: "Universidad Ejemplo",
      period: { es: "2018 — 2022", en: "2018 — 2022" },
      bullets: [],
    },
  ],
  skills: [
    { group: { es: "Frontend", en: "Frontend" }, items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Motion"] },
    { group: { es: "Backend", en: "Backend" }, items: ["Node.js", "Express", "PostgreSQL", "Prisma", "REST"] },
    { group: { es: "Herramientas", en: "Tools" }, items: ["Git", "Docker", "Vercel", "Figma", "Playwright"] },
  ],
};
