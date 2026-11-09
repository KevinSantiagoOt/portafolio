import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { site } from "@/data/site";
import type { Locale } from "@/data/types";
import { t as tl } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { ScrollRevealText } from "@/components/about/ScrollRevealText";
import { Services } from "@/components/about/Services";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export default function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("about");

  return (
    <main className="px-3 pb-6 md:px-4">
      <h1 className="pt-8 text-[clamp(3.5rem,9vw,7rem)] leading-none font-medium tracking-[-0.04em] md:pt-12">
        {t("title")}
      </h1>

      <div className="pt-10 pb-[18vh] md:ml-[33%] md:pt-16 md:pb-[28vh]">
        <ScrollRevealText text={tl(site.bio, locale as Locale)} />
      </div>

      <Services title={t("servicesTitle")} services={site.services} />

      <section className="mt-3 flex flex-col items-start justify-between gap-6 rounded-[22px] border border-border bg-card p-6 md:flex-row md:items-center md:p-8">
        <h2 className="text-2xl font-medium tracking-tight md:text-3xl">{t("ctaTitle")}</h2>
        <Link
          href="/?contact=1"
          className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
        >
          {t("ctaButton")}
          <ArrowIcon className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </section>
    </main>
  );
}
