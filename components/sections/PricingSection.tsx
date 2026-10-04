"use client";

import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$25,000",
    delivery: "3–4 week delivery",
    features: [
      "Basic web application development",
      "UI/UX wireframes & prototyping",
      "Database setup",
      "Cloud deployment (1 env)",
      "1 month technical support",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$75,000",
    delivery: "4–6 week delivery",
    features: [
      "Full-stack product development",
      "Data pipeline engineering",
      "Interactive dashboards",
      "Scalable cloud infrastructure",
      "3 months maintenance & support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$150,000",
    delivery: "6–8 week delivery",
    features: [
      "AI/ML model integration",
      "Financial & analytical systems",
      "Advanced security & compliance",
      "Multi-region architecture",
      "Dedicated engineering team",
    ],
    popular: false,
  },
];

// A soft spotlight follows the pointer across each card
const trackSpotlight = (e: React.MouseEvent<HTMLDivElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
};

export const PricingSection = () => {
  return (
    <section
      id="pricing"
      data-morph="4"
      data-glow="0.35"
      className="relative z-2 px-gutter py-[clamp(100px,14vh,160px)]"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-14">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 className="font-display text-[clamp(36px,5.4vw,88px)] font-medium leading-none tracking-[-0.045em]">
            <div data-mask="" className="overflow-hidden">
              <div>Choose your plan</div>
            </div>
          </h2>
          <p data-reveal="" className="max-w-[320px] text-[15px] leading-normal text-[#9AA0A8]">
            Custom pricing and delivery time based on project scope. Taxes may
            apply.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-3.5">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              data-reveal=""
              data-delay={i * 120}
              onMouseMove={trackSpotlight}
              className={cn(
                "relative rounded-[24px] p-px [--x:50%] [--y:50%]",
                plan.popular
                  ? "bg-[linear-gradient(160deg,#F97316,rgba(249,115,22,0.08)_50%,#0EA5E9)]"
                  : "bg-white/10"
              )}
            >
              <div className="relative flex h-full flex-col gap-[30px] overflow-hidden rounded-[23px] bg-panel-deep p-[34px]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_circle_at_var(--x)_var(--y),rgba(14,165,233,0.14),transparent_60%)]" />
                <div className="relative flex items-center justify-between gap-3">
                  <span className="text-lg font-medium">{plan.name}</span>
                  {plan.popular && (
                    <span className="rounded-[8px] bg-primary px-3 py-1.5 text-xs font-medium text-background">
                      Most popular
                    </span>
                  )}
                </div>
                <div className="relative flex flex-col gap-2.5">
                  <div className="font-display text-[clamp(40px,3.6vw,56px)] font-medium leading-none tracking-[-0.05em]">
                    {plan.price}
                  </div>
                  <div className="text-sm text-[#9AA0A8]">
                    per project · <span className="text-[#7DD3FC]">{plan.delivery}</span>
                  </div>
                </div>
                <div className="relative flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-baseline gap-3 text-[15px] text-[#C9CDD3]">
                      <span className="size-1.5 shrink-0 -translate-y-0.5 rounded-[2px] bg-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
                <a
                  href="#hatch"
                  className={cn(
                    "relative mt-auto flex justify-center rounded-[14px] px-6 py-4 text-[15px] font-medium",
                    plan.popular
                      ? "bg-primary text-background hover:bg-[#FB8A3C]"
                      : "bg-white/8 text-foreground hover:text-primary"
                  )}
                >
                  Start your project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
