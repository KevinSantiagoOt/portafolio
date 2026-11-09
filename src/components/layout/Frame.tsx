import type { ReactNode } from "react";

/** Contenedor principal: la "pantalla flotante" de la referencia. */
export function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="px-3 py-3 md:flex md:min-h-dvh md:flex-col md:justify-center md:px-8 md:py-10">
      <div
        className="mx-auto min-h-[calc(100dvh-1.5rem)] w-full max-w-[1400px] rounded-[28px] border border-border bg-frame p-3 md:min-h-0 md:rounded-[32px] md:p-4"
        style={{ boxShadow: "var(--frame-shadow)" }}
      >
        {children}
      </div>
    </div>
  );
}
