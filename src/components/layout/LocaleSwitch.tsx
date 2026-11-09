"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitch() {
  const locale = useLocale();
  const t = useTranslations("locale");
  const pathname = usePathname();
  const router = useRouter();

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
            onClick={() => !active && router.replace(pathname, { locale: l, scroll: false })}
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
