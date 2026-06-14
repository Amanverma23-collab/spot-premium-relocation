import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/services";

const accentMap: Record<string, string> = {
  electric: "var(--electric)",
  orange: "var(--orange-spot)",
  gold: "var(--gold)",
};

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — SPOT Packers & Movers" },
      { name: "description", content: "Complete relocation services: home, office, car & bike transport, packing, storage, and international moves." },
      { property: "og:title", content: "All Services — SPOT Packers & Movers" },
      { property: "og:description", content: "End-to-end relocation suite under one roof." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <header className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--electric)]">Services</span>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Every kind of move, <span className="gradient-text-brand">done right.</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          Pick a service to see how it works, what's included, and answers to common questions.
        </p>
      </header>

      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {SERVICES.map(({ slug, title, tagline, description, Icon, accent }) => (
          <Link
            key={slug}
            to="/services/$slug"
            params={{ slug }}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-elevated"
          >
            <div
              className="absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
              style={{ background: accentMap[accent] }}
            />
            <div className="relative">
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-skeuo"
                style={{ background: accentMap[accent] }}
              >
                <Icon className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-xl font-semibold text-foreground">{title}</h2>
              <p className="mt-1 text-sm font-medium text-[var(--electric)]">{tagline}</p>
              <p className="mt-3 text-sm text-muted-foreground">{description}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
