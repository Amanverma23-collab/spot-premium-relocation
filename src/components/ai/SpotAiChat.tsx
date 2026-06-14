import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { Send, X, Sparkles, MessageSquare, Bot } from "lucide-react";
import { SpotLogo } from "@/components/SpotLogo";
import { whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  followUps?: string[];
};

const FAQ_GROUPS: FaqItem[] = [
  {
    id: "pricing",
    question: "📦 What are your charges?",
    answer:
      "Charges depend on distance, volume & services. For an accurate free quote, share your pickup city, destination & date. Call us at +91 7259911430.",
    followUps: ["Do you give instant quotes?", "Is there any hidden cost?"],
  },
  {
    id: "insurance",
    question: "🛡️ Is my stuff insured?",
    answer:
      "Yes! Every move is fully insured. If anything gets damaged, you're covered. We also use GPS tracking so you know where your belongings are at all times.",
    followUps: ["How do I claim insurance?", "What items are NOT covered?"],
  },
  {
    id: "car",
    question: "🚗 Can you transport my car?",
    answer:
      "Absolutely! We use enclosed car carriers for safe transport. Your car is insured during transit. Share your route for a car-specific quote.",
    followUps: ["Is car transport open or enclosed?", "How long does car transport take?"],
  },
  {
    id: "bike",
    question: "🏍️ Bike transport available?",
    answer:
      "Yes, we transport bikes Pan India via dedicated carriers. Bike is secured with soft padding & tied down. Get a quote by sharing your route.",
    followUps: ["Can I ship my bike alone?", "Do you dismantle bikes?"],
  },
  {
    id: "cities",
    question: "📍 Do you serve my city?",
    answer:
      "We serve 1000+ cities across India — metro, tier-2, tier-3 & remote areas. Just tell us your pickup & delivery cities and we'll confirm availability.",
    followUps: ["Do you go to small towns?", "International relocation available?"],
  },
  {
    id: "storage",
    question: "🏬 Storage/warehouse options?",
    answer:
      "Yes! We offer secure, CCTV-monitored warehousing — short-term or long-term. Perfect if your new home isn't ready yet. Ask for storage pricing.",
    followUps: ["How safe is the warehouse?", "Can I store just a few boxes?"],
  },
  {
    id: "packing",
    question: "📋 Do you do packing too?",
    answer:
      "Full-service packing included! We use multi-layer packing — cartons, bubble wrap, thermocol & waterproof sheets. You don't need to lift a finger.",
    followUps: ["What packing materials do you use?", "Should I pack valuables myself?"],
  },
  {
    id: "iba",
    question: "✅ Are you IBA approved?",
    answer:
      "Yes, SPOT is IBA (Indian Banks' Association) approved — which means bank employees can avail relocation benefits through us. 676+ Google reviews, 4.9★ rated.",
    followUps: ["What is IBA approval?", "Can bank employees get reimbursement?"],
  },
  {
    id: "contact",
    question: "📞 How to contact you?",
    answer:
      "Call: +91 7259911430 / +91 9945814496\nWhatsApp: wa.me/917259911430\nEmail: spotpackers22@gmail.com\nWe're available 7 days a week.",
    followUps: ["Can I visit your office?", "Do you respond on WhatsApp quickly?"],
  },
  {
    id: "office",
    question: "🏢 Office shifting?",
    answer:
      "Yes, we specialize in office & corporate relocations. Minimal downtime guaranteed — we plan the move around your schedule. Get a customized office move quote.",
    followUps: ["Can you move on weekends?", "Do you handle IT equipment?"],
  },
  {
    id: "international",
    question: "🌍 International relocation?",
    answer:
      "Yes! We handle international moves with customs clearance, air/sea freight & door-to-door delivery. Share destination country for details.",
    followUps: ["How long does international shipping take?", "Do you handle customs paperwork?"],
  },
  {
    id: "tracking",
    question: "📍 Can I track my shipment?",
    answer:
      "Yes! All shipments are GPS tracked. You'll get real-time updates on your phone. Just call or WhatsApp us to get your tracking link.",
    followUps: ["Do I get SMS updates?", "How accurate is tracking?"],
  },
];

const LOCAL_ANSWERS: { keywords: string[]; answer: string }[] = [
  {
    keywords: [
      "hello",
      "hi ",
      "hi!",
      "hey",
      "namaste",
      "good morning",
      "good evening",
      "good night",
      "hlo",
      "hlw",
    ],
    answer: "Hello! 👋 I'm SPOT AI. How can I help you with your relocation today?",
  },
  {
    keywords: ["thank", "thanks", "dhanyavad", "shukriya"],
    answer: "You're welcome! 😊 Is there anything else I can help you with?",
  },
  {
    keywords: ["ok", "okay", "theek", "accha"],
    answer: "👍 Great! Let me know if you have more questions.",
  },
];

function getLocalAnswer(question: string): string | null {
  const lower = question.toLowerCase().trim();
  for (const item of LOCAL_ANSWERS) {
    if (item.keywords.some((kw) => {
      const regex = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`);
      return regex.test(lower);
    })) {
      return item.answer;
    }
  }
  return null;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getInitialFaqs(): FaqItem[] {
  return shuffleArray(FAQ_GROUPS).slice(0, 4);
}

type ChatEntry = {
  type: "faq" | "user" | "ai";
  text: string;
  faqId?: string;
};

export function SpotAiChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [visibleFaqs, setVisibleFaqs] = useState<FaqItem[]>(getInitialFaqs);
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
  const [apiAvailable, setApiAvailable] = useState<boolean | null>(null);
  const processedMsgIds = useRef(new Set<string>());

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  // Move useChat AI responses into chatHistory (only when streaming complete)
  useEffect(() => {
    if (status !== "ready") return;
    for (const m of messages) {
      if (m.role === "assistant" && !processedMsgIds.current.has(m.id)) {
        const text = m.parts
          .map((p) => (p.type === "text" ? (p as { text: string }).text : ""))
          .join("");
        if (text) {
          processedMsgIds.current.add(m.id);
          setChatHistory((prev) => [...prev, { type: "ai", text }]);
          const remaining = FAQ_GROUPS.filter((f) => !chatHistory.some((h) => h.faqId === f.id));
          setVisibleFaqs(shuffleArray(remaining).slice(0, 3));
          setApiAvailable(true);
        }
      }
    }
  }, [messages, chatHistory, status]);

  // Detect API errors
  useEffect(() => {
    if (status === "error") {
      setApiAvailable(false);
      // Keep user message, add fallback AI reply
      setChatHistory((prev) => [
        ...prev,
        {
          type: "ai" as const,
          text: "I'm having trouble connecting right now. For instant help:\n\n📞 Call: +91 7259911430\n💬 WhatsApp: wa.me/917259911430\n\nOr try asking about our services like pricing, packing, insurance, etc.",
        },
      ]);
      setMessages([]);
    }
  }, [status, setMessages]);

  // Clear processed IDs on reset
  useEffect(() => {
    if (chatHistory.length === 0) {
      processedMsgIds.current.clear();
    }
  }, [chatHistory.length]);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [chatHistory, messages, open]);

  function handleFaqClick(faq: FaqItem) {
    setChatHistory((prev) => [
      ...prev,
      { type: "faq", text: faq.question, faqId: faq.id },
      { type: "ai", text: faq.answer },
    ]);

    const followUps = faq.followUps || [];
    const newPool = FAQ_GROUPS.filter((f) => f.id !== faq.id && !followUps.includes(f.question));
    const nextFaqs = shuffleArray(newPool).slice(0, 3);
    setVisibleFaqs(nextFaqs);
  }

  function handleCustomSubmit(text?: string) {
    const value = (text ?? input).trim();
    if (!value || busy) return;

    setChatHistory((prev) => [...prev, { type: "user", text: value }]);
    setInput("");

    // Try local answer first (for simple greetings etc.)
    const localAnswer = getLocalAnswer(value);
    if (localAnswer) {
      setTimeout(() => {
        setChatHistory((prev) => [...prev, { type: "ai", text: localAnswer }]);
        const remaining = FAQ_GROUPS.filter((f) => !chatHistory.some((h) => h.faqId === f.id));
        setVisibleFaqs(shuffleArray(remaining).slice(0, 3));
      }, 300);
      return;
    }

    // Send to AI API for smart response
    setMessages([]);
    sendMessage({ text: value });
  }

  function resetToFaq() {
    setMessages([]);
    setChatHistory([]);
    setVisibleFaqs(getInitialFaqs());
    setApiAvailable(null);
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
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-95 opacity-0",
        )}
        style={{ height: "min(560px, calc(100vh - 8rem))" }}
      >
        {/* Header */}
        <div
          className="relative overflow-hidden p-4 text-white"
          style={{ background: "var(--gradient-brand)" }}
        >
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/20 backdrop-blur">
              <Sparkles className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <div className="font-display text-base font-semibold">SPOT AI</div>
              <div className="text-xs text-white/75">Virtual relocation consultant · online</div>
            </div>
            {chatHistory.length > 0 && (
              <button
                onClick={resetToFaq}
                className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur transition hover:bg-white/30"
              >
                FAQs
              </button>
            )}
          </div>
        </div>

        {/* Messages Area */}
        <div ref={scrollerRef} className="flex-1 space-y-3 overflow-y-auto bg-secondary/30 p-4">
          {/* Welcome message */}
          {chatHistory.length === 0 && (
            <div className="space-y-3">
              <div className="rounded-2xl bg-card p-3 text-sm text-foreground shadow-sm">
                Hi! I'm SPOT AI 👋 Ask me anything about your move — pricing, packing, insurance,
                tracking, or pick a topic below!
              </div>
            </div>
          )}

          {/* All Chat History */}
          {chatHistory.map((item, i) => {
            if (item.type === "faq") {
              return (
                <div key={`faq-${i}`} className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl bg-[var(--electric)] px-3.5 py-2.5 text-sm leading-relaxed text-white shadow-sm">
                    {item.text}
                  </div>
                </div>
              );
            }
            if (item.type === "user") {
              return (
                <div key={`user-${i}`} className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl bg-[var(--electric)] px-3.5 py-2.5 text-sm leading-relaxed text-white shadow-sm">
                    {item.text}
                  </div>
                </div>
              );
            }
            return (
              <div key={`ai-${i}`} className="flex gap-2">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--gradient-brand)] text-white">
                  <Bot className="h-3.5 w-3.5" />
                </span>
                <div className="max-w-[85%] rounded-2xl bg-card px-3.5 py-2.5 text-sm leading-relaxed text-foreground shadow-sm whitespace-pre-line">
                  {item.text}
                </div>
              </div>
            );
          })}

          {/* Typing indicator when API is working */}
          {busy && (
            <div className="flex gap-2">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--gradient-brand)] text-white">
                <Bot className="h-3.5 w-3.5" />
              </span>
              <div className="inline-flex gap-1 rounded-2xl bg-card px-3.5 py-2.5">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:120ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:240ms]" />
              </div>
            </div>
          )}

          {/* Follow-up buttons after AI answer */}
          {chatHistory.length > 0 &&
            chatHistory[chatHistory.length - 1].type === "ai" &&
            !busy &&
            visibleFaqs.length > 0 && (
              <div className="space-y-2">
                <div className="text-[11px] font-medium text-muted-foreground">
                  You might also want to know:
                </div>
                <div className="flex flex-wrap gap-2">
                  {visibleFaqs.map((faq) => (
                    <button
                      key={faq.id}
                      onClick={() => handleFaqClick(faq)}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-[var(--electric)]/40 hover:bg-[var(--electric)]/5"
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>
              </div>
            )}

          {/* Initial FAQ buttons */}
          {chatHistory.length === 0 && (
            <div className="flex flex-wrap gap-2">
              {visibleFaqs.map((faq) => (
                <button
                  key={faq.id}
                  onClick={() => handleFaqClick(faq)}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-[var(--electric)]/40 hover:bg-[var(--electric)]/5"
                >
                  {faq.question}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input Area */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCustomSubmit();
          }}
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

        {/* WhatsApp CTA */}
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
