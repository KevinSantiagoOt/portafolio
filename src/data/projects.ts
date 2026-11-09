import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "capitalia",
    title: "Capitalia",
    category: { es: "App móvil", en: "Mobile App" },
    summary: { es: "Gestión de préstamos", en: "Loan management" },
    description: {
      es: "Aplicación móvil para gestionar préstamos. Gestión de clientes: registro y control de personas con créditos activos. Control de préstamos: cálculo automático de intereses y plazos de pago. Seguimiento de cuotas: registro de pagos realizados y visualización de saldos pendientes.",
      en: "A mobile app for managing loans. Client management: registration and tracking of people with active credits. Loan control: automatic calculation of interest and payment terms. Installment tracking: logging of payments made and a view of outstanding balances.",
    },
    image: "/images/project-capitalia.svg",
    // Pendiente: tecnologías, demo y repositorio.
    stack: [],
    featured: true,
  },
];
