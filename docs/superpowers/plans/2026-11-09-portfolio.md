# Portafolio de desarrollador — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir un portafolio bilingüe (ES/EN) estilo bento grid oscuro, con About, Portfolio, Resume y contacto (formulario + enlaces directos), listo para desplegar en Vercel.

**Architecture:** Next.js App Router con segmento `[locale]` gestionado por next-intl. Todo el contenido vive en `src/data/*.ts` tipado (campos traducibles como `Localized`) y los textos de interfaz en `src/messages/*.json`. Las animaciones son componentes cliente con Motion; el formulario valida con un esquema Zod compartido y envía por un Route Handler que usa Resend.

**Tech Stack:** Next.js (última estable vía `create-next-app`), TypeScript, Tailwind CSS v4, Motion (`motion/react`), next-intl, Zod, Resend, Geist (`geist` / `next/font`), Vitest + Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-09-portfolio-design.md`

## Global Constraints

- Idiomas: `es` (por defecto) y `en`; rutas `/es/...` y `/en/...`; `/` redirige según `Accept-Language`.
- Tema oscuro por defecto; colores solo vía variables CSS (tokens) definidas en `globals.css`, redefinidas bajo `[data-theme="light"]`.
- Paleta: fondo oscuro `#0a0a0a`, tarjeta oscura `#161616`; fondo claro `#f2f2f2`, tarjeta clara `#ffffff`.
- Tarjetas: radio 20–24 px, borde 1 px casi invisible, título abajo-izquierda, ↗ abajo-derecha.
- Nombre del hero: `font-size: clamp(4rem, 12vw, 10rem)`.
- Fuente Geist, pesos 400 y 500.
- Animar solo `transform`, `opacity`, `filter`. Envolver la app en `<MotionConfig reducedMotion="user">`.
- Todo componente que use Motion, hooks o APIs del navegador lleva `"use client"`.
- Variables de entorno: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Nunca en el código.
- Límite de contacto: 5 envíos / 10 min por IP, en memoria.
- Contenido inicial de ejemplo (placeholder) que Kevin reemplazará.
- Commits frecuentes, uno por paso "Commit"; mensajes en formato conventional commits.

## Review Focus

1. **Hora en vivo y hidratación:** la hora renderizada en servidor ≠ cliente provoca un error de hidratación. Se espera que la hora se pinte solo en cliente (placeholder `--:--` en SSR) y use la zona horaria de `site.ts`, no la del visitante. → test en Task 3.
2. **Idioma inválido en la URL** (`/fr`, `/xx/about`): se espera un 404, no un crash ni una página sin textos. → test e2e en Task 10.
3. **Portapapeles no disponible** (`navigator.clipboard` indefinido o rechazado): el botón "Copiar email" no debe romperse; muestra el email seleccionable y no dice "Copiado". → test en Task 6.
4. **Petición sin IP identificable** (sin `x-forwarded-for` ni `x-real-ip`): el rate limit no debe lanzar excepción; agrupa bajo la clave `"unknown"`. → test en Task 5.
5. **Modal abierto en móvil:** el fondo no debe hacer scroll detrás, Escape cierra y el foco vuelve a la tarjeta que lo abrió. → test en Task 6 (componente `Modal`) y e2e en Task 10.

---

## File Structure

```
src/
  app/
    globals.css                     tokens, tema, utilidades base
    layout.tsx                      raíz mínima (html/body los pone [locale]/layout)
    [locale]/
      layout.tsx                    html lang, fuentes, providers, Background, Frame, TopBar
      template.tsx                  transición entre páginas
      page.tsx                      Home
      about/page.tsx
      portfolio/page.tsx
      resume/page.tsx
      not-found.tsx
    api/contact/route.ts
    sitemap.ts
    robots.ts
    opengraph-image.tsx
  i18n/
    routing.ts                      defineRouting({ locales, defaultLocale })
    request.ts                      getRequestConfig
    navigation.ts                   Link, useRouter, usePathname localizados
  proxy.ts | middleware.ts          (nombre según versión de Next; ver Task 2)
  messages/es.json, en.json
  data/
    types.ts                        Localized, Project, ResumeEntry, Site
    site.ts, projects.ts, resume.ts
  lib/
    localize.ts                     t(localized, locale)
    time.ts                         formatClock(date, timeZone, locale)
    contact-schema.ts
    rate-limit.ts
    send-contact.ts                 envoltura de Resend
  components/
    providers/ThemeScript.tsx, MotionProvider.tsx
    ui/Modal.tsx, ArrowIcon.tsx
    layout/TopBar.tsx, LiveClock.tsx, LocaleSwitch.tsx, ThemeToggle.tsx, Background.tsx, Frame.tsx
    home/HeroName.tsx, BentoGrid.tsx, BentoCard.tsx, StackCard.tsx, PhotoCard.tsx, AvailabilityBadge.tsx
    contact/ContactPanel.tsx, ContactForm.tsx, DirectLinks.tsx, CopyEmailButton.tsx
    about/ScrollRevealText.tsx, Services.tsx
    portfolio/ProjectCard.tsx, ProjectModal.tsx, ProjectGrid.tsx
    resume/ResumeSection.tsx, DownloadButton.tsx
tests/
  unit/…                            Vitest
  e2e/…                             Playwright
public/
  cv-es.pdf, cv-en.pdf, images/
```

---

### Task 1: Scaffold y tooling de pruebas

**Files:**
- Create: proyecto Next.js en la raíz del repo, `vitest.config.ts`, `vitest.setup.ts`, `playwright.config.ts`, `tests/unit/smoke.test.ts`, `.env.example`
- Modify: `package.json` (scripts), `.gitignore`

**Interfaces:**
- Produces: scripts `npm run dev | build | test | test:e2e | lint`; alias `@/*` → `src/*`.

- [ ] **Step 1: Crear la app** en el directorio actual (ya contiene `docs/` y `.git`):
  `npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack`
  Si el CLI se niega por directorio no vacío, crear en `../portfolio-tmp` y mover el contenido (sin `.git`) aquí.
- [ ] **Step 2: Instalar dependencias:**
  `npm i motion next-intl zod resend geist`
  `npm i -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom @playwright/test vite-tsconfig-paths`
  `npx playwright install chromium`
- [ ] **Step 3: Configurar Vitest** (`environment: "jsdom"`, plugins react + tsconfig-paths, `include: ["tests/unit/**/*.test.{ts,tsx}"]`, setup importa `@testing-library/jest-dom/vitest`). Playwright: `testDir: "tests/e2e"`, `webServer: { command: "npm run build && npm run start", port: 3000 }`, solo chromium + un proyecto móvil (`devices["Pixel 7"]`).
- [ ] **Step 4: Scripts** en `package.json`: `"test": "vitest run"`, `"test:watch": "vitest"`, `"test:e2e": "playwright test"`.
- [ ] **Step 5: Smoke test** `tests/unit/smoke.test.ts`: `expect(1 + 1).toBe(2)`. Run `npm test` → PASS. Run `npm run build` → éxito.
- [ ] **Step 6: `.env.example`** con las tres variables vacías; `.gitignore` incluye `.env*.local`, `test-results/`, `playwright-report/`.
- [ ] **Step 7: Commit** `chore: scaffold Next.js app with Vitest and Playwright`

---

### Task 2: Tipos de datos, contenido de ejemplo e i18n

**Files:**
- Create: `src/data/types.ts`, `src/data/site.ts`, `src/data/projects.ts`, `src/data/resume.ts`, `src/lib/localize.ts`, `src/i18n/routing.ts`, `src/i18n/request.ts`, `src/i18n/navigation.ts`, `src/proxy.ts` (Next ≥16) o `src/middleware.ts` (Next ≤15), `src/messages/es.json`, `src/messages/en.json`, `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx` (placeholder), `src/app/[locale]/not-found.tsx`
- Modify: `next.config.ts` (plugin `createNextIntlPlugin("./src/i18n/request.ts")`), `src/app/layout.tsx`
- Test: `tests/unit/data-integrity.test.ts`, `tests/unit/localize.test.ts`

**Interfaces:**
- Produces:
  ```ts
  // types.ts
  export type Locale = "es" | "en";
  export type Localized = { es: string; en: string };
  export type Project = { slug: string; title: string; category: Localized; summary: Localized;
    description: Localized; image: string; stack: string[]; demoUrl?: string; repoUrl?: string; featured?: boolean };
  export type ResumeEntry = { title: Localized; org: string; period: Localized; location?: string; bullets: Localized[] };
  export type Resume = { experience: ResumeEntry[]; education: ResumeEntry[]; skills: { group: Localized; items: string[] }[] };
  export type Service = { title: Localized; description: Localized };
  export type Site = { name: string; role: Localized; city: string; timeZone: string; email: string;
    whatsapp: string /* solo dígitos, con código de país */; linkedin: string; github: string;
    available: boolean; photo: string; stack: { name: string; icon: string }[];
    bio: Localized; services: Service[] };
  // localize.ts
  export function t(value: Localized, locale: Locale): string;
  // routing.ts
  export const routing; // locales ["es","en"], defaultLocale "es"
  // navigation.ts
  export const { Link, redirect, usePathname, useRouter, getPathname };
  ```
- Claves de `messages` (namespaces): `nav`, `home`, `about`, `portfolio`, `resume`, `contact`, `theme`, `meta`, `notFound`.

- [ ] **Step 1: Test de integridad** `tests/unit/data-integrity.test.ts`:
  - `collectLocalized(obj)` recursivo (helper en el test) encuentra todo objeto con exactamente las claves `es`/`en`; para `site`, `projects`, `resume`: cada uno tiene `es.trim() !== ""` y `en.trim() !== ""`.
  - `projects` tiene ≥ 3 elementos, `slug` únicos, y cada `image` empieza por `/images/`.
  - `flattenKeys(es)` deep-equals `flattenKeys(en)` (mismas claves de mensajes).
  - `site.timeZone` es válida: `new Intl.DateTimeFormat("es", { timeZone: site.timeZone })` no lanza.
- [ ] **Step 2: Test** `localize.test.ts`: `t({es:"Hola",en:"Hi"},"en") === "Hi"`.
- [ ] **Step 3: Run** `npm test` → FAIL (módulos inexistentes).
- [ ] **Step 4: Implementar tipos, `t`, y contenido de ejemplo:** nombre "Kevin", rol `{es:"Desarrollador Full Stack", en:"Full Stack Developer"}`, ciudad y `timeZone` de ejemplo `"America/Mexico_City"` (comentario: cambiar), 4 proyectos ficticios con imágenes placeholder en `public/images/` (generar SVG simples con degradado), CV de ejemplo, 3 servicios, stack con React, Next.js, TypeScript, Node.js, Tailwind, PostgreSQL (iconos SVG en `public/icons/`).
- [ ] **Step 5: Configurar next-intl** según su guía para App Router con `[locale]`: `routing.ts`, `request.ts` (carga `messages/${locale}.json`, cae a `defaultLocale` si el locale no es válido), proxy/middleware con `matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"]`. `[locale]/layout.tsx`: `hasLocale` o `notFound()`, `setRequestLocale`, `generateStaticParams` para ambos locales, `<html lang={locale}>`, `NextIntlClientProvider`, fuentes Geist Sans vía `geist/font/sans`.
- [ ] **Step 6: Run** `npm test` → PASS. `npm run build` → éxito. `npm run dev` y comprobar que `/` redirige a `/es`, `/en` carga.
- [ ] **Step 7: Commit** `feat: add typed content, sample data and next-intl routing`

---

### Task 3: Shell visual — tema, fondo, marco y barra superior

**Files:**
- Create: `src/app/globals.css` (reescribir), `src/components/providers/ThemeScript.tsx`, `src/components/providers/MotionProvider.tsx`, `src/components/layout/{Background,Frame,TopBar,LiveClock,LocaleSwitch,ThemeToggle}.tsx`, `src/lib/time.ts`, `src/components/ui/ArrowIcon.tsx`
- Modify: `src/app/[locale]/layout.tsx`
- Test: `tests/unit/time.test.ts`, `tests/unit/live-clock.test.tsx`, `tests/unit/theme-toggle.test.tsx`

**Interfaces:**
- Consumes: `site`, `t`, `Link`/`usePathname` de `@/i18n/navigation`.
- Produces:
  ```ts
  export function formatClock(date: Date, timeZone: string, locale: Locale): string; // "11:13 AM" (en) / "11:13 a. m." (es) – via Intl, hour:"numeric", minute:"2-digit"
  export const THEME_STORAGE_KEY = "theme"; // valores "dark" | "light"
  <TopBar />                 // izquierda: nombre en "/", "← Inicio/Home" en subpáginas
  <Frame>{children}</Frame>  // contenedor flotante
  ```
- Tokens CSS: `--bg`, `--frame`, `--card`, `--card-hover`, `--border`, `--fg`, `--fg-muted`, `--fg-faint`, `--glow`. Mapear en `@theme inline` de Tailwind v4 como `bg-bg`, `bg-card`, `text-fg`, `text-fg-muted`, `border-border`.

- [ ] **Step 1: Tests:**
  - `time.test.ts`: `formatClock(new Date("2026-01-01T17:13:00Z"), "America/Mexico_City", "en")` contiene `"11:13"` y `"AM"`; con `"Africa/Cairo"` contiene `"7:13"`.
  - `live-clock.test.tsx`: el primer render (antes de efectos, usar `renderToString` de `react-dom/server`) contiene `"--:--"`; tras `render` + `act`, muestra la hora formateada. Con `vi.useFakeTimers()`, avanzar 60 s actualiza el texto.
  - `theme-toggle.test.tsx`: clic alterna `document.documentElement.dataset.theme` entre `"dark"` y `"light"` y escribe `localStorage["theme"]`; si `localStorage.setItem` lanza, el tema cambia igual sin error.
- [ ] **Step 2: Run** `npm test` → FAIL.
- [ ] **Step 3: Implementar** `formatClock`, `LiveClock` (estado `null` hasta montar → `--:--`; `setInterval` 30 s; muestra `{site.city} • {hora}`), `ThemeToggle` (switch pill como en la referencia, `aria-pressed`, try/catch alrededor de storage).
- [ ] **Step 4: `ThemeScript`**: `<script dangerouslySetInnerHTML>` en `<head>` que lee `localStorage.theme` (try/catch) y pone `data-theme` antes de pintar; por defecto `"dark"`. `<html suppressHydrationWarning>`.
- [ ] **Step 5: `globals.css`**: tokens para `:root` (oscuro) y `[data-theme="light"]`; `body { background: var(--bg); color: var(--fg) }`.
- [ ] **Step 6: `Background`**: 3 `motion.div` absolutos, blancos, `blur(80–120px)`, opacidad 0.08–0.15, rotados, con animación lenta en bucle (20–30 s, `repeatType: "mirror"`); `pointer-events-none`, `aria-hidden`.
- [ ] **Step 7: `Frame`**: `max-w-[1200px] mx-auto`, `rounded-[32px]`, borde `--border`, fondo `--frame`, sombra grande suave, `p-3 md:p-4`; en móvil margen 12 px.
- [ ] **Step 8: `TopBar`**: grid de 4 zonas como la referencia (nombre/Inicio · rol · ciudad+hora · selector+toggle), texto `text-sm`. En móvil se ocultan ciudad y hora. `LocaleSwitch`: botones `ES`/`EN` que hacen `router.replace(pathname, { locale })`, el activo con `aria-current`.
- [ ] **Step 9: `MotionProvider`** (`"use client"`): `<MotionConfig reducedMotion="user">`. Montar todo en `[locale]/layout.tsx`.
- [ ] **Step 10: Run** `npm test` → PASS; `npm run dev`, verificar visualmente ambos temas en escritorio y a 390 px de ancho.
- [ ] **Step 11: Commit** `feat: add theme, animated background, frame and top bar`

---

### Task 4: Home — hero y bento grid

**Files:**
- Create: `src/components/home/{HeroName,BentoGrid,BentoCard,StackCard,PhotoCard,AvailabilityBadge}.tsx`, `public/images/photo.jpg` (placeholder en escala de grises)
- Modify: `src/app/[locale]/page.tsx`
- Test: `tests/unit/bento-card.test.tsx`

**Interfaces:**
- Consumes: `site`, `t`, `Link`, `ArrowIcon`.
- Produces:
  ```ts
  type BentoCardProps = { title: string; href?: string; onClick?: () => void; className?: string;
    children?: React.ReactNode; showArrow?: boolean /* default true si href u onClick */ };
  <BentoCard/>   // href → <Link>, onClick → <button>, ninguno → <div>
  <BentoGrid onContactClick={() => void} />
  ```

- [ ] **Step 1: Test** `bento-card.test.tsx`: con `href="/about"` renderiza un enlace con nombre accesible "About"; con `onClick` renderiza `role="button"` y el clic llama al handler; sin ambos no hay enlace ni botón ni flecha.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implementar `BentoCard`**: `motion` con `whileHover={{ y: -4 }}`, borde a `--fg-faint` en hover, flecha ↗ que se desplaza `x:2, y:-2` en hover (variants padre→hijo), `rounded-[22px]`, título abajo-izquierda, `focus-visible:ring`.
- [ ] **Step 4: `BentoGrid`** con CSS grid:
  - `md+`: 12 columnas, 2 filas de ~260 px. Fila 1: About `col-span-4`, Portfolio `col-span-8`. Fila 2: Contact `col-span-6`, Foto `col-span-3`, columna `col-span-3` con Stack (≈40 %) y Resume (≈60 %).
  - `< md`: 2 columnas; About y Portfolio `col-span-2`; Contact + Foto; Stack + Resume.
  - Entrada escalonada: contenedor con `staggerChildren: 0.08`, hijos `opacity 0→1, y 24→0`.
- [ ] **Step 5: `HeroName`**: nombre `clamp(4rem,12vw,10rem)`, `font-medium`, `tracking-tight`, centrado; el grid se superpone con `margin-top` negativo (~ -0.35em del tamaño del nombre) y `relative z-10`; las tarjetas tienen fondo semitransparente + `backdrop-blur-md`, lo que produce el desenfoque del nombre por detrás. Con `useScroll` + `useTransform`: `y 0→-40`, `filter blur(0px)→blur(8px)` en los primeros 300 px.
- [ ] **Step 6: `AvailabilityBadge`** (punto verde con pulso, texto de `home.available`) en la tarjeta Contact solo si `site.available`. `StackCard`: fila de iconos en marquee infinito (duplicar la lista, animar `x: 0 → -50%`, `repeat: Infinity, ease: "linear"`, 20 s), pausa en hover, cada icono en un cuadrado redondeado `--card-hover`. `PhotoCard`: `next/image` con `object-cover`, `grayscale`, `alt` = nombre.
- [ ] **Step 7: Run** `npm test` → PASS; revisión visual comparando con la captura 1 y 4 de la referencia.
- [ ] **Step 8: Commit** `feat: build home hero and bento grid`

---

### Task 5: API de contacto (esquema, rate limit, Resend)

**Files:**
- Create: `src/lib/contact-schema.ts`, `src/lib/rate-limit.ts`, `src/lib/send-contact.ts`, `src/app/api/contact/route.ts`
- Test: `tests/unit/contact-schema.test.ts`, `tests/unit/rate-limit.test.ts`, `tests/unit/contact-route.test.ts`

**Interfaces:**
- Produces:
  ```ts
  export const INQUIRY_TYPES = ["job", "freelance", "other"] as const;
  export const contactSchema: z.ZodObject<{ name; email; type; message; website /* honeypot */ }>;
  export type ContactInput = z.infer<typeof contactSchema>;
  // reglas: name 2–80 tras trim; email válido ≤ 200; type ∈ INQUIRY_TYPES; message 10–2000 tras trim; website string opcional
  // mensajes de error = claves i18n: "contact.errors.nameRequired" | "nameTooLong" | "emailInvalid" | "typeRequired" | "messageTooShort" | "messageTooLong"
  export function createRateLimiter(opts: { limit: number; windowMs: number; now?: () => number }): { check(key: string): boolean };
  export function getClientKey(headers: Headers): string; // primer valor de x-forwarded-for, luego x-real-ip, si no "unknown"
  export async function sendContact(input: ContactInput): Promise<void>; // lanza si Resend falla; sin RESEND_API_KEY hace console.info y retorna
  // route.ts: POST → 200 {ok:true} | 400 {ok:false,error:"validation",fields} | 429 {ok:false,error:"rate_limited"} | 500 {ok:false,error:"send_failed"}
  ```

- [ ] **Step 1: Tests de esquema:** caso válido pasa; `name:" a "` falla con `nameRequired`; email `"x@"` falla con `emailInvalid`; `message` de 9 caracteres falla con `messageTooShort`; de 2001 con `messageTooLong`; `type:"spam"` falla.
- [ ] **Step 2: Tests de rate limit:** con `limit:5, windowMs:600_000` y reloj falso, 5 `check("a")` → `true`, el 6.º → `false`; `check("b")` sigue `true`; tras avanzar 600 001 ms, `check("a")` → `true`. `getClientKey(new Headers())` → `"unknown"`; `getClientKey(new Headers({"x-forwarded-for":"1.1.1.1, 2.2.2.2"}))` → `"1.1.1.1"`.
- [ ] **Step 3: Tests de la ruta** (`vi.mock("@/lib/send-contact")`, `POST(new Request(...))`):
  - válido → 200 y `sendContact` llamado una vez con los datos sin `website`.
  - inválido → 400 con `fields.email` presente; `sendContact` no llamado.
  - `website:"bot"` → 200 y `sendContact` **no** llamado.
  - body no-JSON → 400.
  - `sendContact` rechaza → 500 `send_failed`.
  - 6 peticiones válidas desde la misma IP → la 6.ª es 429 (resetear el limitador entre tests exportando `__resetRateLimit()` solo para tests).
- [ ] **Step 4: Run** → FAIL.
- [ ] **Step 5: Implementar** esquema, limitador (Map de timestamps por clave, ventana deslizante), `getClientKey`, `sendContact` (Resend `emails.send`; `from: CONTACT_FROM_EMAIL`, `to: CONTACT_TO_EMAIL`, `replyTo: input.email`, asunto `"[Portafolio] {tipo} — {nombre}"`, texto plano), y la ruta (`export const runtime = "nodejs"`).
- [ ] **Step 6: Run** `npm test` → PASS.
- [ ] **Step 7: Commit** `feat: add contact API with validation, honeypot and rate limit`

---

### Task 6: UI de contacto — modal, formulario y enlaces directos

**Files:**
- Create: `src/components/ui/Modal.tsx`, `src/components/contact/{ContactPanel,ContactForm,DirectLinks,CopyEmailButton}.tsx`
- Modify: `src/app/[locale]/page.tsx` (estado abierto/cerrado, `BentoGrid onContactClick`), `src/messages/*.json`
- Test: `tests/unit/modal.test.tsx`, `tests/unit/contact-form.test.tsx`, `tests/unit/copy-email.test.tsx`

**Interfaces:**
- Consumes: `contactSchema`, `INQUIRY_TYPES`, `site`.
- Produces:
  ```ts
  <Modal open={boolean} onClose={() => void} labelledBy={string}>{children}</Modal>
  // AnimatePresence; overlay con blur; Escape y clic en overlay cierran; foco atrapado; body overflow hidden mientras abierto; devuelve foco al elemento activo previo
  <ContactPanel open onClose />   // título + ContactForm + DirectLinks
  ```

- [ ] **Step 1: Tests de `Modal`:** abierto → `role="dialog"` con `aria-modal="true"`; `Escape` llama `onClose`; `document.body.style.overflow === "hidden"` mientras abierto y se restaura al cerrar; al cerrar, el foco vuelve al botón que lo abrió; Tab desde el último elemento enfocable vuelve al primero.
- [ ] **Step 2: Tests de `ContactForm`** (mock de `fetch`):
  - enviar vacío muestra los errores traducidos y no llama a `fetch`.
  - envío válido → `fetch("/api/contact", {method:"POST"})`; respuesta 200 → se muestra el texto de `contact.success` y desaparece el formulario.
  - respuesta 500 → se muestra `contact.errors.sendFailed` con `site.email` como enlace `mailto:`.
  - respuesta 429 → `contact.errors.rateLimited`.
  - el botón queda `disabled` mientras envía.
  - el honeypot `website` existe, está oculto (`aria-hidden`, `tabIndex={-1}`, `autoComplete="off"`).
- [ ] **Step 3: Tests de `CopyEmailButton`:** con `navigator.clipboard.writeText` resuelto → aparece "Copiado"/"Copied"; con `navigator.clipboard` indefinido o `writeText` rechazado → no aparece "Copiado" y el email queda visible y seleccionable; no se lanza error.
- [ ] **Step 4: Run** → FAIL.
- [ ] **Step 5: Implementar** `Modal`, `ContactForm` (estados `idle | submitting | success | error`; selector de tipo como 3 chips; validación con `contactSchema.safeParse` y `useTranslations` para las claves de error), `CopyEmailButton` ("Copiado" visible 2 s), `DirectLinks` (Email+copiar, LinkedIn, GitHub, WhatsApp `https://wa.me/{site.whatsapp}?text={encodeURIComponent(t("contact.whatsappText"))}`, todos `target="_blank" rel="noopener noreferrer"` salvo mailto).
- [ ] **Step 6: Run** `npm test` → PASS; con `npm run dev` y sin `RESEND_API_KEY`, enviar el formulario y ver el `console.info` en el servidor.
- [ ] **Step 7: Commit** `feat: add contact modal with form and direct links`

---

### Task 7: About — texto revelado por scroll y servicios

**Files:**
- Create: `src/components/about/{ScrollRevealText,Services}.tsx`, `src/app/[locale]/about/page.tsx`
- Test: `tests/unit/scroll-reveal-text.test.tsx`

**Interfaces:**
- Consumes: `site.bio`, `site.services`, `t`.
- Produces: `<ScrollRevealText text={string} />`

- [ ] **Step 1: Test:** `ScrollRevealText` con `"Hola mundo bonito"` renderiza 3 spans de palabra visibles con `aria-hidden="true"` y un elemento `sr-only` con el texto completo (los lectores de pantalla leen la frase entera, no palabras sueltas atenuadas).
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implementar:** `useScroll({ target: ref, offset: ["start 0.8", "end 0.4"] })`; por cada palabra `i` de `n`, `useTransform(scrollYProgress, [i/n, (i+1)/n], [0.2, 1])` en `opacity` (un subcomponente `Word` por palabra para respetar las reglas de hooks). Tamaño `text-2xl md:text-4xl`, `font-medium`, `leading-tight`.
- [ ] **Step 4: Página About:** título "About"/"Sobre mí" enorme a la izquierda (`text-[clamp(3rem,9vw,7rem)]`); bio en columna derecha (`md:ml-[33%]`), como la captura 2; debajo, `Services` en 3 tarjetas (`BentoCard` sin flecha) con `whileInView` escalonado; CTA final "¿Trabajamos juntos?" que enlaza a `/?contact=1`. Altura suficiente para que el scroll recorra el texto.
- [ ] **Step 5: Abrir el modal desde `?contact=1`:** en el Home, leer `useSearchParams` y abrir `ContactPanel` si `contact === "1"`; al cerrar, limpiar el parámetro con `router.replace`.
- [ ] **Step 6: Run** `npm test` → PASS; probar el scroll en escritorio y en móvil.
- [ ] **Step 7: Commit** `feat: add about page with scroll reveal and services`

---

### Task 8: Portfolio — grid y modal de proyecto

**Files:**
- Create: `src/components/portfolio/{ProjectGrid,ProjectCard,ProjectModal}.tsx`, `src/app/[locale]/portfolio/page.tsx`
- Test: `tests/unit/project-grid.test.tsx`

**Interfaces:**
- Consumes: `projects`, `Modal`, `t`.
- Produces: `<ProjectGrid projects={Project[]} />`, que gestiona el proyecto seleccionado.

- [ ] **Step 1: Test:** renderiza una tarjeta por proyecto con título y categoría en el idioma activo (envolver en `NextIntlClientProvider locale="en"`); clic en una tarjeta abre el diálogo con su descripción y enlaces "Ver demo"/"Live demo" y "Código"/"Code" solo si existen `demoUrl`/`repoUrl`; un proyecto sin `demoUrl` no muestra ese botón.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implementar:** titular `portfolio.heading` (`text-3xl md:text-5xl`, máx. 2 líneas, como la captura 3); grid `md:grid-cols-2 gap-4`; `ProjectCard` = botón con tarjeta `--card`, padding 12 px, imagen `next/image` con `aspect-[4/3] rounded-[16px] object-cover` y zoom ligero en hover, pie con título a la izquierda y categoría `--fg-muted` a la derecha; `whileInView` (`once: true`). Los títulos largos se truncan con `line-clamp-1`. `ProjectModal` = imagen, título, descripción, chips de stack, botones de enlace.
- [ ] **Step 4: Run** `npm test` → PASS.
- [ ] **Step 5: Commit** `feat: add portfolio grid with project modal`

---

### Task 9: Resume — CV en HTML y descarga del PDF

**Files:**
- Create: `src/components/resume/{ResumeSection,DownloadButton}.tsx`, `src/app/[locale]/resume/page.tsx`, `public/cv-es.pdf`, `public/cv-en.pdf` (PDFs de ejemplo de 1 página)
- Test: `tests/unit/resume-page.test.tsx`

**Interfaces:**
- Consumes: `resume`, `t`, locale.
- Produces: `<DownloadButton locale={Locale} />` → `<a href="/cv-{locale}.pdf" download>`.

- [ ] **Step 1: Test:** con locale `en`, el enlace de descarga tiene `href="/cv-en.pdf"` y el atributo `download`; se renderizan los encabezados "Experience", "Education" y "Skills" y una entrada por elemento de `resume.experience`.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implementar:** título grande + botón de descarga arriba a la derecha; secciones con una línea de tiempo simple (periodo en `--fg-muted` a la izquierda, puesto/organización y viñetas a la derecha; se apila en móvil); skills como chips agrupados; `whileInView` por entrada. Generar los PDFs de ejemplo (por ejemplo, imprimiendo la propia página a PDF con Playwright desde un script `scripts/make-sample-cv.ts`; no se versiona el script si no aporta).
- [ ] **Step 4: Run** `npm test` → PASS.
- [ ] **Step 5: Commit** `feat: add resume page with PDF download`

---

### Task 10: Transiciones, SEO y suite e2e

**Files:**
- Create: `src/app/[locale]/template.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx`, `tests/e2e/navigation.spec.ts`, `tests/e2e/contact.spec.ts`, `tests/e2e/preferences.spec.ts`
- Modify: `generateMetadata` en `[locale]/layout.tsx` y en cada página; JSON-LD en `[locale]/page.tsx`
- Test: `tests/unit/seo.test.ts` + e2e

**Interfaces:**
- Consumes: todo lo anterior.
- Produces: `SITE_URL` desde `process.env.NEXT_PUBLIC_SITE_URL` con valor por defecto `http://localhost:3000` (en `src/data/site.ts`).

- [ ] **Step 1: Test unitario** `seo.test.ts`: `sitemap()` devuelve 8 URLs (4 páginas × 2 idiomas), cada una con `alternates.languages` que incluye `es` y `en`; `robots()` permite `/` y apunta al sitemap.
- [ ] **Step 2: Tests e2e:**
  - `navigation.spec.ts`: `/` → URL termina en `/es` (o `/en` con `locale: "en-US"` en el contexto); clic en About, Portfolio y Resume carga cada página con su `h1`; "← Inicio" vuelve al home; `/fr` y `/es/no-existe` → 404 con el texto de `notFound`.
  - `preferences.spec.ts`: estando en `/es/about`, clic en `EN` → URL `/en/about`; el toggle de tema pone `data-theme="light"` y persiste tras `page.reload()`.
  - `contact.spec.ts`: `page.route("/api/contact", …200)`; abrir la tarjeta Contact, rellenar y enviar → texto de éxito visible; Escape cierra el modal y el foco vuelve a la tarjeta Contact; en el proyecto móvil, con el modal abierto, `document.body.style.overflow` es `"hidden"`.
- [ ] **Step 3: Run** `npm test` y `npm run test:e2e` → FAIL donde falte implementación.
- [ ] **Step 4: Implementar** `template.tsx` (fundido + `y: 8 → 0`, 0.35 s), `generateMetadata` con `title` / `description` desde `messages.meta.*` y `alternates: { canonical, languages: { es, en } }`, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` (`ImageResponse`, 1200×630, fondo `#0a0a0a`, nombre y rol en blanco), JSON-LD `Person` (`name`, `jobTitle`, `url`, `sameAs: [linkedin, github]`).
- [ ] **Step 5: Run** `npm test` y `npm run test:e2e` → PASS (escritorio y móvil).
- [ ] **Step 6: Verificar** `npm run build && npm run start`, Lighthouse (Chrome DevTools, móvil) en `/es` y `/es/portfolio`: ≥ 90 en las 4 categorías. Anotar los resultados en el mensaje de commit o corregir lo que baje de 90.
- [ ] **Step 7: README** corto: cómo editar `site.ts`/`projects.ts`/`resume.ts`, reemplazar los PDFs y la foto, variables de entorno, y despliegue en Vercel (importar el repo, añadir las 3 variables + `NEXT_PUBLIC_SITE_URL`, verificar el dominio de envío en Resend).
- [ ] **Step 8: Commit** `feat: add page transitions, SEO metadata and e2e tests`

---

## Fuera de este plan

Despliegue real en Vercel y alta en Resend (requieren las cuentas de Kevin): el README de la Task 10 deja los pasos.
