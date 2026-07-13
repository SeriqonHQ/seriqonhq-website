"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AuditProgress } from "@/components/audit/audit-progress";
import { AuditStepShell } from "@/components/audit/audit-step-shell";
import { SelectionCard } from "@/components/audit/selection-card";
import { AuditReportView } from "@/components/audit/audit-report";
import { AuditAnalysisLoading } from "@/components/audit/audit-analysis-loading";
import { generateAuditReport } from "@/lib/audit/calculations";
import {
  CALL_HANDLING,
  FRUSTRATIONS,
  INDUSTRIES,
  MISSED_PERIODS,
} from "@/lib/audit/constants";
import {
  clearAuditProgress,
  loadAuditProgress,
  saveAuditProgress,
} from "@/lib/audit/storage";
import {
  DEFAULT_AUDIT_FORM,
  TOTAL_AUDIT_STEPS,
  type AuditFormData,
  type AuditReport,
} from "@/lib/audit/types";
import { cn } from "@/lib/utils";
import { useFloatingCta } from "@/components/layout/floating-cta-context";
import { trackAuditCompleted } from "@/lib/analytics/events";

const inputClasses = cn(
  "w-full rounded-xl border border-border bg-background px-4 py-4 text-lg text-foreground",
  "placeholder:text-muted-foreground",
  "transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
);

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
};

function toggleArrayValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export function AuditWizard() {
  const { setAuditPhase } = useFloatingCta();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [phase, setPhase] = useState<"form" | "analyzing" | "report">("form");
  const [report, setReport] = useState<AuditReport | null>(null);
  const [preparedPdf, setPreparedPdf] = useState<Blob | null>(null);
  const auditCompletedTrackedRef = useRef(false);

  const { register, watch, setValue, handleSubmit, formState } =
    useForm<AuditFormData>({
      defaultValues: DEFAULT_AUDIT_FORM,
      mode: "onChange",
    });

  const values = watch();

  useEffect(() => {
    setAuditPhase(phase);
    return () => setAuditPhase(null);
  }, [phase, setAuditPhase]);

  useEffect(() => {
    if (phase === "report" && !auditCompletedTrackedRef.current) {
      auditCompletedTrackedRef.current = true;
      trackAuditCompleted();
    }
  }, [phase]);

  useEffect(() => {
    const saved = loadAuditProgress();
    if (saved) {
      Object.entries(saved.data).forEach(([key, value]) => {
        setValue(key as keyof AuditFormData, value as never);
      });
      setStep(saved.step);
    }
  }, [setValue]);

  useEffect(() => {
    if (phase === "form") {
      saveAuditProgress(step, values);
    }
  }, [step, values, phase]);

  const canProceed = useMemo(() => {
    switch (step) {
      case 1:
        return values.businessName.trim().length > 0;
      case 2:
        return values.industry.length > 0;
      case 3:
        return values.monthlyCalls >= 25;
      case 4:
        return values.missedPeriods.length > 0;
      case 5:
        return values.callHandling.length > 0;
      case 6:
        return values.frustrations.length > 0;
      case 7:
        return (
          values.firstName.trim().length > 0 &&
          values.email.trim().length > 0 &&
          values.consent
        );
      default:
        return false;
    }
  }, [step, values]);

  const goNext = useCallback(() => {
    if (!canProceed || step >= TOTAL_AUDIT_STEPS) return;
    setDirection(1);
    setStep((prev) => prev + 1);
  }, [canProceed, step]);

  const goBack = useCallback(() => {
    if (step <= 1) return;
    setDirection(-1);
    setStep((prev) => prev - 1);
  }, [step]);

  const handleAnalysisComplete = useCallback((pdfBlob: Blob | null) => {
    setPreparedPdf(pdfBlob);
    setPhase("report");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const generated = generateAuditReport(data);

    setReport(generated);
    setPreparedPdf(null);
    setPhase("analyzing");
    clearAuditProgress();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  if (phase === "report" && report) {
    return (
      <motion.div
        key="report"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <AuditReportView
          data={values}
          report={report}
          preparedPdf={preparedPdf}
        />
      </motion.div>
    );
  }

  if (phase === "analyzing" && report) {
    return (
      <AuditAnalysisLoading
        data={values}
        report={report}
        onComplete={handleAnalysisComplete}
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-8 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Step {step} of {TOTAL_AUDIT_STEPS}
        </p>
        <AuditProgress currentStep={step} totalSteps={TOTAL_AUDIT_STEPS} />
      </div>

      <form onSubmit={onSubmit}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {step === 1 && (
              <AuditStepShell
                title="What's your business called?"
                helper="This helps personalize your audit."
              >
                <input
                  {...register("businessName", { required: true })}
                  placeholder="Acme Dental"
                  className={inputClasses}
                  autoFocus
                  aria-required="true"
                />
              </AuditStepShell>
            )}

            {step === 2 && (
              <AuditStepShell title="What industry are you in?">
                <div className="grid gap-3 sm:grid-cols-2">
                  {INDUSTRIES.map((industry) => (
                    <SelectionCard
                      key={industry.id}
                      label={industry.label}
                      icon={industry.icon}
                      selected={values.industry === industry.id}
                      onClick={() => setValue("industry", industry.id)}
                    />
                  ))}
                </div>
              </AuditStepShell>
            )}

            {step === 3 && (
              <AuditStepShell
                title="Approximately how many calls do you receive each month?"
                helper="A rough estimate is perfectly fine."
              >
                <p className="mb-6 text-center font-display text-4xl font-semibold text-foreground">
                  {values.monthlyCalls.toLocaleString()}
                </p>
                <div className="relative py-1">
                  <div className="pointer-events-none absolute top-1/2 left-0 h-1.5 w-full -translate-y-1/2 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-accent/40 transition-all duration-300 ease-out"
                      style={{
                        width: `${((values.monthlyCalls - 25) / 975) * 100}%`,
                      }}
                    />
                  </div>
                  <input
                    type="range"
                    min={25}
                    max={1000}
                    step={1}
                    value={values.monthlyCalls}
                    onChange={(e) =>
                      setValue("monthlyCalls", Number(e.target.value))
                    }
                    className="calculator-slider relative w-full"
                    aria-label="Monthly incoming calls"
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>25</span>
                  <span>1,000</span>
                </div>
              </AuditStepShell>
            )}

            {step === 4 && (
              <AuditStepShell title="When do you usually miss calls?">
                <div className="grid gap-3 sm:grid-cols-2">
                  {MISSED_PERIODS.map((period) => (
                    <SelectionCard
                      key={period}
                      label={period}
                      selected={values.missedPeriods.includes(period)}
                      onClick={() =>
                        setValue(
                          "missedPeriods",
                          toggleArrayValue(values.missedPeriods, period)
                        )
                      }
                    />
                  ))}
                </div>
              </AuditStepShell>
            )}

            {step === 5 && (
              <AuditStepShell title="How are calls currently handled?">
                <div className="grid gap-3 sm:grid-cols-2">
                  {CALL_HANDLING.map((option) => (
                    <SelectionCard
                      key={option}
                      label={option}
                      selected={values.callHandling === option}
                      onClick={() => setValue("callHandling", option)}
                    />
                  ))}
                </div>
              </AuditStepShell>
            )}

            {step === 6 && (
              <AuditStepShell title="What's your biggest frustration?">
                <div className="grid gap-3 sm:grid-cols-2">
                  {FRUSTRATIONS.map((item) => (
                    <SelectionCard
                      key={item}
                      label={item}
                      selected={values.frustrations.includes(item)}
                      onClick={() =>
                        setValue(
                          "frustrations",
                          toggleArrayValue(values.frustrations, item)
                        )
                      }
                    />
                  ))}
                </div>
              </AuditStepShell>
            )}

            {step === 7 && (
              <AuditStepShell title="Where should we send your audit?">
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      First Name
                    </label>
                    <input
                      {...register("firstName", { required: true })}
                      className={inputClasses}
                      autoComplete="given-name"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Email
                    </label>
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      className={inputClasses}
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Phone Number
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      className={inputClasses}
                      autoComplete="tel"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Optional Notes
                    </label>
                    <textarea
                      {...register("notes")}
                      rows={3}
                      className={inputClasses}
                    />
                  </div>
                  <label className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
                    <input
                      type="checkbox"
                      {...register("consent", { required: true })}
                      className="mt-1 h-4 w-4 rounded border-border accent-accent"
                    />
                    <span className="text-sm text-muted">
                      I agree to be contacted regarding my audit.
                    </span>
                  </label>
                </div>
              </AuditStepShell>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={goBack}
            disabled={step === 1}
          >
            Back
          </Button>

          {step < TOTAL_AUDIT_STEPS ? (
            <Button type="button" onClick={goNext} disabled={!canProceed}>
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={!canProceed || formState.isSubmitting}>
              Generate My Audit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
