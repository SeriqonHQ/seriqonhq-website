import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { VoicePageClient } from "@/components/sections/voice/voice-page-client";

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
      <VoicePageClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
    </>
  );
}
