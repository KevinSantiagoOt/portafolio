import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "capitalia",
    title: "Capitalia",
    category: { es: "Cliente real · App móvil", en: "Real client · Mobile app" },
    status: { es: "Beta privada · Android", en: "Private beta · Android" },
    summary: { es: "Gestión de préstamos", en: "Loan management" },
    description: {
      es: "Sistema de gestión de préstamos desarrollado para un negocio real, que lo usa actualmente. Incluye la app móvil y su propia API. Gestión de clientes: registro y control de personas con créditos activos. Control de préstamos: cálculo automático de intereses y plazos de pago. Seguimiento de cuotas: registro de pagos realizados y visualización de saldos pendientes.",
      en: "A loan management system built for a real lending business, which uses it today. It includes the mobile app and its own API. Client management: registration and tracking of people with active credits. Loan control: automatic calculation of interest and payment terms. Installment tracking: logging of payments made and a view of outstanding balances.",
    },
    image: "/images/project-capitalia.webp",
    gallery: [1, 2, 3, 4, 5, 6].map((n) => `/images/capitalia-${n}.webp`),
    stack: ["React Native", "Expo", "Node.js", "Express", "TypeScript", "Prisma", "PostgreSQL", "JWT"],
    repoUrl: "https://github.com/KevinSantiagoOt/CAPITALIA",
    featured: true,
  },
];
