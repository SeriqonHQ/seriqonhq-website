"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What types of businesses does Seriqon work with?",
    answer:
      "We specialize in healthcare clinics, dental practices, med spas, and service-based small businesses. If your team spends hours on repetitive communication and admin tasks, Seriqon can help.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most clients are fully operational within 1–2 weeks. We handle integration, training, and customization. Your team just approves the final configuration.",
  },
  {
    question: "Is Seriqon HIPAA compliant?",
    answer:
      "Yes. We follow HIPAA-conscious design principles with encryption at rest and in transit, access controls, and audit logging. We sign BAAs with healthcare clients.",
  },
  {
    question: "Can I start with just one service?",
    answer:
      "Absolutely. Many clients start with Seriqon Voice™ or Seriqon Inbox™ and expand as they see results. Each product works independently or together seamlessly.",
  },
  {
    question: "What does the Time Recovery Audit include?",
    answer:
      "We analyze your current workflows, identify automation opportunities, and provide a custom roadmap with projected time savings and ROI. No obligation, no sales pressure.",
  },
  {
    question: "Do I need technical expertise to use Seriqon?",
    answer:
      "Not at all. We handle all technical setup and ongoing maintenance. You interact through simple dashboards and approve AI responses — we manage everything else.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section
      id="faq"
      label="FAQ"
      title="Common questions"
      description="Everything you need to know about getting started with Seriqon."
      centered={false}
    >
      <div className="mx-auto max-w-3xl">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;
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
                  id={`faq-question-${index}`}
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
                aria-labelledby={`faq-question-${index}`}
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
