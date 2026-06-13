import { createFileRoute } from "@tanstack/react-router";

const BASE_URL = "";

const paths = [
  "/", "/services", "/about", "/coverage", "/faq", "/contact",
  "/services/home-relocation",
  "/services/office-relocation",
  "/services/car-transportation",
  "/services/bike-transportation",
  "/services/packing-services",
  "/services/loading-unloading",
  "/services/warehouse-storage",
  "/services/international-relocation",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = paths.map(
          (p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`,
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
