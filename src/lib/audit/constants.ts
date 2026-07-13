import {
  Building,
  Car,
  Heart,
  Home,
  MoreHorizontal,
  PawPrint,
  Scale,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

export type IndustryOption = {
  id: string;
  label: string;
  icon: LucideIcon;
  avgCustomerValue: number;
  conversionRate: number;
};

export const INDUSTRIES: IndustryOption[] = [
  {
    id: "dental",
    label: "Dental",
    icon: Stethoscope,
    avgCustomerValue: 800,
    conversionRate: 65,
  },
  {
    id: "medical",
    label: "Medical",
    icon: Heart,
    avgCustomerValue: 600,
    conversionRate: 60,
  },
  {
    id: "med-spa",
    label: "Med Spa",
    icon: Sparkles,
    avgCustomerValue: 500,
    conversionRate: 55,
  },
  {
    id: "veterinary",
    label: "Veterinary",
    icon: PawPrint,
    avgCustomerValue: 350,
    conversionRate: 58,
  },
  {
    id: "legal",
    label: "Legal",
    icon: Scale,
    avgCustomerValue: 2000,
    conversionRate: 45,
  },
  {
    id: "home-services",
    label: "Home Services",
    icon: Home,
    avgCustomerValue: 450,
    conversionRate: 62,
  },
  {
    id: "auto-repair",
    label: "Auto Repair",
    icon: Car,
    avgCustomerValue: 400,
    conversionRate: 60,
  },
  {
    id: "real-estate",
    label: "Real Estate",
    icon: Building,
    avgCustomerValue: 3000,
    conversionRate: 40,
  },
  {
    id: "other",
    label: "Other",
    icon: MoreHorizontal,
    avgCustomerValue: 400,
    conversionRate: 55,
  },
];

export const MISSED_PERIODS = [
  "Lunch",
  "Busy Hours",
  "After Hours",
  "Weekends",
  "Holidays",
  "While Assisting Customers",
] as const;

export const CALL_HANDLING = [
  "Receptionist",
  "Front Desk Staff",
  "Voicemail",
  "Answering Service",
  "Cell Phone",
  "Unsure",
] as const;

export const FRUSTRATIONS = [
  "Missed Leads",
  "Phone Tag",
  "Scheduling",
  "Answering FAQs",
  "After Hours Coverage",
  "Staff Interruptions",
  "Slow Response Times",
  "Lost Revenue",
] as const;
