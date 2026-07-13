import { jsPDF } from "jspdf";
import { trackPdfDownloaded } from "@/lib/analytics/events";
import { INDUSTRIES } from "./constants";
import { formatCompactMoney, formatCurrency } from "./calculations";
import type { AuditFormData, AuditReport } from "./types";

const PAGE_WIDTH = 210;
const MARGIN = 20;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

function addFooter(doc: jsPDF) {
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    doc.text("Prepared by Seriqon™  ·  seriqonhq.com", MARGIN, 285);
    doc.text("Confidential Business Assessment", PAGE_WIDTH - MARGIN, 285, {
      align: "right",
    });
    doc.text(`Page ${i} of ${pageCount}`, PAGE_WIDTH / 2, 285, {
      align: "center",
    });
  }
}

function addDivider(doc: jsPDF, y: number) {
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
}

function checkPageBreak(doc: jsPDF, y: number, needed = 20): number {
  if (y + needed > 265) {
    doc.addPage();
    return 30;
  }
  return y;
}

export function getAuditPdfFilename(data: AuditFormData): string {
  return `seriqon-audit-${data.businessName.toLowerCase().replace(/\s+/g, "-") || "report"}.pdf`;
}

export function buildAuditPdfDoc(data: AuditFormData, report: AuditReport): jsPDF {
  const doc = new jsPDF();
  const industry =
    INDUSTRIES.find((item) => item.id === data.industry)?.label ?? data.industry;
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let y = 28;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(30, 30, 30);
  doc.text("Seriqon", MARGIN, y);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text("Intelligent Automation", MARGIN, y + 6);

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 30);
  doc.text("Time Recovery Audit™", MARGIN, y + 20);

  y += 36;
  addDivider(doc, y);
  y += 10;

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("PREPARED FOR", MARGIN, y);
  y += 6;

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 30);
  doc.text(data.businessName, MARGIN, y);
  y += 7;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  doc.text(`Industry: ${industry}`, MARGIN, y);
  y += 6;
  doc.text(`Date: ${date}`, MARGIN, y);
  y += 14;

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 30);
  doc.text("Executive Summary", MARGIN, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  const summaryLines = doc.splitTextToSize(report.summary, CONTENT_WIDTH);
  doc.text(summaryLines, MARGIN, y);
  y += summaryLines.length * 5 + 12;

  y = checkPageBreak(doc, y, 60);
  addDivider(doc, y);
  y += 10;

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 30);
  doc.text("Estimated Annual Revenue Recovery", MARGIN, y);
  y += 10;

  doc.setFontSize(36);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(50, 50, 50);
  doc.text(formatCurrency(report.metrics.recoverableRevenue), MARGIN, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(
    `Potential Monthly Recovery: ${formatCurrency(report.metrics.monthlyRecovery)}`,
    MARGIN,
    y
  );
  y += 14;

  y = checkPageBreak(doc, y, 80);
  addDivider(doc, y);
  y += 10;

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 30);
  doc.text("Key Metrics", MARGIN, y);
  y += 10;

  const metrics = [
    [
      "Estimated Missed Calls / Month",
      Math.round(report.metrics.missedCallsPerMonth).toLocaleString(),
    ],
    [
      "Qualified Leads Potentially Lost",
      Math.round(report.metrics.qualifiedLeadsLost).toLocaleString(),
    ],
    [
      "Estimated Annual Revenue At Risk",
      formatCompactMoney(report.metrics.annualRevenueAtRisk),
    ],
    [
      "Potential Annual Revenue Recovery",
      formatCompactMoney(report.metrics.recoverableRevenue),
    ],
  ];

  metrics.forEach(([label, value]) => {
    y = checkPageBreak(doc, y, 14);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text(label, MARGIN, y);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 40);
    doc.text(value, MARGIN, y + 6);
    y += 16;
  });

  y += 4;
  y = checkPageBreak(doc, y, 60);
  addDivider(doc, y);
  y += 10;

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 30);
  doc.text("Executive Findings", MARGIN, y);
  y += 10;

  report.executiveFindings.forEach((finding) => {
    y = checkPageBreak(doc, y, 14);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 100, 100);
    doc.text(finding.label.toUpperCase(), MARGIN, y);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    doc.text(finding.value, MARGIN, y + 6);
    y += 16;
  });

  y += 4;
  y = checkPageBreak(doc, y, 60);
  addDivider(doc, y);
  y += 10;

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 30);
  doc.text("Top Opportunities", MARGIN, y);
  y += 10;

  report.opportunities.forEach((item, index) => {
    y = checkPageBreak(doc, y, 16);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    const lines = doc.splitTextToSize(`${index + 1}. ${item}`, CONTENT_WIDTH);
    doc.text(lines, MARGIN, y);
    y += lines.length * 5 + 4;
  });

  y += 4;
  y = checkPageBreak(doc, y, 50);
  addDivider(doc, y);
  y += 10;

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 30);
  doc.text("Recommendations", MARGIN, y);
  y += 10;

  report.opportunities.forEach((rec, index) => {
    y = checkPageBreak(doc, y, 16);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    const lines = doc.splitTextToSize(`${index + 1}. ${rec}`, CONTENT_WIDTH);
    doc.text(lines, MARGIN, y);
    y += lines.length * 5 + 4;
  });

  y += 4;
  y = checkPageBreak(doc, y, 50);
  addDivider(doc, y);
  y += 10;

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 30);
  doc.text("Next Steps", MARGIN, y);
  y += 10;

  const nextSteps = [
    "Schedule a complimentary strategy call with the Seriqon team.",
    "Review your custom Seriqon Voice™ implementation plan.",
    "Begin capturing missed-call revenue within days—not months.",
  ];

  nextSteps.forEach((step, index) => {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.text(`${index + 1}. ${step}`, MARGIN, y);
    y += 8;
  });

  y += 8;
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(`Prepared for: ${data.firstName} · ${data.email}`, MARGIN, y);
  if (data.phone) {
    y += 5;
    doc.text(`Phone: ${data.phone}`, MARGIN, y);
  }

  addFooter(doc);

  return doc;
}

export function prepareAuditPdf(data: AuditFormData, report: AuditReport): Blob {
  const doc = buildAuditPdfDoc(data, report);
  return doc.output("blob");
}

export function downloadPreparedAuditPdf(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function generateAuditPdf(
  data: AuditFormData,
  report: AuditReport,
  preparedBlob?: Blob | null
) {
  trackPdfDownloaded();

  if (preparedBlob) {
    downloadPreparedAuditPdf(preparedBlob, getAuditPdfFilename(data));
    return;
  }

  const doc = buildAuditPdfDoc(data, report);
  doc.save(getAuditPdfFilename(data));
}
