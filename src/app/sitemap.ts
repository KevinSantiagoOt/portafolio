import type { MetadataRoute } from "next";
import { PAGES, SITE_URL } from "@/data/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((page) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${page}`,
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}/${l}${page}`])),
      },
    })),
  );
}
