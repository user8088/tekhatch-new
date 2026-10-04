"use client";

import { useRef } from "react";
import { useTick } from "@/lib/stage";
import { clamp, glyphs } from "@/lib/utils";
import { Pill } from "@/components/ui/Pill";

const aboutText =
  "We follow a user-centered, iterative process to create impactful digital experiences — research and ideation first, then wireframes, then production-ready applications that scale from 100 to 100K+ users.";

/** Characters of scrambled text at the edge of the scroll-driven reveal. */
const EDGE = 10;

const stats = [
  { label: "8-week MVP delivery", value: 100, suffix: "%", accent: "text-primary" },
  { label: "Projects shipped", value: 50, suffix: "+", accent: "text-secondary" },
  { label: "Uptime", value: 99, suffix: ".9%", accent: "text-primary" },
  { label: "Users at scale", value: 100, suffix: "K", accent: "text-secondary" },
];

export const AboutTekhatch = () => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const doneRef = useRef<HTMLSpanElement>(null);
  const edgeRef = useRef<HTMLSpanElement>(null);
  const restRef = useRef<HTMLSpanElement>(null);
  const lastKey = useRef("");

  // The paragraph decodes left to right as it scrolls through the viewport
  useTick((t) => {
    const text = textRef.current;
    if (!text || !doneRef.current || !edgeRef.current || !restRef.current) return;
    const vh = window.innerHeight;
    const r = text.getBoundingClientRect();
    const p = clamp((vh * 0.8 - r.top) / (r.height + vh * 0.3));
    const n = Math.floor(p * aboutText.length);
    const key = `${n}:${(t * 20) | 0}`;
    if (key === lastKey.current) return;
    lastKey.current = key;
    doneRef.current.textContent = aboutText.slice(0, n);
    edgeRef.current.textContent = p >= 1 ? "" : glyphs(aboutText.slice(n, n + EDGE));
    restRef.current.textContent = aboutText.slice(n + EDGE);
  });

  return (
    <section
      id="about"
      data-morph="1"
      data-glow="0.5"
      className="relative z-2 px-gutter pb-[clamp(80px,12vh,140px)] pt-[clamp(120px,20vh,220px)]"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-12">
        <Pill data-reveal="" dot="secondary" className="self-start">
          About Tekhatch
        </Pill>

        <p
          ref={textRef}
          className="font-display text-[clamp(24px,3.2vw,48px)] leading-tight tracking-[-0.03em] text-pretty"
        >
          <span className="sr-only">{aboutText}</span>
          <span ref={doneRef} aria-hidden="true" />
          <span ref={edgeRef} aria-hidden="true" className="text-primary" />
          <span ref={restRef} aria-hidden="true" className="text-foreground/16">
            {aboutText}
          </span>
        </p>

        <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-3">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal=""
              data-delay={i * 100}
              className="flex flex-col gap-7 rounded-[20px] border border-white/8 bg-[rgba(14,16,20,0.72)] p-7 backdrop-blur-[10px]"
            >
              <div className="flex justify-between text-sm text-[#9AA0A8]">
                <span>{stat.label}</span>
                <span className={stat.accent}>●</span>
              </div>
              <div className="font-display text-[clamp(44px,4.6vw,72px)] font-medium leading-none tracking-[-0.05em] tabular-nums">
                <span data-count={stat.value}>{stat.value}</span>
                <span className={stat.accent}>{stat.suffix}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
