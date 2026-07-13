"use client";

import { useState } from "react";
import { ReplayDemoButton } from "@/components/layout/replay-demo-button";
import { VoiceFlagshipDemo } from "@/components/sections/demo/voice-flagship-demo";

export function DemoPageClient() {
  const [playKey, setPlayKey] = useState(0);
  const [isReplaying, setIsReplaying] = useState(false);

  const handleReplay = () => {
    setIsReplaying(true);
    setPlayKey((current) => current + 1);
    window.setTimeout(() => setIsReplaying(false), 600);
  };

  return (
    <section className="relative min-h-screen pt-24 pb-20 md:pt-32 md:pb-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-orb absolute -top-1/4 left-1/2 h-[600px] w-[800px] -translate-x-1/2 animate-pulse-glow" />
        <div className="grid-pattern absolute inset-0" />
      </div>

      <ReplayDemoButton
        onClick={handleReplay}
        isReplaying={isReplaying}
        className="fixed top-24 right-6 z-30"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center md:mb-14">
          <p className="text-sm font-medium tracking-widest text-accent uppercase">
            Interactive Demo
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Seriqon Voice™ Live Demo
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Watch a missed call turn into a booked appointment—with AI insights
            updating in real time.
          </p>
        </div>

        <VoiceFlagshipDemo playKey={playKey} />
      </div>
    </section>
  );
}
