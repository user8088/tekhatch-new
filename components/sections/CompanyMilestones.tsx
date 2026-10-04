"use client";

import { useRef, useState } from "react";
import { stage, useTick } from "@/lib/stage";
import { cn } from "@/lib/utils";
import { Pill } from "@/components/ui/Pill";

const milestones = [
  {
    year: "2020",
    theme: "Tekhatch Founded",
    description:
      "Started with a mission to eliminate startup development frustrations. First 5 clients onboarded.",
  },
  {
    year: "2021",
    theme: "AI Integration Focus",
    description:
      "Became early adopters of AI/ML integration for startups. Delivered first 20 successful projects.",
  },
  {
    year: "2022",
    theme: "Rapid Growth",
    description:
      "Reached $10M+ in client funding raised. Expanded team to 15+ specialists. AWS Partnership achieved.",
  },
  {
    year: "2023",
    theme: "Market Leadership",
    description:
      "50+ successful launches. First client acquired for $5M. SOC 2 compliance achieved.",
  },
  {
    year: "2024",
    theme: "Innovation & Scale",
    description:
      "$50M+ total funding raised by clients. Advanced AI capabilities. International expansion began.",
  },
];

/** A pinned year odometer on the left that rolls as the milestones scroll past on the right. */
export const CompanyMilestones = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useTick(() => {
    const list = listRef.current;
    if (!list) return;
    const vh = window.innerHeight;
    let idx = 0;
    Array.from(list.children).forEach((item, i) => {
      if (item.getBoundingClientRect().top < vh * 0.55) idx = i;
    });
    stage.milestone = idx;
    if (idx !== active) setActive(idx);
  });

  return (
    <section id="story" data-morph="2" data-glow="0.6" className="relative z-2 px-gutter">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-10">
        <div className="sticky top-0 flex h-screen flex-col justify-center gap-7">
          <Pill dot="secondary" className="self-start">
            Evolution so far
          </Pill>
          <div className="flex h-[1em] overflow-hidden font-display text-[clamp(88px,12vw,200px)] font-medium leading-none tracking-[-0.06em]">
            <span>20</span>
            <div className="h-[1em] overflow-hidden">
              <div
                className="flex flex-col text-secondary transition-transform duration-[900ms] ease-hatch"
                style={{ transform: `translateY(${(-active * 100) / milestones.length}%)` }}
              >
                {milestones.map((m) => (
                  <span key={m.year}>{m.year.slice(2)}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex max-w-[360px] gap-1.5">
            {milestones.map((m, i) => (
              <span
                key={m.year}
                className={cn(
                  "h-1 flex-1 rounded-[2px] transition-colors duration-[400ms]",
                  i <= active ? "bg-secondary" : "bg-white/12"
                )}
              />
            ))}
          </div>
        </div>

        <div ref={listRef} className="py-[30vh]">
          {milestones.map((m, i) => (
            <div
              key={m.year}
              className={cn(
                "flex min-h-[62vh] flex-col justify-center gap-4 transition-[opacity,translate] duration-[600ms] ease-hatch",
                i === active ? "opacity-100" : "translate-x-4 opacity-20"
              )}
            >
              <span className="self-start rounded-[8px] bg-secondary/14 px-3 py-1.5 font-mono text-xs text-[#7DD3FC]">
                {m.year}
              </span>
              <h3 className="font-display text-[clamp(28px,3vw,48px)] font-medium leading-[1.05] tracking-[-0.04em]">
                {m.theme}
              </h3>
              <p className="max-w-[480px] text-lg leading-[1.55] text-[#B9BDC4] text-pretty">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
