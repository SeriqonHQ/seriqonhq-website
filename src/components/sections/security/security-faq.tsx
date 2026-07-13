"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How is customer data protected?",
    answer:
      "Customer data is encrypted in transit and at rest, stored on secure cloud infrastructure, and protected with role-based access controls. We maintain regular backups and monitor systems to help keep information safe.",
  },
  {
    question: "Can conversations be deleted?",
    answer:
      "Yes. Your business can request deletion of conversation data. We work with you to manage retention and removal based on your preferences and operational needs.",
  },
  {
    question: "Who owns the data?",
    answer:
      "Your business owns the customer conversation data collected through Seriqon Voice™. Seriqon processes that data on your behalf to deliver the service—you remain in control of how it is used within your account.",
  },
  {
    question: "Can employees access conversations?",
    answer:
      "Access is limited to authorized users through secure authentication and role-based permissions. You decide which team members can view conversation summaries, transcripts, and related customer details.",
  },
];

export function SecurityFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section
      id="faq"
      label="FAQ"
      title="Common security questions"
      description="Clear answers for business owners evaluating Seriqon Voice™."
      centered={false}
    >
      <div className="mx-auto max-w-3xl">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const panelId = `security-faq-panel-${index}`;

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
                  id={`security-faq-question-${index}`}
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
                aria-labelledby={`security-faq-question-${index}`}
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
