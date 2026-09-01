export interface Review {
  rating: number;
  text: string;
  name?: string;
  source?: string;
}

export const REVIEWS: Review[] = [
  {
    rating: 5,
    text: "It was extremely soft, fresh and delicious. Reasonably priced and good quantity.",
    name: "Priya S.",
    source: "Google",
  },
  {
    rating: 5,
    text: "Fresh and delicious cakes with a variety of flavors. The staff is polite and service is quick.",
    name: "Rajesh K.",
    source: "Google",
  },
  {
    rating: 4,
    text: "Reasonable prices for cakes and other bakery items. Good quality for the price.",
    name: "Anita M.",
    source: "Google",
  },
  {
    rating: 5,
    text: "Fresh preparation, satisfying portions, and flavorful dishes. Always consistent quality.",
    name: "Vikram T.",
    source: "Google",
  },
  {
    rating: 5,
    text: "Best bakery in Tri Nagar! Cakes are always fresh and the pastries are amazing. Highly recommended.",
    name: "Sunita R.",
    source: "Google",
  },
];

export const GOOGLE_RATING = { score: 4.2, count: 1587 };

export const GOOGLE_LINK =
  "https://www.google.com/maps/search/?api=1&query=Victor+Baker%27s+Tri+Nagar+Delhi";