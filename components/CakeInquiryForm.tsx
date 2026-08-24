"use client";

import { useRef, useState } from "react";
import { SITE, customCakeMessage, waLink } from "@/lib/site";

/* ---------- Options (derived from existing business data) ---------- */
const CAKE_TYPES = ["Birthday Cake", "Wedding Cake", "Anniversary Cake", "Cupcakes", "Photo Cake", "Custom Cake"];
const FLAVOURS = ["Chocolate", "Vanilla", "Butterscotch", "Red Velvet", "Black Forest", "Pineapple", "Other"];
const WEIGHTS = ["0.5 kg", "1 kg", "2 kg", "3 kg", "5 kg", "Custom"];
const OCCASIONS = ["Birthday", "Anniversary", "Wedding", "Baby Shower", "Engagement", "Office / Corporate", "Other"];

interface FormState {
  name: string;
  phone: string;
  cakeType: string;
  flavour: string;
  weight: string;
  eggless: boolean;
  occasion: string;
  date: string;
  message: string;
}

const DEFAULTS: FormState = {
  name: "",
  phone: "",
  cakeType: "Birthday Cake",
  flavour: "Chocolate",
  weight: "1 kg",
  eggless: false,
  occasion: "Birthday",
  date: "",
  message: "",
};

type Errors = Partial<Record<"name" | "phone" | "date", string>>;

function todayStr() {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}

function prettyDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* ---------- Small UI helpers ---------- */
function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-400">
        {label} {required && <span className="text-amber-400">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs font-semibold text-rose-400">{error}</p>}
    </div>
  );
}

const inputCls = (hasError?: string) =>
  `w-full rounded-xl border bg-white/5 px-4 py-3 text-base md:text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-amber-500/60 ${
    hasError ? "border-rose-500/60" : "border-white/10"
  }`;

export default function CakeInquiryForm() {
  const [form, setForm] = useState<FormState>(DEFAULTS);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [waHref, setWaHref] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onFile = (file: File | null) => {
    if (!file) return setPreview(null);
    setPreview(URL.createObjectURL(file));
  };

  const validate = (): Errors => {
    const errs: Errors = {};
    if (form.name.trim().length < 2) errs.name = "Please tell us your name.";
    if (!/^[6-9]\d{9}$/.test(form.phone.trim()))
      errs.phone = "Please enter a valid 10-digit mobile number.";
    if (!form.date) errs.date = "Please choose the date you need the cake.";
    else if (form.date < todayStr()) errs.date = "The date can't be in the past.";
    return errs;
  };

  const buildMessage = () => {
    const lines = [
      `Hi ${SITE.name},`,
      `I would like to enquire about a custom cake.`,
      ``,
      `Name: ${form.name.trim()}`,
      `Cake: ${form.cakeType}`,
      `Flavour: ${form.flavour}`,
      `Weight: ${form.weight}`,
      `Eggless: ${form.eggless ? "Yes" : "No"}`,
      `Occasion: ${form.occasion}`,
      `Required Date: ${prettyDate(form.date)}`,
    ];
    if (form.message.trim()) lines.push(`Message: ${form.message.trim()}`);
    if (preview) lines.push(`Reference image: I will share it in this chat.`);
    lines.push(``, `Please let me know the availability and price.`);
    return lines.join("\n");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    const link = waLink(buildMessage());
    setWaHref(link);

    // Open WhatsApp IMMEDIATELY (inside the click gesture, or browsers block it)
    window.open(link, "_blank", "noopener");

    // Save lead in background — never blocks WhatsApp
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        hasReferenceImage: Boolean(preview),
        source: "cake-enquiry-v2",
      }),
    }).catch(() => {});

    setStatus("success");
  };

  const reset = () => {
    setForm(DEFAULTS);
    setErrors({});
    setPreview(null);
    setStatus("idle");
    if (fileRef.current) fileRef.current.value = "";
  };

  /* ---------------- SUCCESS STATE ---------------- */
  if (status === "success") {
    return (
      <div className="rounded-3xl border border-green-500/30 bg-green-500/10 p-8 text-center md:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-3xl">✅</div>
        <h3 className="mt-4 text-2xl font-extrabold text-stone-100">Enquiry ready!</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-300">
          We opened WhatsApp with your cake details — just press <strong>Send</strong> there.
          {preview && " Don't forget to attach your reference photo in the chat."} We usually reply within a few hours.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition hover:brightness-110"
          >
            Open WhatsApp Again
          </a>
          <button
            onClick={reset}
            className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-stone-200 transition hover:bg-white/10"
          >
            Make Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- FORM ---------------- */
  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-white/10 bg-[#1a120a]/90 p-6 shadow-2xl shadow-black/40 md:p-8">
      <h3 className="text-xl font-extrabold text-stone-100">🎂 Custom Cake Enquiry</h3>
      <p className="mt-1 text-sm text-stone-400">
        Fill this in 1 minute — we&apos;ll reply on WhatsApp with price & availability.
      </p>

      {status === "error" && (
        <div className="mt-4 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-300">
          Please fix the highlighted fields below.
        </div>
      )}

      {/* GROUP 1 — Your details */}
      <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-amber-500">1 · Your Details</p>
      <div className="mt-3 grid gap-4 md:grid-cols-2">
        <Field label="Your Name" required error={errors.name}>
          <input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Rahul Sharma"
            className={inputCls(errors.name)}
          />
        </Field>
        <Field label="Phone Number" required error={errors.phone}>
          <input
            value={form.phone}
            onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="10-digit mobile number"
            inputMode="numeric"
            className={inputCls(errors.phone)}
          />
        </Field>
      </div>

      {/* GROUP 2 — Your cake */}
      <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-amber-500">2 · Your Cake</p>
      <div className="mt-3 grid gap-4 md:grid-cols-2">
        <Field label="Cake Type">
          <select value={form.cakeType} onChange={(e) => set("cakeType", e.target.value)} className={inputCls()}>
            {CAKE_TYPES.map((t) => (
              <option key={t} className="bg-stone-900">{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Flavour">
          <select value={form.flavour} onChange={(e) => set("flavour", e.target.value)} className={inputCls()}>
            {FLAVOURS.map((t) => (
              <option key={t} className="bg-stone-900">{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Weight">
          <select value={form.weight} onChange={(e) => set("weight", e.target.value)} className={inputCls()}>
            {WEIGHTS.map((t) => (
              <option key={t} className="bg-stone-900">{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Eggless or Regular">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => set("eggless", false)}
              className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
                !form.eggless ? "border-amber-500 bg-amber-500/15 text-amber-300" : "border-white/10 bg-white/5 text-stone-400 hover:bg-white/10"
              }`}
            >
              Regular
            </button>
            <button
              type="button"
              onClick={() => set("eggless", true)}
              className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
                form.eggless ? "border-green-500 bg-green-500/15 text-green-300" : "border-white/10 bg-white/5 text-stone-400 hover:bg-white/10"
              }`}
            >
              🥚 Eggless
            </button>
          </div>
        </Field>
      </div>

      {/* GROUP 3 — Occasion & date */}
      <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-amber-500">3 · Occasion & Date</p>
      <div className="mt-3 grid gap-4 md:grid-cols-2">
        <Field label="Occasion">
          <select value={form.occasion} onChange={(e) => set("occasion", e.target.value)} className={inputCls()}>
            {OCCASIONS.map((t) => (
              <option key={t} className="bg-stone-900">{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Required Date" required error={errors.date}>
          <input
            type="date"
            value={form.date}
            min={todayStr()}
            onChange={(e) => set("date", e.target.value)}
            className={`${inputCls(errors.date)} [color-scheme:dark]`}
          />
        </Field>
      </div>

      {/* GROUP 4 — Extras (optional) */}
      <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-amber-500">4 · Extras (Optional)</p>
      <div className="mt-3 space-y-4">
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            id="ref-image"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          />
          <div className="flex flex-wrap items-center gap-3">
            <label
              htmlFor="ref-image"
              className="cursor-pointer rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-stone-300 transition hover:border-amber-500/50 hover:text-amber-300"
            >
              📷 Add reference photo
            </label>
            {preview && (
              <span className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5 pr-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Reference preview" className="h-10 w-10 rounded-lg object-cover" />
                <span className="text-xs text-stone-400">You&apos;ll attach this in WhatsApp</span>
                <button type="button" onClick={() => { setPreview(null); if (fileRef.current) fileRef.current.value = ""; }} className="text-rose-400" aria-label="Remove reference photo">
                  ✕
                </button>
              </span>
            )}
          </div>
        </div>
        <Field label="Special instructions / cake message">
          <textarea
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            rows={3}
            placeholder='e.g. Write "Happy Birthday Rohan" on the cake, less sweet please.'
            className={inputCls()}
          />
        </Field>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-8 py-4 text-sm font-bold text-stone-950 shadow-lg shadow-amber-500/20 transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-stone-950 border-t-transparent" />
            Preparing your enquiry…
          </>
        ) : (
          <>💬 Get Price on WhatsApp</>
        )}
      </button>
      <p className="mt-3 text-center text-xs text-stone-500">
        No spam. Your details go only to {SITE.name}.
      </p>
    </form>
  );
}