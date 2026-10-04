"use client";

import { useRef } from "react";
import { useTick } from "@/lib/stage";
import { clamp } from "@/lib/utils";

const problems = [
  "6+ month development cycles burning runway",
  "Unreliable freelancers with broken code",
  "Technical debt costing 10× more later",
  "Missing AI features competitors have",
  "Amateur-looking products",
];

const fixes = [
  "Milestone-based delivery & payment",
  "AI-powered development included",
  "8-week MVP delivery guaranteed",
  "Scalable from 100 to 100K+ users",
  "30-day post-launch guarantee",
];

const panel = "flex flex-col p-[clamp(28px,4vw,56px)]";
const heading = "mb-6 flex font-mono text-xs uppercase tracking-[0.14em]";
const row =
  "whitespace-nowrap border-t py-[clamp(14px,2vh,22px)] font-display text-[clamp(16px,2.1vw,32px)] tracking-[-0.03em]";

/** Before/after panel: the pointer drags a divider between life without and with Tekhatch. */
export const WhyTekhatch = () => {
  const withRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const split = useRef({ current: 50, target: 50 });

  const onPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    split.current.target = clamp(((e.clientX - r.left) / r.width) * 100, 4, 96);
  };

  useTick(() => {
    if (!withRef.current || !handleRef.current) return;
    const s = split.current;
    s.current += (s.target - s.current) * 0.12;
    withRef.current.style.clipPath = `inset(0 ${100 - s.current}% 0 0)`;
    handleRef.current.style.left = `${s.current}%`;
  });

  return (
    <section
      id="why"
      data-morph="0"
      data-glow="0.3"
      className="relative z-2 px-gutter py-[clamp(80px,12vh,140px)]"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 className="font-display text-[clamp(32px,4.6vw,76px)] font-medium leading-[1.02] tracking-[-0.045em]">
            <div data-mask="" className="overflow-hidden">
              <div>Built for founders</div>
            </div>
            <div data-mask="" className="overflow-hidden">
              <div>
                who can&apos;t afford <span className="text-primary">to miss.</span>
              </div>
            </div>
          </h2>
          <p data-reveal="" className="max-w-[360px] text-[15px] leading-normal text-[#9AA0A8]">
            Move across the panel to compare. Left of the line is how it goes
            with Tekhatch.
          </p>
        </div>

        <div
          onPointerMove={onPointer}
          onPointerDown={onPointer}
          className="relative touch-pan-y select-none overflow-hidden rounded-[28px] border border-white/12 bg-panel-deep"
        >
          <div className={panel}>
            <div className={`${heading} justify-end text-[#7C828B]`}>Without Tekhatch</div>
            {problems.map((problem) => (
              <div
                key={problem}
                className={`${row} border-white/7 text-[#5E646D] line-through decoration-[rgba(229,72,77,0.7)] decoration-2`}
              >
                {problem}
              </div>
            ))}
          </div>

          <div
            ref={withRef}
            className={`${panel} absolute inset-0 bg-[linear-gradient(120deg,#1A0F08,#0B0C10_70%)]`}
            style={{ clipPath: "inset(0 50% 0 0)" }}
          >
            <div className={`${heading} justify-start text-primary`}>With Tekhatch</div>
            {fixes.map((fix) => (
              <div key={fix} className={`${row} border-primary/18 text-foreground`}>
                {fix}
              </div>
            ))}
          </div>

          <div
            ref={handleRef}
            className="pointer-events-none absolute inset-y-0 left-1/2 -ml-px w-0.5 bg-primary shadow-[0_0_24px_rgba(249,115,22,0.7)]"
          >
            <div className="absolute left-1/2 top-1/2 -ml-[26px] -mt-[26px] flex size-[52px] items-center justify-center rounded-full bg-primary text-lg font-semibold text-background">
              ⟷
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
