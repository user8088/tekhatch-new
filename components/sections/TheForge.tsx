"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  Lightbulb, 
  Code2, 
  Rocket, 
  ChevronRight 
} from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "Ideate",
    desc: "We distill complex problems into elegant architectural blueprints.",
    color: "from-amber-400 to-orange-600"
  },
  {
    icon: Code2,
    title: "Engineer",
    desc: "Precision-crafted code built for massive scale and zero-latency.",
    color: "from-blue-400 to-indigo-600"
  },
  {
    icon: Rocket,
    title: "Deploy",
    desc: "Global distribution across a resilient, edge-native infrastructure.",
    color: "from-emerald-400 to-teal-600"
  }
];

export const TheForge = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="relative py-48 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-32">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-bold text-center tracking-tight"
          >
            The <span className="text-white">Forge</span> of <span className="text-gradient">Excellence</span>
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mt-8 rounded-full" />
        </div>

        <div className="relative flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4 max-w-6xl mx-auto">
          
          {/* Connecting Line (Background) */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 hidden md:block -translate-y-1/2" />
          <motion.div 
            style={{ scaleX: pathLength, originX: 0 }}
            className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-secondary to-primary hidden md:block -translate-y-1/2 z-0" 
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="relative z-10 w-full md:w-1/3"
            >
              <GlassCard className="group relative flex flex-col items-center text-center p-10 hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-4 overflow-hidden">
                {/* Background Glow */}
                <div className={`absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-20 blur-[60px] transition-opacity duration-700`} />
                
                {/* Step Number */}
                <span className="absolute top-4 right-6 text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors">
                  0{i + 1}
                </span>

                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-8 shadow-2xl group-hover:rotate-[10deg] transition-transform duration-500`}>
                  <step.icon className="w-10 h-10 text-white" />
                </div>

                <h4 className="text-2xl font-bold mb-4">{step.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
                  {step.desc}
                </p>

                <div className="flex items-center gap-2 text-primary text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                  Learn More <ChevronRight className="w-3 h-3" />
                </div>
              </GlassCard>

              {/* Mobile connecting arrow */}
              {i < steps.length - 1 && (
                <div className="md:hidden flex justify-center py-8">
                  <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background visual detail */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
         <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] animate-pulse" />
      </div>
    </section>
  );
};
