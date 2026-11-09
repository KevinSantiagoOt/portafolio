"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { site } from "@/data/site";
import { t as tl } from "@/lib/localize";
import type { Locale } from "@/data/types";
import { LiveClock } from "./LiveClock";
import { LocaleSwitch } from "./LocaleSwitch";
import { ThemeToggle } from "./ThemeToggle";

export function TopBar() {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  const isHome = usePathname() === "/";

  return (
    // Móvil: [nombre | controles] y el rol centrado debajo. Escritorio: nombre | rol centrado | hora + controles.
    <header className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 px-3 pt-2 pb-4 text-[13px] md:grid-cols-[1fr_auto_1fr] md:px-4">
      {isHome ? (
        <span className="font-medium whitespace-nowrap">{site.name}</span>
      ) : (
        <Link href="/" className="justify-self-start font-medium whitespace-nowrap transition-opacity hover:opacity-70">
          ← {t("home")}
        </Link>
      )}
      <p className="col-span-2 row-start-2 text-center text-base font-medium tracking-tight md:col-span-1 md:col-start-2 md:row-start-1 md:text-lg">
        {tl(site.role, locale)}
      </p>
      <div className="flex items-center justify-self-end gap-3 md:gap-4">
        <span className="hidden md:inline">
          <LiveClock />
        </span>
        <LocaleSwitch />
        <ThemeToggle />
      </div>
    </header>
  );
}
