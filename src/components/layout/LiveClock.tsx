"use client";

import { useSyncExternalStore } from "react";
import { useLocale } from "next-intl";
import { site } from "@/data/site";
import { formatClock } from "@/lib/time";
import type { Locale } from "@/data/types";

const MINUTE = 60_000;

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 5_000);
  return () => clearInterval(id);
}
// Redondeado al minuto: el valor es estable entre renders del mismo minuto.
const getSnapshot = () => Math.floor(Date.now() / MINUTE) * MINUTE;
// En el servidor no hay hora del cliente → "--:--" y sin errores de hidratación.
const getServerSnapshot = () => null;

export function LiveClock() {
  const locale = useLocale() as Locale;
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <span className="tabular-nums">
      {site.city} • <time>{now === null ? "--:--" : formatClock(new Date(now), site.timeZone, locale)}</time>
    </span>
  );
}
