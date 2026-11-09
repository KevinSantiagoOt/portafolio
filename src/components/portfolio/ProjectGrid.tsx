"use client";

import { useLayoutEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { Project } from "@/data/types";
import { site } from "@/data/site";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const t = useTranslations("portfolio");
  const [selected, setSelected] = useState<Project | null>(null);
  // Con cacheComponents la ruta queda oculta (no desmontada) al navegar: cerrar el modal al ocultarse.
  useLayoutEffect(() => () => setSelected(null), []);

  return (
    <>
      <ul className="grid gap-3 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} onOpen={() => setSelected(p)} />
        ))}
        {/* Completa la cuadrícula y lleva al resto del trabajo en GitHub. */}
        <li>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full min-h-[220px] flex-col justify-between rounded-[24px] border border-dashed border-border p-6 transition-colors hover:border-fg-faint hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg md:p-8"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-8 text-fg-muted">
              <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 015 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z" />
            </svg>
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-2xl font-medium tracking-tight">{t("moreTitle")}</span>
                <ArrowIcon className="size-4 text-fg-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" />
              </div>
              <p className="mt-2 text-sm text-fg-muted">{t("moreText")}</p>
            </div>
          </a>
        </li>
      </ul>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
