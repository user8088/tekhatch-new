"use client";

import { useEffect, useRef, useState } from "react";
import { stage, useTick } from "@/lib/stage";
import { clamp, cn, scramble } from "@/lib/utils";
import { Pill } from "@/components/ui/Pill";

const solutions = [
  { title: "High-Speed Analytics", tags: "Analytics · Real-time", year: "2025", visual: "analytics dashboard" },
  { title: "Cyber Resilience", tags: "Security · AI", year: "2025", visual: "threat monitor UI" },
  { title: "Predictive Modeling", tags: "AI · ML", year: "2025", visual: "model forecast view" },
  { title: "Global Scalability", tags: "Infrastructure · Edge", year: "2025", visual: "edge network map" },
];

const STEP = 360 / solutions.length;

const glows = [
  "bg-[radial-gradient(60%_55%_at_30%_35%,rgba(249,115,22,0.45),transparent_70%),radial-gradient(50%_50%_at_80%_80%,rgba(14,165,233,0.25),transparent_70%)]",
  "bg-[radial-gradient(60%_55%_at_70%_30%,rgba(14,165,233,0.45),transparent_70%),radial-gradient(50%_50%_at_20%_85%,rgba(249,115,22,0.25),transparent_70%)]",
];

/** A ring of cards that turns with scroll; the card facing the viewer is named below it. */
export const FeaturedSolutions = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [front, setFront] = useState(0);

  useTick(() => {
    const section = sectionRef.current, ring = ringRef.current;
    if (!section || !ring) return;
    const vw = window.innerWidth, vh = window.innerHeight;
    const r = section.getBoundingClientRect();
    const p = clamp(-r.top / (r.height - vh));
    const radius = Math.min(480, vw * 0.42);
    const angle = p * (360 - STEP) + (stage.mouse.x / vw - 0.5) * 8;
    ring.style.setProperty("--rz", `${radius}px`);
    ring.style.transform = `translateZ(${-radius}px) rotateX(${-6 + (stage.mouse.y / vh - 0.5) * 6}deg) rotateY(${-angle}deg)`;
    Array.from(ring.children).forEach((card, i) => {
      const facing = Math.cos(((i * STEP - angle) * Math.PI) / 180);
      (card as HTMLElement).style.opacity = (0.18 + 0.82 * Math.max(0, facing)).toFixed(3);
    });
    const idx = clamp(Math.round(angle / STEP), 0, solutions.length - 1);
    if (idx !== front) setFront(idx);
  });

  useEffect(() => {
    if (titleRef.current) return scramble(titleRef.current, solutions[front].title, 600);
  }, [front]);

  return (
    <section
      ref={sectionRef}
      id="work"
      data-morph="4"
      data-glow="0.35"
      className="relative z-2 h-[360vh]"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-[clamp(24px,5vh,56px)] overflow-hidden px-5">
        <Pill>Featured solutions</Pill>

        <div className="relative flex h-[min(46vh,380px)] w-full items-center justify-center perspective-[1800px]">
          <div
            ref={ringRef}
            className="relative h-[min(46vh,300px)] w-[min(440px,72vw)] transform-3d will-change-transform"
          >
            {solutions.map((solution, i) => (
              <a
                key={solution.title}
                href="#work"
                className="absolute inset-0 overflow-hidden rounded-[22px] border border-white/14 bg-panel text-foreground"
                style={{ transform: `rotateY(${i * STEP}deg) translateZ(var(--rz, 480px))` }}
              >
                <div className={cn("absolute inset-0", glows[i % 2])} />
                <div className="absolute inset-0 hatch-lines" />
                <div className="absolute inset-x-[18px] top-[18px] flex justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-[#C9CDD3]">
                  <span>[ {solution.visual} ]</span>
                  <span>{solution.year}</span>
                </div>
                <div className="absolute bottom-4 left-[18px] font-display text-[clamp(20px,2vw,28px)] font-medium tracking-[-0.03em]">
                  {solution.title}
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3.5 text-center">
          <div
            ref={titleRef}
            className="font-display text-[clamp(28px,4.4vw,68px)] font-medium leading-none tracking-[-0.045em]"
          >
            {solutions[0].title}
          </div>
          <div className="text-[15px] text-[#9AA0A8]">{solutions[front].tags}</div>
          <div className="mt-1.5 flex gap-2">
            {solutions.map((solution, i) => (
              <span
                key={solution.title}
                className={cn(
                  "h-[3px] w-7 rounded-[2px] transition-colors duration-300",
                  i === front ? "bg-primary" : "bg-white/15"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
