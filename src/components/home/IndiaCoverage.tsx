import { useState } from "react";
import { INDIA_PATHS, INDIA_VIEWBOX, projectLatLon } from "@/lib/india-geo";

interface City {
  name: string;
  lat: number;
  lon: number;
  hub?: boolean;
}

const CITIES: City[] = [
  { name: "Delhi", lat: 28.6139, lon: 77.2090, hub: true },
  { name: "Mumbai", lat: 19.0760, lon: 72.8777, hub: true },
  { name: "Bangalore", lat: 12.9716, lon: 77.5946, hub: true },
  { name: "Hyderabad", lat: 17.3850, lon: 78.4867 },
  { name: "Chennai", lat: 13.0827, lon: 80.2707 },
  { name: "Pune", lat: 18.5204, lon: 73.8567 },
  { name: "Ahmedabad", lat: 23.0225, lon: 72.5714 },
  { name: "Jaipur", lat: 26.9124, lon: 75.7873 },
  { name: "Kolkata", lat: 22.5726, lon: 88.3639 },
  { name: "Lucknow", lat: 26.8467, lon: 80.9462 },
  { name: "Indore", lat: 22.7196, lon: 75.8577 },
  { name: "Nagpur", lat: 21.1458, lon: 79.0882 },
  { name: "Bhopal", lat: 23.2599, lon: 77.4126 },
  { name: "Patna", lat: 25.5941, lon: 85.1376 },
  { name: "Guwahati", lat: 26.1445, lon: 91.7362 },
  { name: "Mangalore", lat: 12.9141, lon: 74.8560 },
  { name: "Udupi", lat: 13.3409, lon: 74.7421 },
  { name: "Manipal", lat: 13.3525, lon: 74.7868 },
];

const ROUTES: [string, string][] = [
  ["Delhi", "Mumbai"], ["Delhi", "Kolkata"], ["Delhi", "Bangalore"], ["Delhi", "Jaipur"],
  ["Delhi", "Lucknow"], ["Delhi", "Ahmedabad"], ["Mumbai", "Bangalore"], ["Mumbai", "Pune"],
  ["Mumbai", "Ahmedabad"], ["Mumbai", "Hyderabad"], ["Bangalore", "Chennai"],
  ["Bangalore", "Hyderabad"], ["Bangalore", "Mangalore"], ["Bangalore", "Kolkata"],
  ["Hyderabad", "Chennai"], ["Kolkata", "Guwahati"], ["Kolkata", "Patna"],
  ["Mumbai", "Indore"], ["Delhi", "Patna"], ["Bangalore", "Udupi"],
];

const PROJECTED = CITIES.map((c) => ({ ...c, ...projectLatLon(c.lat, c.lon) }));
const BY_NAME = Object.fromEntries(PROJECTED.map((c) => [c.name, c]));

export function IndiaCoverage() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden bg-[var(--navy-deep)] py-20 text-white sm:py-28">
      <div className="absolute inset-0 opacity-90" style={{ background: "var(--gradient-hero)" }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
              Pan India Coverage
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Serving every corner of <span className="gradient-text-warm">India</span>.
            </h2>
            <p className="mt-5 text-white/70">
              A logistics network of hubs and route corridors spanning 25+ states. Whether you're moving across
              the city or across the country, we have crews and trucks already in motion.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad", "Jaipur"].map((c) => (
                <button
                  key={c}
                  onMouseEnter={() => setHover(c)}
                  onMouseLeave={() => setHover(null)}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-sm font-medium text-white/85 backdrop-blur transition hover:border-[var(--gold)]/40 hover:bg-white/[0.08]"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="relative">
            <div className="glass-panel relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] p-4 sm:aspect-[4/5]">
              <svg viewBox={INDIA_VIEWBOX} className="h-full w-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="indiaFill" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
                  </linearGradient>
                  <filter id="indiaGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="0.6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Accurate India outline */}
                {INDIA_PATHS.map((d, i) => (
                  <path
                    key={i}
                    d={d}
                    fill="url(#indiaFill)"
                    stroke="rgba(255,200,87,0.55)"
                    strokeWidth="0.35"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    filter="url(#indiaGlow)"
                  />
                ))}

                {/* Routes */}
                {ROUTES.map(([a, b], i) => {
                  const A = BY_NAME[a]; const B = BY_NAME[b];
                  if (!A || !B) return null;
                  const active = hover === a || hover === b;
                  return (
                    <line
                      key={i}
                      x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                      stroke={active ? "rgba(255,200,87,0.95)" : "rgba(255,255,255,0.22)"}
                      strokeWidth={active ? 0.45 : 0.22}
                      strokeDasharray="0.6 0.8"
                      className="animate-route-dash"
                    />
                  );
                })}

                {/* Cities */}
                {PROJECTED.map((c) => {
                  const active = hover === c.name;
                  const r = c.hub ? 0.9 : 0.6;
                  return (
                    <g key={c.name} onMouseEnter={() => setHover(c.name)} onMouseLeave={() => setHover(null)}>
                      {c.hub && (
                        <circle cx={c.x} cy={c.y} r={r * 2.2} fill="rgba(255,200,87,0.18)">
                          <animate attributeName="r" values={`${r*1.6};${r*3.2};${r*1.6}`} dur="2.6s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.7;0;0.7" dur="2.6s" repeatCount="indefinite" />
                        </circle>
                      )}
                      <circle cx={c.x} cy={c.y} r={r}
                        fill={c.hub ? "var(--gold)" : "var(--electric)"}
                        stroke="white" strokeWidth="0.15"
                        style={{ cursor: "pointer", filter: active ? "drop-shadow(0 0 2px rgba(255,200,87,0.9))" : undefined }} />
                      {(active || c.hub) && (
                        <text x={c.x + 1.2} y={c.y + 0.4} fill="white" fontSize="1.6" fontWeight="600">
                          {c.name}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {hover && (
                <div className="glass-panel pointer-events-none absolute bottom-4 left-4 right-4 rounded-2xl p-3 text-xs">
                  <div className="font-semibold text-white">{hover}</div>
                  <div className="text-white/60">Active corridor · regular dispatch</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
