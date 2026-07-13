import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

const services = [
  {
    name: "Seriqon Inbox™",
    tagline: "AI Email Assistant",
    description:
      "Intelligent email triage, drafting, and response. Your inbox handled 24/7 with context-aware replies that sound like you.",
    highlights: ["Smart categorization", "Auto-draft responses", "Appointment scheduling"],
  },
  {
    name: "Seriqon Voice™",
    tagline: "Missed Call Rescue",
    description:
      "Never lose a lead to a missed call again. AI-powered call handling that books appointments and answers questions instantly.",
    highlights: ["Instant callback", "Natural conversation", "CRM integration"],
  },
  {
    name: "Workflow Automation",
    tagline: "Custom Integrations",
    description:
      "Connect your tools and automate repetitive processes. From intake forms to follow-ups, we build the workflows you need.",
    highlights: ["Multi-platform sync", "Trigger-based actions", "Custom logic"],
  },
  {
    name: "AI Knowledge Bases",
    tagline: "Instant Answers",
    description:
      "Turn your documents, FAQs, and policies into an intelligent knowledge base. Staff and customers get answers in seconds.",
    highlights: ["Document ingestion", "Semantic search", "Always up to date"],
  },
];

export function Services() {
  return (
    <Section
      id="services"
      label="Services"
      title="Everything you need to automate"
      description="Four powerful products, one seamless experience. Pick what you need — we handle the rest."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service, index) => (
          <Card
            key={service.name}
            glow={index === 0}
            className="relative overflow-hidden"
          >
            <div className="relative">
              <p className="mb-1 text-sm font-medium text-accent">
                {service.tagline}
              </p>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                {service.name}
              </h3>
              <p className="mt-4 text-muted">{service.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {service.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
