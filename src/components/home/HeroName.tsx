"use client";

import { motion, useScroll, useTransform } from "motion/react";

/** Nombre gigante: entra desde abajo y se desenfoca/sube con el scroll. */
export function HeroName({ name }: { name: string }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -40]);
  const blur = useTransform(scrollY, [0, 300], ["blur(0px)", "blur(8px)"]);

  return (
    <motion.div style={{ y, filter: blur }} className="pointer-events-none overflow-hidden pb-[0.08em] select-none">
      {/* Solo transform (sin opacidad): el nombre se pinta en el HTML inicial → buen LCP. */}
      <motion.h1
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="text-center text-[clamp(2.5rem,10.5vw,10rem)] leading-[0.9] font-medium tracking-[-0.04em] whitespace-nowrap"
      >
        {name}
      </motion.h1>
    </motion.div>
  );
}
