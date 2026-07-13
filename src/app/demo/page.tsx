import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { VoiceFlagshipDemo } from "@/components/sections/demo/voice-flagship-demo";

const description =
  "Experience Seriqon Voice™ in action—watch a live simulated call become a qualified appointment with real-time AI insights and executive-ready summaries.";

export const metadata: Metadata = {
  title: "Seriqon Voice™ Interactive Demo",
  description,
  alternates: {
    canonical: "/demo",
  },
  openGraph: {
    title: "Seriqon Voice™ Interactive Demo | Seriqon",
    description,
    url: `${siteConfig.url}/demo`,
  },
};

export default function DemoPage() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-20 md:pt-32 md:pb-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-orb absolute -top-1/4 left-1/2 h-[600px] w-[800px] -translate-x-1/2 animate-pulse-glow" />
        <div className="grid-pattern absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center md:mb-14">
          <p className="text-sm font-medium tracking-widest text-accent uppercase">
            Interactive Demo
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Seriqon Voice™ Live Demo
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Watch a missed call turn into a booked appointment—with AI insights
            updating in real time.
          </p>
        </div>

        <VoiceFlagshipDemo />
      </div>
    </section>
  );
}
