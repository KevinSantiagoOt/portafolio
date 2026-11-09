"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { THEME_STORAGE_KEY, type Theme } from "@/components/providers/ThemeScript";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

// El tema vive en <html data-theme>; lo observamos para que el botón esté siempre sincronizado.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export function ThemeToggle() {
  const t = useTranslations("theme");
  const theme = useSyncExternalStore(subscribe, readTheme, () => "dark" as Theme);

  function toggle() {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Almacenamiento bloqueado (modo privado, etc.): el tema cambia igual en esta visita.
    }
  }

  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("toggle")}
      aria-pressed={isDark}
      className="relative h-5 w-9 shrink-0 rounded-full bg-fg/25 transition-colors hover:bg-fg/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
    >
      <span
        className={`absolute top-0.5 left-0.5 size-4 rounded-full bg-fg transition-transform duration-300 ${isDark ? "translate-x-4" : ""}`}
      />
    </button>
  );
}
