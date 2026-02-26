"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function PageLoader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const path = document.querySelector("#loader-svg path");
    if (!path) return;

    const curve = "M0,1005S175,995,500,995s500,5,500,5V0H0Z";
    const flat = "M0,2S175,1,500,1s500,1,500,1V0H0Z";

    const tl = gsap.timeline({
      onComplete: () => {
        setHidden(true);
        ScrollTrigger.refresh();
      },
    });

    const heading = document.querySelector(".loader-wrap-heading .load-text");
    if (heading) {
      tl.to(".loader-wrap-heading .load-text span", {
        delay: 0.5,
        y: -100,
        opacity: 0,
        stagger: 0.05,
      });
    }

    tl.to(path, {
      duration: 0.5,
      attr: { d: curve },
      ease: "power2.in",
    })
      .to(path, {
        duration: 0.5,
        attr: { d: flat },
        ease: "power2.out",
      })
      .to(".loader-wrap", {
        y: -1500,
        duration: 0.6,
        ease: "power2.inOut",
      })
      .to({}, {
        duration: 0,
        zIndex: -1,
        display: "none",
      });

    const timer = setTimeout(() => setHidden(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <div className="loader-wrap fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <svg
        id="loader-svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path d="M0,1005S175,995,500,995s500,5,500,5V0H0Z" fill="currentColor" />
      </svg>
      <div className="loader-wrap-heading relative z-10">
        <div className="load-text flex gap-1 text-4xl font-bold tracking-wider text-foreground">
          {"TEKHATCH".split("").map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
