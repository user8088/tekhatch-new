"use client";

import { useEffect, useRef } from "react";
import { stage, useTick } from "@/lib/stage";

const SIZE = 28;
const corner = "absolute size-[9px] border-foreground";

/** Reticle cursor: trails the pointer and snaps around whatever interactive element it is over. */
export function Cursor() {
  const reticleRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<Element | null>(null);
  const box = useRef<{ x: number; y: number; w: number; h: number } | null>(null);

  useEffect(() => {
    const onOver = (e: MouseEvent) => {
      hoverRef.current = (e.target as Element).closest?.("a,button,input,[data-reticle]") ?? null;
    };
    document.addEventListener("mouseover", onOver);
    return () => document.removeEventListener("mouseover", onOver);
  }, []);

  useTick(() => {
    const reticle = reticleRef.current, dot = dotRef.current;
    if (!reticle || !dot) return;
    const { x, y } = stage.mouse;
    let tx = x - SIZE / 2, ty = y - SIZE / 2, tw = SIZE, th = SIZE;
    const hover = hoverRef.current;
    if (hover?.isConnected) {
      const r = hover.getBoundingClientRect();
      if (r.width < window.innerWidth * 0.8 && r.height < window.innerHeight * 0.8) {
        tx = r.left - 6;
        ty = r.top - 6;
        tw = r.width + 12;
        th = r.height + 12;
      }
    }
    const b = (box.current ??= { x: tx, y: ty, w: tw, h: th });
    b.x += (tx - b.x) * 0.2;
    b.y += (ty - b.y) * 0.2;
    b.w += (tw - b.w) * 0.2;
    b.h += (th - b.h) * 0.2;
    reticle.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
    reticle.style.width = `${b.w}px`;
    reticle.style.height = `${b.h}px`;
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });

  return (
    <div className="hidden pointer-fine:block" aria-hidden="true">
      <div
        ref={reticleRef}
        className="pointer-events-none fixed left-0 top-0 z-300 size-7 will-change-transform"
      >
        <span className={`${corner} left-0 top-0 border-l-[1.5px] border-t-[1.5px]`} />
        <span className={`${corner} right-0 top-0 border-r-[1.5px] border-t-[1.5px]`} />
        <span className={`${corner} bottom-0 left-0 border-b-[1.5px] border-l-[1.5px]`} />
        <span className={`${corner} bottom-0 right-0 border-b-[1.5px] border-r-[1.5px]`} />
      </div>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-301 -ml-0.5 -mt-0.5 size-1 rounded-full bg-primary"
      />
    </div>
  );
}
