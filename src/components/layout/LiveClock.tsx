"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { site } from "@/data/site";
import { formatClock } from "@/lib/time";
import type { Locale } from "@/data/types";

export function LiveClock() {
  const locale = useLocale() as Locale;
  // null hasta montar: el servidor no conoce la hora del cliente → sin errores de hidratación.
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums">
      {site.city} • <time suppressHydrationWarning>{now ? formatClock(now, site.timeZone, locale) : "--:--"}</time>
    </span>
  );
}
