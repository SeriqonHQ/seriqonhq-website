import type { Metadata } from "next";

export const siteConfig = {
  name: "Seriqon",
  tagline: "More time for what matters.",
  description:
    "Seriqon helps healthcare clinics and small businesses eliminate repetitive work through intelligent automation. We'll handle the busywork. You handle the people.",
  url: "https://seriqonhq.com",
  email: "hello@seriqonhq.com",
  philosophy: "We'll handle the busywork. You handle the people.",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Intelligent Automation for Healthcare & Small Business`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "automation",
    "healthcare automation",
    "AI email assistant",
    "missed call rescue",
    "workflow automation",
    "AI knowledge base",
    "small business automation",
    "Seriqon",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    emails: [siteConfig.email],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
