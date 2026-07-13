import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { VoiceHero } from "@/components/sections/voice/voice-hero";
import { VoiceProblem } from "@/components/sections/voice/voice-problem";
import { VoiceCalculator } from "@/components/sections/voice/voice-calculator";
import { VoiceWorkflow } from "@/components/sections/voice/voice-workflow";
import { VoiceDemo } from "@/components/sections/voice/voice-demo";
import { VoiceBenefits } from "@/components/sections/voice/voice-benefits";
import { VoiceIndustries } from "@/components/sections/voice/voice-industries";
import { VoiceFAQ } from "@/components/sections/voice/voice-faq";
import { VoiceCTA } from "@/components/sections/voice/voice-cta";

const description =
  "Seriqon Voice™ instantly engages missed callers, qualifies leads, and notifies your team—so every conversation continues, even when you can't answer.";

export const metadata: Metadata = {
  title: "Seriqon Voice™ — Missed Call Rescue",
  description,
  alternates: {
    canonical: "/voice",
  },
  openGraph: {
    title: "Seriqon Voice™ — Never Miss Another Opportunity",
    description,
    url: `${siteConfig.url}/voice`,
  },
  twitter: {
    title: "Seriqon Voice™ — Never Miss Another Opportunity",
    description,
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Seriqon Voice™",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free Time Recovery Audit",
  },
  provider: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

export default function VoicePage() {
  return (
    <>
      <VoiceHero />
      <VoiceCalculator />
      <VoiceDemo />
      <VoiceProblem />
      <VoiceWorkflow />
      <VoiceBenefits />
      <VoiceIndustries />
      <VoiceFAQ />
      <VoiceCTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
    </>
  );
}
