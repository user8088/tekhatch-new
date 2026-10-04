"use client";

import { useEffect, useRef } from "react";
import { stage, useTick } from "@/lib/stage";
import { clamp } from "@/lib/utils";
import { Pill } from "@/components/ui/Pill";

export const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dragX = useRef<number | null>(null);

  // Dragging anywhere on the hero spins the hatch
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (dragX.current === null) return;
      stage.twistVel = (e.clientX - dragX.current) * 0.006;
      dragX.current = e.clientX;
    };
    const onUp = () => {
      dragX.current = null;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  useTick(() => {
    const heading = headingRef.current;
    const y = window.scrollY, vh = window.innerHeight;
    if (!heading || y >= vh * 1.5) return;
    heading.style.transform = `translateY(${y * 0.35}px)`;
    heading.style.opacity = String(clamp(1 - y / (vh * 0.9)));
  });

  return (
    <section
      id="top"
      data-morph="0"
      data-glow="1"
      onPointerDown={(e) => {
        dragX.current = e.clientX;
      }}
      className="relative z-2 flex min-h-screen touch-pan-y select-none flex-col justify-end px-gutter pb-9 pt-[120px]"
    >
      <div className="mb-[clamp(24px,4vh,48px)] flex flex-wrap items-end justify-between gap-6">
        <Pill data-hero="" className="bg-[rgba(6,7,10,0.4)]">
          AI-native product studio · since 2020
        </Pill>
        <p data-hero="" className="max-w-[380px] text-[17px] leading-normal text-[#B9BDC4] text-pretty">
          Production-ready web, mobile and AI products — from first sketch to
          investor-ready in eight weeks.
        </p>
      </div>

      <h1
        ref={headingRef}
        className="text-[clamp(64px,14.5vw,260px)] font-semibold leading-[0.84] tracking-[-0.065em] will-change-transform"
      >
        <div data-mask="" className="overflow-hidden pb-[0.04em]">
          <div>Innovate.</div>
        </div>
        <div data-mask="" className="flex justify-end overflow-hidden pb-[0.04em]">
          <div className="text-transparent [-webkit-text-stroke:1.5px_#ECECE8]">Evolve.</div>
        </div>
        <div data-mask="" className="overflow-hidden pb-[0.06em]">
          <div>
            Thrive<span className="text-primary">.</span>
          </div>
        </div>
      </h1>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-5">
        <div data-hero="" className="flex flex-wrap gap-2.5">
          <a
            href="#hatch"
            className="flex items-center gap-3 rounded-full bg-primary px-6 py-4 text-[15px] font-medium text-background hover:bg-[#FB8A3C]"
          >
            Get started →
          </a>
          <a
            href="#work"
            className="flex items-center rounded-full border border-white/20 px-6 py-4 text-[15px] hover:text-primary"
          >
            Explore work
          </a>
        </div>
        <div
          data-hero=""
          className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-[#8A9099]"
        >
          <span className="flex size-[34px] items-center justify-center rounded-full border border-white/20 text-sm">
            ⟲
          </span>
          Drag to turn the hatch
        </div>
      </div>
    </section>
  );
};
