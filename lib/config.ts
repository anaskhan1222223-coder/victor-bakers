export const BAKERY_CONFIG = {
  name: "Victor Baker's",
  tagline: "Freshly Baked Moments, Made Just for You.",
  phone: "919899553880",
  whatsapp: "919899553880",
  address: "736/39, Onkar Nagar, Shambhu Nagar, Tri Nagar, Delhi - 110052",
  city: "Delhi",
  openingHours: "8:00 AM - 10:00 PM",
  instagram: "https://instagram.com/",
  googleMaps: "https://maps.google.com/?q=Victor+Bakers+Tri+Nagar+Delhi",
  deliveryAreas: ["Tri Nagar", "Shastri Nagar", "Model Town", "Pitampura"],
};

export const waLink = (message: string) =>
  `https://wa.me/${BAKERY_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;

export const callLink = () => `tel:+${BAKERY_CONFIG.phone}`;