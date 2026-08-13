"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["Cakes", "Pastries", "Patties", "Puff Items"] as const;

type Category = (typeof categories)[number];

type MenuItem = {
  name: string;
  description: string;
  price: string;
  tag?: string;
  image: string;
};

const categoryIcons: Record<Category, string> = {
  Cakes: "🎂",
  Pastries: "🍰",
  Patties: "🥟",
  "Puff Items": "🥐",
};

const menu: Record<Category, MenuItem[]> = {
  Cakes: [
    {
      name: "Chocolate Truffle Cake",
      description: "Rich chocolate layers with silky truffle cream.",
      price: "₹899/kg",
      tag: "Bestseller",
      image: "/images/chocolate-truffle-cake.jpg",
    },
    {
      name: "Red Velvet Cake",
      description: "Soft red velvet with cream cheese frosting.",
      price: "₹999/kg",
      tag: "Premium",
      image: "/images/red-velvet-cake.jpg",
    },
    {
      name: "Black Forest Cake",
      description: "Chocolate sponge, cherries and fresh cream.",
      price: "₹799/kg",
      image: "/images/black-forest-cake.jpg",
    },
    {
      name: "Pineapple Cake",
      description: "Light fresh cream cake with juicy pineapple.",
      price: "₹799/kg",
      image: "/images/pineapple-cake.jpg",
    },
  ],

  Pastries: [
    {
      name: "Chocolate Truffle Pastry",
      description: "Rich chocolate pastry for true chocolate lovers.",
      price: "₹90",
      tag: "Bestseller",
      image: "/images/chocolate-pastry.jpg",
    },
    {
      name: "Pineapple Pastry",
      description: "Fresh cream pastry with pineapple slice.",
      price: "₹80",
      image: "/images/pineapple-pastry.jpg",
    },
    {
      name: "Blueberry Cheesecake",
      description: "Creamy cheesecake with blueberry topping.",
      price: "₹140",
      tag: "Premium",
      image: "/images/blueberry-cheesecake.jpg",
    },
    {
      name: "Red Velvet Pastry",
      description: "Premium red velvet with cream cheese topping.",
      price: "₹95",
      image: "/images/red-velvet-pastry.jpg",
    },
  ],

  Patties: [
    {
      name: "Veg Patty",
      description: "Crispy pastry filled with spiced vegetables.",
      price: "₹35",
      image: "/images/veg-patty.jpg",
    },
    {
      name: "Paneer Patty",
      description: "Soft paneer filling wrapped in flaky pastry.",
      price: "₹45",
      tag: "Popular",
      image: "/images/paneer-patty.jpg",
    },
    {
      name: "Cheese Corn Patty",
      description: "Cheesy corn filling with golden crispy crust.",
      price: "₹55",
      image: "/images/cheese-corn-patty.jpg",
    },
    {
      name: "Aloo Masala Patty",
      description: "Classic Delhi-style spicy potato filling.",
      price: "₹35",
      image: "/images/aloo-patty.jpg",
    },
  ],

  "Puff Items": [
    {
      name: "Veg Puff",
      description: "Flaky golden puff with mixed vegetable filling.",
      price: "₹30",
      image: "/images/veg-puff.jpg",
    },
    {
      name: "Paneer Puff",
      description: "Spicy paneer filling inside crispy puff.",
      price: "₹40",
      tag: "Popular",
      image: "/images/paneer-puff.jpg",
    },
    {
      name: "Aloo Puff",
      description: "Classic potato puff, perfect with chai.",
      price: "₹30",
      image: "/images/aloo-puff.jpg",
    },
    {
      name: "Cheese Puff",
      description: "Cheesy filling with buttery puff layers.",
      price: "₹50",
      image: "/images/cheese-puff.jpg",
    },
  ],
};

export default function MenuSection() {
  const [active, setActive] = useState<Category>("Cakes");

  return (
    <section id="menu" className="mx-auto max-w-7xl px-4 py-14">
      <div className="mb-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold md:text-5xl"
        >
          Fresh From{" "}
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
            Victor Baker&apos;s
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-3 max-w-2xl text-lg text-stone-400"
        >
          Cakes, pastries, patties and puff items baked fresh for birthdays,
          parties, office snacks and daily cravings.
        </motion.p>
      </div>

      {/* Separate animated menu bar */}
      <div className="sticky top-24 z-30 mb-10 overflow-x-auto rounded-full border border-white/10 bg-[#140d08]/80 p-2 shadow-lg shadow-black/30 backdrop-blur-xl">
        <div className="flex min-w-max items-center justify-center gap-2">
          {categories.map((category) => {
            const isActive = active === category;

            return (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition md:px-6 ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 shadow-lg shadow-amber-900/40"
                    : "text-stone-300 hover:bg-white/10"
                }`}
              >
                <span>{categoryIcons[category]}</span>
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.28 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          {menu[active].map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-black/30 backdrop-blur-xl transition hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-900/20"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#140d08]/80 via-transparent to-transparent" />

                {item.tag && (
                  <span className="absolute left-4 top-4 rounded-full bg-amber-500/90 px-3 py-1 text-xs font-bold text-stone-950">
                    {item.tag}
                  </span>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-stone-100">
                  {item.name}
                </h3>

                <p className="mt-2 min-h-[40px] text-sm leading-relaxed text-stone-400">
                  {item.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-amber-400">
                    {item.price}
                  </span>

                  <span className="rounded-full bg-amber-500 px-4 py-2 text-xs font-bold text-stone-950 opacity-0 transition group-hover:opacity-100">
                    Enquire Now
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}