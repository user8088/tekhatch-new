"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  Zap, 
  Shield, 
  BarChart, 
  Globe, 
  Lock, 
  Cloud 
} from "lucide-react";

const solutions = [
  {
    icon: Zap,
    title: "High-Speed Analytics",
    description: "Process billions of data points in real-time with our proprietary hardware-accelerated engines.",
    color: "from-orange-500 to-amber-500"
  },
  {
    icon: Shield,
    title: "Cyber Resilience",
    description: "Advanced AI-driven threat detection that evolves faster than the exploits it prevents.",
    color: "from-sky-500 to-blue-500"
  },
  {
    icon: BarChart,
    title: "Predictive Modeling",
    description: "Foresee market shifts and user behavior with 99.8% accuracy using deep learning models.",
    color: "from-purple-500 to-indigo-500"
  },
  {
    icon: Globe,
    title: "Global Scalability",
    description: "Deploy infrastructure that spans continents while maintaining microsecond latency.",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: Lock,
    title: "Quantum Security",
    description: "Future-proof your data with encryption standards ready for the post-quantum era.",
    color: "from-rose-500 to-pink-500"
  },
  {
    icon: Cloud,
    title: "Cloud Native DNA",
    description: "Serverless architectures designed to be platform-agnostic and infinitely scalable.",
    color: "from-blue-500 to-cyan-500"
  }
];

export const Solutions = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="solutions" className="relative py-32 overflow-hidden bg-background">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-primary font-bold tracking-widest text-sm uppercase mb-4">
              Our Capabilities
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
              Pioneering the <span className="text-white">Future</span> of Digital Architecture.
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We don't just build software; we engineer ecosystems. Our suite of modular solutions is designed to scale with your ambition.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {solutions.map((solution, index) => (
            <motion.div key={index} variants={cardVariants}>
              <GlassCard className="h-full group hover:bg-white/5 border-white/5 transition-all duration-500 hover:-translate-y-2">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${solution.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <solution.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {solution.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {solution.description}
                </p>
                
                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-xs font-bold tracking-widest uppercase text-white/40">Explore Service</span>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                    <Zap className="w-3 h-3 text-primary" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA for Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 flex flex-col md:flex-row items-center justify-between glass p-8 md:p-12 rounded-3xl"
        >
          <div className="mb-8 md:mb-0">
            <h4 className="text-2xl font-bold mb-2">Ready to evolve?</h4>
            <p className="text-muted-foreground">Let's build the next generation of your platform together.</p>
          </div>
          <button className="whitespace-nowrap bg-white text-black hover:bg-primary hover:text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95">
            Get a Quote
          </button>
        </motion.div>
      </div>
    </section>
  );
};
