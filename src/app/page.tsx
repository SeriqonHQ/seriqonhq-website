import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { WhySeriqon } from "@/components/sections/why-seriqon";
import { Services } from "@/components/sections/services";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <WhySeriqon />
      <Services />
      <FAQ />
      <CTA />
      <Contact />
    </>
  );
}
