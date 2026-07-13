"use client";

import { useState, useEffect } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#why-seriqon", label: "Why Seriqon" },
  { href: "#services", label: "Services" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20"
        aria-label="Main navigation"
      >
        <a
          href="/"
          className="relative z-50 transition-opacity hover:opacity-80"
          aria-label="Seriqon, return to homepage"
        >
          <Logo />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button href="#contact" size="sm">
            Book Your Time Recovery Audit
          </Button>
        </div>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <div className="flex w-5 flex-col gap-1.5" aria-hidden="true">
            <span
              className={cn(
                "h-0.5 w-full bg-foreground transition-all duration-300",
                isOpen && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={cn(
                "h-0.5 w-full bg-foreground transition-all duration-300",
                isOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "h-0.5 w-full bg-foreground transition-all duration-300",
                isOpen && "-translate-y-2 -rotate-45"
              )}
            />
          </div>
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-xl transition-all duration-300 md:hidden",
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        )}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-1 flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-2xl font-medium text-foreground transition-colors hover:text-accent"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button
            href="#contact"
            size="lg"
            onClick={() => setIsOpen(false)}
          >
            Book Your Time Recovery Audit
          </Button>
        </div>
      </div>
    </header>
  );
}
