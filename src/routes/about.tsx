import { createFileRoute } from "@tanstack/react-router";
import { Award, Heart, Target, Users } from "lucide-react";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SPOT Packers & Movers" },
      { name: "description", content: "SPOT Packers & Movers — owner-led, IBA approved Pan India movers founded on trust, care, and craft." },
      { property: "og:title", content: "About SPOT Packers & Movers" },
      { property: "og:description", content: "Our story, mission, and the team behind 10,000+ moves." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  { Icon: Heart, t: "Care", d: "Your belongings are treated like our own." },
  { Icon: Target, t: "Precision", d: "Every move follows a documented playbook." },
  { Icon: Users, t: "People-first", d: "Trained, vetted, in-house crews — never gig labour." },
  { Icon: Award, t: "Accountability", d: "IBA approved, GST verified, fully insured." },
];

const milestones = [
  { y: "2015", t: "Founded", d: `${SITE.owner} starts SPOT in Bangalore with a single truck.` },
  { y: "2018", t: "Pan-India dispatch", d: "Network expands across 15 states." },
  { y: "2021", t: "IBA approval", d: "Recognised by the Indian Banks' Association." },
  { y: "2024", t: "10,000+ moves", d: "676+ verified Google reviews · 4.9★ rating." },
];

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--navy-deep)] py-20 text-white sm:py-28">
        <div className="absolute inset-0 opacity-90" style={{ background: "var(--gradient-hero)" }} />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">About SPOT</span>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl lg:text-6xl">
            Moving India, <span className="gradient-text-warm">one home at a time.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/75">
            We started with a simple belief: relocation should feel calm, not chaotic. Today, SPOT is an IBA approved Pan
            India mover trusted by families, founders, and CFOs across 25+ states.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Our mission</h2>
            <p className="mt-4 text-muted-foreground">
              Make every Indian relocation as smooth as it should be — combining trained crews, modern equipment, and
              transparent pricing. No surprises, no shortcuts.
            </p>
            <h3 className="mt-10 font-display text-2xl font-bold">The team</h3>
            <p className="mt-3 text-muted-foreground">
              Led by founder {SITE.owner}, SPOT runs in-house packing, transport, and storage crews — all background
              verified, uniformed, and trained on our 8-step playbook.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {values.map(({ Icon, t, d }) => (
              <div key={t} className="rounded-3xl border border-border bg-card p-6 shadow-skeuo">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--electric)] text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h4 className="mt-4 font-display text-lg font-semibold">{t}</h4>
                <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Milestones</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {milestones.map((m) => (
              <div key={m.y} className="rounded-3xl border border-border bg-card p-6">
                <div className="font-display text-3xl font-bold gradient-text-brand">{m.y}</div>
                <div className="mt-2 font-semibold text-foreground">{m.t}</div>
                <p className="mt-1.5 text-sm text-muted-foreground">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
