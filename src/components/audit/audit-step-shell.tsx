import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface AuditStepShellProps {
  title: string;
  helper?: string;
  children: ReactNode;
  className?: string;
}

export function AuditStepShell({
  title,
  helper,
  children,
  className,
}: AuditStepShellProps) {
  return (
    <div className={cn("mx-auto w-full max-w-2xl", className)}>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {helper && <p className="mt-3 text-muted">{helper}</p>}
      <div className="mt-8 md:mt-10">{children}</div>
    </div>
  );
}
