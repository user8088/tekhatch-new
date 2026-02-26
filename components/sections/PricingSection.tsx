"use client";

import { motion, Variants } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter Plan",
    price: "$25,000",
    period: "project",
    delivery: "3-4 week delivery",
    features: [
      "Basic Web Application Development",
      "UI/UX Wireframes & Prototyping",
      "Database Setup",
      "Deployment to Cloud (1 env)",
      "1 Month Technical Support",
    ],
    cta: "Start Your Project",
    popular: false,
    gradient: "from-emerald-500/20 to-teal-500/10",
    borderGlow: "group-hover:shadow-emerald-500/20",
  },
  {
    name: "Professional Plan",
    price: "$75,000",
    period: "project",
    delivery: "4-6 week delivery",
    features: [
      "Full Stack Product Development",
      "Data Pipeline Engineering",
      "Interactive Dashboards",
      "Scalable Cloud Infrastructure",
      "3 Months Maintenance & Support",
    ],
    cta: "Start Your Project",
    popular: true,
    gradient: "from-primary/30 to-secondary/20",
    borderGlow: "group-hover:shadow-primary/30",
  },
  {
    name: "Enterprise Plan",
    price: "$150,000",
    period: "project",
    delivery: "6-8 week delivery",
    features: [
      "AI/ML Model Integration",
      "Financial & Analytical Systems",
      "Advanced Security & Compliance",
      "Multi-region Architecture",
      "Dedicated Engineering Team",
    ],
    cta: "Start Your Project",
    popular: false,
    gradient: "from-violet-500/20 to-purple-500/10",
    borderGlow: "group-hover:shadow-violet-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="relative py-28 bg-background overflow-visible"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative overflow-visible">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-[0.2em] text-sm uppercase block mb-4">
            Pricing
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Choose Your Plan
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Custom pricing and delivery time based on project scope. Taxes may apply.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 pt-6 overflow-visible"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={cardVariants as unknown as Variants}
              className={`relative flex flex-col items-center ${plan.popular ? "z-10" : ""}`}
            >
              <motion.div
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className={`group relative w-full h-full rounded-3xl overflow-visible ${
                  plan.popular ? "md:scale-[1.03]" : ""
                }`}
              >
                {/* Glassmorphism card with shimmer */}
                <div
                  className={`relative h-full rounded-3xl p-8 lg:p-10 border transition-all duration-500 glass-shimmer
                    bg-[rgba(255,255,255,0.02)] backdrop-blur-2xl border-white/[0.08]
                    hover:bg-[rgba(255,255,255,0.04)] hover:border-white/20 hover:backdrop-blur-3xl
                    ${plan.borderGlow} hover:shadow-2xl
                    ${plan.popular ? "ring-2 ring-primary/50 shadow-xl shadow-primary/10" : ""}
                  `}
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />

                  <div className="relative z-10">
                    {/* Most Popular badge - inside card, contained within width */}
                    {plan.popular && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="flex justify-center mb-5"
                      >
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold tracking-wider shadow-lg shadow-primary/30 whitespace-nowrap">
                          <Sparkles className="w-3.5 h-3.5 shrink-0" />
                          Most Popular
                        </span>
                      </motion.div>
                    )}
                    {/* Plan name */}
                    <h3 className="text-xl font-bold uppercase tracking-wider text-foreground mb-6">
                      {plan.name}
                    </h3>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, j) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * j + 0.3 }}
                          className="flex items-start gap-3 text-muted-foreground"
                        >
                          <span className="shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-primary" />
                          </span>
                          <span className="text-sm leading-relaxed">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-3xl lg:text-4xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground text-lg ml-1">
                        / {plan.period}
                      </span>
                    </div>

                    {/* Delivery */}
                    <p className="text-primary/90 text-sm font-medium mb-8">
                      {plan.delivery}
                    </p>

                    {/* CTA */}
                    <motion.a
                      href="#contact"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`block w-full py-4 rounded-2xl font-semibold text-center text-sm uppercase tracking-wider transition-all duration-300
                        ${plan.popular
                          ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/40"
                          : "bg-white/10 text-foreground hover:bg-white/15 border border-white/10"
                        }`}
                    >
                      {plan.cta}
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
