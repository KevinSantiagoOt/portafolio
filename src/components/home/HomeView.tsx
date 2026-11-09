"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { HeroName } from "./HeroName";
import { BentoGrid } from "./BentoGrid";

export function HomeView() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main data-contact-open={contactOpen || undefined}>
      <div className="pt-6 md:pt-8">
        <HeroName name={site.name} />
      </div>
      {/* El grid se monta sobre la parte baja del nombre: las tarjetas con blur lo desenfocan. */}
      <div className="-mt-[clamp(1.3rem,3.8vw,3.2rem)]">
        <BentoGrid onContactClick={() => setContactOpen(true)} />
      </div>
    </main>
  );
}
