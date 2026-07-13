import { Section } from "@/components/ui/section";

const problems = [
  {
    stat: "60%",
    label: "of callers never leave a voicemail.",
    description:
      "If nobody answers, many callers simply move on to the next business.",
  },
  {
    stat: "$8,000+",
    label: "potential revenue lost each month.",
    description:
      "Missing just a handful of qualified calls each week can quietly cost your business thousands in missed opportunities.",
  },
  {
    stat: "24/7",
    label: "AI responds instantly.",
    description:
      "Your business never stops answering—even after hours, weekends, or while your team is busy.",
  },
];

export function VoiceProblem() {
  return (
    <Section
      id="problem"
      label="The Cost of a Missed Call"
      title="Every unanswered call is lost revenue."
      description="Your next customer doesn't leave a voicemail—they call your competitor. Seriqon Voice™ responds in seconds so every opportunity stays alive."
    >
      <div className="grid gap-8 md:grid-cols-3">
        {problems.map((problem) => (
          <div
            key={problem.label}
            className="rounded-2xl border border-border bg-surface p-8 text-center"
          >
            <p className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              {problem.stat}
            </p>
            <p className="mt-2 text-sm font-medium text-accent">
              {problem.label}
            </p>
            <p className="mt-3 text-sm text-muted">{problem.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Lost revenue",
            text: "Callers who can't reach you call your competitor instead.",
          },
          {
            title: "Frustrated customers",
            text: "Patients and clients expect fast responses—not voicemails.",
          },
          {
            title: "Administrative overload",
            text: "Your team spends hours chasing callbacks that should have been handled instantly.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border p-6 transition-colors hover:border-border-hover md:p-8"
          >
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="text-muted">{item.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
