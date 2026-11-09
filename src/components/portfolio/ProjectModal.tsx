"use client";

import Image from "next/image";
import { useId } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale, Project } from "@/data/types";
import { t as tl } from "@/lib/localize";
import { Modal } from "@/components/ui/Modal";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const t = useTranslations("portfolio");
  const locale = useLocale() as Locale;
  const titleId = useId();

  return (
    <Modal open={project !== null} onClose={onClose} labelledBy={titleId} className="max-w-[860px] p-3 md:p-4">
      {project && (
        <>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-card-hover">
            <Image
              src={project.image}
              alt=""
              fill
              sizes="(min-width: 768px) 860px, 100vw"
              className="object-cover"
              unoptimized={project.image.endsWith(".svg")}
            />
            <button
              type="button"
              onClick={onClose}
              aria-label={t("close")}
              className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-white"
            >
              <svg viewBox="0 0 16 16" aria-hidden className="size-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          </div>
          <div className="px-2 pt-5 pb-3 md:px-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id={titleId} className="text-2xl font-medium tracking-tight md:text-3xl">
                {project.title}
              </h2>
              <span className="text-sm text-fg-muted">{tl(project.category, locale)}</span>
            </div>
            <p className="mt-3 max-w-[60ch] leading-relaxed text-fg-muted">{tl(project.description, locale)}</p>

            <h3 className="sr-only">{t("stack")}</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s} className="rounded-full border border-border px-3 py-1 text-xs text-fg-muted">
                  {s}
                </li>
              ))}
            </ul>

            {(project.demoUrl || project.repoUrl) && (
              <div className="mt-6 flex flex-wrap gap-2">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
                  >
                    {t("demo")} <ArrowIcon />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:bg-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
                  >
                    {t("code")} <ArrowIcon />
                  </a>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </Modal>
  );
}
