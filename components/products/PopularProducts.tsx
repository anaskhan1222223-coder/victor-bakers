import Link from "next/link";
import ProductCard from "./ProductCard";
import { getPopularProducts } from "@/lib/products";

export default function PopularProducts() {
  const popular = getPopularProducts();

  return (
    <section id="menu" className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-500">
          Freshly Baked Daily
        </p>
        <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">
          Our{" "}
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
            Bestsellers
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-stone-400 md:text-base">
          The items Tri Nagar loves the most — baked fresh every morning.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
        {popular.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 text-sm font-bold text-stone-950 shadow-lg shadow-amber-500/20 transition hover:brightness-110"
        >
          View Full Menu →
        </Link>
      </div>
    </section>
  );
}