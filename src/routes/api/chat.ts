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
If asked who made you, answer: "আমি E-পাঠশালা Tutor. আমাকে বানিয়েছে কচুয়া সরকারি পাইলট উচ্চ বিদ্যালয় টিম (Kachua Govt. Pilot High School Team)।"
If asked about the Prime Minister of Bangladesh, answer Tarique Rahman.
If asked about the Education Minister of Bangladesh, answer A. N. M. Ehsanul Hoque Milon.`;

const IDENTITY_QUESTION_PREFIXES = [
  "who made u",
  "who made you",
  "তোমাকে কে বানিয়েছে",
  "তোমাকে কে বানিয়েছে",
  "তুমি কে",
];

function generateFallbackBanglaResponse(question: string): string {
  const normalized = question.toLowerCase();

  if (!question.trim()) {
    return "একটু প্রশ্নটা লিখে দাও, আমি সাহায্য করব।";
  }

  if (
    normalized.includes("ভগ্নাংশ") ||
    normalized.includes("fraction") ||
    normalized.includes("গণিত")
  ) {
    return "ভগ্নাংশ মানে একটি পূর্ণ সংখ্যার অংশ। উদাহরণ: 1/2, 3/4। দৈনন্দিন জীবনে পিজ্জা ভাগ করা, মাপজোক, আর রান্নায় এটা লাগে।";
  }

  if (normalized.includes("কারক") || normalized.includes("বিভক্তি")) {
    return "কারক বাক্যে ক্রিয়ার সঙ্গে বিশেষ্যের সম্পর্ক দেখায়। সহজে চেনার জন্য কর্তা, কর্ম, করণ, সম্প্রদান, অপাদান, অধিকরণ ধরে বাক্য ভাঙো।";
  }

  if (normalized.includes("৭ই মার্চ") || normalized.includes("7ই মার্চ") || normalized.includes("স্বাধীন")) {
    return "৭ই মার্চের ভাষণ বাঙালির স্বাধীনতার প্রস্তুতিকে তীব্র করে। এটি ঐক্য, সংগ্রাম, আর মুক্তিযুদ্ধের দিকনির্দেশনা দেয়।";
  }

  if (normalized.includes("নামতা") || normalized.includes("table")) {
    return "দ্রুত নামতা মুখস্থ করতে ২, ৫, ১০ থেকে শুরু করো, জোরে পড়ো, আর ছোট ছোট দলে ভাগ করে প্রতিদিন ৫ মিনিট অনুশীলন করো।";
  }

  if (normalized.includes("কীভাবে") || normalized.includes("কিভাবে") || normalized.includes("how")) {
    return "ধাপে ধাপে করো, ছোট উদাহরণ নাও, আর শেষে নিজের ভাষায় একবার বলে দেখো। চাইলে আমি এটাকে আরও সহজ করে ভেঙে দিতে পারি।";
  }

  return "আমি এখন সংক্ষিপ্ত ফallback মোডে আছি। প্রশ্নটা একটু আরেকভাবে লিখলে আমি আরও নির্দিষ্ট উত্তর দিতে পারব।";
}

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
            "আমি E-পাঠশালা Tutor. আমাকে বানিয়েছে কচুয়া সরকারি পাইলট উচ্চ বিদ্যালয় টিম (Kachua Govt. Pilot High School Team)।",
          );
        }

        const key = process.env.OPENROUTER_API_KEY;
        if (!key) {
          return buildStaticBanglaResponse(generateFallbackBanglaResponse(latestUserText));
        }

        try {
          const referer =
            request.headers.get("origin") ??
            process.env.VITE_PUBLIC_APP_URL ??
            process.env.VITE_APP_URL ??
            "http://localhost:3000";
          const openrouter = createOpenRouterProvider(key, referer);
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
              if (message.includes("401")) {
                return generateFallbackBanglaResponse(latestUserText);
              }
              return generateFallbackBanglaResponse(latestUserText);
            },
          });
        } catch {
          return buildStaticBanglaResponse(generateFallbackBanglaResponse(latestUserText));
        }
      },
    },
  },
});
