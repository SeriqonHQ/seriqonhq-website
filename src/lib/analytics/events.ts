import { trackEvent } from "@/lib/analytics/gtag";

export function trackHomepageViewed() {
  trackEvent("Homepage Viewed");
}

export function trackAuditStarted() {
  trackEvent("Audit Started");
}

export function trackAuditCompleted() {
  trackEvent("Audit Completed");
}

export function trackBookCtaClicked(pagePath: string) {
  trackEvent("Book CTA Clicked", {
    page_path: pagePath,
  });
}

export function trackCalendlyOpened() {
  trackEvent("Calendly Opened");
}

export function trackCalendlyBookingCompleted() {
  trackEvent("Calendly Booking Completed");
}

export function trackDemoViewed() {
  trackEvent("Demo Viewed");
}

export function trackDemoCompleted() {
  trackEvent("Demo Completed");
}

export function trackPdfDownloaded() {
  trackEvent("PDF Downloaded");
}

export function trackScrollDepth(depth: 25 | 50 | 75 | 100, pagePath: string) {
  trackEvent("Scroll Depth", {
    depth_percent: depth,
    page_path: pagePath,
  });
}

export function trackTimeOnPage(seconds: 30 | 60 | 120, pagePath: string) {
  trackEvent("Time On Page", {
    time_seconds: seconds,
    page_path: pagePath,
  });
}
