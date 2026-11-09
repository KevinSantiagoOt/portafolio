import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <p className="text-[clamp(4rem,12vw,10rem)] leading-none font-medium tracking-tight">404</p>
      <h1 className="text-2xl font-medium">{t("title")}</h1>
      <Link href="/" className="rounded-full border border-border px-5 py-2 text-sm hover:bg-card-hover">
        ← {t("back")}
      </Link>
    </main>
  );
}
