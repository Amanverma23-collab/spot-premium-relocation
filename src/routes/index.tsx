import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhyChoose } from "@/components/home/WhyChoose";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { IndiaCoverage } from "@/components/home/IndiaCoverage";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { ContactBlock } from "@/components/home/ContactBlock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SPOT Packers & Movers — IBA Approved Pan India Relocation" },
      {
        name: "description",
        content:
          "Trusted Pan India packers & movers. 4.9★ on Google with 676+ reviews. Home, office, car & bike transport. Free quote in 2 minutes.",
      },
      { property: "og:title", content: "SPOT Packers & Movers — Pan India Relocation" },
      { property: "og:description", content: "IBA approved. 4.9★ rated. Door-to-door across India." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <WhyChoose />
      <ProcessTimeline />
      <IndiaCoverage />
      <ReviewsSection />
      <ContactBlock />
    </>
  );
}
