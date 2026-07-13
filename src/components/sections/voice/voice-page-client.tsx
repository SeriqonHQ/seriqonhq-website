"use client";

import { useState } from "react";
import { ReplayDemoButton } from "@/components/layout/replay-demo-button";
import { VoiceHero } from "@/components/sections/voice/voice-hero";
import { VoiceCalculator } from "@/components/sections/voice/voice-calculator";
import { VoiceDemo } from "@/components/sections/voice/voice-demo";
import { VoiceProblem } from "@/components/sections/voice/voice-problem";
import { VoiceWorkflow } from "@/components/sections/voice/voice-workflow";
import { VoiceBenefits } from "@/components/sections/voice/voice-benefits";
import { VoiceIndustries } from "@/components/sections/voice/voice-industries";
import { VoiceFAQ } from "@/components/sections/voice/voice-faq";
import { VoiceCTA } from "@/components/sections/voice/voice-cta";

export function VoicePageClient() {
  const [playKey, setPlayKey] = useState(0);
  const [isReplaying, setIsReplaying] = useState(false);

  const handleReplay = () => {
    setIsReplaying(true);
    setPlayKey((current) => current + 1);
    window.setTimeout(() => setIsReplaying(false), 600);
  };

  return (
    <>
      <ReplayDemoButton
        onClick={handleReplay}
        isReplaying={isReplaying}
        className="fixed top-24 right-6 z-30"
      />
      <VoiceHero />
      <VoiceCalculator />
      <VoiceDemo playKey={playKey} />
      <VoiceProblem />
      <VoiceWorkflow />
      <VoiceBenefits />
      <VoiceIndustries />
      <VoiceFAQ />
      <VoiceCTA />
    </>
  );
}
