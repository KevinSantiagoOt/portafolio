"use client";

import { motion } from "motion/react";
import { useLocale } from "next-intl";
import type { Locale, Service } from "@/data/types";
import { t } from "@/lib/localize";

export function Services({ title, services }: { title: string; services: Service[] }) {
  const locale = useLocale() as Locale;
  return (
    <section>
      <h2 className="mb-5 text-sm text-fg-muted">{title}</h2>
      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className="grid gap-3 md:grid-cols-3"
      >
        {services.map((s, i) => (
          <motion.li
            key={i}
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="flex min-h-[200px] flex-col justify-between rounded-[22px] border border-border bg-card p-5"
          >
            <span className="text-sm text-fg-muted tabular-nums">0{i + 1}</span>
            <div>
              <h3 className="text-lg font-medium">{t(s.title, locale)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{t(s.description, locale)}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
