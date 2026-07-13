import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { SecurityHero } from "@/components/sections/security/security-hero";
import { SecurityFeatures } from "@/components/sections/security/security-features";
import { SecurityFAQ } from "@/components/sections/security/security-faq";
import { SecurityCTA } from "@/components/sections/security/security-cta";

const description =
  "Learn how Seriqon Voice™ protects customer conversations with encryption, access controls, privacy-first design, and reliable infrastructure.";

export const metadata: Metadata = {
  title: "Security & Privacy — Seriqon Voice™",
  description,
  alternates: {
    canonical: "/security",
  },
  openGraph: {
    title: "Security & Privacy | Seriqon Voice™",
    description,
    url: `${siteConfig.url}/security`,
  },
};

export default function SecurityPage() {
  return (
    <>
      <SecurityHero />
      <SecurityFeatures />
      <SecurityFAQ />
      <SecurityCTA />
    </>
  );
}
