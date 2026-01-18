"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  Network, 
  Database, 
  Cpu, 
  Globe, 
  Layers, 
  Zap 
} from "lucide-react";

export const NeuralEcosystem = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { damping: 20, stiffness: 100 };
  
  // Parallax transforms for deep 3D effect
  const coreRotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 360]), springConfig);
  const coreScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const yNodes = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const yNodesReverse = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const nodes = [
    { icon: Database, label: "Core Data", x: "-25%", y: "-30%", delay: 0 },
    { icon: Cpu, label: "Neural Engine", x: "25%", y: "-35%", delay: 0.2 },
    { icon: Globe, label: "Edge Mesh", x: "-30%", y: "25%", delay: 0.4 },
    { icon: Zap, label: "Quantum I/O", x: "28%", y: "30%", delay: 0.6 },
  ];

  return (
    <section ref={containerRef} className="relative min-h-[120vh] py-32 flex items-center justify-center overflow-hidden">
      {/* Background Deep Space */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.05)_0%,_transparent_60%)]" />
        {/* Abstract floating particles (simplified) */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity,
              ease: "linear" 
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32 max-w-2xl"
        >
          <h2 className="text-primary font-bold tracking-[0.4em] text-xs uppercase mb-6">The Infrastructure</h2>
          <h3 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight">
            A Living <span className="text-gradient">Neural Core</span>.
          </h3>
          <p className="text-muted-foreground text-lg opacity-60 leading-relaxed">
            Our ecosystem isn't static. It's an evolving network of interconnected intelligence, breathing in data and exhaling insight.
          </p>
        </motion.div>

        {/* The Interactive Visualizer */}
        <div className="relative w-full max-w-4xl aspect-square flex items-center justify-center">
          
          {/* Central Hub */}
          <motion.div 
            style={{ rotate: coreRotate, scale: coreScale }}
            className="relative w-48 h-48 md:w-80 md:h-80 z-20"
          >
            <div className="absolute inset-0 glass-dark rounded-full border-2 border-white/10 flex items-center justify-center backdrop-blur-3xl shadow-[0_0_100px_rgba(249,115,22,0.2)]">
               <Network className="w-16 h-16 md:w-32 md:h-32 text-primary animate-pulse" />
            </div>
            {/* Spinning Rings */}
            <div className="absolute -inset-8 border border-dashed border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute -inset-16 border border-dotted border-white/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
          </motion.div>

          {/* Satellite Nodes */}
          {nodes.map((node, i) => (
            <motion.div
              key={i}
              style={{ 
                x: node.x, 
                y: i % 2 === 0 ? yNodes : yNodesReverse,
                left: `calc(50% + ${node.x})`,
                top: `calc(50% + ${node.y})`
              }}
              className="absolute z-30"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: node.delay, duration: 0.8 }}
              >
                <GlassCard className="flex flex-col items-center gap-3 p-4 md:p-6 min-w-[120px] md:min-w-[160px] hover:bg-white/10 transition-colors border-white/10 shadow-2xl">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <node.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-white/60">{node.label}</span>
                </GlassCard>
              </motion.div>
              
              {/* Connecting Lines (Simulated with div) */}
              <div className="absolute top-1/2 left-1/2 -z-10 w-[200px] h-[1px] bg-gradient-to-r from-primary/40 to-transparent origin-left -translate-y-1/2 rotate-[var(--line-angle)] opacity-20 pointer-events-none" 
                   style={{ '--line-angle': i % 2 === 0 ? '45deg' : '-135deg' } as any} />
            </motion.div>
          ))}

          {/* Bottom Callout */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-0 text-center"
          >
             <div className="px-6 py-2 glass rounded-full text-[10px] tracking-[0.5em] uppercase text-white/40 border-white/5">
                Real-time Sync Active
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
