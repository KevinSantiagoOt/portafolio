"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

/** Transición suave al cambiar de página (el template se remonta en cada navegación). */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      // Sin opacidad inicial: el contenido es visible desde el HTML del servidor (LCP).
      initial={{ y: 8 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
