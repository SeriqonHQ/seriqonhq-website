import Link from "next/link";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/site";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/voice", label: "Seriqon Voice" },
  { href: "/demo", label: "Live Demo" },
  { href: "/audit", label: "ROI Calculator" },
  { href: "/security", label: "Security" },
  { href: "/book", label: "Book Audit" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <Logo size="lg" />
            <p className="mt-4 max-w-sm text-muted">
              Every workflow we build has one goal:
              <br />
              Give people more time for what matters.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {siteConfig.philosophy}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-foreground">
              Quick Links
            </h3>
            <nav aria-label="Quick links">
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            {siteConfig.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
