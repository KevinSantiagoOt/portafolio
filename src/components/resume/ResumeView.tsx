"use client";

import { useLocale, useTranslations } from "next-intl";
import { resume } from "@/data/resume";
import { site } from "@/data/site";
import type { Locale } from "@/data/types";
import { t as tl } from "@/lib/localize";
import { DownloadButton } from "./DownloadButton";
import { ResumeItem, ResumeSection } from "./ResumeSection";

export function ResumeView() {
  const t = useTranslations("resume");
  const locale = useLocale() as Locale;

  return (
    <main className="px-3 pb-4 md:px-4">
      {/* Solo al imprimir / generar el PDF: nombre y contacto, que en la web ya están en la barra y el home. */}
      <div className="hidden pb-6 print:block">
        <p className="text-4xl font-medium tracking-tight">{site.name}</p>
        <p className="mt-1 text-lg">{tl(site.role, locale)}</p>
        <p className="mt-3 text-sm text-fg-muted">
          {site.email} · +{site.whatsapp.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})$/, "$1 $2 $3 $4")} · {site.city}, Colombia
        </p>
        <p className="text-sm text-fg-muted">
          {site.github.replace(/^https?:\/\//, "")} · {site.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
        </p>
      </div>

      <div className="flex flex-col gap-6 pt-8 pb-10 md:flex-row md:items-end md:justify-between md:pt-12 md:pb-14 print:hidden">
        <h1 className="text-[clamp(3.5rem,9vw,7rem)] leading-none font-medium tracking-[-0.04em]">{t("title")}</h1>
        <DownloadButton locale={locale} />
      </div>

      {resume.experience.length > 0 && (
        <ResumeSection title={t("experience")}>
          {resume.experience.map((e, i) => (
            <ResumeItem key={i} entry={e} />
          ))}
        </ResumeSection>
      )}

      <ResumeSection title={t("education")}>
        {resume.education.map((e, i) => (
          <ResumeItem key={i} entry={e} />
        ))}
      </ResumeSection>

      <ResumeSection title={t("skills")}>
        <div className="flex flex-col gap-5">
          {resume.skills.map((g, i) => (
            <div key={i} className="md:grid md:grid-cols-[1fr_2fr] md:gap-6">
              <h3 className="mb-2 text-sm text-fg-muted md:mb-0">{tl(g.group, locale)}</h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s} className="rounded-full border border-border bg-card px-3 py-1 text-sm">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ResumeSection>
    </main>
  );
}
