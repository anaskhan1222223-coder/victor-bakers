import { SITE } from "@/lib/site";

export default function MobileActionBar({ href = "#custom-order" }: { href?: string }) {
  const wa = `https://wa.me/${SITE.phone}?text=${encodeURIComponent(
    `Hi, I want to order from ${SITE.name}.`
  )}`;

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#140d08]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2 px-3 py-2">
        <a
          href={`tel:+${SITE.phone}`}
          className="flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-xl bg-white/5 text-stone-200 transition active:bg-white/15"
        >
          <span className="text-lg leading-none" aria-hidden="true">📞</span>
          <span className="text-[11px] font-bold">Call</span>
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-xl bg-emerald-500/15 text-emerald-300 transition active:bg-emerald-500/25"
        >
          <span className="text-lg leading-none" aria-hidden="true">💬</span>
          <span className="text-[11px] font-bold">WhatsApp</span>
        </a>
        <a
          href={href}
          className="flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 transition active:brightness-110"
        >
          <span className="text-lg leading-none" aria-hidden="true">🎂</span>
          <span className="text-[11px] font-extrabold">Order Cake</span>
        </a>
      </div>
    </nav>
  );
}