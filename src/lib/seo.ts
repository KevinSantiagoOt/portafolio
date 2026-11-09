import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PAGES, site } from "@/data/site";
import type { Locale } from "@/data/types";
import { routing } from "@/i18n/routing";
import { t as tl } from "./localize";

type PageKey = "home" | "about" | "portfolio" | "resume";
const PATH: Record<PageKey, (typeof PAGES)[number]> = {
  home: "",
  about: "/about",
  portfolio: "/portfolio",
  resume: "/resume",
};

/** Título, descripción, canonical y hreflang de una página en un idioma. */
export async function pageMetadata(locale: Locale, key: PageKey): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const vars = { name: site.name, role: tl(site.role, locale) };
  const path = PATH[key];
  const title = key === "home" ? { absolute: t("homeTitle", vars) } : t(`${key}Title`);
  const description = t(`${key}Description`, vars);

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`])),
    },
    openGraph: {
      title: typeof title === "string" ? `${title} · ${site.name}` : title.absolute,
      description,
      url: `/${locale}${path}`,
      siteName: site.name,
      locale: locale === "es" ? "es_MX" : "en_US",
      type: "website",
      // openGraph propio sustituye al heredado, así que la imagen se declara aquí.
      images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: site.name }],
    },
  };
}
