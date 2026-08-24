import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Victor Baker's — Bakery in Tri Nagar, Delhi | Cakes, Pastries & Snacks",
  description:
    "Order birthday cakes, custom cakes, pastries, patties & puffs from Victor Baker's, Tri Nagar. Eggless options, WhatsApp orders & fast local delivery. Visit us in Onkar Nagar, Shambhu Nagar.",
  openGraph: {
    title: "Victor Baker's — Bakery in Tri Nagar, Delhi",
    description: "Fresh cakes, pastries & bakery snacks. Order on WhatsApp or book a custom cake online.",
    images: ["/images/chocolate-truffle-cake.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
  <body className="bg-[#140d08] text-stone-100 antialiased">
    {children}
  </body>
</html>
  );
}