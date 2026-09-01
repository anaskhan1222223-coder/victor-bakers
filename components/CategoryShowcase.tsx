"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const CATEGORIES = [
  { name: "Birthday Cakes", image: "/images/chocolate-truffle-cake.jpg", count: "10+ varieties" },
  { name: "Pastries", image: "/images/chocolate-pastry.jpg", count: "Fresh daily" },
  { name: "Patties & Puffs", image: "/images/paneer-puff.jpg", count: "Crispy & golden" },
  { name: "Custom Cakes", image: "/images/red-velvet-cake.jpg", count: "Your design" },
];

export default function CategoryShowcase() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-14 md:py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#8B5A2B]">
            Browse by category
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-[#3e2723] md:text-4xl">
            What are you craving today?
          </h2>
        </div>
        <Link href="/menu" className="hidden text-sm font-bold text-[#8B5A2B] hover:underline md:inline-block">
          View full menu →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Link href="/menu" className="group relative block overflow-hidden rounded-3xl shadow-md">
              <div className="relative aspect-[4/5] sm:aspect-square">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C241B]/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-base font-extrabold text-white md:text-lg">{cat.name}</p>
                <p className="text-xs font-semibold text-white/80">{cat.count}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 text-center md:hidden">
        <Link href="/menu" className="text-sm font-bold text-[#8B5A2B] hover:underline">
          View full menu →
        </Link>
      </div>
    </section>
  );
}