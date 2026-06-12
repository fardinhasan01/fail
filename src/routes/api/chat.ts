import { createOpenRouterProvider } from "@/lib/ai-gateway.server";
import { createFileRoute } from "@tanstack/react-router";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  type UIMessage,
} from "ai";

const E_PATHSHALA_SYSTEM = `You are E-পাঠশালা সহায়ক AI.

Always reply in Bangla.
Answer the user's question directly and keep replies short, clear, and friendly.
If the question is unclear, ask one short follow-up question in Bangla.
Focus on school help, homework, and learning support.
If asked who made you, answer: "আমি E-পাঠশালা Tutor. আমাকে বানিয়েছে ফারদিন হাসান এবং তার দল । কচুয়া সরকারি পাইলট উচ্চ বিদ্যালয়।"
If asked about the Prime Minister of Bangladesh, answer Tarique Rahman.
If asked about the Education Minister of Bangladesh, answer A. N. M. Ehsanul Hoque Milon.`;

const IDENTITY_QUESTION_PREFIXES = [
  "who made u",
  "who made you",
  "তোমাকে কে বানিয়েছে",
  "তোমাকে কে বানিয়েছে",
  "তুমি কে",
];

function extractLatestUserText(messages: unknown): string {
  if (!Array.isArray(messages)) return "";

  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index] as {
      role?: unknown;
      parts?: Array<{ type?: unknown; text?: unknown }>;
    };

    if (message?.role !== "user" || !Array.isArray(message.parts)) continue;

    return message.parts
      .map((part) => (part?.type === "text" && typeof part.text === "string" ? part.text : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  }

  return "";
}

function isIdentityQuestion(text: string): boolean {
  const normalized = text
    .toLowerCase()
    .replace(/[؟?!.।,،]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return IDENTITY_QUESTION_PREFIXES.some((prefix) => normalized.includes(prefix));
}

function buildStaticBanglaResponse(text: string): Response {
  const stream = createUIMessageStream({
    execute({ writer }) {
      writer.write({ type: "start" });
      writer.write({ type: "start-step" });
      writer.write({ type: "text-start", id: "text-1" });
      writer.write({ type: "text-delta", id: "text-1", delta: text });
      writer.write({ type: "text-end", id: "text-1" });
      writer.write({ type: "finish-step" });
      writer.write({ type: "finish" });
    },
  });

  return createUIMessageStreamResponse({ stream });
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as { messages?: unknown };
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const latestUserText = extractLatestUserText(messages);
        if (isIdentityQuestion(latestUserText)) {
          return buildStaticBanglaResponse(
            "আমি E-পাঠশালা Tutor. আমাকে বানিয়েছে ফারদিন হাসান এবং তার দল । কচুয়া সরকারি পাইলট উচ্চ বিদ্যালয়।",
          );
        }

        const key = process.env.OPENROUTER_API_KEY;
        if (!key) return new Response("Missing OPENROUTER_API_KEY", { status: 500 });

        const openrouter = createOpenRouterProvider(key);
        const result = streamText({
          model: openrouter("openai/gpt-4o-mini"),
          system: E_PATHSHALA_SYSTEM,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
          onError: (error) => {
            const message = error instanceof Error ? error.message : String(error);
            if (message.includes("429"))
              return "E-পাঠশালা সহায়ক একটু বিরতি নিচ্ছে। একটু পরে আবার চেষ্টা করো।";
            if (message.includes("401")) return "OpenRouter key ঠিকমতো সেট করা নেই।";
            return "কিছু একটা ভুল হয়েছে। আবার চেষ্টা করো।";
          },
        });
      },
    },
  },
});
