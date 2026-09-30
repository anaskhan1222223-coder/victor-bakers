"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Cake, Camera, MessageCircle, Egg, Check, X, Sparkles } from "lucide-react";
import { SITE, waLink } from "@/lib/site";

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
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-cream/70">
        {label} {required && <span className="text-caramel">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs font-semibold text-rose-400">{error}</p>}
    </div>
  );
}

const inputCls = (hasError?: string) =>
  `w-full rounded-xl border bg-cream/5 px-4 py-3 text-base md:text-sm text-cream placeholder-cream/40 outline-none transition-all duration-300 focus:border-caramel focus:ring-2 focus:ring-caramel/20 ${
    hasError ? "border-rose-500/60" : "border-cream/15"
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

    window.open(link, "_blank", "noopener");

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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-3xl border border-emerald-500/30 bg-emerald-950/40 p-8 text-center backdrop-blur-sm md:p-10"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
          <Check className="h-8 w-8 text-emerald-400" aria-hidden="true" />
        </div>
        <h3 className="mt-4 font-display text-2xl font-extrabold text-cream">
          Enquiry ready!
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-cream/70">
          We opened WhatsApp with your cake details — just press <strong className="text-cream">Send</strong> there.
          {preview && " Don't forget to attach your reference photo in the chat."} We usually reply within a few hours.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-cream shadow-lg transition-all duration-300 hover:bg-emerald-500 hover:shadow-pastry"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Open WhatsApp Again
          </a>
          <button
            onClick={reset}
            className="rounded-full border-2 border-cream/20 bg-cream/5 px-6 py-3 text-sm font-semibold text-cream transition-all duration-300 hover:border-caramel hover:text-caramel"
          >
            Make Another Enquiry
          </button>
        </div>
      </motion.div>
    );
  }

  /* ---------------- FORM ---------------- */
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={handleSubmit}
      noValidate
      className="relative overflow-hidden rounded-3xl border border-cream/10 bg-chocolate p-6 shadow-pastry-lg md:p-8"
    >
      {/* Subtle grain overlay for editorial feel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-caramel/15">
          <Cake className="h-5 w-5 text-caramel" aria-hidden="true" />
        </div>
        <h3 className="font-display text-xl font-extrabold text-cream">
          Custom Cake Enquiry
        </h3>
      </div>
      <p className="relative mt-2 text-sm text-cream/70">
        Fill this in 1 minute — we&apos;ll reply on WhatsApp with price & availability.
      </p>

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mt-4 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-300"
        >
          Please fix the highlighted fields below.
        </motion.div>
      )}

      {/* GROUP 1 — Your details */}
      <p className="relative mt-6 text-eyebrow uppercase text-caramel">1 · Your Details</p>
      <div className="relative mt-3 grid gap-4 md:grid-cols-2">
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
      <p className="relative mt-7 text-eyebrow uppercase text-caramel">2 · Your Cake</p>
      <div className="relative mt-3 grid gap-4 md:grid-cols-2">
        <Field label="Cake Type">
          <select value={form.cakeType} onChange={(e) => set("cakeType", e.target.value)} className={inputCls()}>
            {CAKE_TYPES.map((t) => (
              <option key={t} className="bg-chocolate text-cream">{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Flavour">
          <select value={form.flavour} onChange={(e) => set("flavour", e.target.value)} className={inputCls()}>
            {FLAVOURS.map((t) => (
              <option key={t} className="bg-chocolate text-cream">{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Weight">
          <select value={form.weight} onChange={(e) => set("weight", e.target.value)} className={inputCls()}>
            {WEIGHTS.map((t) => (
              <option key={t} className="bg-chocolate text-cream">{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Eggless or Regular">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => set("eggless", false)}
              className={`rounded-xl border px-4 py-3 text-sm font-bold transition-all duration-300 ${
                !form.eggless
                  ? "border-caramel bg-caramel/15 text-caramel"
                  : "border-cream/15 bg-cream/5 text-cream/60 hover:border-cream/30"
              }`}
            >
              Regular
            </button>
            <button
              type="button"
              onClick={() => set("eggless", true)}
              className={`inline-flex items-center justify-center gap-1.5 rounded-xl border px-4 py-3 text-sm font-bold transition-all duration-300 ${
                form.eggless
                  ? "border-emerald-400 bg-emerald-500/15 text-emerald-300"
                  : "border-cream/15 bg-cream/5 text-cream/60 hover:border-cream/30"
              }`}
            >
              <Egg className="h-4 w-4" aria-hidden="true" />
              Eggless
            </button>
          </div>
        </Field>
      </div>

      {/* GROUP 3 — Occasion & date */}
      <p className="relative mt-7 text-eyebrow uppercase text-caramel">3 · Occasion & Date</p>
      <div className="relative mt-3 grid gap-4 md:grid-cols-2">
        <Field label="Occasion">
          <select value={form.occasion} onChange={(e) => set("occasion", e.target.value)} className={inputCls()}>
            {OCCASIONS.map((t) => (
              <option key={t} className="bg-chocolate text-cream">{t}</option>
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
      <p className="relative mt-7 text-eyebrow uppercase text-caramel">4 · Extras (Optional)</p>
      <div className="relative mt-3 space-y-4">
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
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-cream/20 bg-cream/5 px-4 py-3 text-sm font-semibold text-cream/80 transition-all duration-300 hover:border-caramel hover:text-caramel"
            >
              <Camera className="h-4 w-4" aria-hidden="true" />
              Add reference photo
            </label>
            {preview && (
              <span className="flex items-center gap-2 rounded-xl border border-cream/15 bg-cream/5 p-1.5 pr-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Reference preview" className="h-10 w-10 rounded-lg object-cover" />
                <span className="text-xs text-cream/60">Attach in WhatsApp</span>
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    if (fileRef.current) fileRef.current.value = "";
                  }}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500/20 text-rose-300 transition-colors hover:bg-rose-500/30"
                  aria-label="Remove reference photo"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
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
        className="group relative mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-bronze to-caramel px-8 py-4 text-sm font-bold text-cream shadow-bronze transition-all duration-300 ease-[var(--ease-lux)] hover:shadow-pastry disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream border-t-transparent" />
            Preparing your enquiry…
          </>
        ) : (
          <>
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Get Price on WhatsApp
            <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
          </>
        )}
      </button>
      <p className="relative mt-3 text-center text-xs text-cream/50">
        No spam. Your details go only to {SITE.name}.
      </p>
    </motion.form>
  );
}