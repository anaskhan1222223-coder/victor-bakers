"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import MobileActionBar from "@/components/MobileActionBar";
import {
  CATEGORY_META,
  ProductCategory,
  getFeaturedProducts,
  getProductsByCategory,
} from "@/lib/products";
import { SITE } from "@/lib/site";

type Filter = "All" | "Featured" | ProductCategory;

function Grid({ products }: { products: ReturnType<typeof getFeaturedProducts> }) {
  return (
    <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default function MenuBrowser() {
  const [active, setActive] = useState<Filter>("All");

  const chips: Filter[] = ["All", "Featured", ...CATEGORY_META.map((c) => c.id)];

  return (
    <main className="min-h-screen bg-[#140d08] text-stone-100">
      {/* Top bar + sticky category chips */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#140d08]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="text-sm font-semibold text-stone-300 transition hover:text-amber-400"
          >
            ← Home
          </Link>
          <p className="text-base font-extrabold sm:text-lg">
            🎂 {SITE.name}{" "}
            <span className="hidden text-xs font-medium text-stone-400 sm:inline">
              · Full Menu
            </span>
          </p>
          <a
            href={`tel:+${SITE.phone}`}
            className="text-sm font-semibold text-amber-400 transition hover:brightness-110"
          >
            Call
          </a>
        </div>

        <div className="mx-auto max-w-7xl overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-2">
            {chips.map((chip) => (
              <button
                key={chip}
                onClick={() => setActive(chip)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition ${
                  active === chip
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950"
                    : "border border-white/10 bg-white/5 text-stone-300 hover:bg-white/10"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 pb-28 pt-10 md:pb-10">
        {active === "All" ? (
          CATEGORY_META.map((meta) => (
            <section key={meta.id} className="mb-14">
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold">
                  {meta.icon} {meta.id}
                </h2>
                <p className="mt-1 text-sm text-stone-400">{meta.blurb}</p>
              </div>
              <Grid products={getProductsByCategory(meta.id)} />
            </section>
          ))
        ) : active === "Featured" ? (
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold">⭐ Featured & Seasonal</h2>
              <p className="mt-1 text-sm text-stone-400">
                Hand-picked favourites and limited-time specials.
              </p>
            </div>
            <Grid products={getFeaturedProducts()} />
          </section>
        ) : (
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold">
                {CATEGORY_META.find((c) => c.id === active)?.icon} {active}
              </h2>
              <p className="mt-1 text-sm text-stone-400">
                {CATEGORY_META.find((c) => c.id === active)?.blurb}
              </p>
            </div>
            <Grid products={getProductsByCategory(active)} />
          </section>
        )}

        {/* Bottom custom-cake CTA */}
        <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-rose-500/10 p-8 text-center">
          <h3 className="text-xl font-extrabold">Want something custom? 🎨</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-stone-400">
            Birthday, wedding, photo or eggless cakes — tell us your idea and we
            will make it fresh for your occasion.
          </p>
          <Link
            href="/#enquiry"
            className="mt-5 inline-block rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-7 py-3.5 text-sm font-bold text-stone-950 shadow-lg shadow-amber-500/20 transition hover:brightness-110"
          >
            Order a Custom Cake
          </Link>
        </div>
      </div>
      <MobileActionBar href="/#custom-order" />
    </main>
  );
}