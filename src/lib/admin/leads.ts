import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { AuditLead, LeadStatus } from "@/lib/admin/types";

export async function fetchAuditLeads(): Promise<AuditLead[]> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase
    .from("audit_leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AuditLead[];
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus
): Promise<AuditLead> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase
    .from("audit_leads")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as AuditLead;
}

export async function deleteLead(id: string): Promise<void> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { error } = await supabase.from("audit_leads").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
