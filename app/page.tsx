import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { AboutTekhatch } from "@/components/sections/AboutTekhatch";
import { Chapter } from "@/components/sections/Chapter";
import { FeaturedSolutions } from "@/components/sections/FeaturedSolutions";
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";
import { Showreel } from "@/components/sections/Showreel";
import { WhyTekhatch } from "@/components/sections/WhyTekhatch";
import { CompanyMilestones } from "@/components/sections/CompanyMilestones";
import { ProcessForge } from "@/components/sections/ProcessForge";
import { PricingSection } from "@/components/sections/PricingSection";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Manifesto />
      <AboutTekhatch />
      <Chapter id="chapter-1" numeral="I" word="Innovate" morph={4}>
        Ideas, engineered. The products we have shipped for teams moving faster
        than their market.
      </Chapter>
      <FeaturedSolutions />
      <ServicesShowcase />
      <Showreel />
      <WhyTekhatch />
      <Chapter id="chapter-2" numeral="II" word="Evolve" morph={2}>
        Five years of compounding: from five clients in a spare room to $50M+
        raised by the founders we build with.
      </Chapter>
      <CompanyMilestones />
      <ProcessForge />
      <Chapter id="chapter-3" numeral="III" word="Thrive" morph={4}>
        Built to scale with you, from the first hundred users to the
        hundred-thousandth.
      </Chapter>
      <PricingSection />
      <Contact />
    </div>
  );
}
