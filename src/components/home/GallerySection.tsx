import { useState } from "react";
import { X } from "lucide-react";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=600&h=400&fit=crop",
    alt: "Professional packing service",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
    alt: "Safe home relocation",
  },
  {
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
    alt: "Loading goods into truck",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
    alt: "Moving boxes and supplies",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
    alt: "Office relocation service",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop",
    alt: "Furniture wrapping and protection",
  },
  {
    src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&h=400&fit=crop",
    alt: "Warehouse storage facility",
  },
  {
    src: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600&h=400&fit=crop",
    alt: "Truck loaded with household items",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop",
    alt: "House ready for moving",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=400&fit=crop",
    alt: "Boxes arranged in room",
  },
  {
    src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&h=400&fit=crop",
    alt: "Beautiful home exterior",
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
    alt: "Modern house setup",
  },
  {
    src: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&h=400&fit=crop",
    alt: "Kitchen items packing",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&h=400&fit=crop",
    alt: "Living room rearranged",
  },
  {
    src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&h=400&fit=crop",
    alt: "Team of professional movers",
  },
  {
    src: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=600&h=400&fit=crop",
    alt: "Complete relocation service",
  },
];

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const showPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const showNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % galleryImages.length);
    }
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/50 via-background to-background" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--electric)]">
            Our Work
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            See Our <span className="gradient-text-warm">Moving Gallery</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            A glimpse into our professional packing, loading, and relocation services across India.
          </p>
        </div>

        <div className="mt-12 grid grid-flow-col grid-rows-1 auto-cols-[70vw] gap-4 overflow-x-auto pb-4 sm:grid-rows-2 sm:auto-cols-[240px] sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {galleryImages.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => openLightbox(i)}
              className="group relative shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-skeuo transition hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="aspect-[4/3]">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 right-3 text-left text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
                {img.alt}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            &#8249;
          </button>

          <img
            src={galleryImages[selectedIndex].src}
            alt={galleryImages[selectedIndex].alt}
            className="max-h-[80vh] max-w-[90vw] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            &#8250;
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white">
            {selectedIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
