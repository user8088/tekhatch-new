"use client";

import { useRef } from "react";
import { useTick } from "@/lib/stage";
import { clamp, smooth } from "@/lib/utils";

/** A framed reel that opens out to full-bleed as it scrolls through. */
export const Showreel = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useTick(() => {
    const section = sectionRef.current;
    if (!section || !frameRef.current || !mediaRef.current || !captionRef.current) return;
    const vh = window.innerHeight;
    const r = section.getBoundingClientRect();
    if (r.bottom <= 0 || r.top >= vh) return;
    const p = clamp(-r.top / (r.height - vh));
    const e = smooth(clamp(p / 0.65));
    frameRef.current.style.clipPath = `inset(${24 * (1 - e)}% ${30 * (1 - e)}% round ${28 * (1 - e)}px)`;
    mediaRef.current.style.transform = `scale(${1.3 - 0.3 * e})`;
    captionRef.current.style.opacity = String(clamp((p - 0.55) / 0.2));
  });

  return (
    <section
      ref={sectionRef}
      id="reel"
      data-morph="4"
      data-glow="0.12"
      className="relative z-2 h-[260vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          ref={frameRef}
          className="absolute inset-0 bg-panel will-change-[clip-path]"
          style={{ clipPath: "inset(24% 30% round 28px)" }}
        >
          {/* Placeholder media — swap for the showreel video */}
          <div ref={mediaRef} className="absolute inset-0 will-change-transform" style={{ transform: "scale(1.3)" }}>
            <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_28%_30%,rgba(249,115,22,0.42),transparent_70%),radial-gradient(60%_60%_at_76%_74%,rgba(14,165,233,0.3),transparent_70%)]" />
            <div className="absolute inset-0 hatch-lines" />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
            <a
              href="#reel"
              aria-label="Play showreel"
              className="flex size-[clamp(80px,8vw,120px)] items-center justify-center rounded-full bg-primary pl-1.5 text-[clamp(22px,2vw,32px)] text-background hover:bg-[#FB8A3C]"
            >
              ▶
            </a>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#C9CDD3]">
              [ drop showreel — 60s product film ]
            </span>
          </div>

          <div
            ref={captionRef}
            className="absolute inset-x-[clamp(20px,3vw,44px)] bottom-[clamp(24px,5vh,48px)] flex flex-wrap items-end justify-between gap-6 opacity-0"
          >
            <div className="font-display text-[clamp(32px,5vw,88px)] font-medium leading-none tracking-[-0.045em]">
              Tekhatch,
              <br />
              in motion.
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#C9CDD3]">
              Reel 2026 · 01:00
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
