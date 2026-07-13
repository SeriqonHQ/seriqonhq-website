"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <Section
      id="contact"
      label="Contact"
      title="Let's get your time back."
      description="Tell us where your team loses time. We'll show you how to get it back."
      centered={false}
    >
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <div className="space-y-8">
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Email
              </h3>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-xl text-foreground transition-colors hover:text-accent"
              >
                {siteConfig.email}
              </a>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                What to expect
              </h3>
              <ul className="space-y-3 text-muted">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  30-minute Time Recovery Audit
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  Custom automation roadmap
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  ROI projection with time savings
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  No obligation, no pressure
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
          {submitted ? (
            <div
              className="flex h-full min-h-[400px] flex-col items-center justify-center text-center"
              role="status"
              aria-live="polite"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-glow">
                <svg
                  className="h-8 w-8 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Thank you!
              </h3>
              <p className="mt-2 text-muted">
                We&apos;ll be in touch within one business day.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              aria-label="Request a Time Recovery Audit"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="First name"
                  name="firstName"
                  autoComplete="given-name"
                  required
                />
                <FormField
                  label="Last name"
                  name="lastName"
                  autoComplete="family-name"
                  required
                />
              </div>
              <FormField
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
              <FormField
                label="Company"
                name="company"
                autoComplete="organization"
                required
              />
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  How can we help?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className={inputClasses}
                  placeholder="Tell us about your biggest time drains..."
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Book Your Time Recovery Audit
              </Button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}

const inputClasses = cn(
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground",
  "placeholder:text-muted-foreground",
  "transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
);

function FormField({
  label,
  name,
  type = "text",
  autoComplete,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className={inputClasses}
      />
    </div>
  );
}
