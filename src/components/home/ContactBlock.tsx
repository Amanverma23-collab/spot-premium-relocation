import { SITE, telUrl, whatsappUrl } from "@/lib/site";
import { Phone, MessageCircle, Mail, MapPin, ExternalLink } from "lucide-react";

export function ContactBlock() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--orange-spot)]">
            Visit / Call
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Get a quote in under <span className="gradient-text-brand">2 minutes.</span>
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Call, WhatsApp, or drop by — we'll put together a tailored, itemised quote with no obligation.
          </p>

          <div className="mt-8 space-y-3">
            {SITE.phones.map((p) => (
              <a key={p} href={telUrl(p)} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition hover:border-[var(--electric)]/40 hover:shadow-elevated">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--electric)] text-white">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Call us</div>
                  <div className="font-display text-base font-semibold text-foreground">{p}</div>
                </div>
              </a>
            ))}
            <a
              href={whatsappUrl("Hi SPOT, I'd like a quote.")}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition hover:border-[#25D366]/40 hover:shadow-elevated"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#25D366] text-white">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">WhatsApp</div>
                <div className="font-display text-base font-semibold text-foreground">Chat with our team</div>
              </div>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition hover:border-[var(--orange-spot)]/40 hover:shadow-elevated"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--orange-spot)] text-white">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
                <div className="font-display text-base font-semibold text-foreground">{SITE.email}</div>
              </div>
            </a>
          </div>
        </div>

        {/* Map embed */}
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-elevated">
          <iframe
            title="SPOT Packers location"
            src={SITE.mapsEmbed}
            className="h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <MapPin className="h-4 w-4 text-[var(--orange-spot)]" />
              SPOT Packers & Movers — Pan India HQ
            </div>
            <a
              href={SITE.mapsLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-foreground hover:bg-secondary/80"
            >
              Open in Google Maps <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
