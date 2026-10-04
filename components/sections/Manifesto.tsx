"use client";

import { useRef, useState } from "react";
import { stage, useTick } from "@/lib/stage";
import { clamp } from "@/lib/utils";

const dim = "text-[#6B717A]";

const lines = [
  <>
    Every idea starts as a <span className={dim}>closed box.</span>
  </>,
  <>
    Full of potential. <span className={dim}>Impossible to see inside.</span>
  </>,
  <>
    We <span className="text-primary">hatch it open</span> and engineer what&apos;s inside to scale.
  </>,
];

export const Manifesto = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(-1);

  useTick(() => {
    const section = sectionRef.current;
    if (!section || !barRef.current) return;
    const vh = window.innerHeight;
    const r = section.getBoundingClientRect();
    const p = clamp(-r.top / (r.height - vh));
    stage.manifesto = r.top < vh && r.bottom > 0 ? p : r.top >= vh ? 0 : 1;
    barRef.current.style.transform = `scaleX(${p})`;
    const k = Math.min(lines.length - 1, Math.floor(p * lines.length));
    if (k !== current) setCurrent(k);
  });

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      data-morph="0"
      data-glow="1"
      className="relative z-2 h-[320vh]"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-end overflow-hidden px-gutter pb-[clamp(40px,9vh,96px)]">
        <div className="mb-8 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.14em] text-[#8A9099]">
          <span>The premise</span>
          <div className="h-px w-40 bg-white/15">
            <div ref={barRef} className="h-full origin-left bg-primary" style={{ transform: "scaleX(0)" }} />
          </div>
          <span className="text-foreground">
            {Math.max(0, current) + 1} / {lines.length}
          </span>
        </div>

        <div className="relative min-h-[clamp(160px,22vw,320px)]">
          {lines.map((line, i) => {
            const on = i === current;
            return (
              <p
                key={i}
                className="absolute bottom-0 left-0 max-w-[18ch] text-[clamp(40px,6vw,104px)] font-semibold leading-[0.95] tracking-[-0.05em] text-balance"
                style={{
                  opacity: on ? 1 : 0,
                  transform: on ? "none" : `translateY(${i < current ? -48 : 48}px)`,
                  filter: on ? "blur(0px)" : "blur(12px)",
                  transition: "opacity .8s, transform 1s cubic-bezier(.16,1,.3,1), filter .8s",
                }}
              >
                {line}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
};
