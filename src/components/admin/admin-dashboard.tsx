"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Calendar,
  ExternalLink,
  LogOut,
  Mail,
  Phone,
  Search,
  Trash2,
} from "lucide-react";
import { INDUSTRIES } from "@/lib/audit/constants";
import { formatCurrency } from "@/lib/audit/calculations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LeadDetailModal } from "@/components/admin/lead-detail-modal";
import { CALENDLY_BOOKING_URL, LEAD_STATUSES } from "@/lib/admin/types";
import type {
  AdminMetrics,
  AuditLead,
  LeadFilter,
  LeadStatus,
} from "@/lib/admin/types";
import { cn } from "@/lib/utils";

const FILTERS: LeadFilter[] = ["All", ...LEAD_STATUSES];
const PIPELINE_STATUSES: LeadStatus[] = [
  "New",
  "Contacted",
  "Demo Scheduled",
  "Proposal Sent",
];

function getIndustryLabel(industryId: string) {
  return (
    INDUSTRIES.find((item) => item.id === industryId)?.label ?? industryId
  );
}

function formatSubmittedDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function computeMetrics(leads: AuditLead[]): AdminMetrics {
  return {
    totalLeads: leads.length,
    newLeads: leads.filter((lead) => lead.status === "New").length,
    bookedDemos: leads.filter((lead) => lead.status === "Demo Scheduled").length,
    closedWon: leads.filter((lead) => lead.status === "Won").length,
    estimatedPipelineValue: leads
      .filter((lead) => PIPELINE_STATUSES.includes(lead.status))
      .reduce((sum, lead) => sum + lead.annual_revenue_recovery, 0),
  };
}

function statusClasses(status: LeadStatus) {
  switch (status) {
    case "New":
      return "border-accent/30 bg-accent/10 text-accent";
    case "Contacted":
      return "border-blue-500/30 bg-blue-500/10 text-blue-300";
    case "Demo Scheduled":
      return "border-violet-500/30 bg-violet-500/10 text-violet-300";
    case "Proposal Sent":
      return "border-amber-500/30 bg-amber-500/10 text-amber-300";
    case "Won":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
    case "Lost":
      return "border-red-500/30 bg-red-500/10 text-red-300";
    default:
      return "border-border bg-surface text-muted";
  }
}

async function copyToClipboard(value: string) {
  await navigator.clipboard.writeText(value);
}

export function AdminDashboard() {
  const [leads, setLeads] = useState<AuditLead[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<LeadFilter>("All");
  const [selectedLead, setSelectedLead] = useState<AuditLead | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null);

  const loadLeads = useCallback(async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/leads");

      if (response.status === 401) {
        window.location.reload();
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to load leads.");
      }

      const data = (await response.json()) as { leads: AuditLead[] };
      setLeads(data.leads);
    } catch (loadError) {
      const message =
        loadError instanceof Error ? loadError.message : "Failed to load leads.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadLeads();
  }, [loadLeads]);

  const metrics = useMemo(() => computeMetrics(leads), [leads]);

  const filteredLeads = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchesFilter =
        activeFilter === "All" || lead.status === activeFilter;

      if (!matchesFilter) {
        return false;
      }

      if (!query) {
        return true;
      }

      const industryLabel = getIndustryLabel(lead.industry).toLowerCase();

      return (
        lead.business_name.toLowerCase().includes(query) ||
        lead.first_name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        industryLabel.includes(query) ||
        lead.industry.toLowerCase().includes(query)
      );
    });
  }, [activeFilter, leads, searchQuery]);

  const handleStatusChange = async (leadId: string, status: LeadStatus) => {
    setUpdatingLeadId(leadId);

    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status.");
      }

      const data = (await response.json()) as { lead: AuditLead };
      setLeads((current) =>
        current.map((lead) => (lead.id === leadId ? data.lead : lead))
      );
      setSelectedLead((current) =>
        current?.id === leadId ? data.lead : current
      );
    } catch (updateError) {
      const message =
        updateError instanceof Error
          ? updateError.message
          : "Failed to update status.";
      setError(message);
    } finally {
      setUpdatingLeadId(null);
    }
  };

  const handleDeleteLead = async (lead: AuditLead) => {
    const confirmed = window.confirm(
      `Delete ${lead.business_name}? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete lead.");
      }

      setLeads((current) => current.filter((item) => item.id !== lead.id));
      setSelectedLead((current) => (current?.id === lead.id ? null : current));
    } catch (deleteError) {
      const message =
        deleteError instanceof Error
          ? deleteError.message
          : "Failed to delete lead.";
      setError(message);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium tracking-widest text-accent uppercase">
            Internal Dashboard
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-foreground md:text-4xl">
            Audit Leads
          </h1>
          <p className="mt-2 text-muted">
            Review submissions, update pipeline status, and take action.
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Total Leads" value={metrics.totalLeads.toString()} />
        <MetricCard label="New Leads" value={metrics.newLeads.toString()} />
        <MetricCard
          label="Booked Demos"
          value={metrics.bookedDemos.toString()}
        />
        <MetricCard label="Closed Won" value={metrics.closedWon.toString()} />
        <MetricCard
          label="Estimated Pipeline Value"
          value={formatCurrency(metrics.estimatedPipelineValue)}
          highlight
        />
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search business, contact, email, or industry"
            className="w-full rounded-full border border-border bg-background py-3 pr-4 pl-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                activeFilter === filter
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-border bg-surface text-muted hover:border-border-hover hover:text-foreground"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <Card hover={false}>
          <p className="text-muted">Loading audit submissions...</p>
        </Card>
      ) : filteredLeads.length === 0 ? (
        <Card hover={false}>
          <p className="text-muted">No leads match your current filters.</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredLeads.map((lead) => (
            <Card key={lead.id} hover={false} className="p-5 md:p-6">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                <div className="min-w-0 flex-1 space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="font-display text-xl font-semibold text-foreground">
                        {lead.business_name}
                      </h2>
                      <p className="mt-1 text-sm text-muted">
                        {getIndustryLabel(lead.industry)}
                      </p>
                    </div>
                    <select
                      value={lead.status}
                      disabled={updatingLeadId === lead.id}
                      onChange={(event) =>
                        handleStatusChange(
                          lead.id,
                          event.target.value as LeadStatus
                        )
                      }
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-accent",
                        statusClasses(lead.status)
                      )}
                    >
                      {LEAD_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <LeadField label="Contact" value={lead.first_name} />
                    <LeadField label="Email" value={lead.email} />
                    <LeadField
                      label="Phone"
                      value={lead.phone ?? "Not provided"}
                    />
                    <LeadField
                      label="Submitted"
                      value={formatSubmittedDate(lead.created_at)}
                    />
                  </div>

                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
                    <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                      Estimated Annual Revenue Recovery
                    </p>
                    <p className="mt-1 font-display text-2xl font-semibold text-emerald-400">
                      {formatCurrency(lead.annual_revenue_recovery)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 xl:max-w-xs xl:justify-end">
                  <ActionButton
                    label="Open full audit"
                    onClick={() => setSelectedLead(lead)}
                  />
                  <ActionButton
                    label="Copy email"
                    icon={Mail}
                    onClick={() => copyToClipboard(lead.email)}
                  />
                  {lead.phone ? (
                    <ActionButton
                      label="Copy phone"
                      icon={Phone}
                      onClick={() => copyToClipboard(lead.phone ?? "")}
                    />
                  ) : null}
                  <ActionButton
                    label="Open Calendly"
                    icon={Calendar}
                    onClick={() =>
                      window.open(CALENDLY_BOOKING_URL, "_blank", "noopener,noreferrer")
                    }
                  />
                  <ActionButton
                    label="Delete lead"
                    icon={Trash2}
                    onClick={() => handleDeleteLead(lead)}
                    destructive
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {selectedLead ? (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      ) : null}
    </div>
  );
}

function MetricCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <Card hover={false} className="p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "mt-2 font-display text-2xl font-semibold",
          highlight ? "text-emerald-400" : "text-foreground"
        )}
      >
        {value}
      </p>
    </Card>
  );
}

function LeadField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm text-foreground">{value}</p>
    </div>
  );
}

function ActionButton({
  label,
  icon: Icon,
  onClick,
  destructive = false,
}: {
  label: string;
  icon?: typeof Mail;
  onClick: () => void;
  destructive?: boolean;
}) {
  return (
    <Button
      variant={destructive ? "ghost" : "secondary"}
      size="sm"
      onClick={onClick}
      className={destructive ? "text-red-300 hover:text-red-200" : undefined}
    >
      {Icon ? <Icon className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
      {label}
    </Button>
  );
}
