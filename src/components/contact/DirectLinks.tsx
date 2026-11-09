"use client";

import { useTranslations } from "next-intl";
import { site } from "@/data/site";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { CopyEmailButton } from "./CopyEmailButton";

const icons = {
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 11-.01 5 2.5 2.5 0 01.01-5zM3 9.75h4v11H3v-11zm6.5 0h3.8v1.6h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.5 4.77 5.75v5.6h-4v-4.96c0-1.18-.02-2.7-1.7-2.7-1.7 0-1.96 1.28-1.96 2.6v5.06h-4v-11z" />
  ),
  github: (
    <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 015 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z" />
  ),
  whatsapp: (
    <path d="M12.04 2a9.9 9.9 0 00-8.5 15l-1.4 5.1 5.24-1.37A9.9 9.9 0 1012.04 2zm5.8 14.1c-.25.7-1.43 1.33-1.98 1.38-.5.05-1.13.26-3.8-.8-3.2-1.27-5.25-4.55-5.4-4.76-.16-.21-1.3-1.73-1.3-3.3s.82-2.34 1.11-2.66c.3-.32.64-.4.86-.4h.62c.2 0 .47-.07.73.56.27.65.92 2.25 1 2.41.08.16.13.35.03.56-.1.21-.16.34-.32.53-.16.18-.33.41-.47.55-.16.16-.32.33-.14.65.19.32.83 1.37 1.78 2.21 1.22 1.09 2.25 1.42 2.57 1.58.32.16.5.13.69-.08.19-.21.8-.93 1.01-1.25.21-.32.43-.27.72-.16.3.1 1.88.89 2.2 1.05.32.16.54.24.62.37.08.13.08.76-.17 1.46z" />
  ),
};

export function DirectLinks() {
  const t = useTranslations("contact");
  const links = [
    { key: "linkedin", label: "LinkedIn", href: site.linkedin },
    { key: "github", label: "GitHub", href: site.github },
    {
      key: "whatsapp",
      label: "WhatsApp",
      href: `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(t("whatsappText"))}`,
    },
  ] as const;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs text-fg-muted">{t("directTitle")}</h3>
      <CopyEmailButton email={site.email} />
      <ul className="grid grid-cols-3 gap-2">
        {links.map((l) => (
          <li key={l.key}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-2 rounded-2xl border border-border bg-card px-3 py-3 text-sm transition-colors hover:border-fg-faint hover:bg-card-hover focus-visible:outline-2 focus-visible:outline-fg"
            >
              <span className="flex min-w-0 items-center gap-2">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4 shrink-0">
                  {icons[l.key]}
                </svg>
                <span className="truncate">{l.label}</span>
              </span>
              <ArrowIcon className="hidden shrink-0 text-fg-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:block" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
