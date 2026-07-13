"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import {
  hasIntroPlayed,
  markIntroPlayed,
  VOICE_INTRO_PLAYED_KEY,
} from "@/lib/intro-session";

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
const COMPLETED_COUNT = conversation.length;

interface VoiceDemoProps {
  playKey?: number;
}

export function VoiceDemo({ playKey = 0 }: VoiceDemoProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [isInstant, setIsInstant] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const scrollConversationToBottom = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, []);

  const showCompletedState = useCallback(() => {
    clearTimers();
    setIsInstant(true);
    setShowTyping(false);
    setIsPlaying(false);
    setVisibleCount(COMPLETED_COUNT);
  }, [clearTimers]);

  const startPlayback = useCallback(() => {
    clearTimers();
    setIsInstant(false);
    setShowTyping(false);
    setIsPlaying(true);
    setVisibleCount(1);
  }, [clearTimers]);

  useEffect(() => {
    clearTimers();

    if (playKey > 0) {
      startPlayback();
      return clearTimers;
    }

    if (hasIntroPlayed(VOICE_INTRO_PLAYED_KEY)) {
      showCompletedState();
      return clearTimers;
    }

    startPlayback();
    return clearTimers;
  }, [playKey, clearTimers, showCompletedState, startPlayback]);

  useEffect(() => {
    if (!isPlaying || visibleCount === 0) return;

    if (visibleCount >= COMPLETED_COUNT) {
      setIsPlaying(false);
      setShowTyping(false);
      markIntroPlayed(VOICE_INTRO_PLAYED_KEY);
      return;
    }

    const nextMessage = conversation[visibleCount];
    const isAiReply = nextMessage.sender === "ai";

    if (isAiReply) {
      setShowTyping(true);
    }

    const delay = isAiReply ? MESSAGE_DELAY + 800 : MESSAGE_DELAY;

    const timer = window.setTimeout(() => {
      setShowTyping(false);
      setVisibleCount((prev) => prev + 1);
    }, delay);

    timersRef.current.push(timer);

    return () => {
      window.clearTimeout(timer);
      timersRef.current = timersRef.current.filter((item) => item !== timer);
    };
  }, [isPlaying, visibleCount]);

  useEffect(() => {
    scrollConversationToBottom();
  }, [visibleCount, showTyping, scrollConversationToBottom]);

  const visibleMessages = conversation.slice(0, visibleCount);

  return (
    <Section
      id="demo"
      label="Live Demo"
      title="See Seriqon Voice™ in action"
      description="Watch how a missed call becomes a qualified lead—in under 60 seconds."
      centered={false}
    >
      <div className="grid items-start gap-12 lg:grid-cols-2">
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
                  ref={messagesContainerRef}
                  className="flex h-[420px] flex-col gap-3 overflow-y-auto px-4 py-4"
                  aria-live="polite"
                  aria-label="Simulated conversation"
                >
                  <AnimatePresence initial={false}>
                    {visibleMessages.map((message) => (
                      <motion.div
                        key={`${playKey}-${message.id}`}
                        initial={isInstant ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className={cn(
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
