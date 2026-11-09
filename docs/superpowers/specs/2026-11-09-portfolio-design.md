# Portafolio de desarrollador — Diseño

Fecha: 2026-11-09
Estado: pendiente de revisión

## 1. Objetivo

Portafolio personal de Kevin como desarrollador, con dos públicos:

- **Reclutadores / empleo:** ver rápido stack, proyectos y CV, y contactar.
- **Clientes freelance:** entender qué servicios ofrece, ver trabajos previos y contactar con la menor fricción posible.

**Éxito =** un visitante de cualquiera de los dos públicos encuentra lo que busca en ≤ 2 clics desde el home, y puede contactar por formulario o canal directo (email, LinkedIn, GitHub, WhatsApp).

Referencia visual: bento grid oscuro y monocromo, nombre gigante parcialmente tapado y desenfocado por las tarjetas, barra superior con nombre / rol / ciudad + hora, About con texto que se ilumina al hacer scroll, grid de proyectos con imagen + nombre + categoría.

## 2. Stack

| Pieza | Elección |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Estilos | Tailwind CSS |
| Animación | Motion (`motion`, importado desde `motion/react`) |
| i18n | next-intl, rutas `/es` y `/en`, detección por `Accept-Language` |
| Email | Resend (vía Route Handler) |
| Validación | Zod (compartido cliente/servidor) |
| Fuente | Geist (400 / 500) |
| Tests | Vitest (unitarios), Playwright (e2e) |
| Deploy | GitHub → Vercel |

## 3. Rutas

```
/                       → redirige a /es o /en según idioma del navegador
/[locale]               → Home (bento grid)
/[locale]/about         → About + servicios freelance
/[locale]/portfolio     → Grid de proyectos (detalle en modal)
/[locale]/resume        → CV en HTML + descarga del PDF del idioma activo
/api/contact            → POST, envía formulario por Resend
```

Contact no tiene página propia: la tarjeta Contact abre un panel/modal en el home.

## 4. Estructura de código

```
src/
  app/
    [locale]/layout.tsx, page.tsx, about/, portfolio/, resume/
    api/contact/route.ts
    sitemap.ts, robots.ts
  components/
    layout/    TopBar, LocaleSwitch, ThemeToggle, LiveClock, Background, Frame
    home/      HeroName, BentoGrid, BentoCard, StackCard, PhotoCard, AvailabilityBadge
    about/     ScrollRevealText, Services
    portfolio/ ProjectCard, ProjectModal
    resume/    ResumeSection, DownloadButton
    contact/   ContactPanel, ContactForm, DirectLinks
  data/
    site.ts       nombre, rol, ciudad, zona horaria, redes, WhatsApp, disponibilidad
    projects.ts   lista tipada de proyectos
    resume.ts     experiencia, educación, skills
  lib/
    contact-schema.ts   esquema Zod del formulario
    rate-limit.ts       límite de envíos por IP (en memoria)
  i18n/          configuración de next-intl
  messages/      es.json, en.json  (textos de interfaz)
public/
  cv-es.pdf, cv-en.pdf, images/, og/
```

**Contenido bilingüe:** textos de interfaz en `messages/*.json`; en `data/*.ts` los campos traducibles usan el tipo `Localized = { es: string; en: string }`.

**Modelo de proyecto:**
```ts
type Project = {
  slug: string;
  title: string;
  category: Localized;      // "App Design", "Web App", ...
  summary: Localized;
  description: Localized;
  image: string;            // ruta en /public/images
  stack: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
};
```

Se arranca con **contenido de ejemplo** en `site.ts`, `projects.ts` y `resume.ts`, que Kevin reemplaza después.

## 5. Diseño visual

- **Fondo:** `#0a0a0a` con 2–3 manchas de luz blanca muy difuminadas en movimiento lento.
- **Marco:** contenedor principal con radio grande, borde fino translúcido y sombra suave ("pantalla flotante").
- **Tarjetas:** `#161616`, radio 20–24 px, borde 1 px casi invisible, título abajo-izquierda y ↗ abajo-derecha.
- **Tipografía:** Geist; nombre del hero `clamp(4rem, 12vw, 10rem)`.
- **Tema claro:** misma composición, fondo `#f2f2f2` y tarjetas blancas. Oscuro por defecto; la elección se guarda en `localStorage` y se aplica sin parpadeo (script inline en `<head>`).
- **Colores como tokens CSS** (variables) para que los dos temas compartan componentes.

### Home — bento grid

- **Escritorio:** fila 1 = About (estrecha) + Portfolio (ancha). Fila 2 = Contact (ancha) + Foto + columna con Stack arriba y Resume abajo.
- **Móvil:** About y Portfolio a todo el ancho; Contact + Foto en par; Stack + Resume en par.
- **Contact:** punto verde pulsante + "Disponible para proyectos" (controlado por `site.ts`).
- **Stack:** iconos de tecnologías en carrusel horizontal infinito.

### Barra superior

Nombre (o "← Inicio" en páginas internas) · rol · ciudad + hora local en vivo (zona horaria de `site.ts`) · selector ES/EN · toggle de tema.

### Portfolio

Titular + grid de tarjetas (imagen, nombre, categoría). Clic → modal con descripción, stack y botones "Ver demo" / "Código". 1 columna en móvil, 2 en escritorio.

### About

Título grande + párrafo con revelado palabra a palabra por scroll + sección "Servicios" (lista breve de lo que ofrece como freelance).

### Resume

Experiencia, educación y skills renderizados desde `resume.ts`, con botón para descargar `cv-{locale}.pdf`.

## 6. Animaciones (Motion)

| Efecto | Técnica |
|---|---|
| Entrada del nombre y tarjetas escalonadas | `variants` + `staggerChildren` |
| Nombre se desenfoca y sube con el scroll | `useScroll` + `useTransform` sobre `filter: blur()` e `y` |
| Hover de tarjetas (elevación, borde, flecha) | `whileHover` |
| Texto de About que se ilumina | `useScroll` + `useTransform` por palabra (opacidad 0.2 → 1) |
| Revelado de proyectos / CV | `whileInView` |
| Transición entre páginas | `AnimatePresence` / template de App Router |
| Modales (contacto, proyecto) | `AnimatePresence` |

Reglas: animar solo `transform`, `opacity` y `filter`; con `prefers-reduced-motion` las animaciones se reducen a fundidos (`MotionConfig reducedMotion="user"`). Componentes animados marcados con `"use client"`.

## 7. Contacto

**Formulario:** nombre, email, tipo de consulta (Empleo / Proyecto freelance / Otro), mensaje, y un honeypot oculto.

**Flujo:**
1. Validación en cliente con Zod; errores en línea en el idioma activo.
2. `POST /api/contact` → validación Zod en servidor → honeypot → límite por IP (5 envíos / 10 min, en memoria) → envío con Resend a la dirección configurada.
3. Éxito: el formulario se reemplaza por "¡Gracias! Te respondo pronto".
4. Error (validación, límite o fallo de Resend): mensaje claro + el email directo como alternativa.

**Respuestas de la API:** `200 { ok: true }`, `400` validación, `429` límite, `500` fallo de envío. Si el honeypot viene relleno se responde `200` sin enviar.

**Enlaces directos:** email (copiar al portapapeles + confirmación "Copiado"), LinkedIn, GitHub, WhatsApp (`wa.me` con mensaje prellenado).

**Variables de entorno:** `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Nunca en el código. Sin `RESEND_API_KEY` en desarrollo, la API registra el mensaje en consola y responde éxito.

## 8. SEO y rendimiento

- `generateMetadata` por página e idioma; `alternates.languages` (hreflang).
- Imagen Open Graph.
- `sitemap.xml` y `robots.txt`.
- JSON-LD tipo `Person` en el home.
- `next/image` para todas las imágenes; fuente con `next/font`.
- Objetivo: Lighthouse ≥ 90 en rendimiento, accesibilidad, buenas prácticas y SEO.

## 9. Accesibilidad

- Tarjetas son enlaces/botones reales con texto accesible; foco visible.
- Modales con foco atrapado, cierre con Escape y retorno del foco.
- Contraste AA en ambos temas (el texto atenuado del About es decorativo; el párrafo completo sigue siendo legible para lectores de pantalla).
- `lang` del documento según el idioma activo.

## 10. Pruebas

**Vitest:**
- Esquema Zod del contacto (casos válidos e inválidos).
- Route handler `/api/contact` con Resend simulado: 200, 400, 429, honeypot, fallo de Resend → 500.
- Integridad de datos: todo `Localized` en `projects.ts` / `resume.ts` tiene `es` y `en` no vacíos; `messages/es.json` y `en.json` tienen las mismas claves.

**Playwright:**
- Home → About, Portfolio, Resume y vuelta.
- Cambio de idioma conserva la página.
- Cambio de tema persiste al recargar.
- Envío del formulario (API interceptada) muestra el estado de éxito.

## 11. Publicación

Repositorio en GitHub conectado a Vercel; cada push a `main` despliega. Variables de entorno configuradas en Vercel.

## 12. Fuera de alcance (por ahora)

- CMS o casos de estudio en MDX (posible migración futura desde `projects.ts`).
- Blog.
- Analítica (se puede añadir Vercel Analytics después).
- Límite de envíos persistente (Redis/Upstash); el de memoria basta para empezar.

Las ideas nuevas durante el desarrollo se incorporan actualizando este documento.
