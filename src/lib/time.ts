import type { Locale } from "@/data/types";

/** Hora local de `timeZone` (no la del visitante), ej. "11:13 AM". */
export function formatClock(date: Date, timeZone: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-MX", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  }).format(date);
}
