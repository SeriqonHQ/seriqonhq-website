"use client";

import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReplayDemoButtonProps {
  onClick: () => void;
  className?: string;
  isReplaying?: boolean;
}

export function ReplayDemoButton({
  onClick,
  className,
  isReplaying = false,
}: ReplayDemoButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-4 py-2 text-sm font-medium text-muted backdrop-blur-xl transition-colors hover:border-border-hover hover:bg-surface-hover hover:text-foreground",
        className
      )}
      aria-label="Replay Demo"
    >
      <RotateCcw
        className={cn("h-4 w-4", isReplaying && "animate-spin")}
        aria-hidden="true"
      />
      Replay Demo
    </button>
  );
}
