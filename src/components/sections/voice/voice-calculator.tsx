"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CountUp from "react-countup";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CalculatorInputs = {
  monthlyCalls: number;
  missedRate: number;
  avgValue: number;
  conversionRate: number;
};

type CalculatorResults = {
  missedCalls: number;
  qualifiedLost: number;
  monthlyAtRisk: number;
  annualAtRisk: number;
  monthlyRecovery: number;
  annualRecovery: number;
};

type RiskTier = "gray" | "amber" | "red";

const DEFAULTS: CalculatorInputs = {
  monthlyCalls: 200,
  missedRate: 15,
  avgValue: 400,
  conversionRate: 60,
};

const ROI_BADGES = [
  "No signup required",
  "30-second estimate",
  "Uses your real numbers",
] as const;

type InputConfig = {
  key: keyof CalculatorInputs;
  label: string;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
};

const inputConfigs: InputConfig[] = [
  {
    key: "monthlyCalls",
    label: "Monthly Incoming Calls",
    min: 25,
    max: 1000,
    step: 1,
  },
  {
    key: "missedRate",
    label: "Estimated Missed Call Rate (%)",
    min: 1,
    max: 50,
    step: 1,
    suffix: "%",
  },
  {
    key: "avgValue",
    label: "Average Customer Value ($)",
    min: 50,
    max: 5000,
    step: 50,
    prefix: "$",
  },
  {
    key: "conversionRate",
    label: "Qualified Call Conversion Rate (%)",
    min: 5,
    max: 100,
    step: 1,
    suffix: "%",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getRiskTier(annualAtRisk: number): RiskTier {
  if (annualAtRisk < 50_000) return "gray";
  if (annualAtRisk <= 250_000) return "amber";
  return "red";
}

function formatMoneyDisplay(value: number, compact = true): string {
  const rounded = Math.round(value);
  if (compact && rounded >= 1_000_000) {
    return `$${(rounded / 1_000_000).toFixed(1)}M`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(rounded);
}

function easeOutCubic(t: number, b: number, c: number, d: number): number {
  const progress = t / d - 1;
  return c * (progress * progress * progress + 1) + b;
}

function usePulseOnChange(value: number) {
  const [pulse, setPulse] = useState(false);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current !== value) {
      prev.current = value;
      setPulse(true);
      const timer = window.setTimeout(() => setPulse(false), 250);
      return () => window.clearTimeout(timer);
    }
  }, [value]);

  return pulse;
}

function AnimatedMoney({
  value,
  className,
  compact = true,
}: {
  value: number;
  className?: string;
  compact?: boolean;
}) {
  const pulse = usePulseOnChange(value);
  const displayEnd = Math.round(value);

  return (
    <span
      className={cn(
        "inline-block tabular-nums transition-transform duration-[250ms]",
        pulse && "scale-[1.02]",
        className
      )}
    >
      <CountUp
        end={displayEnd}
        duration={0.9}
        preserveValue
        useEasing
        easingFn={easeOutCubic}
        formattingFn={(n) => formatMoneyDisplay(n, compact)}
      />
    </span>
  );
}

function AnimatedCount({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const pulse = usePulseOnChange(value);
  const displayEnd = Math.round(value);

  return (
    <span
      className={cn(
        "inline-block tabular-nums transition-transform duration-[250ms]",
        pulse && "scale-[1.02]",
        className
      )}
    >
      <CountUp
        end={displayEnd}
        duration={0.9}
        preserveValue
        useEasing
        easingFn={easeOutCubic}
        separator=","
        decimals={0}
      />
    </span>
  );
}

const CalculatorInput = memo(function CalculatorInput({
  config,
  value,
  onChange,
}: {
  config: InputConfig;
  value: number;
  onChange: (value: number) => void;
}) {
  const [draft, setDraft] = useState(String(value));
  const fillPercent =
    ((value - config.min) / (config.max - config.min)) * 100;

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  const handleInputChange = (raw: string) => {
    setDraft(raw);
    const parsed = parseFloat(raw.replace(/[^0-9.]/g, ""));
    if (!Number.isNaN(parsed)) {
      onChange(clamp(parsed, config.min, config.max));
    }
  };

  const handleBlur = () => {
    const parsed = parseFloat(draft.replace(/[^0-9.]/g, ""));
    const next = Number.isNaN(parsed)
      ? config.min
      : clamp(parsed, config.min, config.max);
    onChange(next);
    setDraft(String(next));
  };

  return (
    <div className="group rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:border-border-hover hover:bg-surface-hover md:p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <label className="text-sm font-medium text-foreground">
          {config.label}
        </label>
        <div className="relative">
          {config.prefix && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">
              {config.prefix}
            </span>
          )}
          <input
            type="text"
            inputMode="numeric"
            value={draft}
            onChange={(e) => handleInputChange(e.target.value)}
            onBlur={handleBlur}
            className={cn(
              "w-24 rounded-xl border border-border bg-background py-2 text-right text-sm font-medium text-foreground transition-all duration-300 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent",
              config.prefix ? "pl-7 pr-3" : "px-3",
              config.suffix && !config.prefix && "pr-7"
            )}
            aria-label={config.label}
          />
          {config.suffix && (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted">
              {config.suffix}
            </span>
          )}
        </div>
      </div>

      <div className="relative py-1">
        <div className="pointer-events-none absolute top-1/2 left-0 h-1.5 w-full -translate-y-1/2 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-accent/40 transition-all duration-300 ease-out"
            style={{ width: `${fillPercent}%` }}
          />
        </div>
        <input
          type="range"
          min={config.min}
          max={config.max}
          step={config.step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="calculator-slider relative w-full transition-all duration-300"
          aria-label={`${config.label} slider`}
        />
      </div>

      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>
          {config.prefix}
          {config.min.toLocaleString()}
          {config.suffix}
        </span>
        <span>
          {config.prefix}
          {config.max.toLocaleString()}
          {config.suffix}
        </span>
      </div>
    </div>
  );
});

const NeutralResultCard = memo(function NeutralResultCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const pulse = usePulseOnChange(value);

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-background/40 p-4 transition-all duration-[250ms] hover:border-border-hover",
        pulse && "scale-[1.02]"
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-foreground/80 md:text-3xl">
        <AnimatedCount value={value} />
      </p>
    </div>
  );
});

const MonthlyRiskCard = memo(function MonthlyRiskCard({
  value,
}: {
  value: number;
}) {
  const pulse = usePulseOnChange(value);

  return (
    <div
      className={cn(
        "rounded-xl border border-border/60 bg-background/30 p-4 transition-all duration-[250ms] hover:border-border-hover",
        pulse && "scale-[1.02]"
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Monthly Revenue At Risk
      </p>
      <p className="mt-1 font-display text-xl font-semibold tracking-tight text-muted md:text-2xl">
        <AnimatedMoney value={value} />
      </p>
    </div>
  );
});

const AnnualRiskHeroCard = memo(function AnnualRiskHeroCard({
  value,
  tier,
}: {
  value: number;
  tier: RiskTier;
}) {
  const pulse = usePulseOnChange(value);

  const tierStyles = {
    gray: {
      border: "border-border/60",
      bg: "bg-background/30",
      text: "text-foreground/90",
    },
    amber: {
      border: "border-amber-500/40",
      bg: "bg-amber-500/10",
      text: "text-amber-400",
    },
    red: {
      border: "border-red-500/40",
      bg: "bg-red-500/10",
      text: "text-red-400",
    },
  }[tier];

  return (
    <div
      className={cn(
        "rounded-xl border p-6 transition-all duration-[250ms] md:p-8",
        tierStyles.border,
        tierStyles.bg,
        pulse && "scale-[1.02]"
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Annual Revenue At Risk
      </p>
      <p
        className={cn(
          "mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl",
          tierStyles.text
        )}
      >
        <AnimatedMoney value={value} />
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        Estimated revenue that may be slipping away each year.
      </p>
    </div>
  );
});

const RecoveryCard = memo(function RecoveryCard({
  label,
  value,
  featured = false,
}: {
  label: string;
  value: number;
  featured?: boolean;
}) {
  const pulse = usePulseOnChange(value);

  return (
    <div
      className={cn(
        "rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 shadow-[0_0_40px_rgba(16,185,129,0.18)] transition-all duration-[250ms] ring-1 ring-emerald-500/20",
        featured && "md:p-5",
        pulse && "scale-[1.02]"
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 font-display font-semibold tracking-tight text-emerald-400",
          featured ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"
        )}
      >
        <AnimatedMoney value={value} />
      </p>
    </div>
  );
});

function computeResults(inputs: CalculatorInputs): CalculatorResults {
  const missedCalls = inputs.monthlyCalls * (inputs.missedRate / 100);
  const qualifiedLost = missedCalls * (inputs.conversionRate / 100);
  const monthlyAtRisk = qualifiedLost * inputs.avgValue;
  const annualAtRisk = monthlyAtRisk * 12;
  const monthlyRecovery = monthlyAtRisk * 0.25;
  const annualRecovery = annualAtRisk * 0.25;

  return {
    missedCalls,
    qualifiedLost,
    monthlyAtRisk,
    annualAtRisk,
    monthlyRecovery,
    annualRecovery,
  };
}

export function VoiceCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULTS);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const updateInput = useCallback(
    (key: keyof CalculatorInputs, value: number) => {
      setInputs((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const results = useMemo(() => computeResults(inputs), [inputs]);
  const riskTier = useMemo(
    () => getRiskTier(results.annualAtRisk),
    [results.annualAtRisk]
  );

  return (
    <section
      ref={sectionRef}
      id="calculator"
      className="relative py-20 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-orb absolute top-1/2 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-50" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <p className="mb-4 text-sm font-medium tracking-widest text-accent uppercase">
            Missed Call Impact Calculator™
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            How much revenue is slipping through the cracks?
          </h2>
          <p className="mt-4 text-lg text-muted md:text-xl">
            Move the sliders below to estimate how much revenue missed calls may
            be costing your business every month and every year.
          </p>
        </div>

        <div
          className={cn(
            "grid items-start gap-8 transition-all duration-700 lg:grid-cols-2 lg:gap-12",
            isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"
          )}
        >
          <div className="space-y-4">
            {inputConfigs.map((config) => (
              <CalculatorInput
                key={config.key}
                config={config}
                value={inputs[config.key]}
                onChange={(value) => updateInput(config.key, value)}
              />
            ))}
          </div>

          <div className="relative">
            <div className="sticky top-28 rounded-3xl border border-border bg-surface/80 p-6 shadow-[0_0_80px_rgba(99,102,241,0.1)] backdrop-blur-xl md:p-8">
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/5 via-transparent to-transparent" />

              <div className="relative">
                <p className="mb-4 text-sm font-medium tracking-widest text-muted-foreground uppercase">
                  Your Results
                </p>

                <div className="mb-5 flex flex-wrap gap-2">
                  {ROI_BADGES.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-muted"
                    >
                      <span className="text-emerald-400" aria-hidden="true">
                        ✓
                      </span>
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <NeutralResultCard
                      label="Estimated Missed Calls"
                      value={results.missedCalls}
                    />
                    <NeutralResultCard
                      label="Qualified Customers Lost"
                      value={results.qualifiedLost}
                    />
                  </div>

                  <div className="border-t border-border/60 pt-3">
                    <AnnualRiskHeroCard
                      value={results.annualAtRisk}
                      tier={riskTier}
                    />
                  </div>

                  <MonthlyRiskCard value={results.monthlyAtRisk} />

                  <div className="border-t border-border/60 pt-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <RecoveryCard
                        label="Potential Annual Revenue Recovery"
                        value={results.annualRecovery}
                        featured
                      />
                      <RecoveryCard
                        label="Potential Monthly Revenue Recovery"
                        value={results.monthlyRecovery}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent p-5 md:p-6">
                  <p className="mb-2 text-xs font-medium tracking-widest text-accent uppercase">
                    What This Means
                  </p>
                  <p className="text-sm leading-relaxed text-muted">
                    Based on your estimates, recovering just{" "}
                    <span className="font-medium text-foreground">25%</span> of
                    missed opportunities could add approximately{" "}
                    <AnimatedMoney
                      value={results.annualRecovery}
                      className="font-display text-lg font-semibold text-accent"
                    />{" "}
                    in annual revenue without increasing your marketing budget or
                    hiring additional staff.
                  </p>
                </div>

                <p className="mt-4 text-center text-xs opacity-60">
                  Estimates are based on your inputs and industry benchmarks.
                  Actual performance will vary.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "mx-auto mt-16 max-w-2xl transition-all duration-700 md:mt-20",
            isVisible ? "animate-fade-in-up stagger-2 opacity-100" : "opacity-0"
          )}
        >
          <div className="mb-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <p className="shrink-0 text-sm font-medium text-accent">
              Ready to recover those opportunities?
            </p>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="text-center">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Let&apos;s stop letting valuable conversations slip away.
            </h3>
            <p className="mt-4 text-lg text-muted">
              Schedule a personalized Time Recovery Audit and discover how Seriqon
              Voice™ can help your business respond faster, recover more
              opportunities, and free your team to focus on what matters most.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/time-recovery-audit" size="lg">
                Take Time Recovery Audit
              </Button>
              <Button href="/demo" variant="secondary" size="lg">
                Try Live Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
