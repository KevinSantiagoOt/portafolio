/** Límite de peticiones con ventana deslizante, en memoria (por instancia del servidor). */
export function createRateLimiter(opts: { limit: number; windowMs: number; now?: () => number }) {
  const { limit, windowMs, now = Date.now } = opts;
  const hits = new Map<string, number[]>();

  return {
    check(key: string): boolean {
      const t = now();
      const recent = (hits.get(key) ?? []).filter((ts) => t - ts < windowMs);
      if (recent.length >= limit) {
        hits.set(key, recent);
        return false;
      }
      recent.push(t);
      hits.set(key, recent);
      return true;
    },
    reset() {
      hits.clear();
    },
  };
}

/** Identifica al cliente por IP; si no hay cabeceras, todos comparten "unknown". */
export function getClientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) return forwarded;
  const real = headers.get("x-real-ip")?.trim();
  if (real) return real;
  return "unknown";
}
