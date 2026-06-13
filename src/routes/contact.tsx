import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, ExternalLink } from "lucide-react";
import { SITE, telUrl, whatsappUrl } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SPOT Packers & Movers" },
      { name: "description", content: "Get a free quote from SPOT Packers & Movers. Call, WhatsApp, or fill out the form." },
      { property: "og:title", content: "Contact SPOT Packers & Movers" },
      { property: "og:description", content: "Free quote in 2 minutes. Pan India service." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    from: "",
    to: "",
    service: SERVICES[0].title,
    date: "",
    message: "",
  });

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please enter your name and phone.");
      return;
    }
    const msg = `*New Quote Request*
Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email}
Service: ${form.service}
From: ${form.from}
To: ${form.to}
Date: ${form.date}
Notes: ${form.message}`;
    window.open(whatsappUrl(msg), "_blank");
    toast.success("Opening WhatsApp with your quote request…");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <header className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--orange-spot)]">Contact</span>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Let's plan your move.
        </h1>
        <p className="mt-3 text-muted-foreground">
          Share a few details and we'll get back to you on WhatsApp within minutes.
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={submit} className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-skeuo sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your name" value={form.name} onChange={(v) => update("name", v)} required />
            <Field label="Phone" type="tel" value={form.phone} onChange={(v) => update("phone", v)} required />
            <Field label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} />
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Service</label>
              <select
                value={form.service}
                onChange={(e) => update("service", e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-[var(--electric)]"
              >
                {SERVICES.map((s) => <option key={s.slug}>{s.title}</option>)}
              </select>
            </div>
            <Field label="Pickup city" value={form.from} onChange={(v) => update("from", v)} />
            <Field label="Destination city" value={form.to} onChange={(v) => update("to", v)} />
            <Field label="Preferred move date" type="date" value={form.date} onChange={(v) => update("date", v)} />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Anything else?</label>
            <textarea
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              rows={4}
              maxLength={1000}
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-[var(--electric)]"
              placeholder="Floor, lift access, fragile items, special requests…"
            />
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--orange-spot)] px-6 py-3 text-sm font-semibold text-white shadow-glow-orange hover:brightness-110 sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" /> Send via WhatsApp
          </button>
        </form>

        <aside className="space-y-4">
          {SITE.phones.map((p) => (
            <a key={p} href={telUrl(p)} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 hover:border-[var(--electric)]/40">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--electric)] text-white">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Call</div>
                <div className="font-display text-base font-semibold text-foreground">{p}</div>
              </div>
            </a>
          ))}
          <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--orange-spot)] text-white">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
              <div className="font-display text-base font-semibold text-foreground">{SITE.email}</div>
            </div>
          </a>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <iframe src={SITE.mapsEmbed} className="h-64 w-full" loading="lazy" title="Location" />
            <div className="flex items-center justify-between p-4">
              <div className="inline-flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-[var(--orange-spot)]" /> SPOT Packers HQ
              </div>
              <a href={SITE.mapsLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground hover:text-[var(--electric)]">
                Open <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", required,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}{required && <span className="text-[var(--orange-spot)]"> *</span>}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        maxLength={255}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-[var(--electric)]"
      />
    </div>
  );
}
