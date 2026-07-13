import { INDUSTRIES } from "./constants";
import type {
  AuditFormData,
  AuditReport,
  ExecutiveFinding,
} from "./types";

export function getIndustryDefaults(industryId: string) {
  const industry = INDUSTRIES.find((item) => item.id === industryId);
  return {
    avgCustomerValue: industry?.avgCustomerValue ?? 400,
    conversionRate: industry?.conversionRate ?? 55,
    label: industry?.label ?? "Business",
    id: industry?.id ?? "other",
  };
}

export function estimateMissedCallRate(
  missedPeriods: string[],
  callHandling: string
): number {
  const base = 8 + missedPeriods.length * 5;
  const handlingBonus: Record<string, number> = {
    Voicemail: 12,
    "Cell Phone": 8,
    Unsure: 6,
    "Answering Service": 4,
    "Front Desk Staff": 2,
    Receptionist: 1,
  };
  return Math.min(45, base + (handlingBonus[callHandling] ?? 0));
}

function getHighestRiskArea(data: AuditFormData): string {
  if (data.missedPeriods.includes("After Hours")) return "After-hours missed calls";
  if (data.missedPeriods.includes("Weekends")) return "Weekend coverage gaps";
  if (data.missedPeriods.includes("Busy Hours")) return "Peak-hour call overflow";
  if (data.missedPeriods.includes("While Assisting Customers"))
    return "In-person service interruptions";
  if (data.missedPeriods.includes("Lunch")) return "Midday coverage gaps";
  return "Unanswered inbound calls";
}

function buildExecutiveFindings(data: AuditFormData): ExecutiveFinding[] {
  const highestRisk = getHighestRiskArea(data);

  const greatestOpportunity = (() => {
    if (data.callHandling === "Voicemail") return "Voicemail-to-lead conversion";
    if (data.callHandling === "Answering Service")
      return "Answering service augmentation";
    if (data.frustrations.includes("Missed Leads")) return "Automated lead recovery";
    if (data.frustrations.includes("Lost Revenue")) return "Revenue capture automation";
    if (data.monthlyCalls >= 400) return "High-volume call automation";
    return "Missed call engagement";
  })();

  return [
    { label: "Highest Risk", value: highestRisk },
    { label: "Greatest Opportunity", value: greatestOpportunity },
    { label: "FASTEST ROI", value: "Instant AI response within 10 seconds" },
  ];
}

function buildOpportunities(annualRecovery: number): string[] {
  return [
    `Recover approximately ${formatCurrency(annualRecovery)} annually by responding instantly to missed callers.`,
    "Automatically qualify every lead before a competitor answers.",
    "Provide 24/7 AI coverage without increasing payroll.",
    "Deliver structured conversation summaries directly to your team.",
  ];
}

function buildSummary(
  businessName: string,
  annualRevenueAtRisk: number,
  annualRecovery: number,
  highestRiskArea: string
): string {
  return `Based on your assessment, ${businessName} is estimated to leave approximately ${formatCurrency(annualRevenueAtRisk)} in potential revenue on the table each year. Recovering just 25% of those missed opportunities could generate approximately ${formatCurrency(annualRecovery)} in additional annual revenue without hiring additional front-desk staff. The largest opportunity identified is ${highestRiskArea.toLowerCase()}, making automated missed-call response the fastest path to revenue recovery.`;
}

export function generateAuditReport(data: AuditFormData): AuditReport {
  const industry = getIndustryDefaults(data.industry);
  const missedCallRate = estimateMissedCallRate(data.missedPeriods, data.callHandling);

  const missedCallsPerMonth = Math.round(
    data.monthlyCalls * (missedCallRate / 100)
  );
  const qualifiedLeadsLost = Math.round(
    missedCallsPerMonth * (industry.conversionRate / 100)
  );
  const annualRevenueAtRisk =
    qualifiedLeadsLost * industry.avgCustomerValue * 12;
  const recoverableRevenue = annualRevenueAtRisk * 0.25;
  const monthlyRecovery = recoverableRevenue / 12;

  const executiveFindings = buildExecutiveFindings(data);

  return {
    metrics: {
      missedCallsPerMonth,
      qualifiedLeadsLost,
      annualRevenueAtRisk,
      recoverableRevenue,
      monthlyRecovery,
    },
    opportunities: buildOpportunities(recoverableRevenue),
    executiveFindings,
    summary: buildSummary(
      data.businessName,
      annualRevenueAtRisk,
      recoverableRevenue,
      executiveFindings[0].value
    ),
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatCompactMoney(value: number): string {
  const rounded = Math.round(value);
  if (rounded >= 1_000_000) return `$${(rounded / 1_000_000).toFixed(1)}M`;
  if (rounded >= 1_000) return `$${Math.round(rounded / 1_000)}K`;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(rounded);
}

export const formatCurrencyCompact = formatCompactMoney;

export function formatRecoveryCTA(value: number): string {
  return `Recover My ${formatCompactMoney(value)}`;
}
