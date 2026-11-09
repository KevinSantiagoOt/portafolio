"use client";

import { useLocale, useTranslations } from "next-intl";
import { resume } from "@/data/resume";
import type { Locale } from "@/data/types";
import { t as tl } from "@/lib/localize";
import { DownloadButton } from "./DownloadButton";
import { ResumeItem, ResumeSection } from "./ResumeSection";

export function ResumeView() {
  const t = useTranslations("resume");
  const locale = useLocale() as Locale;

  return (
    <main className="px-3 pb-4 md:px-4">
      <div className="flex flex-col gap-6 pt-8 pb-10 md:flex-row md:items-end md:justify-between md:pt-12 md:pb-14">
        <h1 className="text-[clamp(3.5rem,9vw,7rem)] leading-none font-medium tracking-[-0.04em]">{t("title")}</h1>
        <DownloadButton locale={locale} />
      </div>

      <ResumeSection title={t("experience")}>
        {resume.experience.map((e, i) => (
          <ResumeItem key={i} entry={e} />
        ))}
      </ResumeSection>

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
