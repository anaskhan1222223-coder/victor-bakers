"use client";

const TREATS = [
  { icon: "🎂", left: "6%", top: "18%", delay: "0s", size: "text-4xl" },
  { icon: "🧁", left: "88%", top: "14%", delay: "1.2s", size: "text-3xl" },
  { icon: "🍓", left: "10%", top: "72%", delay: "2s", size: "text-3xl" },
  { icon: "🎈", left: "92%", top: "58%", delay: "0.6s", size: "text-4xl" },
  { icon: "✨", left: "45%", top: "8%", delay: "1.6s", size: "text-2xl" },
  { icon: "🍩", left: "72%", top: "84%", delay: "2.4s", size: "text-3xl" },
  { icon: "🥐", left: "28%", top: "86%", delay: "0.9s", size: "text-3xl" },
  { icon: "💖", left: "55%", top: "45%", delay: "1.8s", size: "text-2xl" },
];

export default function Bakery3DBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="animate-blob absolute -left-24 top-10 h-96 w-96 rounded-full bg-rose-200/50 blur-3xl" />
      <div className="animate-blob absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-orange-200/50 blur-3xl [animation-delay:2s]" />
      <div className="animate-blob absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-yellow-200/50 blur-3xl [animation-delay:4s]" />
      {TREATS.map((t, i) => (
        <span
          key={i}
          className={`animate-floaty absolute opacity-20 ${t.size}`}
          style={{ left: t.left, top: t.top, animationDelay: t.delay }}
        >
          {t.icon}
        </span>
      ))}
    </div>
  );
}