"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const steps = [
  {
    label: "Phone Call",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    label: "Missed Call",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
  {
    label: "AI Text",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    label: "Customer Conversation",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.106-4.029-.317A4.5 4.5 0 0112 15.75H9.75a4.5 4.5 0 01-1.98-.43l-1.5.75V12.75A4.5 4.5 0 019.75 8.25h.75z" />
      </svg>
    ),
  },
  {
    label: "Qualified Lead",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    label: "Team Notification",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
  },
];

export function VoiceWorkflow() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Section
      id="workflow"
      label="How It Works"
      title="From missed call to booked appointment"
      description="Seriqon Voice™ picks up where you left off—in seconds, not hours."
    >
      <div className="hidden lg:block">
        <div className="relative flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.label} className="relative flex flex-1 flex-col items-center">
              {index < steps.length - 1 && (
                <div className="workflow-line absolute top-6 left-[calc(50%+24px)] h-0.5 w-[calc(100%-48px)] overflow-hidden bg-border" />
              )}
              <div
                className={cn(
                  "relative z-10 flex h-12 w-12 items-center justify-center rounded-full border bg-surface transition-all duration-500",
                  activeStep === index
                    ? "border-accent text-accent workflow-step-active"
                    : activeStep > index
                      ? "border-accent/50 text-accent/70"
                      : "border-border text-muted"
                )}
              >
                {step.icon}
              </div>
              <p
                className={cn(
                  "mt-4 max-w-[100px] text-center text-xs font-medium transition-colors duration-500",
                  activeStep >= index ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-0 lg:hidden">
        {steps.map((step, index) => (
          <div key={step.label} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-surface transition-all duration-500",
                  activeStep === index
                    ? "border-accent text-accent workflow-step-active"
                    : activeStep > index
                      ? "border-accent/50 text-accent/70"
                      : "border-border text-muted"
                )}
              >
                {step.icon}
              </div>
              {index < steps.length - 1 && (
                <div className="my-1 h-8 w-px bg-border" />
              )}
            </div>
            <p
              className={cn(
                "pt-2 text-sm font-medium transition-colors duration-500",
                activeStep >= index ? "text-foreground" : "text-muted"
              )}
            >
              {step.label}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
