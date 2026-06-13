import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Phone, MessageCircle } from "lucide-react";
import { getService, SERVICES } from "@/lib/services";
import { SITE, telUrl, whatsappUrl } from "@/lib/site";

const accentMap: Record<string, string> = {
  electric: "var(--electric)",
  orange: "var(--orange-spot)",
  gold: "var(--gold)",
};

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData, params }) => {
    const s = loaderData?.service;
    return {
      meta: [
        { title: `${s?.title ?? "Service"} — SPOT Packers & Movers` },
        { name: "description", content: s?.description ?? "" },
        { property: "og:title", content: `${s?.title ?? "Service"} — SPOT Packers & Movers` },
        { property: "og:description", content: s?.tagline ?? "" },
        { property: "og:url", content: `/services/${params.slug}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/services/${params.slug}` }],
      scripts: s
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Service",
                name: s.title,
                description: s.description,
                areaServed: "IN",
                provider: { "@type": "MovingCompany", name: "SPOT Packers & Movers" },
              }),
            },
          ]
        : [],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const data = Route.useLoaderData() as { service: import("@/lib/services").Service };
  const service = data.service;
  const accent = accentMap[service.accent];
  const Icon = service.Icon;
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);
  const quoteMsg = `Hi SPOT, I'd like a quote for ${service.title}.`;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--navy-deep)] py-20 text-white sm:py-28">
        <div className="absolute inset-0 opacity-90" style={{ background: "var(--gradient-hero)" }} />
        <div
          className="absolute -right-32 top-1/3 h-96 w-96 rounded-full opacity-40 blur-3xl"
          style={{ background: accent }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> All services
          </Link>
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span
                className="inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-skeuo"
                style={{ background: accent }}
              >
                <Icon className="h-7 w-7" />
              </span>
              <h1 className="mt-6 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                {service.title}
              </h1>
              <p className="mt-3 text-lg text-white/80">{service.tagline}</p>
              <p className="mt-5 max-w-xl text-white/70">{service.description}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={whatsappUrl(quoteMsg)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--orange-spot)] px-6 py-3 text-sm font-semibold text-white shadow-glow-orange"
                >
                  Get Free Quote <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={telUrl(SITE.phones[0])}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur"
                >
                  <Phone className="h-4 w-4" /> {SITE.phones[0]}
                </a>
              </div>
            </div>

            <div className="glass-card relative aspect-square rounded-[2rem] p-6">
              <div className="absolute inset-0 opacity-90" style={{ background: accent }} />
              <div className="relative grid h-full place-items-center">
                <Icon className="h-40 w-40 text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)]" strokeWidth={1.1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>
              What's included
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Built for safe, swift, stress-free moves.
            </h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {service.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-skeuo"
              >
                <span
                  className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-white"
                  style={{ background: accent }}
                >
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-medium text-foreground">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">How it works</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p, i) => (
              <div key={p.title} className="relative rounded-3xl border border-border bg-card p-6">
                <div className="font-display text-5xl font-bold opacity-10" style={{ color: accent }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="-mt-6 font-display text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">FAQ</h2>
        <div className="mt-8 divide-y divide-border rounded-3xl border border-border bg-card">
          {service.faqs.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-foreground">
                {f.q}
                <span className="ml-4 text-muted-foreground transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] p-10 text-white sm:p-14" style={{ background: "var(--gradient-hero)" }}>
          <div className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h3 className="font-display text-3xl font-bold sm:text-4xl">
                Ready to move? Get a free quote in 2 minutes.
              </h3>
              <p className="mt-3 max-w-xl text-white/75">
                Talk to a SPOT relocation consultant — no obligation, fully itemised, transparent pricing.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a href={whatsappUrl(quoteMsg)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a href={telUrl(SITE.phones[0])} className="inline-flex items-center gap-2 rounded-full bg-[var(--orange-spot)] px-6 py-3 text-sm font-semibold text-white">
                <Phone className="h-4 w-4" /> Call now
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h4 className="font-display text-2xl font-bold text-foreground">Explore other services</h4>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/services/$slug"
                params={{ slug: o.slug }}
                className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-elevated"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl text-white" style={{ background: accentMap[o.accent] }}>
                    <o.Icon className="h-5 w-5" />
                  </span>
                  <span className="font-semibold text-foreground">{o.title}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{o.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
