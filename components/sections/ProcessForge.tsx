"use client";

import { useRef, useState } from "react";
import { useTick } from "@/lib/stage";
import { clamp, cn } from "@/lib/utils";

const phases = [
  {
    num: "01",
    title: "Ideate",
    desc: "We distill complex problems into elegant architectural blueprints.",
    log: [
      "$ tekhatch ideate --discovery",
      "  → mapping users, problems, business goals",
      "  → wireframes + clickable prototype",
      "  ✓ blueprint approved",
    ],
  },
  {
    num: "02",
    title: "Engineer",
    desc: "Precision-crafted code built for massive scale and zero latency.",
    log: [
      "$ tekhatch engineer --ai --scale=100k",
      "  → scaffolding api · web · mobile",
      "  → wiring model endpoints to your data",
      "  ✓ test suite passing",
    ],
  },
  {
    num: "03",
    title: "Deploy",
    desc: "Global distribution across a resilient, edge-native infrastructure.",
    log: [
      "$ tekhatch deploy --edge --regions=global",
      "  → provisioning multi-region infrastructure",
      "  → analytics + monitoring online",
      "  ✓ live. week 8.",
    ],
  },
];

const logLines = phases.flatMap((phase) => phase.log);
const LINES_PER_PHASE = phases[0].log.length;

const lineColor = (line: string) =>
  line.startsWith("$") ? "text-primary" : line.includes("✓") ? "text-[#7DD3FC]" : "text-[#9AA0A8]";

/** A build log that types itself out as the section scrolls; pinned on screens large enough for it. */
export const ProcessForge = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);
  const phase = Math.min(phases.length - 1, Math.floor(shown / (LINES_PER_PHASE + 0.01)));

  useTick(() => {
    const section = sectionRef.current;
    if (!section || !percentRef.current) return;
    const vh = window.innerHeight;
    const r = section.getBoundingClientRect();
    // Matches the `pin` variant in globals.css
    const pinned = window.innerWidth > 800 && vh > 640;
    const p = pinned
      ? clamp((-r.top + vh * 0.3) / (r.height - vh * 0.7))
      : clamp((vh * 0.9 - r.top) / (r.height * 0.7));
    percentRef.current.textContent = `${Math.round(p * 100)}%`;
    const n = Math.floor(p * (logLines.length + 0.99));
    if (n !== shown) setShown(n);
  });

  return (
    <section
      ref={sectionRef}
      id="process"
      data-morph="1"
      data-glow="0.3"
      className="relative z-2 pin:h-[320vh]"
    >
      <div className="relative top-0 flex items-center px-gutter pb-10 pt-[100px] pin:sticky pin:min-h-screen">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-center gap-[clamp(32px,5vw,80px)]">
          <div className="flex flex-col gap-9">
            <h2 className="font-display text-[clamp(32px,4.4vw,72px)] font-medium leading-[1.02] tracking-[-0.045em]">
              From idea
              <br />
              to <span className="text-primary">live</span> in
              <br />
              three commands.
            </h2>
            <div className="flex flex-col gap-1">
              {phases.map((item, i) => (
                <div
                  key={item.num}
                  className={cn(
                    "grid grid-cols-[44px_minmax(0,1fr)] gap-4 border-t border-white/10 py-4 transition-opacity duration-[400ms]",
                    i === phase ? "opacity-100" : "opacity-35"
                  )}
                >
                  <span className="pt-1 font-mono text-[13px] text-primary">{item.num}</span>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xl font-medium">{item.title}</span>
                    <span className="text-[15px] leading-normal text-[#9AA0A8]">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[20px] border border-white/12 bg-[rgba(9,10,13,0.92)] shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-3.5 font-mono text-xs text-[#7C828B]">
              <span>tekhatch ~ build.log</span>
              <span ref={percentRef}>0%</span>
            </div>
            <div className="min-h-[280px] px-[22px] pb-7 pt-6 font-mono text-[clamp(12px,1vw,14px)] leading-[1.8]">
              {logLines.map((line, i) => (
                <div
                  key={line}
                  className={cn(
                    "whitespace-pre-wrap break-words",
                    lineColor(line),
                    i < shown ? "opacity-100" : "opacity-0"
                  )}
                >
                  {line}
                </div>
              ))}
              <span className="inline-block h-4 w-2 bg-primary align-middle animate-caret" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
