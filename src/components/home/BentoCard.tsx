"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { Link } from "@/i18n/navigation";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

/** Variantes para la entrada escalonada (el contenedor define hidden/show). */
export const bentoItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/** Estilo base compartido por todas las tarjetas. */
export const cardClass =
  "relative flex h-full w-full overflow-hidden rounded-[22px] border border-border bg-card-glass backdrop-blur-[8px] transition-colors duration-300";

// Los hijos definen también hidden/show para volver a su sitio al salir del hover.
const arrowVariants: Variants = {
  hidden: { x: 0, y: 0 },
  show: { x: 0, y: 0 },
  hover: { x: 2, y: -2 },
};

const liftVariants: Variants = {
  hidden: { y: 0 },
  show: { y: 0 },
  hover: { y: -4 },
};

type BentoCardProps = {
  title: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
  /** Por defecto, true si la tarjeta es interactiva. */
  showArrow?: boolean;
  /** El contenido es una imagen: título y flecha en blanco. */
  onImage?: boolean;
};

export function BentoCard({ title, href, onClick, className = "", children, showArrow, onImage }: BentoCardProps) {
  const interactive = Boolean(href || onClick);
  const arrow = showArrow ?? interactive;

  const inner = (
    <>
      {children && <div className="absolute inset-0">{children}</div>}
      <div className={`relative mt-auto flex w-full items-end justify-between p-5 text-[15px] ${onImage ? "text-white" : ""}`}>
        <span>{title}</span>
        {arrow && (
          <motion.span data-testid="bento-arrow" variants={arrowVariants} className={onImage ? "text-white/80 group-hover:text-white" : "text-fg-muted group-hover:text-fg"}>
            <ArrowIcon />
          </motion.span>
        )}
      </div>
    </>
  );

  const surface = `${cardClass} group flex-col text-left ${
    interactive
      ? "cursor-pointer hover:border-fg-faint hover:bg-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
      : ""
  }`;

  return (
    <motion.div
      variants={bentoItem}
      whileHover={interactive ? "hover" : undefined}
      // La altura la define className (p. ej. h-[150px] md:h-auto); por defecto llena su celda.
      className={/(^|\s)h-/.test(className) ? className : `h-full ${className}`}
    >
      <motion.div variants={liftVariants} className="h-full">
        {href ? (
          <Link href={href} className={surface}>
            {inner}
          </Link>
        ) : onClick ? (
          <button type="button" onClick={onClick} className={surface}>
            {inner}
          </button>
        ) : (
          <div className={surface}>{inner}</div>
        )}
      </motion.div>
    </motion.div>
  );
}
