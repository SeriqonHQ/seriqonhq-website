import { Button } from "@/components/ui/button";

export function VoiceHero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-orb absolute -top-1/4 right-0 h-[500px] w-[700px] animate-pulse-glow" />
        <div className="grid-pattern absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="animate-fade-in mb-4 text-sm font-medium tracking-widest text-accent uppercase">
              Seriqon Voice™
            </p>

            <h1 className="animate-fade-in-up font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Never miss another{" "}
              <span className="gradient-text">opportunity.</span>
            </h1>

            <p className="animate-fade-in-up stagger-2 mt-6 max-w-xl text-lg text-muted md:text-xl">
              Every missed call is a lost opportunity. Seriqon Voice™ instantly
              engages callers, answers common questions, qualifies leads, and
              notifies your team—so every conversation continues, even when you
              can&apos;t answer.
            </p>

            <div className="animate-fade-in-up stagger-3 mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="/book" size="lg">
                Book Your Time Recovery Audit
              </Button>
              <Button href="#demo" variant="secondary" size="lg">
                See How It Works
              </Button>
            </div>
          </div>

          <div className="animate-fade-in-up stagger-4 relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative mx-auto w-[280px] rounded-[2.5rem] border border-border bg-surface p-3 shadow-[0_0_60px_rgba(99,102,241,0.15)] md:w-[300px]">
              <div className="rounded-[2rem] border border-border bg-background p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div className="h-2 w-16 rounded-full bg-border" />
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                  </div>
                </div>

                <div className="mb-4 flex flex-col items-center py-4">
                  <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-accent-glow">
                    <svg
                      className="h-8 w-8 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Missed Call
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    (555) 234-8891 · 2 min ago
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="rounded-2xl rounded-tl-sm bg-accent/20 px-4 py-3">
                    <p className="text-sm text-foreground">
                      Hi! This is Seriqon Voice for Riverside Dental. We missed
                      your call—how can we help?
                    </p>
                  </div>
                  <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-surface px-4 py-3">
                    <p className="text-sm text-muted">
                      I&apos;d like to schedule a cleaning
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                    <span className="text-xs text-muted-foreground">
                      AI responding...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
