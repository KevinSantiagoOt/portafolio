import { contactSchema, fieldErrors } from "@/lib/contact-schema";
import { contactLimiter } from "@/lib/contact-limiter";
import { getClientKey } from "@/lib/rate-limit";
import { sendContact } from "@/lib/send-contact";

export async function POST(request: Request) {
  // Exigir JSON obliga a un preflight CORS: otras webs no pueden enviar en nombre de sus visitantes.
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return Response.json({ ok: false, error: "unsupported_media_type" }, { status: 415 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "validation", fields: {} }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "validation", fields: fieldErrors(parsed.error) }, { status: 400 });
  }

  const { website, ...data } = parsed.data;
  // Bot: respondemos éxito para no darle pistas, pero no enviamos nada.
  if (website) return Response.json({ ok: true });

  if (!contactLimiter.check(getClientKey(request.headers))) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  try {
    await sendContact(data);
  } catch (err) {
    console.error("[contact] error al enviar", err);
    return Response.json({ ok: false, error: "send_failed" }, { status: 500 });
  }

  return Response.json({ ok: true });
}
