import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

interface SelectionCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  selected?: boolean;
  icon?: LucideIcon;
}

export function SelectionCard({
  label,
  selected = false,
  icon: Icon,
  className,
  ...props
}: SelectionCardProps) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-2xl border bg-surface p-5 text-left transition-all duration-300 hover:border-border-hover hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        selected
          ? "border-accent bg-accent/10 shadow-[0_0_30px_rgba(99,102,241,0.15)] ring-1 ring-accent/30"
          : "border-border",
        className
      )}
      aria-pressed={selected}
      {...props}
    >
      {Icon && (
        <span
          className={cn(
            "mb-3 inline-flex rounded-xl p-3 transition-colors",
            selected ? "bg-accent/20 text-accent" : "bg-accent-glow text-accent"
          )}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      )}
      <span className="block text-sm font-medium text-foreground">{label}</span>
    </button>
  );
}
