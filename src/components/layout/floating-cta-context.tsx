"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AuditPhase = "form" | "analyzing" | "report" | null;

type FloatingCtaContextValue = {
  auditPhase: AuditPhase;
  setAuditPhase: (phase: AuditPhase) => void;
};

const FloatingCtaContext = createContext<FloatingCtaContextValue | null>(null);

export function FloatingCtaProvider({ children }: { children: ReactNode }) {
  const [auditPhase, setAuditPhaseState] = useState<AuditPhase>(null);

  const setAuditPhase = useCallback((phase: AuditPhase) => {
    setAuditPhaseState(phase);
  }, []);

  const value = useMemo(
    () => ({
      auditPhase,
      setAuditPhase,
    }),
    [auditPhase, setAuditPhase]
  );

  return (
    <FloatingCtaContext.Provider value={value}>
      {children}
    </FloatingCtaContext.Provider>
  );
}

export function useFloatingCta() {
  const context = useContext(FloatingCtaContext);

  if (!context) {
    throw new Error("useFloatingCta must be used within FloatingCtaProvider");
  }

  return context;
}
