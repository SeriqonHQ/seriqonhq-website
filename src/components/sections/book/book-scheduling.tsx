"use client";

import { useEffect, useState } from "react";
import { PopupModal } from "react-calendly";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { trackCalendlyOpened } from "@/lib/analytics/events";

const CALENDLY_URL = "https://calendly.com/hello-seriqonhq/30min";

export function BookScheduling() {
  const [isOpen, setIsOpen] = useState(false);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRootElement(document.body);
  }, []);

  return (
    <>
      <Section
        id="schedule"
        label="Schedule"
        title="Choose a Time"
        description="Select a time that works best for you. You'll instantly receive a calendar invite and everything you need for your strategy session."
        className="relative mb-20 py-20 md:mb-24 md:py-24"
      >
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-surface/80 p-8 text-center backdrop-blur-xl md:p-12">
          <div className="pointer-events-none absolute inset-0">
            <div className="gradient-accent absolute -top-1/2 left-1/2 h-full w-full -translate-x-1/2 opacity-10 blur-3xl" />
          </div>

          <div className="relative">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Ready to schedule?
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              Choose a time that works best for you. Your strategy session will
              open in a secure booking window without leaving Seriqon.
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                onClick={() => {
                  trackCalendlyOpened();
                  setIsOpen(true);
                }}
              >
                Open Scheduling
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {rootElement ? (
        <PopupModal
          url={CALENDLY_URL}
          open={isOpen}
          onModalClose={() => setIsOpen(false)}
          rootElement={rootElement}
        />
      ) : null}
    </>
  );
}
