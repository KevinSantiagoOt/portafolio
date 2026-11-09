"use client";

import { useLayoutEffect, useState, useSyncExternalStore } from "react";
import { site } from "@/data/site";
import { ContactPanel } from "@/components/contact/ContactPanel";
import { HeroName } from "./HeroName";
import { BentoGrid } from "./BentoGrid";

const URL_CHANGE = "portfolio:urlchange";

// /?contact=1 (p. ej. desde el CTA de About) abre el panel de contacto.
// Se lee en cliente para no volver dinámica la página prerenderizada.
function subscribeToUrl(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(URL_CHANGE, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(URL_CHANGE, onChange);
  };
}
const contactInUrl = () => new URLSearchParams(window.location.search).get("contact") === "1";

export function HomeView() {
  const [openedByClick, setOpenedByClick] = useState(false);
  const openedByUrl = useSyncExternalStore(subscribeToUrl, contactInUrl, () => false);
  const contactOpen = openedByClick || openedByUrl;
  // Con cacheComponents la ruta queda oculta (no desmontada) al navegar: cerrar el modal al ocultarse.
  useLayoutEffect(() => () => setOpenedByClick(false), []);

  function closeContact() {
    setOpenedByClick(false);
    const url = new URL(window.location.href);
    if (url.searchParams.has("contact")) {
      url.searchParams.delete("contact");
      window.history.replaceState(window.history.state, "", url);
      window.dispatchEvent(new Event(URL_CHANGE));
    }
  }

  return (
    <main>
      <div className="pt-6 md:pt-8">
        <HeroName name={site.name} />
      </div>
      {/* El grid se monta sobre la parte baja del nombre: las tarjetas con blur lo desenfocan. */}
      <div className="-mt-[clamp(0.9rem,3.8vw,3.2rem)]">
        <BentoGrid onContactClick={() => setOpenedByClick(true)} />
      </div>
      <ContactPanel open={contactOpen} onClose={closeContact} />
    </main>
  );
}
