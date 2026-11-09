import type { ReactNode } from "react";
import "./globals.css";

// El <html> lo renderiza src/app/[locale]/layout.tsx.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
