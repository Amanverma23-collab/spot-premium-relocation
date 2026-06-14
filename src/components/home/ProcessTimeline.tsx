import { ClipboardList, Search, FileText, Package, Truck, Route, PackageCheck, Smile } from "lucide-react";

const steps = [
  { Icon: ClipboardList, title: "Inquiry", detail: "Tell us about your move via call, WhatsApp or web." },
  { Icon: Search, title: "Survey", detail: "Free on-site or video survey to scope the move." },
  { Icon: FileText, title: "Quotation", detail: "Transparent, itemised, no hidden fees." },
  { Icon: Package, title: "Packing", detail: "5-layer fragile-safe packing by trained crews." },
  { Icon: Truck, title: "Loading", detail: "Hydraulic lifts, padded straps, sealed truck." },
  { Icon: Route, title: "Transit", detail: "GPS tracked, ETA shared on WhatsApp." },
  { Icon: PackageCheck, title: "Delivery", detail: "Unpack, assemble, position — at your address." },
  { Icon: Smile, title: "Feedback", detail: "We follow up to make sure you're happy." },
];

export function ProcessTimeline() {
  return (
    <section className="relative overflow-hidden bg-[var(--navy-deep)] py-24 text-white">
      <div className="absolute inset-0 opacity-80" style={{ background: "var(--gradient-hero)" }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl text-center mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
            How we move you
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            An 8-step relocation playbook.
          </h2>
          <p className="mt-4 text-white/70">
            The same process, executed every single time — that's how we earn 4.9 stars.
          </p>
        </div>

        <div className="mt-14 max-w-full overflow-x-auto pb-4 [scrollbar-width:thin]">
          <ol className="relative flex min-w-[800px] items-start gap-4 justify-center lg:min-w-0">
            <div className="pointer-events-none absolute left-6 right-6 top-9 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            {steps.map(({ Icon, title, detail }, i) => (
              <li key={title} className="relative flex-1 text-center">
                <div className="glass-panel relative inline-flex h-12 w-12 items-center justify-center rounded-2xl">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="mt-4">
                  <div className="text-[0.65rem] font-semibold uppercase tracking-widest text-[var(--gold)]">
                    Step {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-1 font-display text-base font-semibold text-white">{title}</div>
                  <p className="mt-1.5 text-xs text-white/65">{detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
