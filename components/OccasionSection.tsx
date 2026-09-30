"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Cake, Heart, Church, Baby, Gem, Gift, ArrowRight } from "lucide-react";
import { waLink } from "@/lib/site";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const OCCASIONS = [
  { 
    Icon: Cake,
    label: "Birthday", 
    msg: "Hi! I'm looking for a birthday cake.",
    image: "/images/birthday-cake.jpg"
  },
  { 
    Icon: Heart,
    label: "Anniversary", 
    msg: "Hi! I'm looking for an anniversary cake.",
    image: "/images/anniversary-cake.jpg"
  },
  { 
    Icon: Church,
    label: "Wedding", 
    msg: "Hi! I'd like to enquire about a wedding cake.",
    image: "/images/wedding-cake.jpg"
  },
  { 
    Icon: Baby,
    label: "Baby Shower", 
    msg: "Hi! I'm looking for a baby shower cake.",
    image: "/images/baby-shower-cake.jpg"
  },
  { 
    Icon: Gem,
    label: "Engagement", 
    msg: "Hi! I'd like to enquire about an engagement cake.",
    image: "/images/engagement-cake.jpg"
  },
  { 
    Icon: Gift,
    label: "Gifting", 
    msg: "Hi! I'm looking for cakes for a special occasion.",
    image: "/images/gifting-box.jpg"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 24, 
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.55,
      ease: EASE,
    },
  },
};

export default function OccasionSection() {
  return (
    <section id="occasions" className="relative z-10 border-y border-border bg-surface py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-10 text-center md:mb-12">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-eyebrow uppercase text-caramel"
          >
            Shop by Occasion
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="mt-3 font-display text-section font-bold text-chocolate"
          >
            Every celebration deserves a <span className="italic text-caramel">cake</span>
          </motion.h2>
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:pb-0 lg:grid-cols-6"
        >
          {OCCASIONS.map((o) => (
            <motion.a
              key={o.label}
              href={waLink(o.msg)}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex w-44 shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-border bg-cream shadow-pastry transition-shadow duration-300 hover:shadow-pastry-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 md:w-auto"
            >
              {/* Image */}
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={o.image}
                  alt={o.label}
                  fill
                  sizes="(max-width: 768px) 176px, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-[400ms] ease-[var(--ease-lux)] group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate/50 via-transparent to-transparent" />
                
                {/* Icon badge */}
                <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 backdrop-blur-sm">
                  <o.Icon className="h-4 w-4 text-bronze" aria-hidden="true" />
                </div>
              </div>

              {/* Label + CTA */}
              <div className="flex flex-1 flex-col items-center justify-between p-4">
                <span className="text-sm font-bold text-chocolate md:text-base">
                  {o.label}
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-caramel opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Order Now
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </div>

              {/* Hover overlay (full cover on mobile tap) */}
              <div className="absolute inset-0 flex items-center justify-center bg-bronze/95 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 md:opacity-0">
                <span className="inline-flex items-center gap-2 text-sm font-bold text-cream">
                  Order Now
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Mobile scroll hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
          className="mt-5 text-center text-xs font-semibold text-mocha md:hidden"
        >
          Swipe → to explore
        </motion.p>
      </div>
    </section>
  );
}