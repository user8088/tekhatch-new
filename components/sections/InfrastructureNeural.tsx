"use client";

import { Network, Database, Cpu, Globe, Zap } from "lucide-react";
import { FadeAnim } from "@/components/ui/FadeAnim";

const nodes = [
  { icon: Database, label: "Core Data" },
  { icon: Cpu, label: "Neural Engine" },
  { icon: Globe, label: "Edge Mesh" },
  { icon: Zap, label: "Quantum I/O" },
];

export const InfrastructureNeural = () => {
  return (
    <section className="relative py-28 overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        <FadeAnim delay={0.2} className="text-center mb-20 max-w-2xl mx-auto">
          <h2 className="text-primary font-semibold tracking-[0.35em] text-[0.7rem] uppercase mb-6">
            The Infrastructure
          </h2>
          <h3 className="text-3xl md:text-5xl font-semibold mb-8 tracking-tight">
            A Living <span className="text-gradient">Neural Core</span>.
          </h3>
          <p className="text-muted-foreground text-lg opacity-80 leading-relaxed">
            Our ecosystem isn&apos;t static. It&apos;s an evolving network of
            interconnected intelligence, breathing in data and exhaling insight.
          </p>
        </FadeAnim>

        {/* Visualizer */}
        <div className="relative w-full max-w-4xl mx-auto aspect-square flex items-center justify-center">
          <FadeAnim delay={0.3} duration={1} className="relative w-48 h-48 md:w-72 md:h-72">
            <div className="absolute inset-0 rounded-full bg-white/[0.02] border-2 border-white/10 flex items-center justify-center backdrop-blur-3xl shadow-[0_0_80px_rgba(249,115,22,0.15)]">
              <Network className="w-16 h-16 md:w-24 md:h-24 text-primary animate-pulse" />
            </div>
            <div className="absolute -inset-8 border border-dashed border-white/5 rounded-full animate-spin-slow" />
            <div className="absolute -inset-16 border border-dotted border-white/10 rounded-full animate-spin-slower-reverse" />
          </FadeAnim>

          {nodes.map((node, i) => {
            const Icon = node.icon;
            const positions: { left: string; top: string; transform?: string }[] = [
              { left: "0%", top: "0%" },
              { left: "100%", top: "0%", transform: "translateX(-100%)" },
              { left: "0%", top: "100%", transform: "translateY(-100%)" },
              { left: "100%", top: "100%", transform: "translate(-100%, -100%)" },
            ];
            const pos = positions[i] ?? positions[0];
            return (
              <FadeAnim
                key={node.label}
                delay={0.2 + i * 0.1}
                duration={0.6}
                offset={20}
                className="absolute"
                style={{
                  left: pos.left,
                  top: pos.top,
                  ...(pos.transform && { transform: pos.transform }),
                }}
              >
                <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl min-w-[120px] md:min-w-[140px] hover:bg-white/5 border-white/20 transition-all">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-white/60">
                    {node.label}
                  </span>
                </div>
              </FadeAnim>
            );
          })}

          <FadeAnim delay={0.8} className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] tracking-[0.5em] uppercase text-white/40">
              Real-time Sync Active
            </div>
          </FadeAnim>
        </div>
      </div>
    </section>
  );
};
