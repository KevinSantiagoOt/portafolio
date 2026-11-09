"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useLocale } from "next-intl";
import type { Locale, ResumeEntry } from "@/data/types";
import { t } from "@/lib/localize";

export function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-border py-8 md:grid md:grid-cols-[1fr_3fr] md:gap-8 md:py-10">
      <h2 className="mb-5 text-sm text-fg-muted md:mb-0">{title}</h2>
      <div className="flex flex-col gap-8">{children}</div>
    </section>
  );
}

export function ResumeItem({ entry }: { entry: ResumeEntry }) {
  const locale = useLocale() as Locale;
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="md:grid md:grid-cols-[1fr_2fr] md:gap-6"
    >
      <p className="mb-1 text-sm text-fg-muted tabular-nums md:mb-0">{t(entry.period, locale)}</p>
      <div>
        <h3 className="text-lg font-medium">{t(entry.title, locale)}</h3>
        <p className="text-sm text-fg-muted">
          {entry.org}
          {entry.location ? ` · ${entry.location}` : ""}
        </p>
        {entry.bullets.length > 0 && (
          <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-4 text-[15px] leading-relaxed text-fg/85 marker:text-fg-faint">
            {entry.bullets.map((b, i) => (
              <li key={i}>{t(b, locale)}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.article>
  );
}
