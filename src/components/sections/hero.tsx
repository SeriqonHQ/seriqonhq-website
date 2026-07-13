import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-orb absolute -top-1/4 left-1/2 h-[600px] w-[800px] -translate-x-1/2 animate-pulse-glow" />
        <div className="grid-pattern absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="animate-fade-in-up font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            More time for{" "}
            <span className="gradient-text">what matters.</span>
          </h1>

          <p className="animate-fade-in-up stagger-2 mx-auto mt-6 max-w-2xl text-lg text-muted md:text-xl">
            Your team wasn&apos;t hired to answer emails all day.
            <br />
            <br />
            They were hired to care for patients, serve customers, and grow your
            business.
            <br />
            <br />
            We&apos;ll handle the busywork.
            <br />
            <br />
            You handle the people.
          </p>

          <div className="animate-fade-in-up stagger-3 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="flex flex-col items-center">
              <Button href="/book" size="lg">
                Get Your Time Back
              </Button>
              <p className="mt-2 text-sm text-muted-foreground">
                Free 30-minute Time Recovery Audit
              </p>
            </div>
            <Button href="#services" variant="secondary" size="lg">
              Explore Services
            </Button>
          </div>

          <p className="animate-fade-in stagger-4 mt-12 text-sm text-muted-foreground">
            Built for healthcare practices and growing businesses.
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
