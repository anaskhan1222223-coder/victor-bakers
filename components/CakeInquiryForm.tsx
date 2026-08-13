"use client";

import { useState, FormEvent } from "react";

const BAKERY_WHATSAPP_NUMBER = "9319311864"; // Replace with Victor Baker's real number

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-stone-100 placeholder-stone-500 outline-none transition focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/40";

export default function CakeInquiryForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [submittedData, setSubmittedData] = useState<any>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    setStatus("loading");

    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      cakeType: formData.get("cakeType") as string,
      weight: formData.get("weight") as string,
      flavor: formData.get("flavor") as string,
      eggless: formData.get("eggless") === "yes",
      eventDate: formData.get("eventDate") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setSubmittedData(payload);
      form.reset();
    } catch (error) {
      setStatus("error");
    }
  }

  const whatsappMessage = submittedData
    ? `New Cake Enquiry for Victor Baker's

Name: ${submittedData.name}
Phone: ${submittedData.phone}
Cake Type: ${submittedData.cakeType}
Weight: ${submittedData.weight}
Flavor: ${submittedData.flavor}
Eggless: ${submittedData.eggless ? "Yes" : "No"}
Event Date: ${submittedData.eventDate}
Message: ${submittedData.message}`
    : "";

  const whatsappLink = `https://wa.me/${BAKERY_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl md:p-8">
      <h3 className="text-2xl font-bold text-stone-100 md:text-3xl">
        Custom Cake Enquiry
      </h3>

      <p className="mt-2 text-stone-400">
        Send your cake requirement and get price, flavor options and booking
        details.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-stone-300">
            Your Name
          </label>
          <input
            required
            name="name"
            type="text"
            placeholder="e.g. Rahul Sharma"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-stone-300">
            Phone Number
          </label>
          <input
            required
            name="phone"
            type="tel"
            placeholder="e.g. 98765 43210"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-stone-300">
            Cake Type
          </label>
          <select name="cakeType" className={inputClass}>
            <option className="bg-stone-900">Birthday Cake</option>
            <option className="bg-stone-900">Wedding Cake</option>
            <option className="bg-stone-900">Anniversary Cake</option>
            <option className="bg-stone-900">Cupcakes</option>
            <option className="bg-stone-900">Photo Cake</option>
            <option className="bg-stone-900">Custom Cake</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-stone-300">
            Weight
          </label>
          <select name="weight" className={inputClass}>
            <option className="bg-stone-900">0.5 kg</option>
            <option className="bg-stone-900">1 kg</option>
            <option className="bg-stone-900">2 kg</option>
            <option className="bg-stone-900">3 kg</option>
            <option className="bg-stone-900">5 kg</option>
            <option className="bg-stone-900">Custom</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-stone-300">
            Flavor
          </label>
          <input
            name="flavor"
            type="text"
            placeholder="e.g. Chocolate / Red Velvet / Pineapple"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-stone-300">
            Event Date
          </label>
          <input
            name="eventDate"
            type="date"
            className={`${inputClass} [color-scheme:dark]`}
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-stone-300">
            Message
          </label>
          <textarea
            name="message"
            rows={4}
            placeholder="e.g. 2kg eggless chocolate cake with photo print for a birthday on Sunday"
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label className="flex items-center gap-2 text-stone-300">
            <input
              type="checkbox"
              name="eggless"
              value="yes"
              className="h-4 w-4 rounded border-white/20 bg-white/5 text-amber-500 focus:ring-amber-500"
            />
            <span>Eggless Cake</span>
          </label>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4 font-bold text-stone-950 shadow-lg shadow-amber-900/40 transition hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
          >
            {status === "loading" ? "Sending..." : "Send Enquiry"}
          </button>
        </div>
      </form>

      {status === "success" && (
        <div className="mt-6 rounded-3xl border border-green-500/30 bg-green-500/10 p-5 text-green-300">
          <p className="font-bold">Enquiry sent successfully.</p>
          <p className="mt-1">
            You can also send the same details directly on WhatsApp.
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-2xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Send Details on WhatsApp
          </a>
        </div>
      )}

      {status === "error" && (
        <div className="mt-6 rounded-3xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
          Something went wrong. Please try again or contact the bakery
          directly.
        </div>
      )}
    </div>
  );
}