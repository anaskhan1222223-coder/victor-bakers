/* ============================================================
   SINGLE SOURCE OF TRUTH for contact info + WhatsApp utilities.
   ⚠️ Change the phone number HERE once — every button updates.
============================================================ */

export const SITE = {
  name: "Victor Baker's",
  phone: "919899553880",
  phoneDisplay: "+91 9899553880",
  address: "736/39, Onkar Nagar, Shambhu Nagar, Tri Nagar, Delhi - 110052",
  timing: "8:00 AM - 10:00 PM",
};

/* ---------- Core builders ---------- */

export function waLink(message: string): string {
  return `https://wa.me/${SITE.phone}?text=${encodeURIComponent(message)}`;
}

export function callLink(): string {
  return `tel:+${SITE.phone}`;
}

/* ---------- Message templates ---------- */

export function generalOrderMessage(): string {
  return [
    `Hi ${SITE.name},`,
    `I would like to place an order.`,
    ``,
    `Please share availability and price.`,
  ].join("\n");
}

export function productOrderMessage(productName: string, weight?: string): string {
  return [
    `Hi ${SITE.name},`,
    `I would like to order/enquire about:`,
    ``,
    `Product: ${productName}`,
    `Quantity/Weight: ${weight ?? ""}`,
    `Required Date: `,
    ``,
    `Please share availability and price.`,
  ].join("\n");
}

export function waProductLink(productName: string, weight?: string): string {
  return waLink(productOrderMessage(productName, weight));
}

/* Old name kept so any file still using it won't break */
export function whatsappOrderLink(productName: string): string {
  return waProductLink(productName);
}

export interface CustomCakeDetails {
  name: string;
  cakeType: string;
  flavour: string;
  weight: string;
  eggless: boolean;
  occasion: string;
  date: string;
  message?: string;
  hasReferenceImage?: boolean;
}

export function customCakeMessage(d: CustomCakeDetails): string {
  const lines = [
    `Hi ${SITE.name},`,
    `I would like to enquire about a custom cake.`,
    ``,
    `Name: ${d.name}`,
    `Cake: ${d.cakeType}`,
    `Flavour: ${d.flavour}`,
    `Weight: ${d.weight}`,
    `Eggless: ${d.eggless ? "Yes" : "No"}`,
    `Occasion: ${d.occasion}`,
    `Required Date: ${d.date}`,
  ];
  if (d.message?.trim()) lines.push(`Message: ${d.message.trim()}`);
  if (d.hasReferenceImage)
    lines.push(`Reference image: I will share it in this chat.`);
  lines.push(``, `Please let me know the availability and price.`);
  return lines.join("\n");
}