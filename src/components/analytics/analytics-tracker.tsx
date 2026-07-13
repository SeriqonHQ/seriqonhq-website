"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics/gtag";
import {
  trackAuditStarted,
  trackBookCtaClicked,
  trackCalendlyBookingCompleted,
  trackDemoViewed,
  trackHomepageViewed,
  trackScrollDepth,
  trackTimeOnPage,
} from "@/lib/analytics/events";
import { isAnalyticsEnabled } from "@/lib/analytics/config";

const SCROLL_THRESHOLDS = [25, 50, 75, 100] as const;
const TIME_THRESHOLDS = [30, 60, 120] as const;

function isBookHref(href: string | null): boolean {
  if (!href) return false;

  try {
    const url = new URL(href, window.location.origin);
    return url.pathname === "/book";
  } catch {
    return href === "/book" || href.endsWith("/book");
  }
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const scrollTrackedRef = useRef<Set<number>>(new Set());
  const timeTrackedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!isAnalyticsEnabled()) {
      return;
    }

    scrollTrackedRef.current = new Set();
    timeTrackedRef.current = new Set();

    trackPageView(pathname);

    if (pathname === "/") {
      trackHomepageViewed();
    }

    if (pathname === "/audit") {
      trackAuditStarted();
    }

    if (pathname === "/demo") {
      trackDemoViewed();
    }

    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight <= 0) {
        if (!scrollTrackedRef.current.has(100)) {
          scrollTrackedRef.current.add(100);
          trackScrollDepth(100, pathname);
        }
        return;
      }

      const progress = (window.scrollY / scrollHeight) * 100;

      SCROLL_THRESHOLDS.forEach((threshold) => {
        if (progress >= threshold && !scrollTrackedRef.current.has(threshold)) {
          scrollTrackedRef.current.add(threshold);
          trackScrollDepth(threshold, pathname);
        }
      });
    };

    const timeTimers = TIME_THRESHOLDS.map((seconds) =>
      window.setTimeout(() => {
        if (!timeTrackedRef.current.has(seconds)) {
          timeTrackedRef.current.add(seconds);
          trackTimeOnPage(seconds, pathname);
        }
      }, seconds * 1000)
    );

    const handleClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a");
      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (isBookHref(href)) {
        trackBookCtaClicked(pathname);
      }
    };

    const handleCalendlyMessage = (event: MessageEvent) => {
      if (event.origin !== "https://calendly.com") {
        return;
      }

      if (
        event.data &&
        typeof event.data === "object" &&
        "event" in event.data &&
        event.data.event === "calendly.event_scheduled"
      ) {
        trackCalendlyBookingCompleted();
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClick);
    window.addEventListener("message", handleCalendlyMessage);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
      window.removeEventListener("message", handleCalendlyMessage);
      timeTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [pathname]);

  return null;
}
