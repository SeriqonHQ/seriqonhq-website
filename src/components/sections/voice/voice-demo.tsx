"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  sender: "ai" | "customer" | "system";
  text: string;
};

const conversation: Message[] = [
  {
    id: 1,
    sender: "system",
    text: "Missed call from (555) 234-8891",
  },
  {
    id: 2,
    sender: "ai",
    text: "Hi! This is Seriqon Voice for Riverside Dental. We noticed we missed your call—how can we help you today?",
  },
  {
    id: 3,
    sender: "customer",
    text: "Hi, I'd like to schedule a cleaning appointment.",
  },
  {
    id: 4,
    sender: "ai",
    text: "I'd be happy to help. We have openings Tuesday at 2:00 PM or Thursday at 10:00 AM. Which works better for you?",
  },
  {
    id: 5,
    sender: "customer",
    text: "Thursday at 10 works great.",
  },
  {
    id: 6,
    sender: "ai",
    text: "Perfect—I've noted Thursday at 10:00 AM for your cleaning. A team member will confirm your appointment shortly.",
  },
  {
    id: 7,
    sender: "system",
    text: "Qualified lead created · Team notified via SMS & email",
  },
];

const MESSAGE_DELAY = 1800;

export function VoiceDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasAutoPlayed = useRef(false);

  const reset = useCallback(() => {
    setVisibleCount(0);
    setShowTyping(false);
    setIsPlaying(false);
  }, []);

  const play = useCallback(() => {
    reset();
    setIsPlaying(true);
    setVisibleCount(1);
  }, [reset]);

  useEffect(() => {
    if (!isPlaying || visibleCount === 0) return;

    if (visibleCount >= conversation.length) {
      setIsPlaying(false);
      setShowTyping(false);
      return;
    }

    const nextMessage = conversation[visibleCount];
    const isAiReply = nextMessage.sender === "ai";

    if (isAiReply) {
      setShowTyping(true);
    }

    const delay = isAiReply ? MESSAGE_DELAY + 800 : MESSAGE_DELAY;

    const timer = setTimeout(() => {
      setShowTyping(false);
      setVisibleCount((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [isPlaying, visibleCount]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleCount, showTyping]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoPlayed.current) {
          hasAutoPlayed.current = true;
          play();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [play]);

  const visibleMessages = conversation.slice(0, visibleCount);

  return (
    <Section
      id="demo"
      label="Live Demo"
      title="See Seriqon Voice™ in action"
      description="Watch how a missed call becomes a qualified lead—in under 60 seconds."
      centered={false}
    >
      <div ref={containerRef} className="grid items-start gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-glow text-sm font-semibold text-accent">
                1
              </span>
              <div>
                <h3 className="font-semibold text-foreground">Call goes unanswered</h3>
                <p className="mt-1 text-sm text-muted">
                  Your team is with a patient, on another line, or closed for the day.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-glow text-sm font-semibold text-accent">
                2
              </span>
              <div>
                <h3 className="font-semibold text-foreground">AI engages instantly</h3>
                <p className="mt-1 text-sm text-muted">
                  Seriqon Voice™ sends a personalized text within seconds of the missed call.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-glow text-sm font-semibold text-accent">
                3
              </span>
              <div>
                <h3 className="font-semibold text-foreground">Lead qualified & routed</h3>
                <p className="mt-1 text-sm text-muted">
                  Your team gets a notification with full conversation context—ready to confirm.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Button onClick={play} variant="secondary" size="md">
              {isPlaying ? "Replaying..." : "Replay Conversation"}
            </Button>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="mx-auto w-full max-w-sm">
            <div className="rounded-[2.5rem] border border-border bg-surface p-3 shadow-[0_0_60px_rgba(99,102,241,0.12)]">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-background">
                <div className="border-b border-border bg-surface px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-glow">
                      <span className="text-sm font-semibold text-accent">RD</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Riverside Dental
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Seriqon Voice™
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="flex h-[420px] flex-col gap-3 overflow-y-auto px-4 py-4"
                  aria-live="polite"
                  aria-label="Simulated conversation"
                >
                  {visibleMessages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "animate-fade-in-up",
                        message.sender === "customer" && "flex justify-end",
                        message.sender === "system" && "flex justify-center"
                      )}
                    >
                      {message.sender === "system" ? (
                        <p className="rounded-full bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">
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
                    </div>
                  ))}

                  {showTyping && (
                    <div className="flex items-center gap-2 px-2">
                      <div className="flex gap-1 rounded-2xl rounded-tl-sm bg-accent/20 px-4 py-3">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                        <span className="h-2 w-2 animate-pulse rounded-full bg-accent [animation-delay:150ms]" />
                        <span className="h-2 w-2 animate-pulse rounded-full bg-accent [animation-delay:300ms]" />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
