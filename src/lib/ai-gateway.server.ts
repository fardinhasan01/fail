import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export function createOpenRouterProvider(apiKey: string, refererOrigin?: string) {
  return createOpenAICompatible({
    name: "openrouter",
    baseURL: "https://openrouter.ai/api/v1",
    apiKey,
    headers: {
      "HTTP-Referer": refererOrigin?.replace(/\/+$/, "") || "http://localhost:3000",
      "X-Title": "E-Pathshala",
    },
  });
}
