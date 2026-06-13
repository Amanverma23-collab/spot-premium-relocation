import { Star, ShieldCheck, BadgeCheck, MapPin, Users, Clock } from "lucide-react";

const items = [
  { Icon: Star, k: "4.9★", v: "Google Rating", accent: "var(--gold)" },
  { Icon: Users, k: "676+", v: "Verified Reviews", accent: "var(--electric)" },
  { Icon: ShieldCheck, k: "IBA", v: "Approved", accent: "var(--orange-spot)" },
  { Icon: MapPin, k: "25+", v: "States Served", accent: "var(--electric)" },
  { Icon: BadgeCheck, k: "GST", v: "Verified", accent: "var(--gold)" },
  { Icon: Clock, k: "24/7", v: "Support", accent: "var(--orange-spot)" },
];

export function TrustBar() {
  return (
    <section className="relative -mt-12 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="skeuo-surface grid grid-cols-2 gap-2 rounded-3xl p-3 sm:grid-cols-3 lg:grid-cols-6">
          {items.map(({ Icon, k, v, accent }) => (
            <div
              key={v}
              className="flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-secondary/60"
            >
              <span
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
                style={{ background: accent }}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-display text-base font-bold text-foreground leading-none">{k}</div>
                <div className="mt-1 text-[0.7rem] uppercase tracking-wider text-muted-foreground">{v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
