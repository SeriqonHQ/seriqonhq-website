import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
}

export function Card({
  className,
  hover = true,
  glow = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-border bg-surface p-6 md:p-8",
        hover && "transition-all duration-300 hover:border-border-hover hover:bg-surface-hover",
        glow && "before:absolute before:inset-0 before:rounded-2xl before:bg-accent-glow before:opacity-0 before:transition-opacity hover:before:opacity-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
