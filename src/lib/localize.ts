import type { Locale, Localized } from "@/data/types";

export function t(value: Localized, locale: Locale): string {
  return value[locale];
}
