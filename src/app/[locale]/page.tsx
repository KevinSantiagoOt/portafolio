import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { HomeView } from "@/components/home/HomeView";

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <HomeView />;
}
