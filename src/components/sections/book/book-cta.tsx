import { Button } from "@/components/ui/button";

export function BookCTA() {
  return (
    <section className="relative pb-20 md:pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-8 py-16 text-center md:px-16 md:py-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="gradient-accent absolute -top-1/2 left-1/2 h-full w-full -translate-x-1/2 opacity-10 blur-3xl" />
          </div>

          <div className="relative">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Ready to recover more revenue?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              Book your complimentary Time Recovery Audit™ and receive a
              personalized revenue recovery strategy tailored to your business.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="#schedule" size="lg">
                Book My Time Recovery Audit
              </Button>
              <Button href="/voice" variant="secondary" size="lg">
                Return to Seriqon Voice
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
