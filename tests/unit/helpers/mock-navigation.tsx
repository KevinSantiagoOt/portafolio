import type { ComponentProps } from "react";

// Sustituto de @/i18n/navigation para jsdom (sin router de Next).
export const navigationMock = {
  Link: ({ href, ...props }: ComponentProps<"a"> & { href: string }) => <a href={href} {...props} />,
  usePathname: () => "/",
  useRouter: () => ({ replace: () => {}, push: () => {} }),
  redirect: () => {},
  getPathname: () => "/",
};
