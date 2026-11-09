import Link from "next/link";

// Fallback para rutas fuera de un idioma válido (ej. /fr).
export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body style={{ background: "#0a0a0a", color: "#ededed", fontFamily: "system-ui, sans-serif", display: "grid", placeItems: "center", minHeight: "100vh", margin: 0 }}>
        <main style={{ textAlign: "center" }}>
          <p style={{ fontSize: "6rem", margin: 0 }}>404</p>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 500 }}>Página no encontrada · Page not found</h1>
          <Link href="/" style={{ color: "inherit" }}>← Inicio · Home</Link>
        </main>
      </body>
    </html>
  );
}
