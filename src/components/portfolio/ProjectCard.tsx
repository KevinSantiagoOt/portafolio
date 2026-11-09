"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useLocale } from "next-intl";
import type { Locale, Project } from "@/data/types";
import { t } from "@/lib/localize";

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const locale = useLocale() as Locale;
  return (
    <motion.li
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={onOpen}
        className="group block w-full rounded-[24px] border border-border bg-card p-3 text-left transition-colors hover:border-fg-faint hover:bg-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-card-hover">
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            unoptimized={project.image.endsWith(".svg")}
          />
          {project.status && (
            <span className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-md">
              {t(project.status, locale)}
            </span>
          )}
        </div>
        <div className="flex items-baseline justify-between gap-4 px-3 pt-4 pb-2">
          <span className="line-clamp-1 text-lg">{project.title}</span>
          <span className="shrink-0 text-sm text-fg-muted">{t(project.category, locale)}</span>
        </div>
      </button>
    </motion.li>
  );
}
