import { useEffect, useRef } from "react";

type Variant = "hero" | "section" | "subtle";

/**
 * Floating logistics-themed background (cargo cubes, containers, route markers, pins).
 * Pure SVG + CSS animations. Always behind content. Respects prefers-reduced-motion.
 */
export function LogisticsBackdrop({ variant = "section", className = "" }: { variant?: Variant; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant !== "hero") return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--mx", `${x * 20}px`);
      el.style.setProperty("--my", `${y * 20}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [variant]);

  const count = variant === "hero" ? 9 : variant === "section" ? 6 : 4;
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ transform: "translate3d(var(--mx,0), var(--my,0), 0)", transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)", willChange: "transform" }}
    >
      {items.map((i) => (
        <FloatingShape key={i} index={i} variant={variant} />
      ))}
    </div>
  );
}

function FloatingShape({ index, variant }: { index: number; variant: Variant }) {
  // deterministic pseudo-random
  const seed = index * 9301 + 49297;
  const rnd = (n: number) => ((Math.sin(seed * (n + 1)) + 1) / 2);
  const top = `${rnd(1) * 90}%`;
  const left = `${rnd(2) * 95}%`;
  const size = (variant === "hero" ? 48 : 36) + Math.round(rnd(3) * 60);
  const delay = `${rnd(4) * -12}s`;
  const dur = `${10 + rnd(5) * 14}s`;
  const rot = Math.round(rnd(6) * 360);
  const opacity = variant === "subtle" ? 0.05 : 0.10 + rnd(7) * 0.10;
  const kind = index % 4; // 0 cube, 1 container, 2 pin, 3 route marker

  return (
    <div
      className="absolute animate-float-3d"
      style={{
        top, left,
        width: size, height: size,
        animationDelay: delay, animationDuration: dur,
        transform: `rotate(${rot}deg)`,
        opacity,
        willChange: "transform",
      }}
    >
      {kind === 0 && <CargoCube />}
      {kind === 1 && <Container />}
      {kind === 2 && <Pin />}
      {kind === 3 && <RouteMarker />}
    </div>
  );
}

function CargoCube() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <defs>
        <linearGradient id="cubeTop" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      {/* top */}
      <polygon points="50,5 90,25 50,45 10,25" fill="url(#cubeTop)" />
      {/* left */}
      <polygon points="10,25 50,45 50,90 10,70" fill="var(--primary)" opacity="0.7" />
      {/* right */}
      <polygon points="90,25 50,45 50,90 90,70" fill="var(--primary)" opacity="0.45" />
      {/* tape */}
      <line x1="30" y1="35" x2="70" y2="35" stroke="var(--gold)" strokeWidth="2" opacity="0.7" />
    </svg>
  );
}

function Container() {
  return (
    <svg viewBox="0 0 120 60" className="h-full w-full">
      <rect x="2" y="6" width="116" height="48" rx="3" fill="var(--accent)" opacity="0.8" />
      {[10, 25, 40, 55, 70, 85, 100].map((x) => (
        <rect key={x} x={x} y="10" width="8" height="40" fill="black" opacity="0.18" />
      ))}
      <rect x="2" y="6" width="116" height="48" rx="3" fill="none" stroke="white" strokeOpacity="0.2" />
    </svg>
  );
}

function Pin() {
  return (
    <svg viewBox="0 0 40 60" className="h-full w-full">
      <path d="M20 2 C30 2 38 10 38 20 C38 34 20 56 20 56 C20 56 2 34 2 20 C2 10 10 2 20 2 Z"
        fill="var(--gold)" stroke="white" strokeOpacity="0.5" strokeWidth="1" />
      <circle cx="20" cy="20" r="6" fill="white" opacity="0.9" />
    </svg>
  );
}

function RouteMarker() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <circle cx="50" cy="50" r="40" fill="none" stroke="var(--gold)" strokeWidth="2" strokeDasharray="4 4" opacity="0.7">
        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="12s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="50" r="10" fill="var(--accent)" opacity="0.85" />
    </svg>
  );
}
