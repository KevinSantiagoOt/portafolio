"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  // El espacio va fuera del span para que el navegador pueda partir líneas entre palabras.
  return (
    <>
      <motion.span data-word style={{ opacity }}>
        {children}
      </motion.span>{" "}
    </>
  );
}

/**
 * Texto que se "ilumina" palabra por palabra al hacer scroll, en cascada:
 * un único progreso recorre todos los párrafos (separados por una línea en blanco),
 * así el segundo empieza cuando termina el primero.
 */
export function ScrollRevealText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });

  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.split(/\s+/).filter(Boolean))
    .filter((words) => words.length > 0);
  const total = paragraphs.reduce((n, words) => n + words.length, 0);

  let index = 0;
  return (
    <div ref={ref} className={className}>
      <span className="sr-only">{paragraphs.map((words) => words.join(" ")).join(" ")}</span>
      <div aria-hidden="true" className="flex flex-col gap-6 md:gap-8">
        {paragraphs.map((words, p) => (
          <p key={p} className="text-2xl leading-tight font-medium tracking-[-0.01em] md:text-4xl">
            {words.map((w) => {
              const i = index++;
              return (
                <Word key={i} progress={scrollYProgress} range={[i / total, (i + 1) / total]}>
                  {w}
                </Word>
              );
            })}
          </p>
        ))}
      </div>
    </div>
  );
}
