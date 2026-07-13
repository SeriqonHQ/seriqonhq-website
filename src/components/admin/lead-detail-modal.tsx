"use client";

import { INDUSTRIES } from "@/lib/audit/constants";
import { formatCurrency } from "@/lib/audit/calculations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { AuditLead } from "@/lib/admin/types";

interface LeadDetailModalProps {
  lead: AuditLead;
  onClose: () => void;
}

function getIndustryLabel(industryId: string) {
  return (
    INDUSTRIES.find((item) => item.id === industryId)?.label ?? industryId
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function LeadDetailModal({ lead, onClose }: LeadDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close audit details"
      />
      <Card
        hover={false}
        className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium tracking-widest text-accent uppercase">
              Full Audit
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-foreground">
              {lead.business_name}
            </h2>
            <p className="mt-1 text-sm text-muted">
              Submitted {formatDate(lead.created_at)}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <DetailItem label="Industry" value={getIndustryLabel(lead.industry)} />
          <DetailItem label="Contact Name" value={lead.first_name} />
          <DetailItem label="Email" value={lead.email} />
          <DetailItem label="Phone" value={lead.phone ?? "Not provided"} />
          <DetailItem
            label="Monthly Calls"
            value={lead.monthly_calls.toLocaleString()}
          />
          <DetailItem
            label="Missed Call Rate"
            value={`${lead.missed_call_rate}%`}
          />
          <DetailItem
            label="Average Customer Value"
            value={formatCurrency(lead.average_customer_value)}
          />
          <DetailItem
            label="Conversion Rate"
            value={`${lead.conversion_rate}%`}
          />
          <DetailItem
            label="Annual Revenue At Risk"
            value={formatCurrency(lead.annual_revenue_at_risk)}
          />
          <DetailItem
            label="Estimated Annual Recovery"
            value={formatCurrency(lead.annual_revenue_recovery)}
            highlight
          />
          <DetailItem label="Status" value={lead.status} />
        </div>

        {lead.notes ? (
          <div className="mt-6 rounded-2xl border border-border bg-background p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Notes
            </p>
            <p className="mt-2 text-sm text-muted">{lead.notes}</p>
          </div>
        ) : null}
      </Card>
    </div>
  );
}

function DetailItem({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={
          highlight
            ? "mt-2 font-display text-lg font-semibold text-emerald-400"
            : "mt-2 text-sm font-medium text-foreground"
        }
      >
        {value}
      </p>
    </div>
  );
}
