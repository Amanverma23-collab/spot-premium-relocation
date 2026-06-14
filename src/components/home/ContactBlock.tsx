import { SITE, telUrl, whatsappUrl } from "@/lib/site";
import { Phone, MessageCircle, Mail, MapPin, ExternalLink } from "lucide-react";

export function ContactBlock() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--orange-spot)]">
            Visit / Call
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Get a quote in under <span className="gradient-text-brand">2 minutes.</span>
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground mx-auto lg:mx-0">
            Call, WhatsApp, or drop by — we'll put together a tailored, itemised quote with no obligation.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {SITE.phones.map((p) => (
              <a key={p} href={telUrl(p)} className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card p-3 transition hover:border-[var(--electric)]/40 hover:shadow-elevated sm:justify-start sm:p-4 sm:gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--electric)] text-white sm:h-11 sm:w-11">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <div className="min-w-0 text-center sm:text-left">
                  <div className="text-[0.6rem] uppercase tracking-wider text-muted-foreground sm:text-xs">Call us</div>
                  <div className="font-display text-sm font-semibold text-foreground sm:text-base">{p}</div>
                </div>
              </a>
            ))}
            <a
              href={whatsappUrl("Hi SPOT, I'd like a quote.")}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card p-3 transition hover:border-[#25D366]/40 hover:shadow-elevated sm:justify-start sm:p-4 sm:gap-3"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#25D366] text-white sm:h-11 sm:w-11">
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <div className="min-w-0 text-center sm:text-left">
                <div className="text-[0.6rem] uppercase tracking-wider text-muted-foreground sm:text-xs">WhatsApp</div>
                <div className="font-display text-sm font-semibold text-foreground sm:text-base">Chat with us</div>
              </div>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card p-3 transition hover:border-[var(--orange-spot)]/40 hover:shadow-elevated sm:justify-start sm:p-4 sm:gap-3"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--orange-spot)] text-white sm:h-11 sm:w-11">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <div className="min-w-0 text-center sm:text-left">
                <div className="text-[0.6rem] uppercase tracking-wider text-muted-foreground sm:text-xs">Email</div>
                <div className="font-display text-sm font-semibold text-foreground sm:text-base truncate">{SITE.email}</div>
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
