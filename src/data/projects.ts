import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "capitalia",
    title: "Capitalia",
    category: { es: "Cliente real · App móvil + web", en: "Real client · Mobile + web app" },
    summary: { es: "Gestión de préstamos", en: "Loan management" },
    description: {
      es: "Sistema de gestión de préstamos desarrollado para un negocio real, que lo usa actualmente. Incluye app móvil, panel web y API propia. Gestión de clientes: registro y control de personas con créditos activos. Control de préstamos: cálculo automático de intereses y plazos de pago. Seguimiento de cuotas: registro de pagos realizados y visualización de saldos pendientes.",
      en: "A loan management system built for a real lending business, which uses it today. It includes a mobile app, a web dashboard and its own API. Client management: registration and tracking of people with active credits. Loan control: automatic calculation of interest and payment terms. Installment tracking: logging of payments made and a view of outstanding balances.",
    },
    image: "/images/project-capitalia.svg",
    stack: ["React Native", "Expo", "React", "Tailwind CSS", "Node.js", "Express", "TypeScript", "Prisma", "PostgreSQL", "JWT"],
    // Pendiente: URL de la demo en vivo.
    repoUrl: "https://github.com/KevinSantiagoOt/CAPITALIA",
    featured: true,
  },
];
