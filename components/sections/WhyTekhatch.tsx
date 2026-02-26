 "use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { XCircle, CheckCircle, ArrowRight } from "lucide-react";
import { FadeAnim } from "@/components/ui/FadeAnim";

const problems = [
  "6+ month development cycles burning runway",
  "Unreliable freelancers with broken code",
  "Technical debt costing 10x more later",
  "Missing AI features competitors have",
  "Amateur-looking products",
];

const solutions = [
  "Milestone-based delivery & payment",
  "AI-powered development included",
  "8-week MVP delivery guaranteed",
  "Scalable from 100 to 100K+ users",
  "30-day post-launch guarantee",
];

export const WhyTekhatch = () => {
  return (
    <section id="contact" className="relative py-28 overflow-hidden bg-background">
      {/* Ambient background accents */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-primary/10 blur-[140px] opacity-70 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/10 blur-[160px] opacity-60 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.9)_0%,_transparent_55%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section heading */}
        <FadeAnim delay={0.2} className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-primary font-semibold tracking-[0.25em] text-[0.7rem] uppercase mb-4">
            Why Startups Choose Tekhatch
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            Built for founders who can&apos;t afford to miss.
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Stop burning the runway on delays, rewrites, and broken promises. Tekhatch delivers
            production-ready web and mobile products with battle-tested engineering and built‑in AI
            that investors love to see.
          </p>
        </FadeAnim>

        {/* Comparison grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8 max-w-5xl mx-auto">
          {/* Problems column */}
          <FadeAnim delay={0.1} fadeFrom="left">
            <GlassCard className="relative h-full overflow-hidden border-red-500/40 bg-gradient-to-b from-red-500/10 via-black/40 to-black/60">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-400 via-red-500 to-red-400" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-full bg-red-500/15 flex items-center justify-center border border-red-400/40">
                  <XCircle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-[0.7rem] tracking-[0.25em] uppercase text-red-300/70">
                    Problems
                  </p>
                  <h3 className="text-lg md:text-xl font-semibold">
                    The Startup Development Problem
                  </h3>
                </div>
              </div>

              <ul className="space-y-4">
                {problems.map((item, idx) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1">
                      <XCircle className="w-4 h-4 text-red-400" />
                    </span>
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </FadeAnim>

          {/* Solutions column */}
          <FadeAnim delay={0.2} fadeFrom="right">
            <GlassCard className="relative h-full overflow-hidden border-emerald-400/40 bg-gradient-to-b from-emerald-400/10 via-black/40 to-black/60">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-full bg-emerald-400/15 flex items-center justify-center border border-emerald-300/50">
                  <CheckCircle className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <p className="text-[0.7rem] tracking-[0.25em] uppercase text-emerald-200/80">
                    Solutions
                  </p>
                  <h3 className="text-lg md:text-xl font-semibold">
                    The Tekhatch Solution
                  </h3>
                </div>
              </div>

              <ul className="space-y-4">
                {solutions.map((item, idx) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1">
                      <CheckCircle className="w-4 h-4 text-emerald-300" />
                    </span>
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs md:text-sm">
                <span className="text-white/70 font-medium">
                  Confident delivery from idea to launch.
                </span>
                <span className="inline-flex items-center gap-1 text-primary font-semibold">
                  See how we work
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </GlassCard>
          </FadeAnim>
        </div>
      </div>
    </section>
  );
};

