"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How long is the audit?",
    answer: "Approximately 30 minutes.",
  },
  {
    question: "Do I need to prepare anything?",
    answer:
      "No. We'll guide the conversation and ask a few questions about your current process.",
  },
  {
    question: "Is this a sales call?",
    answer:
      "No. The goal is to understand your workflow, provide value, and determine whether Seriqon Voice™ is a good fit.",
  },
  {
    question: "How quickly can we get started?",
    answer: "Most businesses can begin onboarding within a few days.",
  },
];

export function BookFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section
      id="faq"
      label="FAQ"
      title="Common questions"
      description="Everything you need to know before booking your audit."
      centered={false}
      className="relative mb-20 py-0 md:mb-24 [&>div>div:first-child]:mb-6"
    >
      <div className="mx-auto max-w-3xl">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const panelId = `book-faq-panel-${index}`;
          return (
            <div
              key={faq.question}
              className="border-b border-border last:border-b-0"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors hover:text-accent"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span
                  id={`book-faq-question-${index}`}
                  className="text-lg font-medium text-foreground"
                >
                  {faq.question}
                </span>
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border transition-transform duration-200",
                    isOpen && "rotate-45"
                  )}
                  aria-hidden="true"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </span>
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={`book-faq-question-${index}`}
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <p className="text-muted">{faq.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
