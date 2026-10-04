import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const clamp = (v: number, min = 0, max = 1) =>
  Math.max(min, Math.min(max, v));

export const smooth = (v: number) => v * v * (3 - 2 * v);

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+/<>";

/** Stand-in characters for text that has not resolved yet; spaces are kept. */
export function glyphs(text: string) {
  let out = "";
  for (const ch of text) {
    out += ch === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
  }
  return out;
}

/** Resolves `text` into `el` left to right out of random glyphs. Returns a cancel function. */
export function scramble(el: HTMLElement, text: string, duration = 700) {
  const t0 = performance.now();
  let raf = 0;
  const step = () => {
    const p = Math.min(1, (performance.now() - t0) / duration);
    const n = Math.floor(p * text.length);
    el.textContent = text.slice(0, n) + glyphs(text.slice(n));
    if (p < 1) raf = requestAnimationFrame(step);
  };
  step();
  return () => cancelAnimationFrame(raf);
}
