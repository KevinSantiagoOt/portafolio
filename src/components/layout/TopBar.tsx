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
    <header className="flex items-center gap-4 px-3 pt-2 pb-4 text-[13px] md:grid md:grid-cols-[1fr_2fr_2fr_auto] md:px-4">
      {isHome ? (
        <span className="font-medium whitespace-nowrap">{site.name}</span>
      ) : (
        <Link href="/" className="font-medium whitespace-nowrap transition-opacity hover:opacity-70">
          ← {t("home")}
        </Link>
      )}
      <span className="min-w-0 truncate text-fg-muted md:text-fg">{tl(site.role, locale)}</span>
      <span className="hidden justify-self-end md:block">
        <LiveClock />
      </span>
      <div className="ml-auto flex items-center gap-3 md:ml-0">
        <LocaleSwitch />
        <ThemeToggle />
      </div>
    </header>
  );
}
