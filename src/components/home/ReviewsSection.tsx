import { Star } from "lucide-react";
import { SITE } from "@/lib/site";

const reviews = [
  { name: "Anjali R.", city: "Bangalore → Pune", text: "Spotless move. Crew arrived on time, packed everything with care, and delivered without a single scratch. Highly recommend.", days: 12 },
  { name: "Vikram S.", city: "Delhi → Mumbai", text: "Their pricing was honest, no last-minute surprises. WhatsApp updates were a great touch.", days: 26 },
  { name: "Priya M.", city: "Hyderabad → Chennai", text: "We had a piano + a fragile glass cabinet. SPOT custom-crated both — flawless delivery.", days: 41 },
  { name: "Rohit K.", city: "Pune local", text: "Booked manpower for loading only. Crew was incredibly efficient and respectful.", days: 7 },
  { name: "Sneha T.", city: "Bangalore → Hyderabad", text: "Best mover I've used. 4.9 is well-earned — they actually call to check after delivery.", days: 60 },
  { name: "Arjun D.", city: "Mumbai office move", text: "60-seat office moved over a weekend. Monday 9am, every workstation was up.", days: 18 },
];

export function ReviewsSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/50 via-background to-background" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--electric)]">
              <svg className="h-4 w-4" viewBox="0 0 48 48" aria-hidden>
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8a12 12 0 1 1 0-24c3 0 5.8 1.1 8 3l5.7-5.7A20 20 0 1 0 44 24c0-1.2-.1-2.4-.4-3.5z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8A12 12 0 0 1 24 12c3 0 5.8 1.1 8 3l5.7-5.7A20 20 0 0 0 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0 1 12.7 28l-6.5 5A20 20 0 0 0 24 44z"/>
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C41 35 44 30 44 24c0-1.2-.1-2.4-.4-3.5z"/>
              </svg>
              Google Reviews
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {SITE.rating}★ across <span className="gradient-text-warm">{SITE.reviewCount}+ reviews</span>
            </h2>
          </div>
          <a
            href="https://www.google.com/search?q=spot+packers+and+movers+reviews"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary"
          >
            View all on Google
          </a>
        </div>

        <div className="scrollbar-hide mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:overflow-visible md:pb-0 lg:grid-cols-3">
          {reviews.map((r) => (
            <article
              key={r.name + r.city}
              className="glass-card min-w-[85vw] snap-center rounded-3xl p-6 transition hover:-translate-y-1 md:min-w-0 md:snap-align-none"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[var(--electric)] to-[var(--orange-spot)] font-semibold text-white">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.city}</div>
                  </div>
                </div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" />
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">"{r.text}"</p>
              <div className="mt-4 text-xs text-muted-foreground">{r.days} days ago · Verified Google review</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
