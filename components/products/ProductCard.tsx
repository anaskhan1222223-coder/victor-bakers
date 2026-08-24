import Image from "next/image";
import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";
import { whatsappOrderLink } from "@/lib/site";

const FALLBACK_ICON: Record<string, string> = {
  Cakes: "🎂",
  Pastries: "🍰",
  "Bakery Snacks": "🥐",
  "Custom Cakes": "🎨",
};

export default function ProductCard({ product }: { product: Product }) {
  const hasPrice = product.price !== null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#1a120a]/95 shadow-lg shadow-black/40 transition hover:-translate-y-1 hover:border-amber-500/30">
      {/* Image — consistent 4:3 ratio everywhere */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-500/15 to-rose-500/10 text-6xl">
          {FALLBACK_ICON[product.category]}
        </div>
        <Image
          src={product.image}
          alt={`${product.name} at Victor Baker's`}
          fill
          sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#140d08] via-transparent to-transparent opacity-80" />

        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-stone-950">
            {product.tag}
          </span>
        )}
        {product.eggless && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-green-600/90 px-2.5 py-1 text-[10px] font-bold text-white">
            🥚 Eggless
          </span>
        )}
      </div>

      {/* Body — fixed structure = consistent heights */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500/80">
          {product.category}
        </p>
        <h3 className="mt-1.5 line-clamp-1 text-base font-bold text-stone-100 sm:text-lg">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-stone-400">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <span
            className={
              hasPrice
                ? "text-lg font-extrabold text-amber-400"
                : "text-xs font-bold text-stone-300"
            }
          >
            {formatPrice(product)}
          </span>

          {hasPrice ? (
            <a
              href={whatsappOrderLink(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Order ${product.name} on WhatsApp`}
              className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-xs font-bold text-stone-950 shadow-md shadow-amber-500/20 transition hover:brightness-110"
            >
              Order
            </a>
          ) : (
            <Link
              href="/#enquiry"
              aria-label={`Enquire about ${product.name}`}
              className="rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-xs font-bold text-amber-400 transition hover:bg-amber-500/20"
            >
              Enquire
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}