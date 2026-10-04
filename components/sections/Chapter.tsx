"use client";

import { useRef } from "react";
import { useTick } from "@/lib/stage";
import { clamp, smooth } from "@/lib/utils";

interface ChapterProps {
  id: string;
  numeral: string;
  word: string;
  /** Shape the background scene takes while this chapter is on screen. */
  morph: number;
  children: React.ReactNode;
}

const easeOut = (v: number) => 1 - Math.pow(1 - v, 3);

/** Full-screen title card: the word tightens into focus, then blows past the camera. */
export const Chapter = ({ id, numeral, word, morph, children }: ChapterProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useTick(() => {
    const section = sectionRef.current, w = wordRef.current;
    if (!section || !w || !labelRef.current || !copyRef.current) return;
    const vh = window.innerHeight;
    const r = section.getBoundingClientRect();
    if (r.bottom < -50 || r.top > vh + 50) return;
    const p = clamp((vh - r.top) / (r.height + vh));
    const inP = easeOut(clamp((p - 0.18) / 0.3));
    const outP = smooth(clamp((p - 0.68) / 0.24));
    w.style.letterSpacing = `${0.5 * (1 - inP) - 0.04}em`;
    w.style.opacity = String(inP * (1 - outP));
    w.style.transform = `scale(${1 + outP * 0.35})`;
    w.style.filter = `blur(${(1 - inP) * 10 + outP * 14}px)`;
    const sub = String(clamp((p - 0.38) / 0.14) * (1 - outP));
    labelRef.current.style.opacity = sub;
    copyRef.current.style.opacity = sub;
  });

  return (
    <section
      ref={sectionRef}
      id={id}
      data-morph={morph}
      data-glow="0.22"
      className="relative z-2 h-[200vh]"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center gap-7 px-5 text-center">
          <div
            ref={labelRef}
            className="font-mono text-xs uppercase tracking-[0.14em] text-[#8A9099] opacity-0"
          >
            Chapter {numeral}
          </div>
          <div
            ref={wordRef}
            className="-mr-[0.04em] whitespace-nowrap font-display text-[clamp(44px,10vw,200px)] font-medium leading-[0.9] tracking-[0.5em] opacity-0 will-change-[transform,letter-spacing]"
          >
            {word}
            <span className="text-primary">.</span>
          </div>
          <div
            ref={copyRef}
            className="max-w-[520px] text-[clamp(17px,1.5vw,22px)] leading-[1.45] text-[#B9BDC4] opacity-0"
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};
