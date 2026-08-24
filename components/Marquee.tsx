const items = [
  "Fresh Cakes 🎂",
  "Pastries 🍰",
  "Patties 🥟",
  "Puff Items 🥐",
  "Custom Cakes ✨",
  "Eggless Options 🥚",
  "WhatsApp Orders 💬",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-rose-100 bg-white py-3">
      <div className="animate-marquee flex w-max items-center">
        {row.map((t, i) => (
          <span
            key={i}
            className="mx-6 flex items-center gap-3 whitespace-nowrap text-sm font-bold uppercase tracking-[0.2em] text-rose-500"
          >
            {t} <span className="text-rose-200">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}