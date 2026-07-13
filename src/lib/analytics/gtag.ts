import { isAnalyticsEnabled } from "@/lib/analytics/config";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (!isAnalyticsEnabled() || typeof window === "undefined") {
    return;
  }

  window.gtag?.("event", eventName, params);
}

export function trackPageView(path: string, title?: string) {
  if (!isAnalyticsEnabled() || typeof window === "undefined") {
    return;
  }

  window.gtag?.("event", "page_view", {
    page_path: path,
    page_title: title ?? document.title,
  });
}
