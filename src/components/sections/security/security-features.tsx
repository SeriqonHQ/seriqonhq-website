import {
  Activity,
  Eye,
  KeyRound,
  Lock,
  Server,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

type SecurityCategory = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

const categories: SecurityCategory[] = [
  {
    title: "Data Security",
    icon: Shield,
    items: [
      "Encrypted in transit",
      "Encrypted at rest",
      "Secure cloud infrastructure",
      "Regular backups",
    ],
  },
  {
    title: "Access Control",
    icon: KeyRound,
    items: [
      "Role-based access",
      "Secure authentication",
      "Audit logs",
    ],
  },
  {
    title: "Privacy",
    icon: Eye,
    items: [
      "Customer conversations remain private",
      "Businesses control their own data",
      "No selling customer information",
    ],
  },
  {
    title: "Reliability",
    icon: Server,
    items: [
      "High availability",
      "Automatic monitoring",
      "Redundant infrastructure",
    ],
  },
];

export function SecurityFeatures() {
  return (
    <Section
      label="Built for Trust"
      title="Security designed for real businesses"
      description="Practical protections that help you serve customers confidently—without unnecessary complexity."
      className="pt-16 md:pt-24"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {categories.map((category, index) => {
          const Icon = category.icon;

          return (
            <Card key={category.title} glow={index === 0} hover>
              <div className="mb-4 inline-flex rounded-xl bg-accent-glow p-3 text-accent">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mb-4 text-xl font-semibold text-foreground">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                      <Lock className="h-3 w-3" aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-surface/80 p-6 text-center backdrop-blur-xl md:p-8">
        <div className="mx-auto flex max-w-2xl items-center justify-center gap-3 text-sm text-muted">
          <Activity className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          <p>
            Seriqon is built with security and privacy in mind. Specific
            requirements vary by industry—we&apos;re happy to discuss your
            business needs during a strategy session.
          </p>
        </div>
      </div>
    </Section>
  );
}
