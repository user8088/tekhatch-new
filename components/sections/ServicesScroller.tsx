"use client";

import { Smartphone, Bot, Rocket, ArrowRight } from "lucide-react";
import { FadeAnim } from "@/components/ui/FadeAnim";
import { TextInvert } from "@/components/ui/TextInvert";

const services = [
  {
    num: "01",
    title: "Custom Web & Mobile Apps",
    desc: "Full-stack, investor-ready apps with rock-solid infra and responsive UX on every screen. Product-grade engineering for your first 100k users.",
    tags: ["Full-stack", "Cloud", "Security"],
    icon: Smartphone,
    gradient: "from-sky-500/20 to-cyan-500/10",
  },
  {
    num: "02",
    title: "AI Integration & Automation",
    desc: "Drop AI into your product: chatbots, predictions, and automation tuned to your data. Turn manual workflows into intelligent systems.",
    tags: ["Chatbots", "Analytics", "Automation"],
    icon: Bot,
    gradient: "from-violet-500/20 to-purple-500/10",
  },
  {
    num: "03",
    title: "MVP Development & Strategy",
    desc: "From idea to clickable, demo-ready MVP with analytics and launch strategy dialed in. Launch a fundable product fast.",
    tags: ["Lean MVP", "UX", "Launch"],
    icon: Rocket,
    gradient: "from-amber-500/20 to-orange-500/10",
  },
];

export const ServicesScroller = () => {
  return (
    <section id="services" className="relative py-28 overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-5">
            <FadeAnim delay={0} className="text-primary font-medium tracking-[0.2em] text-sm uppercase block mb-4">
              What We Do
            </FadeAnim>
            <FadeAnim delay={0.1} className="flex items-center gap-2 mb-4">
              <svg
                width="33"
                height="16"
                viewBox="0 0 33 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M16.6209 4.29153e-05C7.77239 4.29153e-05 0.599251 6.84014 0.599251 15.2778H32.6426C32.6426 6.84014 25.4694 4.29153e-05 16.6209 4.29153e-05Z"
                  fill="white"
                />
              </svg>
              <svg
                width="67"
                height="44"
                viewBox="0 0 67 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path d="M67 0.25H0V44L67 0.25Z" fill="#7D5DFF" />
              </svg>
            </FadeAnim>
          </div>
          <div className="lg:col-span-7">
            <TextInvert
              className="text-3xl md:text-5xl font-normal leading-[1.2]"
              lightColor="#F8FAFC"
              mutedColor="#64748B"
            >
              We help brands build intuitive and user-friendly digital products through a strategic design approach.
            </TextInvert>
          </div>
        </div>

        {/* Service panels */}
        <div id="services-pin" className="space-y-24">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <FadeAnim
                key={service.num}
                delay={0.2 + i * 0.1}
                fadeFrom="right"
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                <div className="lg:col-span-1">
                  <span className="text-xl font-medium text-muted-foreground uppercase">
                    {service.num}.
                  </span>
                </div>
                <div className="lg:col-span-7">
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium uppercase text-foreground mb-6">
                    <a href="#services" className="hover:text-primary transition-colors">
                      {service.title}
                    </a>
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {service.desc}
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-medium text-sm hover:bg-primary transition-colors"
                  >
                    See Our Services
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <div className="flex flex-wrap gap-3 mt-8">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 rounded-full border border-white/20 text-sm text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-4 flex justify-end">
                  <div
                    className={`w-full max-w-xs aspect-square rounded-2xl overflow-hidden bg-gradient-to-br ${service.gradient} border border-white/10 flex items-center justify-center`}
                  >
                    <Icon className="w-24 h-24 text-white/30" />
                  </div>
                </div>
              </FadeAnim>
            );
          })}
        </div>
      </div>
    </section>
  );
};
