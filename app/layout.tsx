import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Victor Baker's | Fresh Cakes, Pastries & Bakery in Tri Nagar, Delhi",
  description:
    "Victor Baker's - fresh cakes, pastries, patties and puff items in Tri Nagar, Delhi. Order custom cakes directly on WhatsApp.",
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