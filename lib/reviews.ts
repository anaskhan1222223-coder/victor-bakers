/* ============================================================
   REAL REVIEWS GO HERE — never invent testimonials.
   Copy genuine reviews from the Google Business Profile.

   Example (only after it exists on Google):
   export const REVIEWS: Review[] = [
     {
       rating: 5,
       text: "Best chocolate truffle cake in Tri Nagar. Fresh and soft!",
       name: "Rohit Sharma",   // only if shown publicly on Google
       source: "Google",
     },
   ];
============================================================ */

export interface Review {
  rating: number; // 1–5
  text: string;
  name?: string; // include only if legitimately public
  source?: string; // e.g. "Google"
}

export const REVIEWS: Review[] = [];
// ⬆️ Paste real reviews here when available.

/* Set ONLY once verified from the Google Business Profile:
   export const GOOGLE_RATING = { score: 4.8, count: 120 }; */
export const GOOGLE_RATING: { score: number; count: number } | null = null;

/* Genuine link — a Google Maps search for the bakery (no fake listing URL) */
export const GOOGLE_LINK =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Victor Baker's Tri Nagar Delhi");