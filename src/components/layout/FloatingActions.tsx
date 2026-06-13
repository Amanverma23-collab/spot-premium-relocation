import { Phone, MessageCircle } from "lucide-react";
import { SITE, telUrl, whatsappUrl } from "@/lib/site";

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 left-4 z-40 flex flex-col gap-3 sm:bottom-6 sm:left-6">
      <a
        href={whatsappUrl("Hi SPOT, I'd like a relocation quote.")}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevated transition hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="pointer-events-none absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]/50" />
      </a>
      <a
        href={telUrl(SITE.phones[0])}
        aria-label="Call"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--electric)] text-white shadow-elevated transition hover:scale-105"
      >
        <Phone className="h-5 w-5" />
      </a>
    </div>
  );
}
