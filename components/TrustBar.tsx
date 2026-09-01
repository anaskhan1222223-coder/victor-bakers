export default function TrustBar() {
  const benefits = [
    { icon: "🌾", title: "Freshly Baked", desc: "Made fresh for every order" },
    { icon: "🥚", title: "Eggless Available", desc: "Options for every celebration" },
    { icon: "🎨", title: "Custom Cakes", desc: "Your design, your way" },
    { icon: "💬", title: "Easy Ordering", desc: "Order directly on WhatsApp" },
  ];

  return (
    <section className="border-y border-border bg-surface py-12">
      <div className="mx-auto max-w-7xl px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {benefits.map((b, i) => (
          <div key={i} className="text-center md:text-left flex flex-col items-center md:items-start gap-2">
            <span className="text-3xl mb-2">{b.icon}</span>
            <h3 className="font-display text-lg font-bold text-chocolate">{b.title}</h3>
            <p className="text-sm text-mocha">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}