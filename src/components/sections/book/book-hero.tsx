import { Clock } from "lucide-react";

export function BookHero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-0 md:pt-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-orb absolute -top-1/4 left-1/2 h-[600px] w-[800px] -translate-x-1/2 animate-pulse-glow" />
        <div className="grid-pattern absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="animate-fade-in mb-4 text-sm font-medium tracking-widest text-accent uppercase">
            Time Recovery Audit™
          </p>

          <h1 className="animate-fade-in-up font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Book Your Time Recovery Audit™
          </h1>

          <p className="animate-fade-in-up stagger-2 mt-6 text-lg text-muted md:text-xl">
            Discover how much revenue missed calls may be costing your
            business—and see exactly how Seriqon Voice™ can help recover it.
          </p>

          <div className="animate-fade-in-up stagger-3 mt-6 flex items-center justify-center gap-3 text-zinc-400">
            <Clock className="h-5 w-5 text-indigo-400" aria-hidden="true" />
            <span>Average session: 30 minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
}
