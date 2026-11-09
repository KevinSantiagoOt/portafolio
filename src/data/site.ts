import type { Site } from "./types";

// Contenido de ejemplo: reemplázalo con tus datos reales.
export const site: Site = {
  name: "Kevin",
  role: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
  city: "CDMX",
  // Zona horaria IANA (ej. "America/Bogota", "America/Lima").
  timeZone: "America/Mexico_City",
  email: "hola@ejemplo.dev",
  whatsapp: "5215512345678",
  linkedin: "https://www.linkedin.com/in/tu-usuario",
  github: "https://github.com/tu-usuario",
  available: true,
  photo: "/images/photo.svg",
  stack: [
    { name: "React", icon: "/icons/react.svg" },
    { name: "Next.js", icon: "/icons/nextjs.svg" },
    { name: "TypeScript", icon: "/icons/typescript.svg" },
    { name: "Node.js", icon: "/icons/nodejs.svg" },
    { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
    { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
  ],
  bio: {
    es: "Soy Kevin, un desarrollador que cree que el mejor software vive en la intersección entre la claridad y el oficio. Construyo productos web completos, del diseño de la interfaz a la base de datos, cuidando cada detalle: el rendimiento, la accesibilidad y esas pequeñas cosas que la mayoría no nota pero todos sienten. Me motiva resolver problemas reales, aprender sin parar y crear cosas que antes no existían.",
    en: "I'm Kevin, a developer who believes the best software lives at the intersection of clarity and craft. I build complete web products, from interface design to the database, caring about every detail: performance, accessibility and the small things most people never notice but everyone feels. I'm driven by solving real problems, learning nonstop and making things that didn't exist before.",
  },
  services: [
    {
      title: { es: "Sitios y landing pages", en: "Websites & landing pages" },
      description: {
        es: "Sitios rápidos, cuidados y optimizados para SEO que convierten visitas en clientes.",
        en: "Fast, polished, SEO-ready sites that turn visitors into customers.",
      },
    },
    {
      title: { es: "Aplicaciones web", en: "Web applications" },
      description: {
        es: "Paneles, SaaS y herramientas internas a medida con React, Next.js y Node.",
        en: "Custom dashboards, SaaS and internal tools with React, Next.js and Node.",
      },
    },
    {
      title: { es: "APIs e integraciones", en: "APIs & integrations" },
      description: {
        es: "Backends, bases de datos e integraciones con pagos, correo y servicios externos.",
        en: "Backends, databases and integrations with payments, email and third-party services.",
      },
    },
  ],
};

/** URL pública del sitio (sin barra final). En Vercel: NEXT_PUBLIC_SITE_URL=https://tu-dominio.com */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

/** Rutas públicas (sin idioma) para sitemap y metadatos. */
export const PAGES = ["", "/about", "/portfolio", "/resume"] as const;
