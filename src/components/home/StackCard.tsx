"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { bentoItem, cardClass } from "./BentoCard";

type StackItem = { name: string; icon: string; mono?: boolean; lift?: boolean };

/** Iconos de tecnologías en carrusel horizontal infinito (pausa en hover). */
export function StackCard({ items, label }: { items: StackItem[]; label: string }) {
  const loop = [...items, ...items];
  return (
    <motion.div variants={bentoItem} className="h-full">
      <div className={`${cardClass} group items-center`}>
        <h2 className="sr-only">{label}</h2>
        <ul className="sr-only">
          {items.map((i) => (
            <li key={i.name}>{i.name}</li>
          ))}
        </ul>
        <div
          aria-hidden
          className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]"
        >
          <div className="animate-marquee flex w-max gap-3 group-hover:[animation-play-state:paused]">
            {loop.map((item, i) => (
              <span
                key={`${item.name}-${i}`}
                title={item.name}
                className="grid size-12 shrink-0 place-items-center rounded-[14px] border border-border bg-card-hover md:size-[52px]"
              >
                <Image src={item.icon} alt="" width={26} height={26} unoptimized className={item.mono ? "dark:invert" : item.lift ? "dark:brightness-[1.8]" : undefined} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
