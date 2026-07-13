"use client";

import type { ReactNode } from "react";
import { FloatingCtaProvider } from "@/components/layout/floating-cta-context";
import { FloatingCta } from "@/components/layout/floating-cta";

export function FloatingCtaShell({ children }: { children: ReactNode }) {
  return (
    <FloatingCtaProvider>
      {children}
      <FloatingCta />
    </FloatingCtaProvider>
  );
}
