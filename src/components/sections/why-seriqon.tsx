import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site";

const values = [
  {
    title: "Human-first",
    description:
      "We build automation around your workflow—not the other way around.",
  },
  {
    title: "Fast Implementation",
    description: "Most systems can be deployed in days, not months.",
  },
  {
    title: "Built to Scale",
    description:
      "Start with one workflow and expand as your business grows.",
  },
];

const differentiators = [
  {
    title: "Built for healthcare",
    description:
      "We understand HIPAA, patient communication, and the unique workflows of clinics and practices.",
  },
  {
    title: "Human-first philosophy",
    description: siteConfig.philosophy,
  },
  {
    title: "No technical lift",
    description:
      "We handle setup, integration, and ongoing optimization. You approve — we deploy.",
  },
  {
    title: "Transparent pricing",
    description:
      "Clear monthly plans with no hidden fees. Scale up or down as your needs change.",
  },
];

export function WhySeriqon() {
  return (
    <Section
      id="why-seriqon"
      label="Why Seriqon"
      title="Built different. Built for you."
      description="We don't sell software — we deliver outcomes. Less busywork, more meaningful work."
    >
      <div className="mb-16 grid gap-8 md:grid-cols-3">
        {values.map((value) => (
          <div
            key={value.title}
            className="rounded-2xl border border-border bg-surface p-8 text-center"
          >
            <p className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl text-balance">
              {value.title}
            </p>
            <p className="mt-3 text-sm text-muted">{value.description}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {differentiators.map((item, index) => (
          <div
            key={item.title}
            className="flex gap-4 rounded-2xl border border-border p-6 transition-colors hover:border-border-hover md:p-8"
          >
            <span className="font-display text-2xl font-semibold text-accent/40">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-muted">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
