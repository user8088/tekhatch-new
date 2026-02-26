"use client";

import { Zap, Rocket, Shield, Globe } from "lucide-react";
import { FadeAnim } from "@/components/ui/FadeAnim";
import { TextInvert } from "@/components/ui/TextInvert";

const stats = [
  {
    icon: Zap,
    label: "8-Week MVP",
    value: "100",
    suffix: "%",
    color: "text-primary",
  },
  {
    icon: Rocket,
    label: "Projects Shipped",
    value: "50",
    suffix: "+",
    color: "text-secondary",
  },
  {
    icon: Shield,
    label: "Zero-Latency",
    value: "99",
    suffix: ".9%",
    color: "text-primary",
  },
  {
    icon: Globe,
    label: "Global Scale",
    value: "100",
    suffix: "K",
    color: "text-secondary",
  },
];

export const AboutTekhatch = () => {
  return (
    <section className="relative py-28 overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        <div className="flex justify-center">
          <div className="max-w-3xl text-center mb-12">
            <FadeAnim delay={0} className="text-primary font-semibold tracking-[0.25em] text-sm uppercase block mb-4">
              About Tekhatch
            </FadeAnim>
            <TextInvert
              className="text-2xl md:text-4xl lg:text-3xl font-normal leading-[1.2]"
              lightColor="#F8FAFC"
              mutedColor="#64748B"
            >
              We follow a user-centered, iterative process to create impactful digital experiences. We start with research & ideation, turning insights into wireframes and production-ready applications that scale from 100 to 100K+ users.
            </TextInvert>
          </div>
        </div>

        {/* Ornamental divider */}
        <FadeAnim delay={0.2} className="mb-16 overflow-hidden">
          <svg
            viewBox="0 0 1320 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-full h-1.5"
          >
            <path
              d="M5 2.5L0 0.113249V5.88675L5 3.5V2.5ZM1315 3.5L1320 5.88675V0.113249L1315 2.5V3.5ZM4.5 3.5H1315.5V2.5H4.5V3.5Z"
              fill="white"
              fillOpacity="0.1"
            />
          </svg>
        </FadeAnim>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <FadeAnim
                key={stat.label}
                delay={0.1 * i}
                fadeFrom="bottom"
                className="flex items-center gap-6"
              >
                <span className="shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </span>
                <div>
                  <span className="text-foreground font-medium text-sm block">
                    {stat.label}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                    {stat.value}
                    {stat.suffix}
                  </h3>
                </div>
              </FadeAnim>
            );
          })}
        </div>
      </div>
    </section>
  );
};
