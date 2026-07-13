import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { RoiCalculatorWidget } from "@/components/roi-calculator/roi-calculator-widget";

const description =
  "Estimate how much revenue missed calls may be costing your business in under 30 seconds with Seriqon's free ROI Calculator.";

export const metadata: Metadata = {
  title: "ROI Calculator",
  description,
  alternates: {
    canonical: "/roi-calculator",
  },
  openGraph: {
    title: "ROI Calculator | Seriqon",
    description,
    url: `${siteConfig.url}/roi-calculator`,
  },
};

export default function RoiCalculatorPage() {
  return (
    <section className="relative min-h-screen pt-24 pb-20 md:pt-32 md:pb-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-orb absolute -top-1/4 left-1/2 h-[600px] w-[800px] -translate-x-1/2 animate-pulse-glow" />
        <div className="grid-pattern absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-12 md:mb-16">
          <div className="mb-6 flex items-start justify-between gap-4">
            <p className="text-sm font-medium tracking-widest text-accent uppercase">
              Quick Estimate
            </p>
            <p className="shrink-0 text-sm text-muted-foreground">~30 seconds</p>
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              ROI Calculator
            </h1>
            <p className="mt-4 text-lg text-muted md:text-xl">
              Get a fast estimate of how much revenue missed calls may be
              costing your business—no signup required.
            </p>
          </div>
        </div>

        <RoiCalculatorWidget />
      </div>
    </section>
  );
}
