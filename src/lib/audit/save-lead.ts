import type { AuditFormData, AuditLeadInsert, AuditReport } from "@/lib/audit/types";
import {
  estimateMissedCallRate,
  getIndustryDefaults,
} from "@/lib/audit/calculations";

export function buildAuditLeadRecord(
  data: AuditFormData,
  report: AuditReport
): AuditLeadInsert {
  const industry = getIndustryDefaults(data.industry);
  const missedCallRate = estimateMissedCallRate(
    data.missedPeriods,
    data.callHandling
  );

  return {
    business_name: data.businessName,
    industry: data.industry,
    monthly_calls: data.monthlyCalls,
    missed_call_rate: missedCallRate,
    average_customer_value: industry.avgCustomerValue,
    conversion_rate: industry.conversionRate,
    annual_revenue_at_risk: report.metrics.annualRevenueAtRisk,
    annual_revenue_recovery: report.metrics.recoverableRevenue,
    first_name: data.firstName,
    email: data.email,
    phone: data.phone.trim() || null,
    notes: data.notes.trim() || null,
  };
}

export async function saveAuditLead(
  data: AuditFormData,
  report: AuditReport
): Promise<void> {
  try {
    const response = await fetch("/api/audit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, report }),
    });

    if (!response.ok) {
      console.warn("[audit] Audit submission API returned a non-OK response.");
    }
  } catch (error) {
    console.warn("[audit] Failed to submit audit:", error);
  }
}
