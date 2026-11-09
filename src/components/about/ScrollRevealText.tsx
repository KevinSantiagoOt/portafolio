"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  // El espacio va fuera del span para que el navegador pueda partir líneas entre palabras.
  return (
    <>
      <motion.span data-word style={{ opacity }}>
        {children}
      </motion.span>{" "}
    </>
  );
}

/** Párrafo que se "ilumina" palabra por palabra al hacer scroll. */
export function ScrollRevealText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.45"] });
  const words = text.split(/\s+/).filter(Boolean);
  const n = words.length;

  return (
    <p ref={ref} className={`text-2xl leading-tight font-medium tracking-[-0.01em] md:text-4xl ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / n, (i + 1) / n]}>
            {w}
          </Word>
        ))}
      </span>
    </p>
  );
}
