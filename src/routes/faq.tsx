import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

const faqs = [
  { q: "Are you IBA approved?", a: "Yes. SPOT is IBA (Indian Banks' Association) approved, which means we're vetted for bank-sponsored relocations." },
  { q: "How do you calculate the quote?", a: "Quotes are based on volume of goods, distance, packing material, and floor/lift access. We provide itemised, transparent quotes." },
  { q: "Is goods-in-transit insurance included?", a: "Yes, basic transit cover is included. Declared-value insurance can be added at the time of booking." },
  { q: "How early should I book?", a: "We recommend 5–7 days in advance for peak weekends; we can also handle same-day urgent moves." },
  { q: "Do you handle car & bike transport?", a: "Yes — covered carriers with full insurance, doorstep pickup and drop." },
  { q: "Which cities do you serve?", a: "Every state in India and 100+ major cities. We also handle international relocation to 40+ countries." },
  { q: "Can you store my goods temporarily?", a: "Yes — short- and long-term storage in racked, CCTV-monitored warehouses." },
  { q: "Will the crew assemble furniture at the destination?", a: "Yes, dismantling at origin and reassembly at destination are part of our standard service." },
  { q: "Do you provide packing materials?", a: "Yes — corrugated cartons, bubble wrap, stretch film, foam sheets and wooden crates as needed." },
  { q: "How do I track my shipment?", a: "Vehicles are GPS tracked and we share updates and ETA on WhatsApp throughout the journey." },
  { q: "What payment methods do you accept?", a: "UPI, bank transfer, card and cash. We share a GST invoice for every move." },
  { q: "Do you move on weekends and holidays?", a: "Yes, 7 days a week including public holidays — including overnight corporate moves." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — SPOT Packers & Movers" },
      { name: "description", content: "Answers to common questions about packing, moving, transport, storage and insurance." },
      { property: "og:title", content: "Packers & Movers FAQ — SPOT" },
      { property: "og:description", content: "Quotes, coverage, insurance, IBA approval and more — answered." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question", name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => faqs.filter((f) => (f.q + f.a).toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--electric)]">Help center</span>
      <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Frequently asked questions</h1>

      <div className="relative mt-8">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search questions…"
          className="w-full rounded-full border border-border bg-card pl-11 pr-4 py-3 text-sm outline-none focus:border-[var(--electric)]"
        />
      </div>

      <div className="mt-8 divide-y divide-border rounded-3xl border border-border bg-card">
        {filtered.map((f) => (
          <details key={f.q} className="group p-5">
            <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-foreground">
              {f.q}
              <span className="ml-4 text-muted-foreground transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
          </details>
        ))}
        {filtered.length === 0 && (
          <div className="p-8 text-center text-sm text-muted-foreground">No questions matched. Try a different keyword.</div>
        )}
      </div>
    </div>
  );
}
