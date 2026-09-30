// ────────────────────────────────────────────────────────────
// REVIEWS CONFIG — EDIT PER CLIENT
// • score / countLabel: use ONLY real, verifiable numbers.
// • TESTIMONIALS are illustrative samples for this demo template.
//   Replace with real customer reviews before going live for a client.
// ────────────────────────────────────────────────────────────

export interface Review {
  rating: number; // 1–5
  text: string;
  name: string;
  meta?: string;
}

export const REVIEW_CONFIG = {
  showBadge: true,
  score: 4.2,
  countLabel: "1,500+ local ratings",
  linkLabel: "See all reviews",
  link: "https://www.google.com/maps/search/?api=1&query=Victor+Baker%27s+Tri+Nagar+Delhi",
};

export const TESTIMONIALS: Review[] = [
  { rating: 5, text: "Extremely soft, fresh and delicious. Reasonably priced with good quantity.", name: "Priya S.", meta: "Local customer" },
  { rating: 5, text: "Fresh cakes with a good variety of flavours. Polite staff and quick service.", name: "Rajesh K.", meta: "Regular customer" },
  { rating: 4, text: "Reasonable prices for cakes and bakery items. Quality is consistent.", name: "Anita M.", meta: "Local customer" },
  { rating: 5, text: "Fresh preparation, satisfying portions, flavorful bakes. Always reliable.", name: "Vikram T.", meta: "Regular customer" },
  { rating: 5, text: "Our go-to bakery in Tri Nagar for birthdays. Cakes are always fresh.", name: "Sunita R.", meta: "Local customer" },
];