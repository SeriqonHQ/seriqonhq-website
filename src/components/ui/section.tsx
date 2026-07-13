import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  label?: string;
  title?: string;
  description?: string;
  centered?: boolean;
}

export function Section({
  id,
  label,
  title,
  description,
  centered = true,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative py-20 md:py-32", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6">
        {(label || title || description) && (
          <div
            className={cn(
              "mb-12 md:mb-16",
              centered && "mx-auto max-w-2xl text-center"
            )}
          >
            {label && (
              <p className="mb-4 text-sm font-medium tracking-widest text-accent uppercase">
                {label}
              </p>
            )}
            {title && (
              <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg text-muted md:text-xl">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
