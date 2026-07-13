"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useFloatingCta } from "@/components/layout/floating-cta-context";
import { cn } from "@/lib/utils";

const SCROLL_SHOW_THRESHOLD = 400;

export function FloatingCta() {
  const pathname = usePathname();
  const { auditPhase } = useFloatingCta();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= SCROLL_SHOW_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldHide =
    pathname === "/book" ||
    pathname === "/admin" ||
    (pathname === "/time-recovery-audit" &&
      (auditPhase === "form" || auditPhase === "analyzing"));

  const isVisible = isScrolled && !shouldHide;

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          key="floating-cta"
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.94 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={cn(
            "fixed z-40",
            "bottom-4 left-1/2 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2",
            "md:bottom-6 md:left-auto md:right-6 md:w-auto md:max-w-none md:translate-x-0"
          )}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Link
              href="/book"
              className={cn(
                "group flex items-center gap-3 rounded-2xl border border-border bg-surface/95 px-4 py-3 backdrop-blur-xl",
                "shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-all duration-300",
                "hover:border-accent/40 hover:bg-surface-hover hover:shadow-[0_0_32px_rgba(99,102,241,0.28)]",
                "md:rounded-full md:px-5 md:py-3.5"
              )}
              aria-label="Request Live Demo — 30-minute strategy session"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-glow text-accent transition-colors duration-300 group-hover:bg-accent/25">
                <Phone className="h-4 w-4" />
              </span>
              <span className="min-w-0 text-left">
                <span className="block font-medium text-foreground">
                  Request Live Demo
                </span>
                <span className="block text-xs text-muted-foreground">
                  30-minute strategy session
                </span>
              </span>
            </Link>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
