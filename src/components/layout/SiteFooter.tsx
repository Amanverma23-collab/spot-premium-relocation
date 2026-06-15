import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Star } from "lucide-react";
import { SpotLogo } from "@/components/SpotLogo";
import { SITE, telUrl, whatsappUrl } from "@/lib/site";
import { SERVICES } from "@/lib/services";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-[var(--navy-deep)] text-white/85">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
        {/* Mobile: Logo + Packers & Movers on top */}
        <div className="lg:hidden">
          <div className="mb-6 text-center">
            <SpotLogo variant="light" withTagline />
          </div>
          <p className="text-center text-sm leading-relaxed text-white/65">
            SPOT Packers and Movers – IBA approved, Pan India relocation experts. Trusted by 10,000+ families and businesses for safe, secure, and timely shifting.
          </p>
          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs">
              <Star className="h-3.5 w-3.5 fill-[var(--gold)] text-[var(--gold)]" />
              <span className="font-semibold text-white">{SITE.rating}</span>
              <span className="text-white/60">· {SITE.reviewCount}+ Google reviews</span>
            </div>
          </div>
        </div>

        {/* Desktop: 4-column grid */}
        <div className="mt-12 grid grid-cols-2 gap-12 lg:mt-0 lg:grid-cols-4">
          {/* Desktop: Logo column */}
          <div className="hidden lg:block">
            <SpotLogo variant="light" withTagline />
            <p className="mt-4 max-w-xs text-sm text-white/65">
              IBA approved Pan India packers & movers. Trusted by 10,000+ families and businesses.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs">
              <Star className="h-3.5 w-3.5 fill-[var(--gold)] text-[var(--gold)]" />
              <span className="font-semibold text-white">{SITE.rating}</span>
              <span className="text-white/60">· {SITE.reviewCount}+ Google reviews</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="text-white/70 transition hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company - hidden on mobile, visible on desktop */}
          <div className="hidden lg:block">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/about" className="text-white/70 hover:text-white">About</Link></li>
              <li><Link to="/coverage" className="text-white/70 hover:text-white">Coverage</Link></li>
              <li><Link to="/faq" className="text-white/70 hover:text-white">FAQ</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Get in touch - always visible */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Get in touch</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {SITE.phones.map((p) => (
                <li key={p}>
                  <a href={telUrl(p)} className="inline-flex items-center gap-2 text-white/80 hover:text-white">
                    <Phone className="h-4 w-4" /> {p}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 break-all text-white/80 hover:text-white">
                  <Mail className="h-4 w-4 shrink-0" /> {SITE.email}
                </a>
              </li>
              <li>
                <a href={SITE.mapsLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white/80 hover:text-white">
                  <MapPin className="h-4 w-4" /> Pan India HQ
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl("Hi SPOT, I'd like a quote.")}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center rounded-full bg-[var(--orange-spot)] px-4 py-2 text-xs font-semibold text-white shadow-glow-orange"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center text-xs text-white/55 sm:flex-row sm:items-center sm:text-left">
          <p>© {new Date().getFullYear()} SPOT Packers & Movers. Owner: {SITE.owner}. All rights reserved.</p>
          <p>IBA Approved · GST Verified · Pan India</p>
        </div>
      </div>
    </footer>
  );
}
