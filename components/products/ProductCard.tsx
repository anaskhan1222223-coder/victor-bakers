import Image from "next/image";
import { Egg, ArrowRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { waLink } from "@/lib/site";

export default function ProductCard({ product }: { product: Product }) {
  const orderHref = waLink(
    `Hi! I'd like to order ${product.name}${product.weight ? ` (${product.weight})` : ""}. Please share availability & price.`
  );

  return (
    <article className="card-lift group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface">
      {/* Image — large & premium */}
      <div className="relative aspect-[4/3] overflow-hidden bg-cream">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
          loading="lazy"
          className="object-cover transition-transform duration-[400ms] ease-[var(--ease-lux)] group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {(product.tag || product.popular) && (
            <span className="rounded-full bg-bronze px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-cream shadow-bronze">
              {product.tag ?? "Bestseller"}
            </span>
          )}
        </div>
        {product.eggless && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-emerald-700/30 bg-cream/95 px-2.5 py-1 text-[11px] font-bold text-emerald-800 shadow-sm backdrop-blur-sm">
            <Egg className="h-3 w-3" aria-hidden="true" />
            Eggless
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-chocolate transition-colors duration-300 group-hover:text-bronze">
          {product.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-mocha">{product.description}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            {product.price !== null ? (
              <>
                <p className="text-xl font-extrabold tracking-tight text-chocolate tabular-nums">
                  ₹{product.price}
                  {product.priceUnit && (
                    <span className="text-sm font-semibold text-mocha"> {product.priceUnit}</span>
                  )}
                </p>
                {product.weight && (
                  <p className="mt-0.5 text-xs font-semibold text-mocha">{product.weight}</p>
                )}
              </>
            ) : (
              <p className="text-sm font-bold text-bronze">Price on request</p>
            )}
          </div>

          <a
            href={orderHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-chocolate px-5 py-2.5 text-sm font-bold text-cream transition-all duration-300 ease-[var(--ease-lux)] hover:bg-bronze hover:shadow-bronze group-hover:bg-bronze"
          >
            Order
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}