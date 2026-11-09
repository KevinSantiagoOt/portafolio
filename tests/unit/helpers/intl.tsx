import type { ReactElement, ReactNode } from "react";
import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import es from "@/messages/es.json";
import en from "@/messages/en.json";

export function IntlWrapper({ locale = "es", children }: { locale?: "es" | "en"; children: ReactNode }) {
  return (
    <NextIntlClientProvider locale={locale} messages={locale === "es" ? es : en}>
      {children}
    </NextIntlClientProvider>
  );
}

export function renderWithIntl(ui: ReactElement, locale: "es" | "en" = "es") {
  return render(ui, { wrapper: ({ children }) => <IntlWrapper locale={locale}>{children}</IntlWrapper> });
}
