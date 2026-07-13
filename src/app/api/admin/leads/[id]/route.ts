import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/auth";
import { deleteLead, updateLeadStatus } from "@/lib/admin/leads";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/admin/types";

function isLeadStatus(value: string): value is LeadStatus {
  return LEAD_STATUSES.includes(value as LeadStatus);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = (await request.json()) as { status?: string };

    if (!body.status || !isLeadStatus(body.status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }

    const lead = await updateLeadStatus(id, body.status);
    return NextResponse.json({ lead });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update lead.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;
    await deleteLead(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete lead.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
