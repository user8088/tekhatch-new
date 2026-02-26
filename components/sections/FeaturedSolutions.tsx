"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const solutions = [
  {
    title: "High-Speed Analytics",
    tags: ["Analytics", "Real-time"],
    year: "2025",
    gradient: "from-orange-500/30 via-amber-500/20 to-transparent",
  },
  {
    title: "Cyber Resilience",
    tags: ["Security", "AI"],
    year: "2025",
    gradient: "from-sky-500/30 via-blue-500/20 to-transparent",
  },
  {
    title: "Predictive Modeling",
    tags: ["AI", "ML"],
    year: "2025",
    gradient: "from-purple-500/30 via-indigo-500/20 to-transparent",
  },
  {
    title: "Global Scalability",
    tags: ["Infrastructure", "Edge"],
    year: "2025",
    gradient: "from-emerald-500/30 via-teal-500/20 to-transparent",
  },
];

export const FeaturedSolutions = () => {
  return (
    <section
      id="solutions"
      className="relative py-28 bg-background"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 lg:items-start">
          {/* Left: Title block - sticky while cards scroll */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <motion.div
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.1 }}
              className="flex items-center gap-6 text-muted-foreground font-medium text-sm mb-4"
            >
              <svg
                width="110"
                height="12"
                viewBox="0 0 110 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <rect y="10" width="110" height="2" rx="1" fill="currentColor" fillOpacity="0.3" />
                <rect x="60" width="50" height="2" rx="1" fill="currentColor" />
              </svg>
              <span>Featured</span>
            </motion.div>
            <motion.h2
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
              className="text-4xl md:text-6xl font-medium uppercase text-foreground mb-6"
            >
              Solutions
            </motion.h2>
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {["Analytics", "Security", "AI", "Infrastructure"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full border border-white/20 text-sm text-muted-foreground hover:text-foreground hover:border-white/40 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
            <motion.div
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.35 }}
              className="mb-12"
            >
              <svg viewBox="0 0 424 6" fill="none" className="w-full max-w-sm">
                <path
                  d="M5 2.5L0 0.113249V5.88675L5 3.5V2.5ZM419 3.5L424 5.88675V0.113249L419 2.5V3.5ZM4.5 3.5H419.5V2.5H4.5V3.5Z"
                  fill="currentColor"
                  fillOpacity="0.2"
                />
              </svg>
            </motion.div>
            <motion.a
              href="#contact"
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.4 }}
              className="inline-flex items-center gap-3 group"
            >
              <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all">
                <ArrowUpRight className="w-5 h-5 text-foreground group-hover:text-primary" />
              </span>
              <span className="font-medium">View All Solutions</span>
            </motion.a>
          </div>

          {/* Right: Cards - scrollable list */}
          <div className="lg:col-span-7 space-y-12">
            {solutions.map((item, i) => (
              <motion.article
                key={item.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="group bg-black/40 rounded-2xl p-6"
              >
                <a href="#solutions" className="block">
                  <div className="relative h-48 md:h-56 rounded-xl overflow-hidden border border-white/10 mb-6">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-60 group-hover:opacity-80 transition-opacity`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl md:text-8xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
                        0{i + 1}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-muted-foreground border border-white/10 rounded-full px-3 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-muted-foreground font-medium text-sm shrink-0">
                      {item.year}
                    </span>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
