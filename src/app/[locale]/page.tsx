import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { site } from "@/data/site";

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <h1>{site.name}</h1>;
}
