"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { bentoItem, cardClass } from "./BentoCard";

export function PhotoCard({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div variants={bentoItem} className="h-full">
      <div className={cardClass}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          // Encuadre hacia arriba: la cara queda visible en tarjetas anchas o bajas.
          className="object-cover object-[50%_30%] grayscale"
          unoptimized={src.endsWith(".svg")}
          priority
        />
      </div>
    </motion.div>
  );
}
