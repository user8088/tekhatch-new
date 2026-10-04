"use client";

import { useState } from "react";
import { stage } from "@/lib/stage";
import { cn } from "@/lib/utils";

const kinds = ["Web app", "Mobile app", "AI feature", "MVP"];
const timelines = ["ASAP", "1–3 months", "Just exploring"];

const socials = [
  { label: "LinkedIn", href: "#" },
  { label: "X", href: "#" },
  { label: "Instagram", href: "#" },
];

interface ChipsProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const Chips = ({ label, options, value, onChange }: ChipsProps) => (
  <div className="flex flex-col gap-3">
    <span className="text-sm text-[#9AA0A8]">{label}</span>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={option === value}
          onClick={() => onChange(option)}
          className={cn(
            "rounded-[12px] border px-[18px] py-3 text-[15px]",
            option === value
              ? "border-primary bg-primary/14 text-[#FDBA74]"
              : "border-white/14 text-foreground"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export const Contact = () => {
  const [kind, setKind] = useState("Web app");
  const [timeline, setTimeline] = useState("1–3 months");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  // TODO: deliver the enquiry (kind, timeline, email) — the form only confirms on screen for now
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    stage.burst = 1.4;
    setSent(true);
  };

  return (
    <section
      id="hatch"
      data-morph="0"
      data-glow="0.95"
      className="relative z-2 flex min-h-screen flex-col justify-between px-gutter pb-8 pt-[clamp(100px,14vh,160px)]"
    >
      <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center gap-10 text-center">
        <h2 className="font-display text-[clamp(40px,7vw,120px)] font-medium leading-none tracking-[-0.05em]">
          <div data-mask="" className="overflow-hidden">
            <div>Let&apos;s hatch</div>
          </div>
          <div data-mask="" className="overflow-hidden">
            <div>
              something<span className="text-primary">.</span>
            </div>
          </div>
        </h2>

        {sent ? (
          <div className="flex flex-col items-center gap-3.5">
            <div className="font-display text-[clamp(22px,2.4vw,34px)] font-medium tracking-[-0.03em]">
              It&apos;s hatching.
            </div>
            <div className="text-[17px] text-[#B9BDC4]">
              We&apos;ll reply within 24 hours with a first take on your {kind.toLowerCase()}.
            </div>
          </div>
        ) : (
          <form
            data-reveal=""
            onSubmit={onSubmit}
            className="flex w-full max-w-[760px] flex-col gap-7 rounded-[28px] border border-white/12 bg-[rgba(11,12,16,0.78)] p-[clamp(24px,3vw,40px)] text-left backdrop-blur-lg"
          >
            <Chips label="I'm building" options={kinds} value={kind} onChange={setKind} />
            <Chips label="Timeline" options={timelines} value={timeline} onChange={setTimeline} />
            <div className="flex flex-wrap gap-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="Email"
                className="min-w-0 flex-[1_1_240px] rounded-[14px] border border-white/14 bg-white/4 px-[18px] py-4 text-base text-foreground outline-none placeholder:text-[#6B717A]"
              />
              <button
                type="submit"
                className="rounded-[14px] bg-primary px-[26px] py-4 text-base font-medium text-background"
              >
                Hatch it →
              </button>
            </div>
            <div className="text-sm text-[#9AA0A8]">
              A {kind.toLowerCase()},{" "}
              {timeline === "Just exploring" ? "no rush — just exploring" : `timeline: ${timeline}`}. We
              reply within 24h.
            </div>
          </form>
        )}
      </div>

      <div
        aria-hidden="true"
        className="mt-[clamp(64px,12vh,140px)] flex justify-between font-display text-[clamp(40px,11.4vw,240px)] font-semibold leading-[0.85] tracking-[-0.04em]"
      >
        {"TEKHATCH".split("").map((char, i) => (
          <div key={i} data-mask="" className="overflow-hidden pb-[0.06em]">
            <div className="bg-[linear-gradient(180deg,#ECECE8_35%,rgba(236,236,232,0.08))] bg-clip-text text-transparent">
              {char}
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-6 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-6 text-sm text-[#9AA0A8]">
        <span>© 2026 Tekhatch — Innovate. Evolve. Thrive.</span>
        <div className="flex flex-wrap gap-[22px] text-foreground">
          <a href="mailto:hello@tekhatch.com" className="hover:text-primary">
            hello@tekhatch.com
          </a>
          {socials.map((social) => (
            <a key={social.label} href={social.href} className="hover:text-primary">
              {social.label}
            </a>
          ))}
          <a href="#top" className="hover:text-primary">
            Top ↑
          </a>
        </div>
      </footer>
    </section>
  );
};
