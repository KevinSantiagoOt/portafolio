import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { HomeView } from "@/components/home/HomeView";
import { site, SITE_URL } from "@/data/site";
import type { Locale } from "@/data/types";
import { t } from "@/lib/localize";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "home");
}

export default function HomePage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: t(site.role, locale as Locale),
    url: `${SITE_URL}/${locale}`,
    email: `mailto:${site.email}`,
    sameAs: [site.linkedin, site.github],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // JSON escapado: "<" no puede cerrar la etiqueta script.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <HomeView />
    </>
  );
}
