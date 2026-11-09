"use client";

import { useLayoutEffect, useState } from "react";
import type { Project } from "@/data/types";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);
  // Con cacheComponents la ruta queda oculta (no desmontada) al navegar: cerrar el modal al ocultarse.
  useLayoutEffect(() => () => setSelected(null), []);
  return (
    <>
      <ul className="grid gap-3 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} onOpen={() => setSelected(p)} />
        ))}
      </ul>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
