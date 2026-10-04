"use client";

import { useEffect, useRef, useState } from "react";
import { scramble } from "@/lib/utils";

export function PageLoader() {
  const wordRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"hold" | "fade" | "done">("hold");

  useEffect(() => {
    const cancel = scramble(wordRef.current!, "TEKHATCH", 900);
    const fade = setTimeout(() => setPhase("fade"), 900);
    const done = setTimeout(() => setPhase("done"), 2400);
    return () => {
      cancel();
      clearTimeout(fade);
      clearTimeout(done);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-200 flex items-center justify-center bg-background transition-opacity duration-[1400ms] ease-in-out ${
        phase === "fade" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        ref={wordRef}
        className="font-display text-[clamp(20px,2.6vw,34px)] font-medium tracking-[0.2em]"
      >
        TEKHATCH
      </div>
    </div>
  );
}
