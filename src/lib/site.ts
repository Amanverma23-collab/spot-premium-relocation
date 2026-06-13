export const SITE = {
  name: "SPOT Packers & Movers",
  shortName: "SPOT",
  owner: "Ganesh Maindan",
  domain: "www.spotpackers.com",
  email: "spotpackers22@gmail.com",
  phones: ["+91 7259911430", "+91 9945814496"],
  whatsapp: "917259911430",
  rating: 4.9,
  reviewCount: 676,
  iba: true,
  coverage: "Pan India",
  // Generic Bangalore embed; replace with the official one when provided.
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62208.40!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSpot+Packers+And+Movers!5e0!3m2!1sen!2sin!4v1700000000000",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Spot+Packers+And+Movers",
};

export function whatsappUrl(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telUrl(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}
