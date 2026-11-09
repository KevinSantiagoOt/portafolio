import type { Project } from "./types";

// Proyectos de ejemplo: reemplázalos con los tuyos.
export const projects: Project[] = [
  {
    slug: "travel-easy",
    title: "Travel Easy",
    category: { es: "App móvil", en: "Mobile App" },
    summary: { es: "Planificador de viajes", en: "Trip planner" },
    description: {
      es: "Aplicación para planificar viajes en grupo: itinerarios compartidos, gastos divididos y mapas sin conexión. Construida con React Native y un backend en Node.js.",
      en: "An app for planning group trips: shared itineraries, split expenses and offline maps. Built with React Native and a Node.js backend.",
    },
    image: "/images/project-travel.svg",
    stack: ["React Native", "Node.js", "PostgreSQL"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/tu-usuario/travel-easy",
    featured: true,
  },
  {
    slug: "prints",
    title: "Prints",
    category: { es: "Diseño UX/UI", en: "UX/UI Design" },
    summary: { es: "Galería de arte digital", en: "Digital art gallery" },
    description: {
      es: "Marketplace de impresiones de arte digital con búsqueda instantánea, pagos con Stripe y un panel para artistas.",
      en: "A marketplace for digital art prints with instant search, Stripe payments and an artist dashboard.",
    },
    image: "/images/project-prints.svg",
    stack: ["Next.js", "TypeScript", "Stripe"],
    demoUrl: "https://example.com",
  },
  {
    slug: "pulse",
    title: "Pulse Dashboard",
    category: { es: "Aplicación web", en: "Web App" },
    summary: { es: "Analítica en tiempo real", en: "Real-time analytics" },
    description: {
      es: "Panel de analítica en tiempo real para tiendas en línea, con gráficas en vivo, alertas y exportación de reportes.",
      en: "A real-time analytics dashboard for online stores, with live charts, alerts and report exports.",
    },
    image: "/images/project-pulse.svg",
    stack: ["React", "Node.js", "WebSockets", "PostgreSQL"],
    repoUrl: "https://github.com/tu-usuario/pulse",
  },
  {
    slug: "taskflow",
    title: "Taskflow API",
    category: { es: "Backend", en: "Backend" },
    summary: { es: "API de gestión de tareas", en: "Task management API" },
    description: {
      es: "API REST para gestión de proyectos con autenticación, roles, webhooks y documentación OpenAPI.",
      en: "A REST API for project management with authentication, roles, webhooks and OpenAPI docs.",
    },
    image: "/images/project-taskflow.svg",
    stack: ["Node.js", "Express", "PostgreSQL", "Docker"],
    repoUrl: "https://github.com/tu-usuario/taskflow",
  },
];
