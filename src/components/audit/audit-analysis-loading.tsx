"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/logo";
import { saveAuditLead } from "@/lib/audit/save-lead";
import { prepareAuditPdf } from "@/lib/audit/generate-pdf";
import { ANALYSIS_STEPS } from "@/lib/audit/types";
import type { AuditFormData, AuditReport } from "@/lib/audit/types";

const STEP_INTERVAL_MS = 500;
const SEQUENCE_DURATION_MS = ANALYSIS_STEPS.length * STEP_INTERVAL_MS;
const EXIT_DURATION_MS = 500;

interface AuditAnalysisLoadingProps {
  data: AuditFormData;
  report: AuditReport;
  onComplete: (preparedPdf: Blob | null) => void;
}

export function AuditAnalysisLoading({
  data,
  report,
  onComplete,
}: AuditAnalysisLoadingProps) {
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [progress, setProgress] = useState(0);
  const [tasksComplete, setTasksComplete] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const preparedPdfRef = useRef<Blob | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let cancelled = false;

    const runBackgroundTasks = async () => {
      try {
        const [, pdfBlob] = await Promise.all([
          saveAuditLead(data, report),
          Promise.resolve().then(() => prepareAuditPdf(data, report)),
        ]);
        preparedPdfRef.current = pdfBlob;
      } catch (error) {
        console.warn("[audit] Background preparation failed:", error);
      }

      if (!cancelled) {
        setTasksComplete(true);
      }
    };

    void runBackgroundTasks();

    return () => {
      cancelled = true;
    };
  }, [data, report]);

  useEffect(() => {
    const timers: number[] = [];

    ANALYSIS_STEPS.forEach((_, index) => {
      timers.push(
        window.setTimeout(() => {
          setVisibleSteps(index + 1);
        }, STEP_INTERVAL_MS * (index + 1))
      );
    });

    timers.push(
      window.setTimeout(() => {
        setAnimationComplete(true);
      }, SEQUENCE_DURATION_MS)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      setProgress(Math.min(100, (elapsed / SEQUENCE_DURATION_MS) * 100));

      if (elapsed < SEQUENCE_DURATION_MS) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!animationComplete || !tasksComplete || isExiting) {
      return;
    }

    setIsExiting(true);

    const timer = window.setTimeout(() => {
      onCompleteRef.current(preparedPdfRef.current);
    }, EXIT_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [animationComplete, tasksComplete, isExiting]);

  const showFinalizing = animationComplete && !tasksComplete;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: isExiting ? EXIT_DURATION_MS / 1000 : 0.45 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-background">
        <div className="glow-orb absolute -top-1/4 left-1/2 h-[600px] w-[800px] -translate-x-1/2 animate-pulse-glow" />
        <div className="grid-pattern absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/70 to-background" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10"
        >
          <Logo className="text-4xl md:text-5xl" size="lg" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="text-center font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
        >
          Analyzing Your Business...
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.45 }}
          className="mt-3 text-center text-base text-muted md:text-lg"
        >
          Building your personalized Time Recovery Audit™
        </motion.p>

        <div className="mt-12 w-full space-y-3">
          <AnimatePresence>
            {ANALYSIS_STEPS.map((step, index) =>
              index < visibleSteps ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-sm text-emerald-400">
                    ✓
                  </span>
                  <span className="text-sm text-muted md:text-base">{step}</span>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>

        <div className="mt-10 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent/70 via-accent to-accent/70"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>

        <AnimatePresence>
          {showFinalizing ? (
            <motion.p
              key="finalizing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-8 text-sm font-medium text-accent"
            >
              Finalizing your report...
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
