import { NextResponse } from "next/server";

import { sendContactViaResend, validateContactPayload } from "@/lib/contact-mail";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = validateContactPayload(body);
  if (!parsed.ok) {
    if (parsed.error === "spam") {
      return NextResponse.json({ ok: true }, { status: 200 });
    }
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const sent = await sendContactViaResend(parsed.data);
  if (!sent.ok) {
    const status = sent.error === "missing_resend" || sent.error === "missing_notify" ? 503 : 502;
    return NextResponse.json({ error: sent.error }, { status });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
