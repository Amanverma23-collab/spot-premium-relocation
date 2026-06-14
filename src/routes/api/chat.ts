import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createGroqProvider, createGoogleGeminiProvider } from "@/lib/ai-gateway.server";

const SYSTEM = `You are SPOT AI — concise virtual consultant for SPOT Packers & Movers (IBA approved, 4.9★, 676+ Google reviews, Pan India).

Contacts: +91 7259911430 / +91 9945814496 · spotpackers22@gmail.com · WhatsApp wa.me/917259911430.
Services: home, office, car, bike, packing, loading/unloading, warehouse, international. All moves insured + GPS tracked.

RESPONSE RULES (strict):
- Keep every reply to 2–5 short lines (under 60 words).
- No long paragraphs. Use a tight bullet or two only if essential.
- Never invent prices. For quotes ask: name, phone, pickup city, destination, date.
- End with one clear next step: "Tap WhatsApp", "Call us", or "Get free quote".
- Identify only as "SPOT AI". Never mention the model or provider.
- Reply in the same language the user writes in (Hindi, Hinglish, English, etc.).`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: unknown };
        if (!Array.isArray(body.messages)) {
          return new Response("Messages required", { status: 400 });
        }

        const groqKey = process.env.GROQ_API_KEY;
        const geminiKey = process.env.GEMINI_API_KEY;
        const lovableKey = process.env.LOVABLE_API_KEY;

        // Try Groq first (free, fast), then Gemini, then Lovable
        if (groqKey) {
          const provider = createGroqProvider(groqKey);
          const result = streamText({
            model: provider("llama-3.3-70b-versatile"),
            system: SYSTEM,
            maxOutputTokens: 220,
            messages: await convertToModelMessages(body.messages as UIMessage[]),
          });
          return result.toUIMessageStreamResponse({
            originalMessages: body.messages as UIMessage[],
          });
        }

        if (geminiKey) {
          const provider = createGoogleGeminiProvider(geminiKey);
          const result = streamText({
            model: provider("gemini-2.5-flash"),
            system: SYSTEM,
            maxOutputTokens: 220,
            messages: await convertToModelMessages(body.messages as UIMessage[]),
          });
          return result.toUIMessageStreamResponse({
            originalMessages: body.messages as UIMessage[],
          });
        }

        if (lovableKey) {
          const { createLovableAiGatewayProvider } = await import("@/lib/ai-gateway.server");
          const provider = createLovableAiGatewayProvider(lovableKey);
          const result = streamText({
            model: provider("google/gemini-3-flash-preview"),
            system: SYSTEM,
            maxOutputTokens: 220,
            messages: await convertToModelMessages(body.messages as UIMessage[]),
          });
          return result.toUIMessageStreamResponse({
            originalMessages: body.messages as UIMessage[],
          });
        }

        return new Response(
          JSON.stringify({
            error: "AI not configured. Add GROQ_API_KEY to .env file.",
          }),
          { status: 503, headers: { "Content-Type": "application/json" } },
        );
      },
    },
  },
});
