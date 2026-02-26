"use client";

import { Lightbulb, Code2, Rocket } from "lucide-react";
import { FadeAnim } from "@/components/ui/FadeAnim";

const steps = [
  {
    icon: Lightbulb,
    num: "01",
    title: "Ideate",
    desc: "We distill complex problems into elegant architectural blueprints.",
  },
  {
    icon: Code2,
    num: "02",
    title: "Engineer",
    desc: "Precision-crafted code built for massive scale and zero-latency.",
  },
  {
    icon: Rocket,
    num: "03",
    title: "Deploy",
    desc: "Global distribution across a resilient, edge-native infrastructure.",
  },
];

export const ProcessForge = () => {
  return (
    <section className="relative py-28 overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Left: Visual block */}
          <div className="lg:col-span-5">
            <FadeAnim delay={0.3} className="relative">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-12 h-24 bg-primary rounded-tl-lg rounded-bl-lg shrink-0" />
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/60 border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                      <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Understand the problem, users, and business objectives.
              </p>
            </FadeAnim>
          </div>
          {/* Right: Title */}
          <div className="lg:col-span-7 flex items-center">
            <FadeAnim delay={0.5} className="text-4xl md:text-6xl lg:text-7xl font-medium text-foreground leading-tight">
              The Forge
              <br />
              <span className="text-primary">What We Do</span>
            </FadeAnim>
          </div>
        </div>

        {/* Divider */}
        <FadeAnim delay={0.2} className="mb-16 overflow-hidden">
          <svg viewBox="0 0 1320 6" fill="none" className="w-full max-w-full h-1.5">
            <path
              d="M5 2.5L0 0.113249V5.88675L5 3.5V2.5ZM1315 3.5L1320 5.88675V0.113249L1315 2.5V3.5ZM4.5 3.5H1315.5V2.5H4.5V3.5Z"
              fill="white"
              fillOpacity="0.1"
            />
          </svg>
        </FadeAnim>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <FadeAnim
                key={step.num}
                delay={0.3 + i * 0.2}
                fadeFrom="left"
                className="text-center"
              >
                <span className="inline-block w-14 h-14 rounded-full bg-primary text-black font-bold text-lg flex items-center justify-center mx-auto mb-8">
                  {step.num}
                </span>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-medium text-foreground leading-snug mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </FadeAnim>
            );
          })}
        </div>

        {/* CTA */}
        <FadeAnim delay={0.5} fadeFrom="bottom" ease="bounce" className="mt-16 text-center">
          <p className="text-muted-foreground text-lg mb-6">
            Don&apos;t hesitate to collaborate with expertise—{" "}
            <a
              href="#contact"
              className="text-primary font-semibold hover:underline inline-flex items-center gap-2"
            >
              Let&apos;s Talk
              <svg
                width="20"
                height="10"
                viewBox="0 0 25 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline"
              >
                <path
                  d="M18.675 9.91054L24.72 5.63362C24.806 5.56483 24.8766 5.47086 24.9255 5.36023C24.9744 5.2496 25 5.12579 25 5C25 4.87421 24.9744 4.7504 24.9255 4.63977C24.8766 4.52914 24.806 4.43518 24.72 4.36638L18.675 0.0894619C18.5572 0.0111909 18.4215 -0.0168364 18.2892 0.00979851C18.157 0.0364334 18.0358 0.116215 17.9446 0.236567C17.8535 0.356918 17.7977 0.510993 17.7859 0.674501C17.7742 0.838009 17.8072 1.00165 17.8798 1.13963L19.633 4.26665L0.598757 4.26665C0.439957 4.26665 0.287661 4.34391 0.175371 4.48144C0.0630817 4.61897 0 4.8055 0 5C0 5.1945 0.0630817 5.38103 0.175371 5.51856C0.287661 5.65609 0.439957 5.73335 0.598757 5.73335L19.633 5.73335L17.8798 8.86038C17.8072 8.99835 17.7742 9.16199 17.7859 9.3255C17.7977 9.48901 17.8535 9.64308 17.9446 9.76343C18.0358 9.88378 18.157 9.96357 18.2892 9.9902C18.4215 10.0168 18.5572 9.98881 18.675 9.91054Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </p>
        </FadeAnim>
      </div>
    </section>
  );
};
