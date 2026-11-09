import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { ResumeView } from "@/components/resume/ResumeView";

export default function ResumePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <ResumeView />;
}
