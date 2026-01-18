"use client";

import { motion } from "framer-motion";
import { 
  Cpu, 
  Rocket, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin 
} from "lucide-react";

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-between pt-32 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 -z-10 bg-[#0A0A0A]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/videos/bg-vid.mp4" type="video/mp4" />
        </video>
        {/* Adjusted gradient for better contrast with bottom section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/20 to-[#0A0A0A]" />
      </div>

      {/* Main Content Area */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 text-center z-10 flex-grow flex flex-col items-center justify-center"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-8xl font-bold tracking-tight mb-8"
        >
          Tekhatch: <span className="text-white">Innovate.</span> <span className="text-muted">Evolve.</span> <span className="text-white">Thrive.</span>
        </motion.h1>

        <motion.div variants={itemVariants} className="flex flex-col items-center gap-6">
          <button className="bg-primary/90 hover:bg-primary text-white px-10 py-4 rounded-full text-lg font-bold shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all hover:scale-105 active:scale-95">
            Get Started
          </button>
          
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full animate-bounce" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Side Navigation Buttons */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 z-20">
        <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors">
          <ChevronLeft className="w-5 h-5 text-white/70" />
        </button>
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 z-20">
        <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors">
          <ChevronRight className="w-5 h-5 text-white/70" />
        </button>
      </div>

      {/* Bottom Section: Feature Cards & Footer */}
      <div className="w-full z-10">
        {/* Divider Line */}
        <div className="w-full h-[1px] bg-white/10" />
        
        {/* Features Panel */}
        <div className="glass-dark backdrop-blur-3xl py-12 border-t border-white/5">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container mx-auto px-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
              {/* Card 1 */}
              <motion.div variants={itemVariants} className="flex flex-col gap-4 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Cpu className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">AI-Powered Solutions</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed pl-16">
                  Leveraging advanced neural networks to solve complex business challenges with precision and speed.
                </p>
                <div className="pl-16">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[10px] opacity-40 group-hover:opacity-100 group-hover:border-primary/50 transition-all">
                    AI
                  </div>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div variants={itemVariants} className="flex flex-col gap-4 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Rocket className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Cutting-Edge Research</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed pl-16">
                  Pushing the boundaries of technology through constant experimentation and breakthrough methodologies.
                </p>
                <div className="pl-16">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[10px] opacity-40 group-hover:opacity-100 group-hover:border-primary/50 transition-all">
                    RD
                  </div>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div variants={itemVariants} className="flex flex-col gap-4 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Strategic Partnerships</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed pl-16">
                  Building long-term value through collaborative ecosystems and shared technological excellence.
                </p>
                <div className="pl-16">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[10px] opacity-40 group-hover:opacity-100 group-hover:border-primary/50 transition-all">
                    SP
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Final Bottom Bar */}
        <div className="w-full bg-black/60 py-5 px-12 border-t border-white/5">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase flex gap-4 overflow-hidden whitespace-nowrap opacity-60">
              <span>Innovation</span> <span>•</span>
              <span>Evolution</span> <span>•</span>
              <span>Growth</span> <span>•</span>
              <span>Technology</span> <span>•</span>
              <span>Creative</span> <span>•</span>
              <span>Future</span> <span>•</span>
              <span>Design</span>
            </div>
            
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 flex items-center justify-center transition-all hover:-translate-y-0.5">
                  <Icon className="w-4 h-4 text-white/60" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
