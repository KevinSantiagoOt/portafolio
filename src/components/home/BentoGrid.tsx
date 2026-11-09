"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { BentoCard } from "./BentoCard";
import { StackCard } from "./StackCard";
import { PhotoCard } from "./PhotoCard";
import { AvailabilityBadge } from "./AvailabilityBadge";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};

const featured = projects.find((p) => p.featured) ?? projects[0];

export function BentoGrid({ onContactClick }: { onContactClick: () => void }) {
  const t = useTranslations();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 grid grid-cols-2 gap-3 md:grid-cols-12 md:grid-rows-[clamp(230px,30vh,400px)_clamp(230px,30vh,400px)]"
    >
      <BentoCard title={t("nav.about")} href="/about" className="col-span-2 h-[150px] md:col-span-4 md:h-auto">
        <p className="max-w-[24ch] p-5 text-lg leading-snug text-fg-muted md:text-xl">{t("home.aboutTeaser")}</p>
      </BentoCard>

      <BentoCard title={t("nav.portfolio")} href="/portfolio" onImage className="col-span-2 h-[200px] md:col-span-8 md:h-auto">
        {featured && (
          <>
            <Image
              src={featured.image}
              alt=""
              fill
              sizes="(min-width: 768px) 66vw, 100vw"
              className="object-cover object-[50%_12%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              unoptimized={featured.image.endsWith(".svg")}
              priority
            />
            {/* Degradado para que el título se lea sobre la imagen en ambos temas. */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          </>
        )}
      </BentoCard>

      <BentoCard title={t("nav.contact")} onClick={onContactClick} className="col-span-1 h-[170px] md:col-span-6 md:h-auto">
        <div className="flex flex-col items-start gap-3 p-4 md:p-5">
          {site.available && <AvailabilityBadge label={t("home.available")} />}
          <span className="hidden text-2xl font-medium tracking-tight md:block lg:text-3xl">{t("home.contactCta")} →</span>
          <span className="hidden truncate text-sm text-fg-muted md:block">{site.email}</span>
        </div>
      </BentoCard>

      <div className="col-span-1 h-[170px] md:col-span-3 md:h-auto">
        <PhotoCard src={site.photo} alt={t("home.photoAlt", { name: site.name })} />
      </div>

      <div className="col-span-2 grid grid-cols-2 gap-3 md:col-span-3 md:grid-cols-1 md:grid-rows-[2fr_3fr]">
        <div className="h-[120px] md:h-auto">
          <StackCard items={site.stack} label={t("nav.stack")} />
        </div>
        <BentoCard title={t("nav.resume")} href="/resume" className="h-[120px] md:h-auto">
          <p className="hidden max-w-[22ch] p-5 text-sm text-fg-muted md:block">{t("home.resumeTeaser")}</p>
        </BentoCard>
      </div>
    </motion.div>
  );
}
