"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const services = [
  {
    num: "01",
    title: "Custom Web & Mobile Apps",
    desc: "Full-stack, investor-ready apps with rock-solid infra and responsive UX on every screen. Product-grade engineering for your first 100k users.",
    tags: ["Full-stack", "Cloud", "Security"],
    visual: "app product shot",
  },
  {
    num: "02",
    title: "AI Integration & Automation",
    desc: "Drop AI into your product: chatbots, predictions and automation tuned to your data. Turn manual workflows into intelligent systems.",
    tags: ["Chatbots", "Analytics", "Automation"],
    visual: "AI assistant UI",
  },
  {
    num: "03",
    title: "MVP Development & Strategy",
    desc: "From idea to clickable, demo-ready MVP with analytics and launch strategy dialed in. Launch a fundable product fast.",
    tags: ["Lean MVP", "UX", "Launch"],
    visual: "MVP launch screens",
  },
];

const glows = [
  "bg-[radial-gradient(60%_55%_at_30%_35%,rgba(249,115,22,0.45),transparent_70%),radial-gradient(50%_50%_at_80%_80%,rgba(14,165,233,0.25),transparent_70%)]",
  "bg-[radial-gradient(60%_55%_at_70%_30%,rgba(14,165,233,0.45),transparent_70%),radial-gradient(50%_50%_at_20%_85%,rgba(249,115,22,0.25),transparent_70%)]",
];

/** Accordion of service panels: a row on wide screens, a stack below 1100px. */
export const ServicesShowcase = () => {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="services"
      data-morph="3"
      data-glow="0.45"
      className="relative z-2 px-gutter py-[clamp(100px,16vh,180px)]"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-14">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 className="font-display text-[clamp(36px,5.4vw,88px)] font-medium leading-none tracking-[-0.045em]">
            <div data-mask="" className="overflow-hidden">
              <div>Three ways</div>
            </div>
            <div data-mask="" className="overflow-hidden">
              <div>
                we <span className="text-secondary">build.</span>
              </div>
            </div>
          </h2>
          <p data-reveal="" className="max-w-[400px] text-[17px] leading-normal text-[#B9BDC4]">
            We help brands build intuitive, user-friendly digital products
            through a strategic design approach. Hover a panel to open it.
          </p>
        </div>

        <div className="flex flex-col gap-3 min-[1101px]:min-h-[64vh] min-[1101px]:flex-row">
          {services.map((service, i) => {
            const on = i === open;
            return (
              <div
                key={service.num}
                data-reticle=""
                onMouseEnter={() => setOpen(i)}
                onClick={() => setOpen(i)}
                className={cn(
                  "relative min-w-0 overflow-hidden rounded-[24px] border bg-panel transition-[flex,border-color,min-height] duration-[800ms] ease-hatch min-[1101px]:min-h-0",
                  on
                    ? "min-h-[420px] flex-[2.6_1_0] border-primary/50"
                    : "min-h-[140px] flex-[1_1_0] border-white/10"
                )}
              >
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-[800ms]",
                    glows[i % 2],
                    on ? "opacity-100" : "opacity-25"
                  )}
                />
                <div className="absolute inset-0 hatch-lines" />
                <div className="relative flex h-full flex-col justify-between gap-6 p-[clamp(22px,2.4vw,36px)]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex size-10 items-center justify-center rounded-[12px] border border-white/20 font-mono text-[13px]">
                      {service.num}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[11px] uppercase tracking-[0.12em] text-[#C9CDD3] transition-opacity duration-500",
                        on ? "opacity-100" : "opacity-0"
                      )}
                    >
                      [ {service.visual} ]
                    </span>
                  </div>
                  <div className="flex flex-col gap-[18px]">
                    <h3
                      className={cn(
                        "max-w-[14ch] hyphens-auto font-display text-[clamp(22px,2.4vw,40px)] font-medium leading-[1.05] tracking-[-0.035em] wrap-anywhere transition-[font-size] duration-[600ms] ease-hatch",
                        !on && "min-[1101px]:text-[clamp(18px,1.5vw,26px)]"
                      )}
                    >
                      {service.title}
                    </h3>
                    <div
                      className={cn(
                        "flex max-w-[460px] flex-col gap-4 transition-[opacity,translate] duration-[800ms] ease-hatch",
                        on ? "opacity-100" : "translate-y-4 opacity-0"
                      )}
                    >
                      <p className="leading-normal text-[#C3C7CD]">{service.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-[8px] bg-white/8 px-3 py-1.5 text-xs text-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
