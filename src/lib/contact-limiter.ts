import { createRateLimiter } from "./rate-limit";

/** 5 envíos cada 10 minutos por IP. */
export const contactLimiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

/** Solo para tests. */
export function __resetRateLimit() {
  contactLimiter.reset();
}
