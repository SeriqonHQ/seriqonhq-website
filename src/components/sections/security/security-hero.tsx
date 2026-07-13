export function SecurityHero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-0 md:pt-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-orb absolute -top-1/4 left-1/2 h-[600px] w-[800px] -translate-x-1/2 animate-pulse-glow" />
        <div className="grid-pattern absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="animate-fade-in mb-4 text-sm font-medium tracking-widest text-accent uppercase">
            Security & Privacy
          </p>

          <h1 className="animate-fade-in-up font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Enterprise Security. Simple Compliance.
          </h1>

          <p className="animate-fade-in-up stagger-2 mt-6 text-lg text-muted md:text-xl">
            Seriqon Voice™ is designed to protect customer information while
            giving businesses complete visibility into every conversation.
          </p>
        </div>
      </div>
    </section>
  );
}
