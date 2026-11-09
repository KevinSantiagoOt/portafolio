import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { ResumeView } from "@/components/resume/ResumeView";
import type { Locale } from "@/data/types";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "resume");
}

export default function ResumePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <ResumeView />;
}
