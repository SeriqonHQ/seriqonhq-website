import { Resend } from "resend";
import { INDUSTRIES } from "@/lib/audit/constants";
import {
  estimateMissedCallRate,
  formatCurrency,
  getIndustryDefaults,
} from "@/lib/audit/calculations";
import { siteConfig } from "@/lib/site";
import type { AuditFormData, AuditReport } from "@/lib/audit/types";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatTableRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#111827;width:40%;">${escapeHtml(label)}</td>
      <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#374151;">${escapeHtml(value)}</td>
    </tr>
  `;
}

function buildAuditEmailHtml(data: AuditFormData, report: AuditReport): string {
  const industry =
    INDUSTRIES.find((item) => item.id === data.industry)?.label ?? data.industry;
  const industryDefaults = getIndustryDefaults(data.industry);
  const missedCallRate = estimateMissedCallRate(
    data.missedPeriods,
    data.callHandling
  );

  const rows = [
    ["Business", data.businessName],
    ["Industry", industry],
    ["Monthly Calls", data.monthlyCalls.toLocaleString()],
    ["Missed Call Periods", data.missedPeriods.join(", ") || "None selected"],
    ["Call Handling", data.callHandling || "Not specified"],
    ["Frustrations", data.frustrations.join(", ") || "None selected"],
    ["First Name", data.firstName],
    ["Email", data.email],
    ["Phone", data.phone || "Not provided"],
    ["Notes", data.notes || "None"],
    ["Missed Call Rate", `${missedCallRate}%`],
    ["Average Customer Value", formatCurrency(industryDefaults.avgCustomerValue)],
    ["Conversion Rate", `${industryDefaults.conversionRate}%`],
    [
      "Estimated Missed Calls / Month",
      Math.round(report.metrics.missedCallsPerMonth).toLocaleString(),
    ],
    [
      "Qualified Leads Potentially Lost",
      Math.round(report.metrics.qualifiedLeadsLost).toLocaleString(),
    ],
    [
      "Annual Revenue At Risk",
      formatCurrency(report.metrics.annualRevenueAtRisk),
    ],
    [
      "Potential Annual Recovery",
      formatCurrency(report.metrics.recoverableRevenue),
    ],
    [
      "Potential Monthly Recovery",
      formatCurrency(report.metrics.monthlyRecovery),
    ],
  ];

  const tableRows = rows.map(([label, value]) => formatTableRow(label, value)).join("");

  return `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#111827;max-width:720px;">
      <h1 style="font-size:24px;margin-bottom:24px;">New Time Recovery Audit Submitted</h1>
      <p style="margin-bottom:24px;color:#4b5563;">A new audit was completed on seriqonhq.com.</p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>
  `;
}

export async function sendAuditNotificationEmail(
  data: AuditFormData,
  report: AuditReport
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("[audit] RESEND_API_KEY is not configured. Skipping notification email.");
    return;
  }

  const resend = new Resend(apiKey);
  const from =
    process.env.RESEND_FROM_EMAIL ?? `Seriqon <notifications@${siteConfig.url.replace("https://", "")}>`;

  const { error } = await resend.emails.send({
    from,
    to: siteConfig.email,
    subject: "🚀 New Time Recovery Audit Submitted",
    html: buildAuditEmailHtml(data, report),
  });

  if (error) {
    throw new Error(error.message);
  }
}
