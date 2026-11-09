import { Resend } from "resend";
import type { ContactInput } from "./contact-schema";

const TYPE_LABEL: Record<ContactInput["type"], string> = {
  job: "Empleo",
  freelance: "Freelance",
  other: "Otro",
};

/** Variable de entorno sin espacios ni saltos de línea (frecuentes al pegar en Vercel). */
const env = (name: string) => process.env[name]?.trim() || undefined;

/** Envía el mensaje por Resend. Sin RESEND_API_KEY: en desarrollo solo lo registra; en producción lanza. Lanza si Resend falla. */
export async function sendContact(input: Omit<ContactInput, "website">): Promise<void> {
  const apiKey = env("RESEND_API_KEY");
  const subject = `[Portafolio] ${TYPE_LABEL[input.type]} — ${input.name}`;
  const text = `Nombre: ${input.name}\nEmail: ${input.email}\nTipo: ${TYPE_LABEL[input.type]}\n\n${input.message}`;

  if (!apiKey) {
    // En producción no fingimos éxito: el formulario mostrará el email directo y no se pierde el contacto.
    if (process.env.NODE_ENV === "production") throw new Error("RESEND_API_KEY no configurada");
    console.info(`[contact] RESEND_API_KEY no configurada; mensaje no enviado:\n${subject}\n${text}`);
    return;
  }

  const to = env("CONTACT_TO_EMAIL");
  const from = env("CONTACT_FROM_EMAIL");
  if (!to || !from) throw new Error("CONTACT_TO_EMAIL y CONTACT_FROM_EMAIL son obligatorias");

  const { error } = await new Resend(apiKey).emails.send({ from, to, replyTo: input.email, subject, text });
  if (error) throw new Error(`Resend: ${error.message}`);
}
