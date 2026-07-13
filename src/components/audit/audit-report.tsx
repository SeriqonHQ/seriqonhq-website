"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScoreRing } from "@/components/audit/score-ring";
import {
  formatCompactMoney,
  formatCurrency,
} from "@/lib/audit/calculations";
import { generateAuditPdf } from "@/lib/audit/generate-pdf";
import { INDUSTRIES } from "@/lib/audit/constants";
import type { AuditFormData, AuditReport } from "@/lib/audit/types";

interface AuditReportViewProps {
  data: AuditFormData;
  report: AuditReport;
  preparedPdf?: Blob | null;
}

const metricCards = [
  {
    key: "missedCallsPerMonth" as const,
    label: "Estimated Missed Calls / Month",
    format: (v: number) => Math.round(v).toLocaleString(),
  },
  {
    key: "qualifiedLeadsLost" as const,
    label: "Qualified Leads Potentially Lost",
    format: (v: number) => Math.round(v).toLocaleString(),
  },
  {
    key: "annualRevenueAtRisk" as const,
    label: "Estimated Annual Revenue At Risk",
    format: formatCompactMoney,
  },
  {
    key: "recoverableRevenue" as const,
    label: "Potential Annual Revenue Recovery",
    format: formatCompactMoney,
    highlight: true,
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

const METRIC_CARD_BASE_DELAY = 0.45;
const METRIC_CARD_STAGGER = 0.2;
const CTA_DELAY =
  METRIC_CARD_BASE_DELAY + metricCards.length * METRIC_CARD_STAGGER + 0.35;

export function AuditReportView({
  data,
  report,
  preparedPdf = null,
}: AuditReportViewProps) {
  const industryLabel =
    INDUSTRIES.find((item) => item.id === data.industry)?.label ?? data.industry;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <motion.div
        custom={0}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-10 rounded-3xl border border-border bg-surface/80 p-8 backdrop-blur-xl md:p-10"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-medium tracking-widest text-accent uppercase">
              Time Recovery Audit™
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {data.businessName}
            </h2>
            <p className="mt-2 text-muted">{industryLabel}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Personalized Executive Report
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => generateAuditPdf(data, report, preparedPdf)}
          >
            Download Audit PDF
          </Button>
        </div>
      </motion.div>

      <motion.div
        custom={1}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <ScoreRing annualRecovery={report.metrics.recoverableRevenue} />
      </motion.div>

      <motion.div
        custom={2}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-10 grid gap-4 sm:grid-cols-2"
      >
        {metricCards.map((metric, index) => (
          <motion.div
            key={metric.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: METRIC_CARD_BASE_DELAY + index * METRIC_CARD_STAGGER,
              duration: 0.5,
              ease: "easeOut",
            }}
          >
          <Card
            className={
              metric.highlight
                ? "border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_40px_rgba(16,185,129,0.15)]"
                : undefined
            }
          >
            <p
              className={
                metric.highlight
                  ? "text-xs font-medium uppercase tracking-wider text-emerald-400"
                  : "text-xs font-medium uppercase tracking-wider text-muted-foreground"
              }
            >
              {metric.label}
            </p>
            <p
              className={
                metric.highlight
                  ? "mt-2 font-display text-3xl font-semibold text-emerald-400"
                  : "mt-2 font-display text-3xl font-semibold text-foreground"
              }
            >
              <CountUp
                end={report.metrics[metric.key]}
                duration={0.9}
                preserveValue
                formattingFn={(value) => metric.format(value)}
              />
            </p>
          </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        custom={3}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <h3 className="mb-4 font-display text-2xl font-semibold text-foreground">
          Executive Findings
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {report.executiveFindings.map((finding) => (
            <Card key={finding.label}>
              <p className="text-xs font-medium uppercase tracking-wider text-accent">
                {finding.label}
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">
                {finding.value}
              </p>
            </Card>
          ))}
        </div>
      </motion.div>

      <motion.div
        custom={4}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <h3 className="mb-4 font-display text-2xl font-semibold text-foreground">
          Top Opportunities
        </h3>
        <div className="space-y-3">
          {report.opportunities.map((item, index) => (
            <div
              key={item}
              className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-glow text-sm font-semibold text-accent">
                {index + 1}
              </span>
              <p className="text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        custom={5}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-10 rounded-2xl border border-border bg-surface p-6 md:p-8"
      >
        <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
          Executive Summary
        </h3>
        <p className="leading-relaxed text-muted">{report.summary}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: CTA_DELAY,
          duration: 0.55,
          ease: "easeOut",
        }}
        className="relative overflow-hidden rounded-3xl border border-border bg-surface px-8 py-12 text-center md:px-12 md:py-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
        <div className="relative">
          <p className="mx-auto mb-6 max-w-xl text-sm text-muted-foreground">
            Every week missed calls continue, more revenue walks out the door.
            The sooner your team responds, the more opportunities you recover.
          </p>
          <h3 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            See how your business could recover{" "}
            {formatCurrency(report.metrics.recoverableRevenue)} per year.
          </h3>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/book" size="lg">
              Book My Time Recovery Audit
            </Button>
            <Button href="/demo" variant="secondary" size="lg">
              Watch Seriqon Voice Live Demo
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            No obligation. Free consultation.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
