export type Locale = "es" | "en";

export type Localized = { es: string; en: string };

export type Project = {
  slug: string;
  title: string;
  category: Localized;
  summary: Localized;
  description: Localized;
  image: string;
  stack: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
};

export type ResumeEntry = {
  title: Localized;
  org: string;
  period: Localized;
  location?: string;
  bullets: Localized[];
};

export type Resume = {
  experience: ResumeEntry[];
  education: ResumeEntry[];
  skills: { group: Localized; items: string[] }[];
};

export type Service = { title: Localized; description: Localized };

export type Site = {
  name: string;
  role: Localized;
  city: string;
  timeZone: string;
  email: string;
  /** Solo dígitos, con código de país (ej. 5215512345678). */
  whatsapp: string;
  linkedin: string;
  github: string;
  available: boolean;
  photo: string;
  stack: { name: string; icon: string }[];
  bio: Localized;
  services: Service[];
};
