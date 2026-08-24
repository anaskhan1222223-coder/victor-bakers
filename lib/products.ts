export type ProductCategory =
  | "Cakes"
  | "Pastries"
  | "Bakery Snacks"
  | "Custom Cakes";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number | null; // null = price on request (never invent prices)
  priceUnit?: string;
  category: ProductCategory;
  image: string;
  eggless?: boolean; // show badge only when true
  popular?: boolean; // shown on homepage
  seasonal?: boolean; // shown in Featured
  tag?: string;
}

export const CATEGORY_META: {
  id: ProductCategory;
  icon: string;
  blurb: string;
}[] = [
  { id: "Cakes", icon: "🎂", blurb: "Fresh cream & layered cakes" },
  { id: "Pastries", icon: "🍰", blurb: "Single-serve treats" },
  { id: "Bakery Snacks", icon: "🥐", blurb: "Patties, puffs & savoury bakes" },
  { id: "Custom Cakes", icon: "🎨", blurb: "Made to order for your occasion" },
];

export const PRODUCTS: Product[] = [
  // ---- Cakes (existing prices) ----
  { id: "choc-truffle", name: "Chocolate Truffle Cake", description: "Rich chocolate layers with silky truffle cream.", price: 899, priceUnit: "/kg", category: "Cakes", image: "/images/chocolate-truffle-cake.jpg", tag: "Bestseller", popular: true },
  { id: "red-velvet", name: "Red Velvet Cake", description: "Soft red velvet with cream cheese frosting.", price: 999, priceUnit: "/kg", category: "Cakes", image: "/images/red-velvet-cake.jpg", tag: "Premium", popular: true },
  { id: "black-forest", name: "Black Forest Cake", description: "Chocolate sponge, cherries and fresh cream.", price: 799, priceUnit: "/kg", category: "Cakes", image: "/images/black-forest-cake.jpg" },
  { id: "pineapple-cake", name: "Pineapple Cake", description: "Light fresh cream cake with juicy pineapple.", price: 799, priceUnit: "/kg", category: "Cakes", image: "/images/pineapple-cake.jpg" },

  // ---- Pastries (existing prices) ----
  { id: "choc-pastry", name: "Chocolate Truffle Pastry", description: "Rich chocolate pastry for true chocolate lovers.", price: 90, priceUnit: "", category: "Pastries", image: "/images/chocolate-pastry.jpg", tag: "Bestseller" },
  { id: "pineapple-pastry", name: "Pineapple Pastry", description: "Fresh cream pastry with pineapple slice.", price: 80, priceUnit: "", category: "Pastries", image: "/images/pineapple-pastry.jpg" },
  { id: "blueberry-cheesecake", name: "Blueberry Cheesecake", description: "Creamy cheesecake with blueberry topping.", price: 140, priceUnit: "", category: "Pastries", image: "/images/blueberry-cheesecake.jpg", tag: "Premium", popular: true },
  { id: "red-velvet-pastry", name: "Red Velvet Pastry", description: "Premium red velvet with cream cheese topping.", price: 95, priceUnit: "", category: "Pastries", image: "/images/red-velvet-pastry.jpg" },

  // ---- Bakery Snacks (existing patties + puffs prices) ----
  { id: "veg-patty", name: "Veg Patty", description: "Crispy pastry filled with spiced vegetables.", price: 35, priceUnit: "", category: "Bakery Snacks", image: "/images/veg-patty.jpg" },
  { id: "paneer-patty", name: "Paneer Patty", description: "Soft paneer filling wrapped in flaky pastry.", price: 45, priceUnit: "", category: "Bakery Snacks", image: "/images/paneer-patty.jpg", tag: "Popular" },
  { id: "cheese-corn-patty", name: "Cheese Corn Patty", description: "Cheesy corn filling with golden crispy crust.", price: 55, priceUnit: "", category: "Bakery Snacks", image: "/images/cheese-corn-patty.jpg" },
  { id: "aloo-patty", name: "Aloo Masala Patty", description: "Classic Delhi-style spicy potato filling.", price: 35, priceUnit: "", category: "Bakery Snacks", image: "/images/aloo-patty.jpg" },
  { id: "veg-puff", name: "Veg Puff", description: "Flaky golden puff with mixed vegetable filling.", price: 30, priceUnit: "", category: "Bakery Snacks", image: "/images/veg-puff.jpg" },
  { id: "paneer-puff", name: "Paneer Puff", description: "Spicy paneer filling inside crispy puff.", price: 40, priceUnit: "", category: "Bakery Snacks", image: "/images/paneer-puff.jpg", tag: "Popular", popular: true },
  { id: "aloo-puff", name: "Aloo Puff", description: "Classic potato puff, perfect with chai.", price: 30, priceUnit: "", category: "Bakery Snacks", image: "/images/aloo-puff.jpg" },
  { id: "cheese-puff", name: "Cheese Puff", description: "Cheesy filling with buttery puff layers.", price: 50, priceUnit: "", category: "Bakery Snacks", image: "/images/cheese-puff.jpg" },

  // ---- Custom Cakes (no invented prices → "on request") ----
  // Types derived from the existing enquiry form options.
  { id: "custom-birthday", name: "Birthday Theme Cake", description: "Designed around your theme, flavors and celebration.", price: null, category: "Custom Cakes", image: "/images/red-velvet-cake.jpg", eggless: true, tag: "Made to Order" },
  { id: "custom-photo", name: "Photo Cake", description: "Your photo, your cake — made specially for you.", price: null, category: "Custom Cakes", image: "/images/pineapple-cake.jpg", eggless: true, tag: "Made to Order" },
  { id: "custom-wedding", name: "Wedding & Anniversary Cake", description: "Decorated celebration cakes for big occasions.", price: null, category: "Custom Cakes", image: "/images/black-forest-cake.jpg", eggless: true, tag: "Made to Order" },
];

export const getPopularProducts = () => PRODUCTS.filter((p) => p.popular);
export const getFeaturedProducts = () =>
  PRODUCTS.filter((p) => p.popular || p.seasonal);
export const getProductsByCategory = (c: ProductCategory) =>
  PRODUCTS.filter((p) => p.category === c);

export function formatPrice(p: Product) {
  if (p.price === null) return "Price on request";
  return `₹${p.price}${p.priceUnit ?? ""}`;
}