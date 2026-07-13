export const ADMIN_SESSION_COOKIE = "seriqon_admin_session";
export const CALENDLY_BOOKING_URL =
  "https://calendly.com/hello-seriqonhq/30min";

export const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Demo Scheduled",
  "Proposal Sent",
  "Won",
  "Lost",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type AuditLead = {
  id: string;
  created_at: string;
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
  status: LeadStatus;
};

export type LeadFilter = "All" | LeadStatus;

export type AdminMetrics = {
  totalLeads: number;
  newLeads: number;
  bookedDemos: number;
  closedWon: number;
  estimatedPipelineValue: number;
};
