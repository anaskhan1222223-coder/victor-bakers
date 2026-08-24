import type { Metadata } from "next";
import MenuBrowser from "@/components/products/MenuBrowser";

export const metadata: Metadata = {
  title: "Full Menu — Cakes, Pastries & Bakery Snacks | Victor Baker's Tri Nagar",
  description:
    "Browse the full menu of Victor Baker's, bakery in Tri Nagar, Delhi. Birthday cakes, pastries, patties, puffs and custom cakes. Order directly on WhatsApp.",
};

export default function MenuPage() {
  return <MenuBrowser />;
}