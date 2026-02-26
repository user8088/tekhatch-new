"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FadeFrom = "left" | "right" | "top" | "bottom";

type FadeAnimProps = {
  children: ReactNode;
  fadeFrom?: FadeFrom;
  delay?: number;
  duration?: number;
  offset?: number;
  ease?: "power2.out" | "bounce";
  className?: string;
  style?: React.CSSProperties;
};

export function FadeAnim({
  children,
  fadeFrom = "bottom",
  delay = 0.15,
  duration = 0.75,
  offset = 40,
  ease = "power2.out",
  className,
  style,
}: FadeAnimProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const x =
      fadeFrom === "left" ? -offset : fadeFrom === "right" ? offset : 0;
    const y =
      fadeFrom === "top" ? -offset : fadeFrom === "bottom" ? offset : 0;

    const tween = gsap.fromTo(
      el,
      { opacity: 0, x, y },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, [fadeFrom, delay, duration, offset, ease]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
