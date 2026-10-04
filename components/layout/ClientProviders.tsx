"use client";

import { useEffect } from "react";
import { PageLoader } from "@/components/ui/PageLoader";
import { HatchScene } from "@/components/ui/HatchScene";
import { Grain } from "@/components/ui/Grain";
import { Cursor } from "@/components/ui/Cursor";

const HERO_REVEAL_AT = 1500;

function countUp(el: HTMLElement) {
  const to = parseFloat(el.dataset.count ?? "0");
  const t0 = performance.now();
  const step = () => {
    const p = Math.min(1, (performance.now() - t0) / 1800);
    el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 4))));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/**
 * Drives the page's data attributes: [data-hero] rises once the loader lifts,
 * [data-reveal] and [data-mask] as they scroll in, [data-count] counts up.
 */
function useReveal() {
  useEffect(() => {
    const all = (sel: string) => Array.from(document.querySelectorAll<HTMLElement>(sel));

    // Consecutive masked lines rise one after another
    all("[data-mask]").forEach((m) => {
      let k = 0;
      let p = m.previousElementSibling as HTMLElement | null;
      while (p && p.dataset.mask !== undefined) {
        k++;
        p = p.previousElementSibling as HTMLElement | null;
      }
      const line = m.firstElementChild as HTMLElement | null;
      if (line) line.style.transitionDelay = `${k * 110}ms`;
    });
    all("[data-reveal]").forEach((el) => {
      el.style.transitionDelay = `${el.dataset.delay ?? 0}ms`;
    });
    all("[data-count]").forEach((el) => {
      el.textContent = "0";
    });

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target as HTMLElement;
          if (el.dataset.count !== undefined) countUp(el);
          else el.classList.add("is-in");
          io.unobserve(el);
        }),
      { threshold: 0.1 }
    );

    const timer = setTimeout(() => {
      all("[data-hero]").forEach((el, i) => {
        el.style.transitionDelay = `${300 + i * 90}ms`;
        el.classList.add("is-in");
      });
      all("[data-reveal],[data-mask],[data-count]").forEach((el) => io.observe(el));
    }, HERO_REVEAL_AT);

    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, []);
}

export function ClientProviders({ children }: { children: React.ReactNode }) {
  useReveal();

  return (
    <>
      <HatchScene />
      <div className="pointer-events-none fixed inset-0 z-1 bg-[radial-gradient(130%_90%_at_50%_45%,transparent_45%,rgba(6,7,10,0.9)_100%)]" />
      <Grain />
      <PageLoader />
      <Cursor />
      {children}
    </>
  );
}
