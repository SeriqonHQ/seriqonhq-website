"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How fast does Seriqon Voice™ respond after a missed call?",
    answer:
      "Within seconds. As soon as a call goes unanswered, Seriqon Voice™ sends a personalized text message to engage the caller before they move on to a competitor.",
  },
  {
    question: "Can the AI answer industry-specific questions?",
    answer:
      "Yes. We train Seriqon Voice™ on your business—services, pricing, hours, policies—so responses sound like your team, not a generic chatbot.",
  },
  {
    question: "What happens when a lead is qualified?",
    answer:
      "Your team receives an instant notification via SMS and email with the full conversation transcript, caller details, and recommended next steps.",
  },
  {
    question: "Does it work after business hours?",
    answer:
      "Absolutely. Seriqon Voice™ operates 24/7—nights, weekends, and holidays—so you never lose a lead because the office is closed.",
  },
  {
    question: "Can I customize the conversation flow?",
    answer:
      "Yes. We configure greeting messages, qualifying questions, and routing rules to match your workflow. You approve everything before it goes live.",
  },
  {
    question: "How does Seriqon Voice™ integrate with my phone system?",
    answer:
      "We connect with most business phone systems and VoIP providers. Setup typically takes a few days with no changes to your existing number or hardware.",
  },
];

export function VoiceFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section
      id="faq"
      label="FAQ"
      title="Common questions"
      description="Everything you need to know about Seriqon Voice™."
      centered={false}
    >
      <div className="mx-auto max-w-3xl">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const panelId = `voice-faq-panel-${index}`;
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
                  id={`voice-faq-question-${index}`}
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
                aria-labelledby={`voice-faq-question-${index}`}
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
