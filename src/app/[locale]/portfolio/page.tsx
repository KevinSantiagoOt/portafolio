import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { projects } from "@/data/projects";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";

export default function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("portfolio");

  return (
    <main className="px-1 pb-2 md:px-0">
      <h1 className="max-w-[22ch] px-2 pt-8 pb-8 text-3xl leading-[1.1] font-medium tracking-[-0.02em] md:px-3 md:pt-12 md:pb-10 md:text-5xl">
        {t("heading")}
      </h1>
      <ProjectGrid projects={projects} />
    </main>
  );
}
