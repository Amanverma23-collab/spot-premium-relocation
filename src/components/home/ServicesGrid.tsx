import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { cn } from "@/lib/utils";

const accentMap: Record<string, string> = {
  electric: "var(--electric)",
  orange: "var(--orange-spot)",
  gold: "var(--gold)",
};

export function ServicesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--electric)]">
            What we move
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            A complete relocation suite — <span className="gradient-text-brand">under one roof.</span>
          </h2>
        </div>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-[var(--electric)]"
        >
          View all services <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map(({ slug, title, tagline, Icon, accent }) => (
          <Link
            key={slug}
            to="/services/$slug"
            params={{ slug }}
            className={cn(
              "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-elevated",
            )}
          >
            <div
              className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
              style={{ background: accentMap[accent] }}
            />
            <div className="relative">
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-skeuo"
                style={{ background: accentMap[accent] }}
              >
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{tagline}</p>
            </div>
            <div className="relative mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
              Learn more
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
