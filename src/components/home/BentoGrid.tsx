"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { site } from "@/data/site";
import { BentoCard } from "./BentoCard";
import { StackCard } from "./StackCard";
import { PhotoCard } from "./PhotoCard";
import { AvailabilityBadge } from "./AvailabilityBadge";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};

export function BentoGrid({ onContactClick }: { onContactClick: () => void }) {
  const t = useTranslations();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 grid grid-cols-2 gap-3 md:grid-cols-12 md:grid-rows-[260px_260px] md:gap-3"
    >
      <BentoCard title={t("nav.about")} href="/about" className="col-span-2 h-[130px] md:col-span-4 md:h-auto" />
      <BentoCard title={t("nav.portfolio")} href="/portfolio" className="col-span-2 h-[130px] md:col-span-8 md:h-auto" />
      <BentoCard
        title={t("nav.contact")}
        onClick={onContactClick}
        className="col-span-1 h-[150px] md:col-span-6 md:h-auto"
      >
        {site.available && (
          <div className="p-4 md:p-5">
            <AvailabilityBadge label={t("home.available")} />
          </div>
        )}
      </BentoCard>
      <div className="col-span-1 h-[150px] md:col-span-3 md:h-auto">
        <PhotoCard src={site.photo} alt={t("home.photoAlt", { name: site.name })} />
      </div>
      <div className="col-span-2 grid grid-cols-2 gap-3 md:col-span-3 md:grid-cols-1 md:grid-rows-[2fr_3fr]">
        <div className="h-[120px] md:h-auto">
          <StackCard items={site.stack} label={t("nav.stack")} />
        </div>
        <BentoCard title={t("nav.resume")} href="/resume" className="h-[120px] md:h-auto" />
      </div>
    </motion.div>
  );
}
