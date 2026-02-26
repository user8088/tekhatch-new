"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TextInvertProps = {
  children: string;
  className?: string;
  /** Light text (left) and muted (right) - e.g. white/grey for dark theme */
  lightColor?: string;
  mutedColor?: string;
};

export function TextInvert({
  children,
  className,
  lightColor = "#F8FAFC",
  mutedColor = "#64748B",
}: TextInvertProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const lines = children.split("\n").filter(Boolean);
    const lineEls = lines.map((line) => {
      const span = document.createElement("span");
      span.style.display = "block";
      span.style.backgroundImage = `linear-gradient(to right, ${lightColor} 50%, ${mutedColor} 50%)`;
      span.style.backgroundSize = "200% 100%";
      span.style.backgroundPosition = "100% 0";
      span.style.color = "transparent";
      span.style.backgroundClip = "text";
      span.style.webkitBackgroundClip = "text";
      span.textContent = line;
      return span;
    });

    el.innerHTML = "";
    lineEls.forEach((span) => el.appendChild(span));

    const tweens = lineEls.map((target) =>
      gsap.to(target, {
        backgroundPosition: "0% 0%",
        ease: "none",
        scrollTrigger: {
          trigger: target,
          scrub: 1,
          start: "top 85%",
          end: "bottom center",
        },
      })
    );

    return () => tweens.forEach((t) => t.kill());
  }, [children, lightColor, mutedColor]);

  return <div ref={ref} className={className} />;
}
