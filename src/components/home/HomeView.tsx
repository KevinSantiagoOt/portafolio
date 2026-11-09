"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { ContactPanel } from "@/components/contact/ContactPanel";
import { HeroName } from "./HeroName";
import { BentoGrid } from "./BentoGrid";

export function HomeView() {
  const [contactOpen, setContactOpen] = useState(false);

  // /?contact=1 (p. ej. desde el CTA de About) abre el panel de contacto.
  // Se lee en cliente para no volver dinámica la página prerenderizada.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("contact") === "1") setContactOpen(true);
  }, []);

  function closeContact() {
    setContactOpen(false);
    const url = new URL(window.location.href);
    if (url.searchParams.has("contact")) {
      url.searchParams.delete("contact");
      window.history.replaceState(window.history.state, "", url);
    }
  }

  return (
    <main>
      <div className="pt-6 md:pt-8">
        <HeroName name={site.name} />
      </div>
      {/* El grid se monta sobre la parte baja del nombre: las tarjetas con blur lo desenfocan. */}
      <div className="-mt-[clamp(1.3rem,3.8vw,3.2rem)]">
        <BentoGrid onContactClick={() => setContactOpen(true)} />
      </div>
      <ContactPanel open={contactOpen} onClose={closeContact} />
    </main>
  );
}
