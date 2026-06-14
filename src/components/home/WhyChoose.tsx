import { ShieldCheck, MapPinned, Truck, HeadphonesIcon, Users2, Sparkles } from "lucide-react";

const reasons = [
  { Icon: ShieldCheck, title: "IBA Approved", detail: "Bank-grade vetted moving partner." },
  { Icon: MapPinned, title: "Pan India Coverage", detail: "Every state, every metro, every pincode." },
  { Icon: Truck, title: "Door-to-Door", detail: "From your door to theirs — handled end-to-end." },
  { Icon: Sparkles, title: "Insured Transit", detail: "Full transit cover up to declared value." },
  { Icon: Users2, title: "Trained Crews", detail: "In-house teams, background verified." },
  { Icon: HeadphonesIcon, title: "Real-Time Assistance", detail: "WhatsApp updates from pickup to drop." },
];

export function WhyChoose() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--orange-spot)]">
          Why SPOT
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Six reasons families and CFOs choose us.
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {reasons.map(({ Icon, title, detail }) => (
          <div
            key={title}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition hover:border-[var(--electric)]/40 hover:shadow-elevated"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-[var(--electric)] transition group-hover:bg-[var(--electric)] group-hover:text-white">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
