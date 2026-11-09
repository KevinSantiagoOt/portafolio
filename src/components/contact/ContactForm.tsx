"use client";

import { useId, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { contactSchema, fieldErrors, INQUIRY_TYPES, type ContactErrorKey, type ContactInput } from "@/lib/contact-schema";
import { site } from "@/data/site";

type Status = "idle" | "submitting" | "success" | "sendFailed" | "rateLimited";
type Errors = Partial<Record<keyof ContactInput, ContactErrorKey>>;

const inputClass =
  "w-full rounded-2xl border border-border bg-card px-4 py-3 text-[15px] text-fg placeholder:text-fg-muted outline-none transition-colors focus:border-fg-faint aria-[invalid=true]:border-red-400/60";

export function ContactForm() {
  const t = useTranslations("contact");
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (res.ok) setStatus("success");
      else if (res.status === 429) setStatus("rateLimited");
      else setStatus("sendFailed");
    } catch {
      setStatus("sendFailed");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="rounded-2xl border border-border bg-card px-5 py-8 text-center text-lg">
        {t("success")}
      </p>
    );
  }

  const err = (field: keyof ContactInput) =>
    errors[field] ? (
      <p id={`${id}-${field}-err`} className="mt-1.5 text-xs text-red-400">
        {t(`errors.${errors[field]}`)}
      </p>
    ) : null;
  const a11y = (field: keyof ContactInput) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${id}-${field}-err` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="mb-1.5 block text-xs text-fg-muted">
            {t("name")}
          </label>
          <input id={`${id}-name`} name="name" autoComplete="name" className={inputClass} {...a11y("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="mb-1.5 block text-xs text-fg-muted">
            {t("email")}
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass}
            {...a11y("email")}
          />
          {err("email")}
        </div>
      </div>

      <fieldset {...a11y("type")}>
        <legend className="mb-1.5 text-xs text-fg-muted">{t("type")}</legend>
        <div className="flex flex-wrap gap-2">
          {INQUIRY_TYPES.map((type) => (
            <label key={type} className="cursor-pointer">
              <input type="radio" name="type" value={type} className="peer sr-only" />
              <span className="inline-block rounded-full border border-border px-4 py-1.5 text-sm text-fg-muted transition-colors peer-checked:border-fg peer-checked:bg-fg peer-checked:text-bg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-fg hover:text-fg">
                {t(`types.${type}`)}
              </span>
            </label>
          ))}
        </div>
        {err("type")}
      </fieldset>

      <div>
        <label htmlFor={`${id}-message`} className="mb-1.5 block text-xs text-fg-muted">
          {t("message")}
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          className={`${inputClass} resize-y`}
          {...a11y("message")}
        />
        {err("message")}
      </div>

      {/* Honeypot: invisible para personas y lectores de pantalla. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      {status === "sendFailed" && (
        <p role="alert" className="text-sm text-red-400">
          {t("errors.sendFailed")}{" "}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>
        </p>
      )}
      {status === "rateLimited" && (
        <p role="alert" className="text-sm text-red-400">
          {t("errors.rateLimited")}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 self-start rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-85 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
