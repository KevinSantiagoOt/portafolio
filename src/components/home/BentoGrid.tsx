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

      <BentoCard title={t("nav.portfolio")} href="/portfolio" className="col-span-2 h-[150px] md:col-span-8 md:h-auto">
        {/* Solo un adelanto: imagen tenue y difuminada a la derecha que se revela al pasar el ratón. */}
        {featured && (
          <div className="absolute inset-y-0 right-0 w-[70%] [mask-image:linear-gradient(to_right,transparent,black_45%)] md:w-[60%]">
            <Image
              src={featured.image}
              alt=""
              fill
              sizes="(min-width: 768px) 40vw, 70vw"
              className="object-cover opacity-30 blur-[3px] grayscale transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-80 group-hover:blur-0 group-hover:grayscale-0"
              unoptimized={featured.image.endsWith(".svg")}
            />
          </div>
        )}
        <p className="relative max-w-[22ch] p-5 text-lg leading-snug text-fg-muted md:text-xl">{t("home.portfolioTeaser")}</p>
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
