"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/voice", label: "Seriqon Voice" },
  { href: "/demo", label: "Live Demo" },
  { href: "/audit", label: "Time Recovery Audit" },
  { href: "/security", label: "Security" },
] as const;

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href;
}

export function Navbar() {
  const pathname = usePathname();
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

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
        <Link
          href="/"
          className="relative z-50 transition-opacity hover:opacity-80"
          aria-label="Seriqon, return to homepage"
        >
          <Logo />
        </Link>

        <div className="hidden items-center gap-6 lg:gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = isActiveRoute(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors",
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted hover:text-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <Button href="/book" size="sm">
            Book Audit
          </Button>
        </div>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
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
          "fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-xl transition-all duration-300 lg:hidden",
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        )}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-1 flex-col items-center justify-center gap-8">
          {navLinks.map((link) => {
            const isActive = isActiveRoute(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-2xl font-medium transition-colors hover:text-accent",
                  isActive ? "text-accent" : "text-foreground"
                )}
                onClick={() => setIsOpen(false)}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
          <Button
            href="/book"
            size="lg"
            onClick={() => setIsOpen(false)}
          >
            Book Audit
          </Button>
        </div>
      </div>
    </header>
  );
}
