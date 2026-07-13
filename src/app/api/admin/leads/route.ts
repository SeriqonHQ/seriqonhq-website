import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/auth";
import { fetchAuditLeads } from "@/lib/admin/leads";

export async function GET() {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const leads = await fetchAuditLeads();
    return NextResponse.json({ leads });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch leads.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
