import { z } from "zod";

export const INQUIRY_TYPES = ["job", "freelance", "other"] as const;
export type InquiryType = (typeof INQUIRY_TYPES)[number];

/**
 * Los mensajes de error son claves de traducción bajo `contact.errors.*`,
 * así el mismo esquema sirve en el cliente (ES/EN) y en el servidor.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "nameRequired").max(80, "nameTooLong"),
  email: z.string().trim().max(200, "emailInvalid").pipe(z.email("emailInvalid")),
  type: z.enum(INQUIRY_TYPES, "typeRequired"),
  message: z.string().trim().min(10, "messageTooShort").max(2000, "messageTooLong"),
  /** Honeypot: oculto para personas; si viene relleno es un bot. */
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactErrorKey =
  | "nameRequired"
  | "nameTooLong"
  | "emailInvalid"
  | "typeRequired"
  | "messageTooShort"
  | "messageTooLong";

/** Primer error de cada campo: { email: "emailInvalid", ... } */
export function fieldErrors(error: z.ZodError): Partial<Record<keyof ContactInput, ContactErrorKey>> {
  const out: Partial<Record<keyof ContactInput, ContactErrorKey>> = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as keyof ContactInput;
    if (field && !out[field]) out[field] = issue.message as ContactErrorKey;
  }
  return out;
}
