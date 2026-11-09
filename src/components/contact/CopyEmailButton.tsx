"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/** Email visible y seleccionable + botón para copiarlo. Si el portapapeles no está disponible, no falla. */
export function CopyEmailButton({ email }: { email: string }) {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      if (!navigator.clipboard?.writeText) return;
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Permiso denegado o contexto inseguro: el email sigue visible para copiarlo a mano.
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3">
      <a href={`mailto:${email}`} className="min-w-0 truncate text-sm select-all hover:underline">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={t("copy")}
        className="shrink-0 rounded-full border border-border px-3 py-1 text-xs text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-fg"
      >
        <span aria-live="polite">{copied ? t("copied") : t("copy")}</span>
      </button>
    </div>
  );
}
