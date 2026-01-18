"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { BrainCircuit, Fingerprint, Sparkles, Zap } from "lucide-react";

export const Vision = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);

  return (
    <section ref={containerRef} className="relative py-40 min-h-screen flex items-center overflow-hidden">
      {/* Background Kinetic Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Floating Gradient Orbs */}
        <motion.div 
          style={{ y: y1, scale }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] mix-blend-screen" 
        />
        <motion.div 
          style={{ y: y2, rotate }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] mix-blend-screen" 
        />
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* Left Side: Creative Visual Stack */}
          <div className="flex-1 relative w-full aspect-square max-w-[500px]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative z-20 w-full h-full"
            >
              <GlassCard className="absolute inset-0 bg-white/[0.02] border-white/10 backdrop-blur-3xl rounded-[40px] shadow-2xl overflow-hidden flex items-center justify-center group">
                {/* Inner glowing core */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <BrainCircuit className="w-40 h-40 text-white/10 group-hover:text-primary/40 transition-colors duration-700" />
                
                {/* Floating mini-cards inside the visual stack */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 right-10 p-4 glass rounded-2xl border-white/20 shadow-xl"
                >
                  <Fingerprint className="w-6 h-6 text-primary" />
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-12 left-8 p-4 glass rounded-2xl border-white/20 shadow-xl"
                >
                  <Zap className="w-6 h-6 text-secondary" />
                </motion.div>
              </GlassCard>
              
              {/* Backglow layer */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-secondary/30 blur-2xl -z-10 rounded-[50px] opacity-50" />
            </motion.div>

            {/* Decorative Rings */}
            <motion.div 
              style={{ rotate }}
              className="absolute -inset-10 border border-white/5 rounded-full -z-10" 
            />
            <motion.div 
              style={{ rotate: -rotate }}
              className="absolute -inset-20 border border-white/5 rounded-full -z-10 opacity-50" 
            />
          </div>

          {/* Right Side: Content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[1px] bg-primary" />
                <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase">The Vision</span>
              </div>
              
              <h2 className="text-4xl md:text-7xl font-bold leading-[1.1] mb-8">
                Synthesizing <span className="text-gradient">Human Insight</span> with Machine Precision.
              </h2>
              
              <p className="text-muted-foreground text-xl leading-relaxed mb-12 max-w-xl">
                We believe the next era of innovation isn&apos;t just about faster chips or larger models—it&apos;s about the seamless integration of technology into the human experience.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold">Neural Harmony</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Algorithms that learn and adapt to individual user intent, creating personalized digital shadows.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                    <Zap className="w-6 h-6 text-secondary" />
                  </div>
                  <h4 className="text-xl font-bold">Infinite Compute</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Elastic infrastructure that breathes with your demand, ensuring zero-latency world-wide.
                  </p>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-16 px-8 py-4 glass hover:bg-white/10 rounded-full font-bold flex items-center gap-3 transition-all border-white/10 hover:border-white/30"
              >
                Learn Our Philosophy
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group">
                  <span className="text-lg">→</span>
                </div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
