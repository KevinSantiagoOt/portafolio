import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import type { Locale } from "@/data/types";
import { t } from "@/lib/localize";
import { routing } from "@/i18n/routing";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc: Locale = locale === "en" ? "en" : "es";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0a0a",
          color: "#ededed",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#8a8a8a" }}>
          <span>{t(site.role, loc)}</span>
          <span>{site.city}</span>
        </div>
        <div style={{ fontSize: 140, fontWeight: 500, letterSpacing: -5, lineHeight: 1 }}>{site.name}</div>
      </div>
    ),
    size,
  );
}
