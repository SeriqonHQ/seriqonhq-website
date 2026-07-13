import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { DemoPageClient } from "@/components/sections/demo/demo-page-client";

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
  return <DemoPageClient />;
}
