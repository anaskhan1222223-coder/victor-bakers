import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  metadataBase: new URL("https://victor-bakers.vercel.app"),
  title: "Victor Baker's | Premium Cakes, Pastries & Custom Bakes in Delhi",
  description:
    "Order fresh cakes, pastries, and custom bakery items. Eggless options, direct WhatsApp ordering, and local delivery in Tri Nagar.",
  openGraph: {
    title: "Victor Baker's | Premium Cakes, Pastries & Custom Bakes in Delhi",
    description:
      "Order fresh cakes, pastries, and custom bakery items. Eggless options, direct WhatsApp ordering, and local delivery in Tri Nagar.",
    url: "https://victor-bakers.vercel.app",
    siteName: "Victor Baker's",
    locale: "en_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F8F4ED",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}