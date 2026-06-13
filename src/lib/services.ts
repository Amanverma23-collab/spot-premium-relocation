import {
  Home,
  Building2,
  Car,
  Bike,
  Package,
  PackageOpen,
  Warehouse,
  Globe2,
  type LucideIcon,
} from "lucide-react";

export type ServiceSlug =
  | "home-relocation"
  | "office-relocation"
  | "car-transportation"
  | "bike-transportation"
  | "packing-services"
  | "loading-unloading"
  | "warehouse-storage"
  | "international-relocation";

export interface Service {
  slug: ServiceSlug;
  title: string;
  tagline: string;
  description: string;
  Icon: LucideIcon;
  accent: "electric" | "orange" | "gold";
  features: string[];
  process: { title: string; detail: string }[];
  faqs: { q: string; a: string }[];
}

export const SERVICES: Service[] = [
  {
    slug: "home-relocation",
    title: "Home Relocation",
    tagline: "Move your home, not your worries.",
    description:
      "End-to-end household shifting with white-glove packing, padded transport, and same-day setup. Door-to-door across India.",
    Icon: Home,
    accent: "electric",
    features: [
      "Free pre-move survey",
      "5-layer fragile packing",
      "Furniture dismantle & reassembly",
      "Goods-in-transit insurance",
      "Real-time WhatsApp tracking",
    ],
    process: [
      { title: "Survey", detail: "On-site or video survey to scope the move." },
      { title: "Pack", detail: "Room-by-room, labelled, photographed." },
      { title: "Transport", detail: "Dedicated GPS-tracked vehicle." },
      { title: "Setup", detail: "Unpack, reassemble, position." },
    ],
    faqs: [
      { q: "Do you handle packing too?", a: "Yes — we bring all materials and pack everything room-by-room." },
      { q: "Is my move insured?", a: "Goods-in-transit insurance is included; declared-value cover is optional." },
      { q: "How fast can you arrive?", a: "Most metros: same-day or next-day. Remote pin codes 24–48 hrs." },
    ],
  },
  {
    slug: "office-relocation",
    title: "Office Relocation",
    tagline: "Zero downtime corporate moves.",
    description:
      "Planned overnight and weekend office shifts. Workstations, servers, and records moved with chain-of-custody documentation.",
    Icon: Building2,
    accent: "electric",
    features: [
      "Phased move planning",
      "Asset tagging & inventory",
      "IT & server handling",
      "Modular furniture rebuild",
      "Post-move walkthrough",
    ],
    process: [
      { title: "Audit", detail: "Floor plans, asset inventory, risk mapping." },
      { title: "Schedule", detail: "Off-hours window agreed with stakeholders." },
      { title: "Execute", detail: "Crews, vehicles, and security in parallel." },
      { title: "Go-live", detail: "Workstation setup, IT power-on, sign-off." },
    ],
    faqs: [
      { q: "Can you move on weekends?", a: "Yes — most corporate moves are scheduled Fri night or weekend." },
      { q: "Do you handle IT equipment?", a: "Yes, including anti-static packing for servers and monitors." },
      { q: "Will you provide an inventory list?", a: "A full asset register with photos is shared post-move." },
    ],
  },
  {
    slug: "car-transportation",
    title: "Car Transportation",
    tagline: "Your car, on a covered carrier.",
    description:
      "Single and multi-car carriers with GPS tracking and full insurance. Doorstep pickup and delivery anywhere in India.",
    Icon: Car,
    accent: "orange",
    features: [
      "Enclosed & open carriers",
      "Doorstep pickup & drop",
      "GPS live tracking",
      "Full damage insurance",
      "Pre & post inspection report",
    ],
    process: [
      { title: "Inspect", detail: "360° photo report and condition sheet." },
      { title: "Load", detail: "Hydraulic ramp loading, wheel-strap secure." },
      { title: "Transit", detail: "GPS tracked; ETA shared on WhatsApp." },
      { title: "Deliver", detail: "Inspection sign-off at destination." },
    ],
    faqs: [
      { q: "Open or enclosed carrier?", a: "Open is cheapest; enclosed is recommended for premium vehicles." },
      { q: "How long does delivery take?", a: "Metro-to-metro typically 4–8 days depending on route." },
      { q: "Is the car insured in transit?", a: "Yes — full transit insurance is included." },
    ],
  },
  {
    slug: "bike-transportation",
    title: "Bike Transportation",
    tagline: "Wrapped, crated, delivered.",
    description:
      "Two-wheeler shifting with foam wrap, wooden crating, and shared or dedicated transit options for every budget.",
    Icon: Bike,
    accent: "orange",
    features: [
      "Foam + bubble wrap protection",
      "Wooden crating available",
      "Shared & dedicated vehicles",
      "Insurance included",
      "Pickup from any pin code",
    ],
    process: [
      { title: "Drain", detail: "Fuel drained, battery secured." },
      { title: "Wrap", detail: "Tank, fairings and mirrors protected." },
      { title: "Load", detail: "Strapped upright in dedicated bay." },
      { title: "Deliver", detail: "Unwrapped and handed over with check." },
    ],
    faqs: [
      { q: "Do I need to drain fuel?", a: "We handle fuel draining at pickup." },
      { q: "Can you transport sports bikes?", a: "Yes — crated transport recommended for premium bikes." },
      { q: "How long does it take?", a: "Most routes: 3–6 days door-to-door." },
    ],
  },
  {
    slug: "packing-services",
    title: "Packing Services",
    tagline: "Engineered to survive 1,200 km.",
    description:
      "Multi-layer packing using bubble wrap, foam sheets, corrugated cartons and wooden crates for fragile and high-value items.",
    Icon: Package,
    accent: "gold",
    features: [
      "5-ply corrugated cartons",
      "Bubble + stretch wrap",
      "Custom wooden crates",
      "Anti-static IT packing",
      "Labelled & numbered",
    ],
    process: [
      { title: "Survey", detail: "Material plan per item type." },
      { title: "Pack", detail: "Room-wise systematic packing." },
      { title: "Label", detail: "Numbered, photographed, listed." },
      { title: "Handover", detail: "Inventory sheet signed." },
    ],
    faqs: [
      { q: "Can I buy just packing?", a: "Yes — packing-only service is available." },
      { q: "Do you pack art and antiques?", a: "Yes, with custom-built crates and foam inserts." },
      { q: "Are materials extra?", a: "Materials are included in the packing quote." },
    ],
  },
  {
    slug: "loading-unloading",
    title: "Loading & Unloading",
    tagline: "Trained crews. Lifting equipment. No scratches.",
    description:
      "Manpower-only services for self-packed moves. Trained loaders with trolleys, straps and hoists.",
    Icon: PackageOpen,
    accent: "gold",
    features: [
      "Trained 2–6 person crews",
      "Trolleys, straps, hoists",
      "Staircase / hoist for high floors",
      "Hourly or per-load pricing",
      "Available 7 days a week",
    ],
    process: [
      { title: "Book", detail: "Tell us address, floor, item count." },
      { title: "Arrive", detail: "Crew arrives with kit on time." },
      { title: "Load", detail: "Systematic, secure loading." },
      { title: "Unload", detail: "Placed where you want at destination." },
    ],
    faqs: [
      { q: "Can you bring just loaders?", a: "Yes — manpower-only is one of our most-booked services." },
      { q: "Do you charge by hour?", a: "Hourly and fixed-quote pricing both available." },
      { q: "High floors with no lift?", a: "We can arrange external hoists for heavy items." },
    ],
  },
  {
    slug: "warehouse-storage",
    title: "Warehouse Storage",
    tagline: "CCTV-secured, insured, accessible.",
    description:
      "Short and long-term storage in racked, climate-aware warehouses. Pay by week or month — your goods stay sealed and inventoried.",
    Icon: Warehouse,
    accent: "electric",
    features: [
      "24/7 CCTV monitoring",
      "Racked & palletised storage",
      "Pest-controlled facility",
      "Insurance included",
      "Pickup & redelivery on demand",
    ],
    process: [
      { title: "Inventory", detail: "Items photographed and listed." },
      { title: "Seal", detail: "Crates sealed and barcoded." },
      { title: "Store", detail: "Stored in your dedicated bay." },
      { title: "Retrieve", detail: "Delivered to you on request." },
    ],
    faqs: [
      { q: "Minimum storage period?", a: "From 1 week, with monthly pricing tiers." },
      { q: "Can I visit my goods?", a: "Yes — with 24 hr notice." },
      { q: "Is the warehouse insured?", a: "Yes — coverage included; top-up cover available." },
    ],
  },
  {
    slug: "international-relocation",
    title: "International Relocation",
    tagline: "Door-to-door, country-to-country.",
    description:
      "Export packing, customs documentation, sea and air freight to 40+ countries. Single point of contact across continents.",
    Icon: Globe2,
    accent: "gold",
    features: [
      "Sea & air freight",
      "Customs clearance",
      "Export-grade crating",
      "Destination delivery network",
      "Single-window coordination",
    ],
    process: [
      { title: "Quote", detail: "Mode, route, and customs assessment." },
      { title: "Pack & dock", detail: "Export crating, port handover." },
      { title: "Transit", detail: "Sea / air with documentation tracking." },
      { title: "Deliver", detail: "Customs clearance and last-mile drop." },
    ],
    faqs: [
      { q: "Which countries do you serve?", a: "40+ destinations across the US, UK, EU, GCC, APAC and Australia." },
      { q: "Sea or air?", a: "Sea for full households (35–55 days); air for urgent partial moves." },
      { q: "Do you handle customs?", a: "Yes — origin and destination customs handled end-to-end." },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
