import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { AuditWizard } from "@/components/audit/audit-wizard";

const description =
  "Take Seriqon's free Time Recovery Audit™ to discover how much revenue missed calls may be costing your business—and how much Seriqon Voice™ could recover.";

export const metadata: Metadata = {
  title: "Time Recovery Audit™",
  description,
  alternates: {
    canonical: "/time-recovery-audit",
  },
  openGraph: {
    title: "Time Recovery Audit™ | Seriqon",
    description,
    url: `${siteConfig.url}/time-recovery-audit`,
  },
};

export default function TimeRecoveryAuditPage() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-20 md:pt-32 md:pb-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-orb absolute -top-1/4 left-1/2 h-[600px] w-[800px] -translate-x-1/2 animate-pulse-glow" />
        <div className="grid-pattern absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-12 md:mb-16">
          <div className="mb-6 flex items-start justify-between gap-4">
            <p className="text-sm font-medium tracking-widest text-accent uppercase">
              Free Personalized Audit
            </p>
            <p className="shrink-0 text-sm text-muted-foreground">~2 minutes</p>
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Time Recovery Audit™
            </h1>
            <p className="mt-4 text-lg text-muted md:text-xl">
              Discover exactly how much revenue missed calls may be costing your
              business—and how much Seriqon Voice™ could recover.
            </p>
          </div>
        </div>

        <AuditWizard />
      </div>
    </section>
  );
}
