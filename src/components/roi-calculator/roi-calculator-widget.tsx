"use client";

import { useCallback, useMemo, useState } from "react";
import CountUp from "react-countup";
import { Button } from "@/components/ui/button";
import { SelectionCard } from "@/components/audit/selection-card";
import { INDUSTRIES } from "@/lib/audit/constants";
import { formatCurrency, getIndustryDefaults } from "@/lib/audit/calculations";
import {
  buildEstimateSummary,
  computeRoiEstimate,
} from "@/lib/roi-calculator/calculations";
import { cn } from "@/lib/utils";

const inputClasses = cn(
  "w-full rounded-xl border border-border bg-background px-4 py-4 text-lg text-foreground",
  "placeholder:text-muted-foreground",
  "transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
);

function formatMoney(value: number) {
  return formatCurrency(Math.round(value));
}

export function RoiCalculatorWidget() {
  const [industry, setIndustry] = useState(INDUSTRIES[0]?.id ?? "dental");
  const [monthlyCalls, setMonthlyCalls] = useState(200);
  const [missedRate, setMissedRate] = useState(15);
  const [avgCustomerValue, setAvgCustomerValue] = useState(
    INDUSTRIES[0]?.avgCustomerValue ?? 400
  );

  const handleIndustryChange = useCallback((industryId: string) => {
    const defaults = getIndustryDefaults(industryId);
    setIndustry(industryId);
    setAvgCustomerValue(defaults.avgCustomerValue);
  }, []);

  const industryLabel =
    INDUSTRIES.find((item) => item.id === industry)?.label ?? "your industry";

  const results = useMemo(
    () =>
      computeRoiEstimate({
        industry,
        monthlyCalls,
        missedRate,
        avgCustomerValue,
      }),
    [industry, monthlyCalls, missedRate, avgCustomerValue]
  );

  const summary = useMemo(
    () => buildEstimateSummary(results, industryLabel),
    [results, industryLabel]
  );

  return (
    <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="space-y-6">
        <div>
          <p className="mb-3 text-sm font-medium text-foreground">Industry</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {INDUSTRIES.map((item) => (
              <SelectionCard
                key={item.id}
                label={item.label}
                icon={item.icon}
                selected={industry === item.id}
                onClick={() => handleIndustryChange(item.id)}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Monthly Incoming Calls
          </label>
          <p className="mb-4 text-center font-display text-3xl font-semibold text-foreground">
            {monthlyCalls.toLocaleString()}
          </p>
          <div className="relative py-1">
            <div className="pointer-events-none absolute top-1/2 left-0 h-1.5 w-full -translate-y-1/2 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-accent/40 transition-all duration-300 ease-out"
                style={{
                  width: `${((monthlyCalls - 25) / 975) * 100}%`,
                }}
              />
            </div>
            <input
              type="range"
              min={25}
              max={1000}
              step={1}
              value={monthlyCalls}
              onChange={(event) => setMonthlyCalls(Number(event.target.value))}
              className="calculator-slider relative w-full"
              aria-label="Monthly incoming calls"
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>25</span>
            <span>1,000</span>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Estimated Missed Call Rate (%)
          </label>
          <p className="mb-4 text-center font-display text-3xl font-semibold text-foreground">
            {missedRate}%
          </p>
          <input
            type="range"
            min={1}
            max={50}
            step={1}
            value={missedRate}
            onChange={(event) => setMissedRate(Number(event.target.value))}
            className="calculator-slider w-full"
            aria-label="Estimated missed call rate"
          />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>1%</span>
            <span>50%</span>
          </div>
        </div>

        <div>
          <label
            htmlFor="avg-customer-value"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Average Customer Value ($)
          </label>
          <input
            id="avg-customer-value"
            type="number"
            min={50}
            max={10000}
            step={50}
            value={avgCustomerValue}
            onChange={(event) =>
              setAvgCustomerValue(Number(event.target.value) || 0)
            }
            className={inputClasses}
          />
        </div>
      </div>

      <div className="relative">
        <div className="sticky top-28 rounded-3xl border border-border bg-surface/80 p-6 shadow-[0_0_80px_rgba(99,102,241,0.1)] backdrop-blur-xl md:p-8">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/5 via-transparent to-transparent" />

          <div className="relative">
            <p className="mb-4 text-sm font-medium tracking-widest text-muted-foreground uppercase">
              Your Estimate
            </p>

            <div className="space-y-4">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                  Estimated Annual Revenue Opportunity
                </p>
                <p className="mt-2 font-display text-4xl font-semibold text-emerald-400">
                  <CountUp
                    end={Math.round(results.annualOpportunity)}
                    duration={0.9}
                    preserveValue
                    formattingFn={formatMoney}
                  />
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Estimated Monthly Opportunity
                </p>
                <p className="mt-2 font-display text-3xl font-semibold text-foreground">
                  <CountUp
                    end={Math.round(results.monthlyOpportunity)}
                    duration={0.9}
                    preserveValue
                    formattingFn={formatMoney}
                  />
                </p>
              </div>

              <p className="text-sm leading-relaxed text-muted">{summary}</p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/time-recovery-audit" size="lg" className="flex-1">
                Get My Free Time Recovery Audit™
              </Button>
              <Button
                href="/book"
                variant="secondary"
                size="lg"
                className="flex-1"
              >
                Book Time Recovery Audit
              </Button>
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Estimates are based on your inputs and industry benchmarks. Actual
              results will vary.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
