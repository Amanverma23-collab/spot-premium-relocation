import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export function createGroqProvider(groqApiKey: string) {
  return createOpenAICompatible({
    name: "groq",
    baseURL: "https://api.groq.com/openai/v1",
    headers: {
      Authorization: `Bearer ${groqApiKey}`,
    },
  });
}

export function createLovableAiGatewayProvider(lovableApiKey: string) {
  return createOpenAICompatible({
    name: "lovable",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: {
      "Lovable-API-Key": lovableApiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
  });
}

export function createGoogleGeminiProvider(geminiApiKey: string) {
  return createOpenAICompatible({
    name: "gemini",
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
    headers: {
      Authorization: `Bearer ${geminiApiKey}`,
    },
  });
}
