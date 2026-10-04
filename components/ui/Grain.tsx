"use client";

import { useEffect, useRef } from "react";
import { useTick } from "@/lib/stage";

const SIZE = 160;

/** Film grain over the whole page, jittered at 24fps. */
export function Grain() {
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef(-1);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const noise = ctx.createImageData(SIZE, SIZE);
    for (let i = 0; i < noise.data.length; i += 4) {
      noise.data[i] = noise.data[i + 1] = noise.data[i + 2] = Math.random() * 255;
      noise.data[i + 3] = 255;
    }
    ctx.putImageData(noise, 0, 0);
    ref.current!.style.backgroundImage = `url(${canvas.toDataURL()})`;
  }, []);

  useTick((t) => {
    const frame = (t * 24) | 0;
    if (frame === frameRef.current || !ref.current) return;
    frameRef.current = frame;
    ref.current.style.transform = `translate(${(Math.random() * 60) | 0}px, ${(Math.random() * 60) | 0}px)`;
  });

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed -inset-[60px] z-150 opacity-[0.08] mix-blend-overlay"
    />
  );
}
