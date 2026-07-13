import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { BookHero } from "@/components/sections/book/book-hero";
import { BookFeatures } from "@/components/sections/book/book-features";
import { BookScheduling } from "@/components/sections/book/book-scheduling";
import { BookFAQ } from "@/components/sections/book/book-faq";
import { BookCTA } from "@/components/sections/book/book-cta";

const description =
  "Schedule a free 30-minute Time Recovery Audit™ strategy call. Review your missed call process, estimate revenue recovery, and see how Seriqon Voice™ fits your business.";

export const metadata: Metadata = {
  title: "Book Your Time Recovery Audit™",
  description,
  alternates: {
    canonical: "/book",
  },
  openGraph: {
    title: "Book Your Time Recovery Audit™ | Seriqon",
    description,
    url: `${siteConfig.url}/book`,
  },
};

export default function BookPage() {
  return (
    <>
      <BookHero />
      <BookFeatures />
      <BookScheduling />
      <BookFAQ />
      <BookCTA />
    </>
  );
}
