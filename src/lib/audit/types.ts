export type AuditFormData = {
  businessName: string;
  industry: string;
  monthlyCalls: number;
  missedPeriods: string[];
  callHandling: string;
  frustrations: string[];
  firstName: string;
  email: string;
  phone: string;
  notes: string;
  consent: boolean;
};

export type AuditMetrics = {
  missedCallsPerMonth: number;
  qualifiedLeadsLost: number;
  annualRevenueAtRisk: number;
  recoverableRevenue: number;
  monthlyRecovery: number;
};

export type ExecutiveFinding = {
  label: string;
  value: string;
};

export type AuditLeadInsert = {
  business_name: string;
  industry: string;
  monthly_calls: number;
  missed_call_rate: number;
  average_customer_value: number;
  conversion_rate: number;
  annual_revenue_at_risk: number;
  annual_revenue_recovery: number;
  first_name: string;
  email: string;
  phone: string | null;
  notes: string | null;
};

export type AuditReport = {
  metrics: AuditMetrics;
  opportunities: string[];
  executiveFindings: ExecutiveFinding[];
  summary: string;
};

export const DEFAULT_AUDIT_FORM: AuditFormData = {
  businessName: "",
  industry: "",
  monthlyCalls: 200,
  missedPeriods: [],
  callHandling: "",
  frustrations: [],
  firstName: "",
  email: "",
  phone: "",
  notes: "",
  consent: false,
};

export const AUDIT_STORAGE_KEY = "seriqon-audit-progress";
export const TOTAL_AUDIT_STEPS = 7;

export const ANALYSIS_STEPS = [
  "Reviewing business profile...",
  "Analyzing missed call patterns...",
  "Calculating revenue impact...",
  "Identifying automation opportunities...",
  "Generating executive recommendations...",
  "Preparing your personalized report...",
] as const;
