import {
  formatCurrency,
  getIndustryDefaults,
} from "@/lib/audit/calculations";

export type RoiCalculatorInputs = {
  industry: string;
  monthlyCalls: number;
  missedRate: number;
  avgCustomerValue: number;
};

export type RoiCalculatorResults = {
  monthlyOpportunity: number;
  annualOpportunity: number;
};

export function computeRoiEstimate(
  inputs: RoiCalculatorInputs
): RoiCalculatorResults {
  const industry = getIndustryDefaults(inputs.industry);
  const conversionRate = industry.conversionRate / 100;
  const missedCalls = inputs.monthlyCalls * (inputs.missedRate / 100);
  const qualifiedLost = missedCalls * conversionRate;
  const monthlyOpportunity = qualifiedLost * inputs.avgCustomerValue;
  const annualOpportunity = monthlyOpportunity * 12;

  return {
    monthlyOpportunity,
    annualOpportunity,
  };
}

export function buildEstimateSummary(
  results: RoiCalculatorResults,
  industryLabel: string
): string {
  return `Based on ${industryLabel} benchmarks and your inputs, missed calls may represent approximately ${formatCurrency(results.annualOpportunity)} in annual revenue opportunity. Even modest improvements in response time can convert more of those conversations into booked appointments—without adding payroll.`;
}
