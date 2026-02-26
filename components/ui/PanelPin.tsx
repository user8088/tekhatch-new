"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type PanelPinProps = {
  children: ReactNode;
  /** Parent area that defines the pin end boundary */
  areaId?: string;
  /** Offset from top for start (e.g. "10%" or "130px") */
  start?: string;
  className?: string;
};

export function PanelPin({
  children,
  areaId,
  start = "top 10%",
  className,
}: PanelPinProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const endTrigger = areaId ? document.getElementById(areaId) : el.parentElement;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start,
          end: "bottom 99%",
          endTrigger: endTrigger ?? el,
          pin: true,
          pinSpacing: false,
        },
      });
    });

    return () => ctx.revert();
  }, [areaId, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
