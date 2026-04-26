import { Resend } from "resend";

function escapeHtml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export function validateContactPayload(body: unknown): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "invalid_json" };
  }
  const o = body as Record<string, unknown>;
  const name = typeof o.name === "string" ? o.name.trim() : "";
  const email = typeof o.email === "string" ? o.email.trim().toLowerCase() : "";
  const message = typeof o.message === "string" ? o.message.trim() : "";
  const honeypot = typeof o._company === "string" ? o._company.trim() : "";

  if (honeypot.length > 0) {
    return { ok: false, error: "spam" };
  }

  if (name.length < 2 || name.length > 120) {
    return { ok: false, error: "name" };
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk || email.length > 254) {
    return { ok: false, error: "email" };
  }

  if (message.length < 10 || message.length > 8000) {
    return { ok: false, error: "message" };
  }

  return { ok: true, data: { name, email, message } };
}

export async function sendContactViaResend(payload: ContactPayload): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFY_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim() ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    return { ok: false, error: "missing_resend" };
  }
  if (!to) {
    return { ok: false, error: "missing_notify" };
  }

  const resend = new Resend(apiKey);
  const { name, email, message } = payload;
  const subject = `[Portfolio] Mensagem de ${name}`;
  const html = `
    <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
    <p><strong>Mensagem:</strong></p>
    <pre style="font-family:ui-monospace,monospace;white-space:pre-wrap;">${escapeHtml(message)}</pre>
  `;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject,
    html,
  });

  if (error != null) {
    return { ok: false, error: "resend" };
  }
  return { ok: true };
}
