import { createFileRoute } from "@tanstack/react-router";
import { IndiaCoverage } from "@/components/home/IndiaCoverage";

const cities = [
  "Delhi","Mumbai","Bangalore","Hyderabad","Chennai","Pune","Ahmedabad","Jaipur","Kolkata","Lucknow",
  "Indore","Nagpur","Bhopal","Patna","Guwahati","Manipal","Mangalore","Udupi","Surat","Kochi",
  "Coimbatore","Visakhapatnam","Vijayawada","Chandigarh","Dehradun","Bhubaneswar","Ranchi","Raipur","Mysuru","Hubballi",
];

export const Route = createFileRoute("/coverage")({
  head: () => ({
    meta: [
      { title: "Coverage — SPOT Packers & Movers (Pan India)" },
      { name: "description", content: "Pan India coverage map for SPOT Packers & Movers. 25+ states, 100+ cities served door-to-door." },
      { property: "og:title", content: "Pan India Coverage — SPOT Packers" },
      { property: "og:description", content: "Major hubs, route corridors, and serviced cities." },
      { property: "og:url", content: "/coverage" },
    ],
    links: [{ rel: "canonical", href: "/coverage" }],
  }),
  component: CoveragePage,
});

function CoveragePage() {
  return (
    <>
      <IndiaCoverage />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Cities we serve</h2>
        <p className="mt-3 text-muted-foreground">A snapshot of major cities — we cover thousands of pin codes besides these.</p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {cities.map((c) => (
            <li key={c} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground shadow-skeuo">{c}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
