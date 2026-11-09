"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/Modal";
import { ContactForm } from "./ContactForm";
import { DirectLinks } from "./DirectLinks";

export function ContactPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations("contact");
  const titleId = useId();

  return (
    <Modal open={open} onClose={onClose} labelledBy={titleId} className="max-w-[720px] p-5 md:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 id={titleId} className="text-3xl font-medium tracking-tight md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-2 text-sm text-fg-muted">{t("subtitle")}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-fg"
        >
          <svg viewBox="0 0 16 16" aria-hidden className="size-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      </div>
      <ContactForm />
      <div className="my-6 h-px bg-border" />
      <DirectLinks />
    </Modal>
  );
}
