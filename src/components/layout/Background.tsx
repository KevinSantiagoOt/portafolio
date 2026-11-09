"use client";

import { motion } from "motion/react";

// Haces de luz difuminados que se mueven muy despacio detrás del marco.
const beams = [
  { className: "-top-[10%] right-[-10%] h-[70vh] w-[22vw] rotate-[35deg]", x: [0, -40], y: [0, 30], duration: 24 },
  { className: "top-[30%] -left-[12%] h-[60vh] w-[18vw] rotate-[40deg]", x: [0, 50], y: [0, -20], duration: 28 },
  { className: "-bottom-[20%] left-[35%] h-[55vh] w-[16vw] rotate-[38deg]", x: [0, -30], y: [0, -40], duration: 22 },
];

export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {beams.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[90px] ${b.className}`}
          style={{ background: "var(--glow)", opacity: "var(--glow-opacity)" }}
          animate={{ x: b.x, y: b.y }}
          transition={{ duration: b.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
