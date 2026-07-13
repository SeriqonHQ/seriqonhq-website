import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function VoiceCTA() {
  return (
    <section className="relative py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-8 py-16 text-center md:px-16 md:py-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="gradient-accent absolute -top-1/2 left-1/2 h-full w-full -translate-x-1/2 opacity-10 blur-3xl" />
          </div>

          <div className="relative">
            <p className="mb-4 text-sm font-medium tracking-widest text-accent uppercase">
              Seriqon Voice™
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Stop losing leads to missed calls
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
              Book your free Time Recovery Audit and see how Seriqon Voice™ can
              capture every opportunity. {siteConfig.philosophy}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/demo" size="lg">
                Try Live Demo
              </Button>
              <Button href="/audit" variant="secondary" size="lg">
                Take Time Recovery Audit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
