"use client";

import { useTranslations } from "next-intl";
import type { Locale } from "@/data/types";

export function DownloadButton({ locale }: { locale: Locale }) {
  const t = useTranslations("resume");
  return (
    <a
      href={`/cv-${locale}.pdf`}
      download
      className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
    >
      {t("download")}
      <svg viewBox="0 0 16 16" aria-hidden className="size-3.5 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2.5v8M4.5 7L8 10.5 11.5 7M3 13.5h10" />
      </svg>
    </a>
  );
}
