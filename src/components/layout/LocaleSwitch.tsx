"use client";

import { useLocale, useTranslations } from "next-intl";
import { getPathname, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitch() {
  const locale = useLocale();
  const t = useTranslations("locale");
  const pathname = usePathname();

  return (
    <div role="group" aria-label={t("label")} className="flex items-center gap-0.5 text-xs">
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            aria-current={active ? "true" : undefined}
            // Navegación completa: <html> vive en el layout de [locale]; una navegación cliente lo
            // remontaría reseteando data-theme y dejando lang desactualizado al volver.
            onClick={() => !active && window.location.assign(getPathname({ href: pathname, locale: l }))}
            className={`rounded-full px-2 py-0.5 uppercase transition-colors focus-visible:outline-2 focus-visible:outline-fg ${
              active ? "bg-fg text-bg" : "text-fg-muted hover:text-fg"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
