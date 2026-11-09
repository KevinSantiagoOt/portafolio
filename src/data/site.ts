import type { Site } from "./types";

export const site: Site = {
  name: "Kevin Otálvaro",
  role: { es: "Desarrollador de Software", en: "Software Developer" },
  city: "Medellín",
  timeZone: "America/Bogota",
  email: "kevinotalvaro@outlook.es",
  whatsapp: "573137226702",
  linkedin: "https://www.linkedin.com/in/kevinotalvaro",
  github: "https://github.com/KevinSantiagoOt",
  available: true,
  photo: "/images/kevin-perfil.webp",
  // Iconos: Devicon (MIT). `mono`: logo oscuro que se invierte en tema oscuro.
  stack: [
    { name: "Java", icon: "/icons/java.svg", lift: true },
    { name: "C#", icon: "/icons/csharp.svg" },
    { name: "TypeScript", icon: "/icons/typescript.svg" },
    { name: "React", icon: "/icons/react.svg" },
    { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
    { name: "Prisma", icon: "/icons/prisma.svg", mono: true },
    { name: "MySQL", icon: "/icons/mysql.svg" },
    { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
    { name: "Git", icon: "/icons/git.svg" },
    { name: "GitHub", icon: "/icons/github.svg", mono: true },
  ],
  bio: {
    es: "Soy Kevin Otálvaro, desarrollador de software en Medellín, Colombia. Me apasiona crear soluciones digitales completas: desde la lógica del backend y las bases de datos hasta interfaces intuitivas en el frontend. Desarrollo páginas web, aplicaciones móviles y de escritorio con Java, C#, TypeScript y React, buscando que cada producto sea claro, confiable y fácil de usar.",
    en: "I'm Kevin Otálvaro, a software developer based in Medellín, Colombia. I'm passionate about building complete digital solutions: from backend logic and databases to intuitive frontend interfaces. I build websites, mobile and desktop applications with Java, C#, TypeScript and React, aiming for every product to be clear, reliable and easy to use.",
  },
  services: [
    {
      title: { es: "Páginas web", en: "Websites" },
      description: {
        es: "Sitios rápidos, modernos y adaptados a móvil, desde landing pages hasta aplicaciones web completas.",
        en: "Fast, modern, mobile-friendly sites, from landing pages to full web applications.",
      },
    },
    {
      title: { es: "Aplicaciones móviles", en: "Mobile apps" },
      description: {
        es: "Apps para gestionar tu negocio desde el teléfono: clientes, pagos, inventario y más.",
        en: "Apps to run your business from your phone: customers, payments, inventory and more.",
      },
    },
    {
      title: { es: "Aplicaciones de escritorio", en: "Desktop apps" },
      description: {
        es: "Software a medida para Windows con Java o C#, conectado a bases de datos MySQL o PostgreSQL.",
        en: "Custom Windows software with Java or C#, connected to MySQL or PostgreSQL databases.",
      },
    },
  ],
};

/** URL pública del sitio (sin barra final). En Vercel: NEXT_PUBLIC_SITE_URL=https://tu-dominio.com */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

/** Rutas públicas (sin idioma) para sitemap y metadatos. */
export const PAGES = ["", "/about", "/portfolio", "/resume"] as const;
