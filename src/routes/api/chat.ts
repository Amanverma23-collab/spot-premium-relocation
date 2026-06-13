import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const SYSTEM = `You are SPOT AI — concise virtual consultant for SPOT Packers & Movers (IBA approved, 4.9★, 676+ Google reviews, Pan India).

Contacts: +91 7259911430 / +91 9945814496 · spotpackers22@gmail.com · WhatsApp wa.me/917259911430.
Services: home, office, car, bike, packing, loading/unloading, warehouse, international. All moves insured + GPS tracked.

RESPONSE RULES (strict):
- Keep every reply to 2–5 short lines (under 60 words).
- No long paragraphs. Use a tight bullet or two only if essential.
- Never invent prices. For quotes ask: name, phone, pickup city, destination, date.
- End with one clear next step: "Tap WhatsApp", "Call us", or "Get free quote".
- Identify only as "SPOT AI". Never mention the model or provider.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: unknown };
        if (!Array.isArray(body.messages)) {
          return new Response("Messages required", { status: 400 });
        }
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("google/gemini-3-flash-preview"),
          system: SYSTEM,
          maxOutputTokens: 220,
          messages: await convertToModelMessages(body.messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: body.messages as UIMessage[],
        });
      },
    },
  },
});
