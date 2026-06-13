
# Premium Redesign Plan — SPOT Packers & Movers

This is a large redesign. I'll execute it in 4 sequenced batches so each batch is verifiable in the preview before the next begins. All work stays inside the existing TanStack Start app, design system, and Lovable AI Gateway — no new backend.

---

## Batch 1 — Foundation: Theme System + Hero + AI tone

**Premium Theme Switcher (navbar)**
- New `ThemeProvider` (React context) with 4 themes: `logistics-blue` (default), `luxury-gold`, `midnight-black`, `light-corporate`.
- Each theme = a set of token overrides written to `:root` (background, foreground, primary, accent, gradients, shadows, glow colors).
- Switching applies a `theme-transition` class for ~700ms so backgrounds/cards/gradients/shadows tween smoothly (uses `transition: background-color, color, border-color, box-shadow, background-image` on `*`).
- Persisted in `localStorage` (`spot-theme`), restored before paint via a tiny inline script in `__root.tsx` to avoid flash.
- Skeuomorphic segmented control in `SiteHeader` (4 swatches, active state, tooltip with theme name).

**Hero redesign (`Hero.tsx`)**
- Brand lockup `[SPOT logo] PACKERS & MOVERS` placed in the gap above the badge, with a staggered Framer Motion reveal (logo scales/fades, wordmark letter-staggers).
- Remove the driving truck silhouette completely.
- New cinematic background built from layered Framer Motion divs:
  - Floating 3D-look cargo cubes / containers / route markers / pins (SVG with isometric shading, drop shadows, parallax to mouse position).
  - Slow drift + subtle rotation, soft glow, all `pointer-events-none` behind content.
- "Live Tracked Moves" card replaced with a **premium logistics video card**: an `<video>` (autoplay, muted, loop, playsInline, `poster`) using a free CDN highway-truck loop (Coverr/Pexels direct mp4). Glass frame, gradient overlay, IBA + 4.9★ chips kept on top. If video fails, falls back to a stylised isometric truck SVG with rotating wheels.
- Floating spec cards repositioned: **Insured Transit** top-left, **24×7 Support** top-right, **Goods Insurance** bottom-left. Glassmorphism + float animation, staggered delays.
- Animated count-up stats (10,000+ / 676+ / 4.9★ / Pan India) using a small `useCountUp` hook + IntersectionObserver.

**AI Assistant tone**
- Update system prompt in `src/routes/api/chat.ts` to enforce 2–5 line answers, no long paragraphs, plain language, end with a clear next step (call/WhatsApp/quote).
- Lower `maxTokens` and add "Keep responses under 60 words" rule.

---

## Batch 2 — Accurate India Map + Coverage Section

- Replace the stylised India path in `IndiaCoverage.tsx` with an **accurate India SVG outline** built from a real GeoJSON simplification (Natural Earth admin-0 India, simplified to ~2–4 KB). Bundled as a static SVG path constant — no runtime fetch.
- Re-project all city coordinates (lat/lon → SVG viewBox) so Delhi/Mumbai/Bangalore/Chennai/Kolkata/etc. land on the correct geography. Includes Manipal/Udupi/Mangalore as requested.
- Premium logistics-dashboard styling:
  - Gradient-filled landmass with inner glow and subtle grid.
  - Route corridors rendered as glowing gradient strokes with **moving particles** (SVG `<circle>` animated along the path via `<animateMotion>` on a hidden `<path>`).
  - Pulsing hub rings, hover tooltips, "active corridor" highlight.
- Section wrapper gets a parallax layer of floating cargo cubes behind the map.

---

## Batch 3 — Sitewide Depth + Section Polish

- New `<LogisticsBackdrop variant="...">` component: reusable floating-elements layer (cubes, containers, pins, route markers). Drop into Hero, Why Choose, Process Timeline, Reviews, Contact. Always behind content, `aria-hidden`, respects `prefers-reduced-motion`.
- Section transitions: replace fades with route-reveal effect (animated dashed line crossing section top) + subtle cargo-slide for headings.
- Tighten spacing, add depth shadows aligned to active theme.

---

## Batch 4 — Service Page Redesign (all 8)

Each page becomes a unique premium landing page sharing a flexible primitive set but with its own hero visual and content blocks. Built by extending `src/routes/services.$slug.tsx` with a per-slug layout map (so we don't lose SEO/route shape).

Per-slug unique hero visual (Framer-Motion SVG/CSS, not heavy 3D):
- **home-shifting** — isometric house + floating furniture, packing checklist animation
- **office-relocation** — workstation/monitor stack, business-continuity timeline
- **car-transportation** — rotating car silhouette on carrier truck, route tracker
- **bike-transportation** — bike with animated bubble-wrap layers
- **packing-services** — packaging materials grid, fragile-protection animation
- **loading-unloading** — worker silhouette + equipment, safety badges
- **warehouse-storage** — isometric warehouse with rack columns, CCTV pulse, inventory ticker
- **international-relocation** — globe arc with shipping routes, customs/docs flow

Shared blocks (different content per page):
1. Premium hero (unique visual + 2 CTAs + WhatsApp)
2. Why Choose SPOT (IBA, 4.9★, 676+, Pan India, Door-to-Door, Insurance, Pro team, 24×7)
3. Animated process timeline (service-specific steps)
4. Service gallery grid (hover zoom + lightbox)
5. Service-specific FAQs (FAQPage JSON-LD)
6. Curated Google-style reviews relevant to the service
7. Strong CTA band (Quote / Call / WhatsApp)
8. Sticky mobile CTA bar

SEO: unique `<title>`, meta description, OG tags, canonical, Service JSON-LD per page.

---

## Out of scope for this PR (call out for follow-up)

- Real Three.js 3D models (we use rich Framer-Motion + SVG isometrics — closest visual outcome at fast performance, per the chosen "cinematic 2D + subtle 3D" direction).
- Live Google Places Reviews API — still curated until Google Maps connector is linked.
- Lightbox library install — using a lightweight custom dialog to stay lean.

## Technical notes

- All new colors/gradients/shadows added as tokens in `src/styles.css` (per-theme blocks), consumed via semantic classes — no hard-coded hex in components.
- Framer Motion already in deps; no new heavy libs. `react-intersection-observer` only if not already present (small).
- Map SVG path stored in `src/lib/india-geo.ts` as a single constant string; no runtime fetch / no Mapbox.
- Video source: Coverr/Pexels mp4 (CC0) referenced by URL with `poster`; will swap to your own if you provide one.
- AI: only prompt + token limit changes — no schema/route changes.

---

## Order of execution

1. Batch 1 (themes, hero, AI) — visible win immediately
2. Batch 2 (accurate map)
3. Batch 3 (sitewide depth + transitions)
4. Batch 4 (8 service pages)

Approve and I'll start with Batch 1.
