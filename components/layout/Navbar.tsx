"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { stage, useTick } from "@/lib/stage";

const links = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "story", label: "Story" },
  { id: "process", label: "Process" },
  { id: "pricing", label: "Pricing" },
];

export const Navbar = () => {
  const [active, setActive] = useState("");

  useTick(() => {
    if (stage.section !== active) setActive(stage.section);
  });

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-100 flex items-center justify-between px-gutter py-6">
      <a
        href="#top"
        className="pointer-events-auto flex items-center gap-3 font-display text-base font-medium tracking-[0.06em] hover:text-primary"
      >
        <span className="flex size-5 items-center justify-center rounded-[5px] border-[1.5px] border-primary">
          <span className="size-[7px] rounded-[1px] bg-primary" />
        </span>
        TEKHATCH
      </a>

      <nav className="pointer-events-auto absolute left-1/2 top-[22px] hidden -translate-x-1/2 gap-1 rounded-full border border-white/10 bg-[rgba(14,16,20,0.6)] p-1.5 text-sm backdrop-blur-lg min-[901px]:flex">
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={cn(
              "rounded-full px-4 py-2 transition-colors duration-300",
              active === link.id
                ? "bg-foreground text-background"
                : "hover:bg-white/8 hover:text-primary"
            )}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="#hatch"
        className="pointer-events-auto flex items-center gap-2.5 rounded-[12px] border border-white/12 bg-[rgba(14,16,20,0.7)] px-[18px] py-3 text-sm font-medium backdrop-blur-[14px] hover:text-primary"
      >
        <span className="size-[7px] rounded-full bg-[#22C55E] animate-pulse-dot" />
        Hatch a project
      </a>
    </header>
  );
};
