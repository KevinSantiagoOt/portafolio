import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { GeistSans } from "geist/font/sans";
import { routing } from "@/i18n/routing";
import { ThemeScript } from "@/components/providers/ThemeScript";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { Background } from "@/components/layout/Background";
import { Frame } from "@/components/layout/Frame";
import { TopBar } from "@/components/layout/TopBar";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} data-theme="dark" className={GeistSans.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <NextIntlClientProvider>
          <MotionProvider>
            <Background />
            <Frame>
              <TopBar />
              {children}
            </Frame>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
