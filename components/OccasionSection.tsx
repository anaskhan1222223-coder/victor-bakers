"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { waLink } from "@/lib/site";

const OCCASIONS = [
  { 
    icon: "🎂", 
    label: "Birthday", 
    msg: "Hi! I'm looking for a birthday cake.",
    image: "/images/birthday-cake.jpg"
  },
  { 
    icon: "💞", 
    label: "Anniversary", 
    msg: "Hi! I'm looking for an anniversary cake.",
    image: "/images/anniversary-cake.jpg"
  },
  { 
    icon: "💒", 
    label: "Wedding", 
    msg: "Hi! I'd like to enquire about a wedding cake.",
    image: "/images/wedding-cake.jpg"
  },
  { 
    icon: "👶", 
    label: "Baby Shower", 
    msg: "Hi! I'm looking for a baby shower cake.",
    image: "/images/baby-shower-cake.jpg"
  },
  { 
    icon: "💍", 
    label: "Engagement", 
    msg: "Hi! I'd like to enquire about an engagement cake.",
    image: "/images/engagement-cake.jpg"
  },
  { 
    icon: "🎁", 
    label: "Gifting", 
    msg: "Hi! I'm looking for cakes for a special occasion.",
    image: "/images/gifting-box.jpg"
  },
];

// Animation variants for staggered popup
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Each card delays 0.1s after the previous
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30, 
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const, // Smooth easing
    },
  },
};

export default function OccasionSection() {
  return (
    <section id="occasions" className="relative z-10 border-y border-[#E6DFD3] bg-white py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#8B5A2B]">Shop by Occasion</p>
          <h2 className="mt-2 text-3xl font-extrabold text-[#3e2723] md:text-4xl">
            Every celebration deserves a cake
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 lg:grid-cols-6"
        >
          {OCCASIONS.map((o) => (
            <motion.a
              key={o.label}
              href={waLink(o.msg)}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex w-40 shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-[#E6DFD3] bg-[#fff8f0] shadow-sm transition-shadow hover:shadow-xl md:w-auto"
            >
              {/* Image */}
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={o.image}
                  alt={o.label}
                  fill
                  sizes="(max-width: 768px) 160px, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C241B]/40 to-transparent" />
              </div>

              {/* Label */}
              <div className="p-4 text-center">
                <span className="text-sm font-bold text-[#3e2723] md:text-base">{o.label}</span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-[#8B5A2B]/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-sm font-bold text-white">Order Now →</span>
              </div>
            </motion.a>
          ))}
        </motion.div>
        <p className="mt-4 text-center text-xs font-semibold text-[#8d6e63] md:hidden">Swipe → to explore</p>
      </div>
    </section>
  );
}