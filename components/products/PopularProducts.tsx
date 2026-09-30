"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { getPopularProducts } from "@/lib/products";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PopularProducts() {
  const popular = getPopularProducts();

  return (
    <section id="menu" className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <div className="mb-10 text-center md:mb-12">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-eyebrow uppercase text-caramel"
        >
          Freshly Baked Daily
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          className="mt-3 font-display text-section font-bold text-chocolate"
        >
          Our <span className="italic text-caramel">Bestsellers</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.16 }}
          className="mx-auto mt-3 max-w-xl text-sm text-mocha md:text-base"
        >
          The items Tri Nagar loves the most — baked fresh every morning.
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4"
      >
        {popular.map((product) => (
          <motion.div
            key={product.id}
            className="h-full"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mt-10 text-center md:mt-12"
      >
        <Link
          href="/menu"
          className="group inline-flex items-center gap-2 rounded-full bg-bronze px-8 py-4 text-sm font-bold text-cream shadow-bronze transition-all duration-300 ease-[var(--ease-lux)] hover:bg-bronze-hover hover:shadow-pastry"
        >
          View Full Menu
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </motion.div>
    </section>
  );
}