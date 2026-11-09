# Portafolio

Portafolio bilingüe (ES/EN) con estilo bento grid oscuro. Next.js 16, TypeScript, Tailwind CSS 4, Motion, next-intl y Resend.

## Empezar

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build && npm run start` | Build y servidor de producción |
| `npm test` | Pruebas unitarias (Vitest) |
| `npm run test:e2e` | Pruebas end-to-end (Playwright, escritorio + móvil) |

> Si el Chromium de Playwright no arranca en tu equipo, usa Edge: `PW_CHANNEL=msedge npm run test:e2e`.

## Poner tu contenido

Todo el contenido está en `src/data/`. Los textos con dos idiomas tienen la forma `{ es: "...", en: "..." }`.

| Archivo | Contenido |
|---|---|
| `src/data/site.ts` | Nombre, rol, ciudad, zona horaria, email, WhatsApp, LinkedIn, GitHub, disponibilidad, foto, stack, bio y servicios |
| `src/data/projects.ts` | Proyectos (título, categoría, descripción, imagen, stack, demo, repo) |
| `src/data/resume.ts` | Experiencia, educación y habilidades |
| `src/messages/es.json`, `en.json` | Textos de la interfaz (botones, títulos, errores) |

- **Foto:** pon tu foto en `public/images/` (por ejemplo `photo.jpg`) y actualiza `photo` en `site.ts`. Se muestra en escala de grises.
- **Imágenes de proyectos:** en `public/images/`, idealmente en proporción 4:3 (1200×900).
- **Iconos del stack:** SVG en `public/icons/` (los actuales son de [Devicon](https://devicon.dev), licencia MIT). Marca `mono: true` en `site.ts` si el logo es negro, para que se invierta en tema oscuro.
- **CV en PDF:** reemplaza `public/cv-es.pdf` y `public/cv-en.pdf`, o genéralos desde la página `/resume`:
  ```bash
  npm run build && npm run start
  node scripts/make-cv-pdf.mjs     # en otra terminal
  ```
- Las pruebas (`npm test`) comprueban que no falte ninguna traducción.

## Formulario de contacto

Copia `.env.example` a `.env.local` y rellénalo:

```
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=tu-correo@gmail.com
CONTACT_FROM_EMAIL=Portafolio <hola@tu-dominio.com>
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

Sin `RESEND_API_KEY` el formulario funciona igual, pero los mensajes solo se imprimen en la consola del servidor (útil en desarrollo).

Para enviar desde tu propio dominio, verifícalo en [Resend](https://resend.com/domains). Mientras tanto puedes usar `onboarding@resend.dev` como remitente (solo envía a tu propio correo).

Protección antispam: campo oculto (honeypot) y límite de 5 envíos cada 10 minutos por IP.

## Publicar en Vercel

1. Sube el repositorio a GitHub.
2. En [vercel.com/new](https://vercel.com/new), importa el repositorio (detecta Next.js solo).
3. En **Settings → Environment Variables**, añade `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` y `NEXT_PUBLIC_SITE_URL` (la URL final, por ejemplo `https://kevin.dev`).
4. Despliega. Cada push a `main` vuelve a publicar.

`NEXT_PUBLIC_SITE_URL` se usa en el sitemap, las URLs canónicas, el hreflang y la imagen para redes sociales, así que ponla antes del primer deploy.

## Estructura

```
src/
  app/[locale]/        páginas (home, about, portfolio, resume) + imagen Open Graph
  app/api/contact/     envío del formulario
  components/          layout, home, contact, about, portfolio, resume, ui
  data/                tu contenido
  i18n/                configuración de idiomas (next-intl)
  lib/                 validación, rate limit, SEO, utilidades
  messages/            textos de la interfaz
tests/unit, tests/e2e
docs/superpowers/      diseño y plan de implementación
```
