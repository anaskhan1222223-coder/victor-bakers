export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://victor-bakers.vercel.app/sitemap.xml",
  };
}