"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "2020",
    theme: "Tekhatch Founded",
    description:
      "Started with a mission to eliminate startup development frustrations. First 5 clients onboarded.",
  },
  {
    year: "2021",
    theme: "AI Integration Focus",
    description:
      "Became early adopters of AI/ML integration for startups. Delivered first 20 successful projects.",
  },
  {
    year: "2022",
    theme: "Rapid Growth",
    description:
      "Reached $10M+ in client funding raised. Expanded team to 15+ specialists. AWS Partnership achieved.",
  },
  {
    year: "2023",
    theme: "Market Leadership",
    description:
      "50+ successful launches. First client acquired for $5M. SOC 2 compliance achieved.",
  },
  {
    year: "2024",
    theme: "Innovation & Scale",
    description:
      "$50M+ total funding raised by clients. Advanced AI capabilities. International expansion began.",
  },
];

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: i % 2 === 0 ? -60 : 60,
  }),
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      delay: 0.2 + i * 0.08,
    },
  }),
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 200, damping: 15 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.5 },
  }),
};

export const CompanyMilestones = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToMilestone = (index: number) => {
    milestoneRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  useEffect(() => {
    if (!sectionRef.current || !lineProgressRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineProgressRef.current,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 20%",
            scrub: 1.5,
          },
        }
      );

      // Track active milestone
      milestones.forEach((_, i) => {
        const el = milestoneRefs.current[i];
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
          onLeaveBack: () => setActiveIndex(Math.max(0, i - 1)),
          onLeave: () => setActiveIndex(Math.min(milestones.length - 1, i + 1)),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="milestones"
      className="relative py-28 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Company Milestones
          </h2>
          <div className="inline-block px-8 py-3 bg-primary rounded-full">
            <span className="text-primary-foreground font-semibold text-sm tracking-widest uppercase">
              Company Timeline
            </span>
          </div>
        </motion.div>

        {/* Sticky year nav - click to jump to milestone */}
        <div className="sticky top-20 z-20 mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center gap-2 lg:gap-4 flex-wrap"
          >
            {milestones.map((m, i) => (
              <button
                key={m.year}
                onClick={() => scrollToMilestone(i)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeIndex === i
                    ? "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/40"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                }`}
              >
                {m.year}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical progress line with animated gradient */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/10">
            <div
              ref={lineProgressRef}
              className="absolute top-0 left-0 w-full h-full scale-y-0 origin-top bg-gradient-to-b from-primary via-secondary to-primary animate-gradient"
              style={{ transformOrigin: "top" }}
            />
          </div>

          {/* Milestone cards */}
          <div className="space-y-0">
            {milestones.map((milestone, i) => (
              <MilestoneCard
                key={milestone.year}
                milestone={milestone}
                index={i}
                isLeft={i % 2 === 0}
                isActive={activeIndex === i}
                ref={(el) => { milestoneRefs.current[i] = el; }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const MilestoneCard = forwardRef<
  HTMLDivElement,
  {
    milestone: (typeof milestones)[0];
    index: number;
    isLeft: boolean;
    isActive: boolean;
  }
>(({ milestone, index, isLeft, isActive }, forwardedRef) => {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px -80px 0px" });

  // 3D tilt on hover
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const xVal = (e.clientX - centerX) / rect.width;
    const yVal = (e.clientY - centerY) / rect.height;
    x.set(xVal);
    y.set(yVal);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const setRefs = (el: HTMLDivElement | null) => {
    (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
    if (typeof forwardedRef === "function") forwardedRef(el);
    else if (forwardedRef) forwardedRef.current = el;
  };

  return (
    <motion.div
      ref={setRefs}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative flex items-center py-12 lg:py-16"
    >
      {/* Timeline dot - centered, glows when active */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
        <motion.div
          variants={dotVariants}
          initial="hidden"
          animate={
            isInView
              ? {
                  scale: isActive ? 1.3 : 1,
                  opacity: 1,
                  boxShadow: isActive
                    ? "0 0 24px 8px rgba(249, 115, 22, 0.5)"
                    : "0 4px 14px -4px rgba(249, 115, 22, 0.4)",
                }
              : "hidden"
          }
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-5 h-5 rounded-full bg-primary border-4 border-background"
        />
      </div>

      {/* Card - full width on mobile, alternating sides on desktop */}
      <div
        className={`w-full lg:w-[calc(50%-3rem)] px-4 lg:px-0 text-center ${
          isLeft ? "lg:pr-12 lg:text-right" : "lg:ml-auto lg:pl-12 lg:text-left"
        }`}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 800,
          }}
          className="glass-dark rounded-2xl p-8 border transition-all duration-300 group cursor-default"
          whileHover={{
            borderColor: "rgba(249, 115, 22, 0.3)",
            boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.08)",
          }}
        >
          <motion.span
            variants={staggerItem}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
            className="text-4xl md:text-5xl font-bold text-foreground block mb-2 group-hover:text-primary transition-colors"
          >
            {milestone.year}
          </motion.span>
          <motion.h3
            variants={staggerItem}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={1}
            className="text-xl font-semibold text-foreground mb-4"
          >
            {milestone.theme}
          </motion.h3>
          <motion.p
            variants={staggerItem}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={2}
            className="text-muted-foreground leading-relaxed"
          >
            {milestone.description}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
});
MilestoneCard.displayName = "MilestoneCard";
