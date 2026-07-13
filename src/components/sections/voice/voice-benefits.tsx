import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

const benefits = [
  {
    title: "Never Miss a Lead",
    description:
      "Every missed call triggers an instant AI response. Callers get answers—not voicemails—and your pipeline stays full around the clock.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    title: "Reduce Administrative Work",
    description:
      "Stop playing phone tag. Seriqon Voice™ handles intake questions, collects details, and delivers structured summaries to your team.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Qualify Every Inquiry",
    description:
      "AI asks the right questions, captures intent, and routes high-value leads to your team with full context—before a human ever picks up.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

export function VoiceBenefits() {
  return (
    <Section
      id="benefits"
      label="Benefits"
      title="Turn every call into an opportunity"
      description="Seriqon Voice™ works 24/7 so your team can focus on the conversations that matter most."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {benefits.map((benefit, index) => (
          <Card key={benefit.title} glow={index === 0}>
            <div className="mb-4 inline-flex rounded-xl bg-accent-glow p-3 text-accent">
              {benefit.icon}
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              {benefit.title}
            </h3>
            <p className="text-muted">{benefit.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
