import { Hero } from "@/components/sections/Hero";
import { AboutTekhatch } from "@/components/sections/AboutTekhatch";
import { FeaturedSolutions } from "@/components/sections/FeaturedSolutions";
import { ServicesScroller } from "@/components/sections/ServicesScroller";
import { CompanyMilestones } from "@/components/sections/CompanyMilestones";
import { PricingSection } from "@/components/sections/PricingSection";
import { VisionPhilosophy } from "@/components/sections/VisionPhilosophy";
import { InfrastructureNeural } from "@/components/sections/InfrastructureNeural";
import { ProcessForge } from "@/components/sections/ProcessForge";
import { WhyTekhatch } from "@/components/sections/WhyTekhatch";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <AboutTekhatch />
      <FeaturedSolutions />
      <WhyTekhatch />
      <CompanyMilestones />
      <ServicesScroller />
      <PricingSection />
      <VisionPhilosophy />
      <InfrastructureNeural />
      <ProcessForge />
    </div>
  );
}
