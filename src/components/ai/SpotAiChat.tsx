import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { Send, X, Sparkles, MessageSquare } from "lucide-react";
import { SpotLogo } from "@/components/SpotLogo";
import { whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

const QUICK = [
  "🏠 Home shifting quote",
  "🚗 Transport my car",
  "🏍️ Bike transport",
  "🏬 Storage options",
  "📍 Do you serve my city?",
  "💰 Get a quote",
];

export function SpotAiChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollerRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [messages, open]);

  function submit(text?: string) {
    const value = (text ?? input).trim();
    if (!value || busy) return;
    sendMessage({ text: value });
    setInput("");
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open SPOT AI"
        className="fixed bottom-5 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full text-white shadow-elevated transition hover:scale-105 sm:bottom-6 sm:right-6"
        style={{ background: "var(--gradient-brand)" }}
      >
        {open ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
        {!open && (
          <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[var(--orange-spot)] text-[10px] font-bold text-white">
            AI
          </span>
        )}
      </button>

      <div
        className={cn(
          "fixed bottom-24 right-3 z-50 flex w-[calc(100vw-1.5rem)] max-w-[400px] origin-bottom-right flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-elevated transition-all duration-300 sm:right-6",
          open ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-2 scale-95 opacity-0",
        )}
        style={{ height: "min(560px, calc(100vh - 8rem))" }}
      >
        <div className="relative overflow-hidden p-4 text-white" style={{ background: "var(--gradient-brand)" }}>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/20 backdrop-blur">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <div className="font-display text-base font-semibold">SPOT AI</div>
              <div className="text-xs text-white/75">Virtual relocation consultant · online</div>
            </div>
          </div>
        </div>

        <div ref={scrollerRef} className="flex-1 space-y-3 overflow-y-auto bg-secondary/30 p-4">
          {messages.length === 0 && (
            <div className="space-y-3">
              <div className="rounded-2xl bg-card p-3 text-sm text-foreground shadow-sm">
                Hi! I'm SPOT AI 👋 Tell me about your move — pickup city, destination, and date — and I'll help you get a free quote in a minute.
              </div>
              <div className="flex flex-wrap gap-2">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    onClick={() => submit(q)}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-[var(--electric)]/40"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m: import("ai").UIMessage) => {
            const text = m.parts
              .map((p) => (p.type === "text" ? (p as { text: string }).text : ""))
              .join("");
            return (
              <div
                key={m.id}
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
                  m.role === "user"
                    ? "ml-auto bg-[var(--electric)] text-white"
                    : "bg-card text-foreground",
                )}
              >
                {text || (m.role === "assistant" && busy ? "…" : null)}
              </div>
            );
          })}
          {busy && messages[messages.length - 1]?.role === "user" && (
            <div className="inline-flex gap-1 rounded-2xl bg-card px-3.5 py-2.5">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:120ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:240ms]" />
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); submit(); }}
          className="flex items-center gap-2 border-t border-border bg-card p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your move…"
            className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-[var(--electric)]"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--electric)] text-white disabled:opacity-50"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

        <a
          href={whatsappUrl("Hi SPOT, I'd like a quote.")}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 bg-[#25D366] py-2 text-xs font-semibold text-white"
        >
          <MessageSquare className="h-3.5 w-3.5" /> Continue on WhatsApp
        </a>
        <SpotLogo className="hidden" />
      </div>
    </>
  );
}
