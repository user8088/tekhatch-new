"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowRight, Sparkles, Smartphone, Bot, Rocket } from "lucide-react";

type ServiceId = "web" | "ai" | "mvp";

const services: {
  id: ServiceId;
  title: string;
  label: string;
  tagline: string;
  duration: string;
  cta: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  highlights: string[];
}[] = [
  {
    id: "web",
    title: "Custom Web & Mobile Apps",
    label: "Product‑grade engineering for your first 100k users.",
    tagline:
      "Full‑stack, investor‑ready apps with rock‑solid infra and responsive UX on every screen.",
    duration: "6–8 week delivery",
    cta: "Get Development Quote",
    color: "from-sky-500 via-cyan-400 to-emerald-400",
    icon: Smartphone,
    highlights: [
      "Full‑stack web & mobile builds",
      "Cloud deployment & performance tuning",
      "Security, auth, and observability baked in",
    ],
  },
  {
    id: "ai",
    title: "AI Integration & Automation",
    label: "Turn manual workflows into intelligent systems.",
    tagline:
      "Drop AI into your product: chatbots, predictions, and automation tuned to your data.",
    duration: "4–6 week delivery",
    cta: "Explore AI Solutions",
    color: "from-violet-500 via-purple-400 to-fuchsia-400",
    icon: Bot,
    highlights: [
      "Product‑integrated chatbots & copilots",
      "Predictive analytics & smart scoring",
      "Workflow automation that removes busywork",
    ],
  },
  {
    id: "mvp",
    title: "MVP Development & Strategy",
    label: "Launch a fundable product fast.",
    tagline:
      "From idea to clickable, demo‑ready MVP with analytics and launch strategy dialed in.",
    duration: "3–4 week delivery",
    cta: "Start Your MVP",
    color: "from-amber-400 via-orange-400 to-rose-400",
    icon: Rocket,
    highlights: [
      "Lean, validated feature set",
      "High‑impact UX prototypes & flows",
      "Launch and analytics ready on day one",
    ],
  },
];

export const ServicesShowcase = () => {
  const [activeId, setActiveId] = useState<ServiceId>("web");
  const active = services.find((s) => s.id === activeId)!;

  return (
    <section className="relative py-28 overflow-hidden bg-background">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-primary/10 blur-[140px] opacity-60" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/10 blur-[160px] opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(15,23,42,0.9)_0%,_transparent_65%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <p className="inline-flex items-center gap-2 text-primary font-semibold tracking-[0.25em] text-[0.7rem] uppercase">
            <Sparkles className="w-3 h-3" />
            Development Services
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">
            Pick the track that fits your startup.
          </h2>
          <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
            Three focused service tracks, each tuned for a different kind of founder journey.
          </p>
        </motion.div>

        {/* Service pills selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          {services.map((service) => {
            const Icon = service.icon;
            const isActive = service.id === activeId;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => setActiveId(service.id)}
                className={`relative inline-flex items-center gap-3 rounded-full border px-4 py-2 text-xs md:text-sm transition-all ${
                  isActive
                    ? "border-white/60 bg-white/10 shadow-lg"
                    : "border-white/15 bg-black/40 hover:border-white/40 hover:bg-white/[0.06]"
                }`}
              >
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br ${service.color}`}
                >
                  <Icon className="w-3 h-3 text-white" />
                </span>
                <span className="font-medium text-white/90">{service.title}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Active service card */}
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <GlassCard className="relative overflow-hidden border-white/10 bg-gradient-to-br from-white/[0.02] via-black/80 to-black/95">
            <div
              className={`pointer-events-none absolute -inset-32 opacity-60 bg-gradient-to-br ${active.color} blur-3xl`}
            />

            <div className="relative z-10 flex flex-col gap-6 md:gap-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/60 border border-white/10">
                    {(() => {
                      const Icon = active.icon;
                      return <Icon className="w-6 h-6 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white">
                      {active.title}
                    </h3>
                    <p className="text-xs md:text-sm text-white/60">{active.label}</p>
                  </div>
                </div>
                <div className="text-right text-xs md:text-sm">
                  <span className="inline-flex items-center rounded-full border border-white/20 bg-black/50 px-3 py-1 text-white/80 font-medium">
                    {active.duration}
                  </span>
                </div>
              </div>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                {active.tagline}
              </p>

              {/* Highlight chips */}
              <div className="flex flex-wrap gap-3">
                {active.highlights.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full bg-black/60 border border-white/15 px-4 py-2 text-xs md:text-sm text-white/80"
                  >
                    <span className="h-[6px] w-[6px] rounded-full bg-white/70" />
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-2 text-xs md:text-sm font-semibold hover:bg-primary hover:text-white transition-colors">
                  {active.cta}
                  <ArrowRight className="w-3 h-3" />
                </button>
                <p className="text-[0.7rem] md:text-xs text-white/50">
                  Swipe between tracks above to see how we&apos;d ship your next milestone.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

