import { DollarSign, Phone, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/section";

const features = [
  {
    title: "Missed Call Workflow Review",
    description:
      "We'll map your current phone process and identify where opportunities are slipping away.",
    icon: Phone,
  },
  {
    title: "Revenue Opportunity Analysis",
    description:
      "We'll estimate how much additional revenue your business could recover with automated engagement.",
    icon: DollarSign,
  },
  {
    title: "Live Seriqon Voice™ Demo",
    description:
      "See exactly how conversations are handled, qualified, and routed to your team.",
    icon: Sparkles,
  },
];

export function BookFeatures() {
  return (
    <Section
      label="What to Expect"
      title="Your complimentary strategy session"
      description="A focused 30-minute call designed to deliver clarity—not a sales pitch."
      className="relative mt-[58px] mb-20 py-0 md:mt-[72px] md:mb-24 [&>div>div:first-child]:mb-6"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-7 text-center md:transition-all md:duration-300 md:ease-out md:hover:-translate-y-1 md:hover:border-accent md:hover:shadow-[0_20px_50px_rgba(108,92,231,0.15)]"
          >
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-xl bg-accent-glow text-accent md:transition-colors md:group-hover:bg-accent/20">
              <feature.icon className="h-8 w-8" aria-hidden="true" />
            </div>
            <h3 className="mb-3 font-display text-lg font-semibold text-foreground">
              {feature.title}
            </h3>
            <p className="mx-auto max-w-md leading-relaxed text-zinc-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
