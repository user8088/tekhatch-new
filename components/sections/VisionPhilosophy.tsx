"use client";

import { Sparkles, Zap } from "lucide-react";
import { FadeAnim } from "@/components/ui/FadeAnim";

export const VisionPhilosophy = () => {
  return (
    <section className="relative py-28 overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <FadeAnim delay={0.2} fadeFrom="left" duration={0.8}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-primary font-semibold tracking-[0.25em] text-[0.65rem] uppercase">
                The Vision
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold leading-[1.15] mb-8">
              Synthesizing{" "}
              <span className="text-gradient">Human Insight</span> with Machine
              Precision.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-xl">
              We believe the next era of innovation isn&apos;t just about faster
              chips or larger models—it&apos;s about the seamless integration of
              technology into the human experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground">
                  Neural Harmony
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Algorithms that learn and adapt to individual user intent,
                  creating personalized digital shadows.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-secondary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground">
                  Infinite Compute
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Elastic infrastructure that breathes with your demand, ensuring
                  zero-latency world-wide.
                </p>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Learn Our Philosophy
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-sm">
                →
              </span>
            </a>
          </FadeAnim>

          {/* Right: Visual */}
          <FadeAnim delay={0.3} fadeFrom="right" duration={0.8} className="relative">
            <div className="relative aspect-square max-w-md mx-auto rounded-[40px] overflow-hidden bg-white/[0.02] border border-white/10 backdrop-blur-3xl flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 opacity-50" />
              <div className="relative z-10 text-8xl md:text-9xl font-bold text-white/5">
                TK
              </div>
            </div>
          </FadeAnim>
        </div>
      </div>
    </section>
  );
};
