"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trackDemoCompleted } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";
import {
  dashboardCardContent,
  dashboardCardOrder,
  demoMessages,
  executiveSummary,
  sleep,
  type DashboardCardId,
} from "@/lib/demo/timeline";

function DashboardCard({
  cardId,
  index,
}: {
  cardId: DashboardCardId;
  index: number;
}) {
  const card = dashboardCardContent[cardId];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
        delay: index * 0.08,
      }}
    >
      <Card hover={false} className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {card.label}
            </p>
            {card.value ? (
              <p
                className={cn(
                  "mt-2 font-display text-lg font-semibold",
                  card.positive ? "text-emerald-400" : "text-foreground"
                )}
              >
                {card.value}
              </p>
            ) : null}
          </div>
          {card.status ? (
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm text-emerald-400">
              ✓
            </span>
          ) : null}
        </div>
      </Card>
    </motion.div>
  );
}

export function VoiceFlagshipDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [visibleCards, setVisibleCards] = useState<DashboardCardId[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;

    const runDemo = async () => {
      for (const message of demoMessages) {
        if (message.showTypingBefore) {
          setShowTyping(true);
          await sleep(900);
          if (!active) return;
          setShowTyping(false);
        }

        await sleep(message.delayAfterPrev);
        if (!active) return;

        setVisibleCount((count) => count + 1);

        if (message.revealCards?.length) {
          setVisibleCards((prev) => {
            const next = [...prev];
            message.revealCards!.forEach((cardId) => {
              if (!next.includes(cardId)) {
                next.push(cardId);
              }
            });
            return next;
          });
        }
      }

      if (!active) return;
      setIsComplete(true);
      await sleep(400);
      if (!active) return;
      setShowSummary(true);
    };

    void runDemo();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleCount, showTyping]);

  useEffect(() => {
    if (isComplete) {
      trackDemoCompleted();
    }
  }, [isComplete]);

  const visibleMessages = demoMessages.slice(0, visibleCount);

  return (
    <div className="space-y-10">
      <div className="grid items-start gap-8 xl:grid-cols-2 xl:gap-10">
        <div className="rounded-3xl border border-border bg-surface/80 p-4 backdrop-blur-xl md:p-6">
          <div className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-accent">
            <Phone className="h-3.5 w-3.5" />
            Incoming Call
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="rounded-[2.5rem] border border-border bg-surface p-3 shadow-[0_0_60px_rgba(99,102,241,0.12)]">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-background">
                <div className="border-b border-border bg-surface px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-accent-glow">
                      <span className="text-sm font-semibold text-accent">SJ</span>
                      <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Sarah Johnson
                      </p>
                      <p className="text-xs text-muted-foreground">
                        (555) 412-9087 · After hours
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 rounded-xl border border-border bg-background px-3 py-2 text-xs text-muted">
                    <span className="font-medium text-foreground">Reason: </span>
                    &ldquo;I need to schedule a cleaning for next week.&rdquo;
                  </p>
                </div>

                <div
                  className="flex h-[420px] flex-col gap-3 overflow-y-auto px-4 py-4"
                  aria-live="polite"
                  aria-label="Simulated phone conversation"
                >
                  <AnimatePresence initial={false}>
                    {visibleMessages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className={cn(
                          message.sender === "customer" && "flex justify-end",
                          message.sender === "system" && "flex justify-center"
                        )}
                      >
                        {message.sender === "system" ? (
                          <p className="rounded-full bg-emerald-500/15 px-4 py-1.5 text-xs font-medium text-emerald-400">
                            {message.text}
                          </p>
                        ) : (
                          <div
                            className={cn(
                              "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
                              message.sender === "ai"
                                ? "rounded-tl-sm bg-accent/20 text-foreground"
                                : "rounded-tr-sm bg-surface text-muted"
                            )}
                          >
                            {message.text}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {showTyping ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 px-2"
                    >
                      <div className="flex gap-1 rounded-2xl rounded-tl-sm bg-accent/20 px-4 py-3">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                        <span className="h-2 w-2 animate-pulse rounded-full bg-accent [animation-delay:150ms]" />
                        <span className="h-2 w-2 animate-pulse rounded-full bg-accent [animation-delay:300ms]" />
                      </div>
                    </motion.div>
                  ) : null}

                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-surface/80 p-4 backdrop-blur-xl md:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-accent">
              <Radio className="h-3.5 w-3.5" />
              Live AI Dashboard
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  isComplete ? "bg-emerald-400" : "animate-pulse bg-accent"
                )}
              />
              {isComplete ? "Complete" : "Live"}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <AnimatePresence initial={false}>
              {dashboardCardOrder
                .filter((cardId) => visibleCards.includes(cardId))
                .map((cardId, index) => (
                  <DashboardCard key={cardId} cardId={cardId} index={index} />
                ))}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {visibleCards.length === 0 ? (
              <motion.p
                key="waiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 text-sm text-muted-foreground"
              >
                Listening to conversation and updating insights in real time...
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showSummary ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <Card hover={false} className="border-accent/20 bg-accent/5">
              <p className="text-xs font-medium uppercase tracking-widest text-accent">
                Executive Summary
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">
                {executiveSummary}
              </p>
            </Card>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.55, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl border border-border bg-surface px-8 py-12 text-center md:px-12 md:py-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
        <div className="relative">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Imagine every missed call ending like this.
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/audit" size="lg">
              Book My Time Recovery Audit
            </Button>
            <Button href="/voice" variant="secondary" size="lg">
              Back to Seriqon Voice
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
