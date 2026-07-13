import { NextResponse } from "next/server";
import { buildAuditLeadRecord } from "@/lib/audit/save-lead";
import { sendAuditNotificationEmail } from "@/lib/audit/send-notification";
import type { AuditFormData, AuditReport } from "@/lib/audit/types";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type AuditSubmissionBody = {
  data: AuditFormData;
  report: AuditReport;
};

function isAuditSubmissionBody(body: unknown): body is AuditSubmissionBody {
  if (!body || typeof body !== "object") return false;
  const payload = body as AuditSubmissionBody;
  return Boolean(payload.data && payload.report);
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!isAuditSubmissionBody(body)) {
      return NextResponse.json({ error: "Invalid audit payload." }, { status: 400 });
    }

    const { data, report } = body;
    const record = buildAuditLeadRecord(data, report);
    const supabase = getSupabaseServerClient();

    if (!supabase) {
      console.warn(
        "[audit] Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
      );
    } else {
      const { error } = await supabase.from("audit_leads").insert(record);

      if (error) {
        console.warn("[audit] Failed to save lead to Supabase:", error.message);
      }
    }

    try {
      await sendAuditNotificationEmail(data, report);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown email error";
      console.error("[audit] Failed to send Resend notification:", message);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown server error";
    console.error("[audit] Audit API route failed:", message);
    return NextResponse.json({ ok: true });
  }
}
