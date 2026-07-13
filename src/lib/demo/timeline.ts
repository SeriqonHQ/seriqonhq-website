export type DashboardCardId =
  | "customer-identified"
  | "intent"
  | "sentiment"
  | "appointment"
  | "summary-generated"
  | "crm-ready"
  | "conversation-complete";

export type DemoMessage = {
  id: number;
  sender: "customer" | "ai" | "system";
  text: string;
  delayAfterPrev: number;
  showTypingBefore?: boolean;
  revealCards?: DashboardCardId[];
};

export const demoMessages: DemoMessage[] = [
  {
    id: 1,
    sender: "customer",
    text: "Hi, I'd like to schedule a cleaning.",
    delayAfterPrev: 1500,
    revealCards: ["customer-identified", "intent"],
  },
  {
    id: 2,
    sender: "ai",
    text: "Absolutely! I'd be happy to help. Which day works best for you?",
    delayAfterPrev: 1000,
    showTypingBefore: true,
    revealCards: ["sentiment"],
  },
  {
    id: 3,
    sender: "customer",
    text: "Do you have anything available Tuesday afternoon?",
    delayAfterPrev: 1800,
  },
  {
    id: 4,
    sender: "ai",
    text: "Yes—we have Tuesday at 2:30 PM open. Would that work for you?",
    delayAfterPrev: 1200,
    showTypingBefore: true,
  },
  {
    id: 5,
    sender: "customer",
    text: "Perfect, Tuesday at 2:30 works great.",
    delayAfterPrev: 1600,
    revealCards: ["appointment"],
  },
  {
    id: 6,
    sender: "ai",
    text: "Wonderful—I've scheduled your cleaning for Tuesday at 2:30 PM. You'll receive a confirmation shortly.",
    delayAfterPrev: 1200,
    showTypingBefore: true,
    revealCards: ["summary-generated"],
  },
  {
    id: 7,
    sender: "system",
    text: "Appointment Scheduled ✓",
    delayAfterPrev: 1400,
    revealCards: ["crm-ready", "conversation-complete"],
  },
];

export const dashboardCardOrder: DashboardCardId[] = [
  "customer-identified",
  "intent",
  "sentiment",
  "appointment",
  "summary-generated",
  "crm-ready",
  "conversation-complete",
];

export const dashboardCardContent: Record<
  DashboardCardId,
  { label: string; value?: string; status?: boolean; positive?: boolean }
> = {
  "customer-identified": {
    label: "Customer Identified",
    value: "Sarah Johnson",
    status: true,
  },
  intent: {
    label: "Intent",
    value: "Appointment Scheduling",
  },
  sentiment: {
    label: "Sentiment",
    value: "Positive",
    positive: true,
  },
  appointment: {
    label: "Appointment",
    value: "Tuesday 2:30 PM",
  },
  "summary-generated": {
    label: "Summary Generated",
    status: true,
  },
  "crm-ready": {
    label: "CRM Ready",
    status: true,
  },
  "conversation-complete": {
    label: "Conversation Complete",
    status: true,
  },
};

export const executiveSummary =
  "Sarah called after business hours requesting a dental cleaning. Seriqon Voice™ scheduled the appointment, captured her information, and prepared a structured summary for staff review.";

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function getCompletedDemoState() {
  const visibleCards: DashboardCardId[] = [];

  demoMessages.forEach((message) => {
    message.revealCards?.forEach((cardId) => {
      if (!visibleCards.includes(cardId)) {
        visibleCards.push(cardId);
      }
    });
  });

  return {
    visibleCount: demoMessages.length,
    visibleCards,
    showSummary: true,
    isComplete: true,
  };
}
