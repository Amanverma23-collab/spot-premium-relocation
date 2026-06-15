import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone, Shield, Truck, Clock, PackageCheck } from "lucide-react";
import { SITE, telUrl, whatsappUrl } from "@/lib/site";
import { useCountUp } from "@/hooks/use-count-up";
import { LogisticsBackdrop } from "@/components/visuals/LogisticsBackdrop";
import logoAsset from "@/assets/spot-logo.png";

const HERO_VIDEO = "https://assets.mixkit.co/videos/52017/52017-720.mp4";
const HERO_POSTER =
  "https://assets.mixkit.co/videos/52017/52017-thumb-720-0.jpg";

export function Hero() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const logoRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const startRotX = useRef(0);
  const startRotY = useRef(0);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;
    startRotX.current = rotateX;
    startRotY.current = rotateY;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [rotateX, rotateY]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;
    setRotateY(startRotY.current + dx * 0.8);
    setRotateX(startRotX.current - dy * 0.8);
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;
    el.style.transition = "transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)";
    setRotateY(360);
    const timer = setTimeout(() => {
      el.style.transition = "";
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[var(--navy-deep)] text-white">
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <LogisticsBackdrop variant="hero" />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-2 sm:px-6 sm:pt-2 lg:pb-32 lg:pt-2">
        <div className="flex flex-col items-center -mt-4 animate-brand-reveal">
          <div
            className="relative cursor-grab active:cursor-grabbing select-none touch-none"
            style={{ perspective: "800px" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            <div
              ref={logoRef}
              className="relative"
              style={{ transformStyle: "preserve-3d", transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}
            >
              {[...Array(8)].map((_, i) => (
                <img
                  key={i}
                  src={logoAsset}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-32 w-32 object-contain rounded-full sm:h-40 sm:w-40 lg:h-48 lg:w-48"
                  style={{
                    transform: `translateZ(${-i * 2}px)`,
                    filter: `brightness(${0.35 + i * 0.03})`,
                  }}
                  draggable={false}
                />
              ))}
              <img
                src={logoAsset}
                alt="SPOT Packers & Movers"
                className="relative h-32 w-32 object-contain rounded-full sm:h-40 sm:w-40 lg:h-48 lg:w-48"
                style={{
                  filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.5))",
                }}
                draggable={false}
              />
            </div>
          </div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--gold)]" />
              IBA Approved · 4.9★ on Google · Pan India
            </span>

            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              India's most trusted{" "}
              <span className="gradient-text-warm">Packers &amp; Movers</span> partner.
            </h1>

            <p className="mt-6 max-w-xl text-base text-white/75 sm:text-lg">
              Safe relocation. Secure transportation. Door-to-door service across every state —
              backed by 10,000+ moves and 676+ verified Google reviews.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--orange-spot)] px-6 py-3 text-sm font-semibold text-white shadow-glow-orange transition hover:brightness-110"
              >
                Get Free Quote
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <a
                href={telUrl(SITE.phones[0])}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                <Phone className="h-4 w-4" /> {SITE.phones[0]}
              </a>
              <a
                href={whatsappUrl("Hi SPOT, I'd like a quote.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/95 px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#25D366]"
              >
                WhatsApp
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat target={10000} suffix="+" label="Moves done" />
              <Stat target={676} suffix="+" label="5★ reviews" />
              <Stat target={49} suffix="★" label="Rating" divisor={10} />
              <StatText value="Pan India" label="Coverage" />
            </div>
          </div>

          <div className="relative pt-7">
            <div className="glass-card relative mx-auto aspect-[5/4] w-full max-w-md overflow-hidden rounded-[2rem] p-0">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster={HERO_POSTER}
                preload="metadata"
              >
                <source src={HERO_VIDEO} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/15" />

              <div className="relative flex h-full flex-col justify-between p-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                    <Shield className="h-3.5 w-3.5" /> IBA Approved
                  </div>
                  <div className="text-right text-white">
                    <div className="font-display text-3xl font-bold leading-none drop-shadow">4.9★</div>
                    <div className="text-[0.65rem] uppercase tracking-wider text-white/80">Google rated</div>
                  </div>
                </div>

                <div className="text-white">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[var(--orange-spot)]/95 px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-glow-orange">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                    Live · Tracked Move
                  </div>
                  <div className="mt-3 font-display text-2xl font-semibold drop-shadow">
                    Delhi → Bangalore
                  </div>
                  <div className="mt-1 text-sm text-white/80">GPS · Insured · Door-to-door</div>
                </div>
              </div>
            </div>

            <FloatCard className="left-4 top-[calc(100%+60px)]" delay="0s" icon={<Shield className="h-3.5 w-3.5" />} title="Insured Transit" sub="Up to declared value" />
            <FloatCard className="right-4 top-[calc(100%+60px)]" delay="1.2s" icon={<Clock className="h-3.5 w-3.5" />} title="24×7 Support" sub="Hindi · English · Kannada" />
            <FloatCard className="left-4 top-[calc(100%+160px)]" delay="2.4s" icon={<PackageCheck className="h-3.5 w-3.5" />} title="Goods Insurance" sub="Full transit cover" />
            <FloatCard className="right-4 top-[calc(100%+160px)]" delay="3.2s" icon={<Truck className="h-3.5 w-3.5" />} title="GPS Tracking" sub="Real-time updates" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ target, suffix, label, divisor }: { target: number; suffix?: string; label: string; divisor?: number }) {
  const { value, ref } = useCountUp(target);
  const display = divisor ? (value / divisor).toFixed(1) : value.toLocaleString();
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur">
      <div className="font-display text-2xl font-bold text-white">
        <span ref={ref}>{display}</span>{suffix}
      </div>
      <div className="mt-1 text-[0.65rem] uppercase tracking-wider text-white/55">{label}</div>
    </div>
  );
}

function StatText({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur">
      <div className="font-display text-2xl font-bold gradient-text-warm">{value}</div>
      <div className="mt-1 text-[0.65rem] uppercase tracking-wider text-white/55">{label}</div>
    </div>
  );
}

function FloatCard({
  className = "", delay = "0s", icon, title, sub,
}: { className?: string; delay?: string; icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div
      className={`glass-card absolute hidden items-start gap-2 rounded-2xl p-3 text-xs sm:flex animate-float-soft ${className}`}
      style={{ animationDelay: delay }}
    >
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-[var(--electric)]/15 text-[var(--electric)]">{icon}</span>
      <div>
        <div className="font-semibold text-foreground">{title}</div>
        <div className="text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
}
