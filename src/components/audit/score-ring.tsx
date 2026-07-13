"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { formatCurrency } from "@/lib/audit/calculations";

interface ScoreRingProps {
  annualRecovery: number;
}

function formatMonthlyRecovery(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function ScoreRing({ annualRecovery }: ScoreRingProps) {
  const monthlyRecovery = annualRecovery / 12;
  const recoveryThousands = Math.round(annualRecovery / 1000);

  return (
    <div className="w-full text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto flex min-h-[330px] max-w-3xl flex-col items-center justify-center overflow-hidden rounded-[36px] border border-indigo-500/40 bg-gradient-to-br from-[#171726] to-[#09090f] p-12"
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,.12),transparent_70%)]"
        />

        <p className="relative z-10 mb-8 text-sm font-medium uppercase tracking-[0.35em] text-indigo-400">
          Estimated Annual Recoverable Revenue
        </p>

        <h2 className="relative z-10 font-display text-[clamp(72px,9vw,120px)] font-extrabold leading-[0.9] tracking-tight text-white">
          <CountUp
            end={recoveryThousands}
            duration={1.5}
            preserveValue
            prefix="$"
            suffix="K"
          />
        </h2>
      </motion.div>

      <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-6 text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-zinc-500">
          Potential Monthly Recovery
        </p>

        <p className="text-4xl font-bold text-indigo-400">
          {formatMonthlyRecovery(monthlyRecovery)}
          <span className="text-lg font-medium text-zinc-500"> / month</span>
        </p>
      </div>

      <h2 className="mt-16 text-center font-display text-5xl font-bold tracking-tight text-white md:text-6xl">
        Estimated Annual Revenue Opportunity
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-center text-xl leading-9 text-zinc-400">
        Based on your assessment,{" "}
        <span className="font-semibold text-white">Seriqon Voice™</span> could
        help recover approximately{" "}
        <span className="font-bold text-white">
          {formatCurrency(annualRecovery)}
        </span>{" "}
        in annual revenue by automatically engaging missed callers before they
        contact a competitor.
      </p>
    </div>
  );
}
