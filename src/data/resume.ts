import type { Resume } from "./types";

export const resume: Resume = {
  experience: [
    {
      title: { es: "Desarrollador de Software (Freelance)", en: "Software Developer (Freelance)" },
      org: "Capitalia",
      period: { es: "2026", en: "2026" },
      bullets: [
        {
          es: "Desarrollé una app móvil para un negocio real de préstamos, actualmente en beta privada en Android.",
          en: "Built a mobile app for a real lending business, currently in private beta on Android.",
        },
        {
          es: "Registro y control de clientes con créditos activos; cálculo automático de intereses y plazos de pago.",
          en: "Client registration and tracking of active credits; automatic calculation of interest and payment terms.",
        },
        {
          es: "Seguimiento de cuotas pagadas y saldos pendientes, con API propia en Node.js, Prisma y PostgreSQL.",
          en: "Tracking of paid installments and outstanding balances, with its own API in Node.js, Prisma and PostgreSQL.",
        },
      ],
    },
    {
      title: { es: "Practicante TI", en: "IT Intern" },
      org: "Rentan",
      period: { es: "2026", en: "2026" },
      location: "Medellín",
      bullets: [
        {
          es: "Gestioné tickets de soporte e inventario de activos en GLPI.",
          en: "Managed support tickets and asset inventory in GLPI.",
        },
        {
          es: "Diagnostiqué y resolví incidencias de hardware y software.",
          en: "Diagnosed and resolved hardware and software issues.",
        },
        {
          es: "Mantuve actualizado el inventario técnico y la asignación de equipos.",
          en: "Kept the technical inventory and equipment assignments up to date.",
        },
      ],
    },
  ],
  education: [
    {
      title: { es: "Ingeniería en Desarrollo de Software", en: "B.S. in Software Development Engineering" },
      org: "UNIMINUTO",
      period: { es: "En curso", en: "In progress" },
      bullets: [],
    },
    {
      title: { es: "Estudiante de Desarrollo de Software ITM", en: "Software Development Student at ITM" },
      org: "ITM — Instituto Tecnológico Metropolitano",
      period: { es: "En curso", en: "In progress" },
      bullets: [],
    },
  ],
  skills: [
    { group: { es: "Lenguajes", en: "Languages" }, items: ["Java", "C#", "TypeScript"] },
    { group: { es: "Frontend y móvil", en: "Frontend & mobile" }, items: ["React", "React Native", "Expo", "Tailwind CSS 4"] },
    { group: { es: "Backend", en: "Backend" }, items: ["Node.js", "Express", "REST APIs", "JWT"] },
    { group: { es: "Datos", en: "Data" }, items: ["Prisma", "MySQL", "PostgreSQL", "MySQL Workbench"] },
    {
      group: { es: "Herramientas", en: "Tools" },
      items: ["Git", "GitHub", "Insomnia", "VS Code", "Visual Studio", "Warp", "GLPI"],
    },
  ],
};
