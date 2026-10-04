import { useEffect, useRef } from "react";

/** State the sections share with the 3D scene and the cursor. */
export const stage = {
  mouse: { x: 0, y: 0 },
  /** Id of the section crossing the middle of the viewport. */
  section: "",
  /** Scroll progress (0–1) through the manifesto, which opens the hatch. */
  manifesto: 0,
  /** Active milestone, which grows the bars of the growth shape. */
  milestone: -1,
  /** Spin added by dragging the hero. */
  twistVel: 0,
  /** Outward kick applied to the scene when the contact form is sent. */
  burst: 0,
};

type Tick = (t: number) => void;

const ticks = new Set<Tick>();
let raf = 0;
let t0 = 0;

const onMove = (e: PointerEvent) => {
  stage.mouse.x = e.clientX;
  stage.mouse.y = e.clientY;
};

const frame = () => {
  raf = requestAnimationFrame(frame);
  const t = (performance.now() - t0) / 1000;
  ticks.forEach((fn) => fn(t));
};

function subscribe(fn: Tick) {
  if (!ticks.size) {
    t0 = performance.now();
    stage.mouse.x = window.innerWidth / 2;
    stage.mouse.y = window.innerHeight / 2;
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(frame);
  }
  ticks.add(fn);
  return () => {
    ticks.delete(fn);
    if (!ticks.size) {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    }
  };
}

/** Runs `fn` every animation frame with the seconds elapsed since the loop started. */
export function useTick(fn: Tick) {
  const ref = useRef(fn);
  useEffect(() => {
    ref.current = fn;
  });
  useEffect(() => subscribe((t) => ref.current(t)), []);
}
