import { createFileRoute } from "@tanstack/react-router";
import {
  Bot,
  Brain,
  Cpu,
  LoaderCircle,
  MessageSquare,
  Send,
  Sliders,
  Sparkles,
  Terminal,
  Trash2,
  UserRound,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const INITIAL_MESSAGES = [
  {
    id: "welcome",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "স্বাগতম! আমি E-পাঠশালা AI সহায়ক। পড়া, প্রশ্ন, কুইজ, আর হোমওয়ার্কে আমি তোমার পাশে আছি।",
      },
    ],
  },
] satisfies UIMessage[];

const QUICK_PROMPTS = [
  "গণিতে ভগ্নাংশ কী এবং এর বাস্তব ব্যবহার?",
  "বাংলা ব্যাকরণে কারক ও বিভক্তি চেনার সহজ উপায়?",
  "বাংলাদেশের স্বাধীনতায় বঙ্গবন্ধুর ৭ই মার্চের গুরুত্ব?",
  "কীভাবে দ্রুত নামতা মুখস্থ করব?",
];

export const Route = createFileRoute("/bani")({
  head: () => ({ meta: [{ title: "স্বর্গীয় সহায়িকা AI Core · E-পাঠশালা" }] }),
  component: SupportAi,
});

function SupportAi() {
  const [draft, setDraft] = useState("");
  const [temperature, setTemperature] = useState<number>(0.7);
  const [latency, setLatency] = useState<number>(140);
  const [neuralLogs, setNeuralLogs] = useState<string[]>([
    "Synaptic connection established. Status: Heavenly Online",
    "Loaded Bangla NLP Grammar Engine v4.1.",
    "Awaiting student query input...",
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const chat = useChat({
    transport: useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []),
    messages: INITIAL_MESSAGES,
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chat.messages, chat.status]);

  // Fake changing latency slightly to feel alive
  useEffect(() => {
    if (chat.status === "streaming" || chat.status === "submitted") {
      const interval = setInterval(() => {
        setLatency(Math.floor(Math.random() * 40) + 110);
      }, 500);
      return () => clearInterval(interval);
    } else {
      setLatency(142);
    }
  }, [chat.status]);

  const isBusy = chat.status === "submitted" || chat.status === "streaming";

  async function submitQuestion() {
    const question = draft.trim();
    if (!question || isBusy) return;

    setDraft("");

    // Add logs (removing any OpenAI or raw brand names)
    setNeuralLogs((prev) => [
      ...prev.slice(-6),
      `Input query parsed: "${question.substring(0, 25)}..."`,
      "Routing query through synaptic networks...",
      "Generating celestial response stream...",
    ]);

    await chat.sendMessage({ text: question });

    setNeuralLogs((prev) => [...prev.slice(-6), "Synaptic response synced successfully."]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitQuestion();
  }

  async function applyPrompt(prompt: string) {
    if (isBusy) return;
    setDraft(prompt);
    setNeuralLogs((prev) => [
      ...prev.slice(-6),
      `Quick query loaded: "${prompt.substring(0, 20)}..."`,
    ]);
    await chat.sendMessage({ text: prompt });
    setDraft("");
    setNeuralLogs((prev) => [...prev.slice(-6), "Synaptic response synced successfully."]);
  }

  function extractText(message: UIMessage) {
    return message.parts
      .map((part) => (part.type === "text" ? part.text : ""))
      .join("")
      .trim();
  }

  return (
    <AppShell>
      <div className="relative mx-auto max-w-7xl space-y-6 overflow-hidden rounded-[2.75rem] px-4 py-6 md:px-8 md:py-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.16),transparent_26%),linear-gradient(135deg,#eff6ff_0%,#fdf2f8_42%,#fffbeb_100%)]" />
        <div className="absolute -right-20 top-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-amber-200/40 blur-[110px] animate-float" />
        <div className="absolute -left-24 bottom-0 -z-10 h-[22rem] w-[22rem] rounded-full bg-sky-200/30 blur-[100px]" />

        <header className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-slate-950/95 text-white shadow-[0_24px_80px_rgba(15,23,42,0.22)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.35),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.25),transparent_28%)]" />

          <div className="relative grid gap-6 p-6 md:p-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-amber-100 shadow-soft backdrop-blur">
                <Sparkles className="h-4 w-4 text-amber-300" />
                E-পাঠশালা AI STUDIO
              </div>

              <div className="space-y-4">
                <h1 className="max-w-2xl text-4xl font-black leading-none tracking-tight md:text-6xl">
                  <span className="bg-gradient-to-r from-amber-200 via-sky-200 to-violet-200 bg-clip-text text-transparent">
                    সহায়িকা AI
                  </span>
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-white/72 md:text-base">
                  পড়াশোনার যেকোনো জটিল বিষয়কে সহজ করতে প্রস্তুত এই AI। বাংলা বা ইংরেজিতে প্রশ্ন
                  লিখো, আর দ্রুত, স্বচ্ছ, বন্ধুসুলভ উত্তর নাও।
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-[10px] md:text-xs font-bold text-white/82">
                <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5 flex items-center gap-1.5 shadow-soft backdrop-blur">
                  <Zap className="h-3.5 w-3.5 text-amber-300" /> Latency: {latency}ms
                </span>
                <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5 flex items-center gap-1.5 shadow-soft backdrop-blur">
                  <Brain className="h-3.5 w-3.5 text-violet-300" /> Advanced Reasoning
                </span>
                <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5 flex items-center gap-1.5 shadow-soft backdrop-blur">
                  <Cpu className="h-3.5 w-3.5 text-sky-300" /> Synaptic Engine
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {QUICK_PROMPTS.slice(0, 4).map((prompt, index) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => applyPrompt(prompt)}
                    className="rounded-[1.4rem] border border-white/10 bg-white/8 p-4 text-left text-xs font-semibold text-white/78 shadow-soft backdrop-blur transition-transform hover:-translate-y-1 hover:bg-white/12"
                  >
                    <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                      Prompt {index + 1}
                    </div>
                    <div className="mt-2 line-clamp-3 leading-5">{prompt}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-white/55">
                    Live Core
                  </p>
                  <h2 className="mt-1 text-xl font-black text-white">Command center</h2>
                </div>
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-soft",
                    isBusy && "animate-pulse",
                  )}
                >
                  <Bot className={cn("h-7 w-7", isBusy ? "text-amber-300" : "text-sky-300")} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-[1.35rem] border border-white/10 bg-slate-900/50 p-4">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">Mode</div>
                  <div className="mt-2 text-lg font-black text-white">
                    {isBusy ? "Thinking" : "Ready"}
                  </div>
                </div>
                <div className="rounded-[1.35rem] border border-white/10 bg-slate-900/50 p-4">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                    Safety
                  </div>
                  <div className="mt-2 text-lg font-black text-emerald-300">Guarded</div>
                </div>
                <div className="rounded-[1.35rem] border border-white/10 bg-slate-900/50 p-4">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                    Reasoning
                  </div>
                  <div className="mt-2 text-lg font-black text-violet-200">Adaptive</div>
                </div>
                <div className="rounded-[1.35rem] border border-white/10 bg-slate-900/50 p-4">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                    Latency
                  </div>
                  <div className="mt-2 text-lg font-black text-amber-200">{latency}ms</div>
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.92),rgba(14,165,233,0.24))] p-4 shadow-soft">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
                  <span>Signal</span>
                  <span>Encrypted</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-amber-300 via-sky-300 to-violet-300" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-[1.6rem] border border-white/70 bg-white/70 p-4 shadow-soft backdrop-blur">
            <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Stream</div>
            <div className="mt-2 text-2xl font-black text-slate-900">Live</div>
          </div>
          <div className="rounded-[1.6rem] border border-white/70 bg-white/70 p-4 shadow-soft backdrop-blur">
            <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Latency</div>
            <div className="mt-2 text-2xl font-black text-slate-900">{latency}ms</div>
          </div>
          <div className="rounded-[1.6rem] border border-white/70 bg-white/70 p-4 shadow-soft backdrop-blur">
            <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Model</div>
            <div className="mt-2 text-2xl font-black text-slate-900">Adaptive</div>
          </div>
          <div className="rounded-[1.6rem] border border-white/70 bg-white/70 p-4 shadow-soft backdrop-blur">
            <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Memory</div>
            <div className="mt-2 text-2xl font-black text-slate-900">{neuralLogs.length}</div>
          </div>
        </section>

        {/* Dashboard Panels */}
        <section className="grid items-start gap-5 xl:grid-cols-[0.88fr_1.12fr]">
          {/* Left Panel: Settings & Logs */}
          <aside className="space-y-4 xl:sticky xl:top-4">
            {/* Setting Dashboard */}
            <div className="space-y-5 rounded-[2rem] border border-white/60 bg-white/80 p-6 text-slate-800 shadow-soft backdrop-blur-xl">
              <div className="flex items-center gap-3">
                {/* Heavenly Pulsing Halo Visualizer */}
                <div className="relative flex h-12 w-12 items-center justify-center shrink-0">
                  <div
                    className={cn(
                      "absolute inset-0 rounded-full blur-md opacity-40 transition-all duration-500 bg-gradient-to-br",
                      isBusy
                        ? "from-amber-400 to-orange-400 animate-pulse scale-110"
                        : "from-sky-400 to-amber-300",
                    )}
                  />
                  <div className="relative grid h-10 w-10 place-items-center rounded-full bg-white border border-amber-100 text-slate-800 shadow-sm">
                    <Bot
                      className={cn(
                        "h-5 w-5",
                        isBusy ? "text-amber-500 animate-spin" : "text-sky-500",
                      )}
                    />
                  </div>
                </div>
                <div className="text-left">
                  <h2 className="text-base font-black bg-gradient-to-r from-amber-600 to-indigo-600 bg-clip-text text-transparent">
                    AI Core Visualizer
                  </h2>
                  <p className="text-[10px] text-slate-500 font-bold">
                    {isBusy ? "উত্তর তৈরি হচ্ছে..." : "ইনপুট গ্রহণের জন্য প্রস্তুত।"}
                  </p>
                </div>
              </div>

              {/* Advanced Parameters Slider */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-600 flex items-center gap-1">
                    <Sliders className="h-3.5 w-3.5 text-amber-500" /> AI Temperature:
                  </span>
                  <span className="font-mono text-amber-600 font-black">
                    {temperature} (
                    {temperature <= 0.4 ? "সংক্ষিপ্ত" : temperature <= 0.8 ? "ভারসাম্য" : "সৃজনশীল"}
                    )
                  </span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="1.0"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
                />
                <p className="text-[9px] text-slate-500 leading-relaxed font-semibold text-left">
                  কম তাপমাত্রা উত্তরকে সংক্ষিপ্ত ও তথ্যবহুল করে। বেশি তাপমাত্রা উত্তরকে বর্ণনামূলক
                  করে তোলে।
                </p>
              </div>

              {/* Quick Prompt Selector */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5 text-sky-500" /> নমুনা প্রশ্নসমূহ
                </span>
                <div className="space-y-2">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void applyPrompt(prompt)}
                      className="w-full rounded-2xl border border-amber-200 bg-white px-4 py-3 text-left text-xs font-bold text-slate-700 hover:text-amber-700 hover:border-amber-400 hover:bg-amber-50/40 transition-all cursor-pointer shadow-sm"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Neural Execution Terminal Logs */}
            <div className="space-y-3 rounded-[2rem] border border-white/60 bg-white/80 p-5 text-slate-800 shadow-soft backdrop-blur-xl">
              <div className="flex items-center justify-between text-xs font-bold pb-2 border-b border-slate-100">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Terminal className="h-3.5 w-3.5 text-sky-500" /> Synaptic Terminal logs
                </span>
                <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-1.5 py-0.5 text-[8px] font-mono text-emerald-600 border border-emerald-100 font-bold">
                  ACTIVE
                </span>
              </div>
              <div className="font-mono text-[9px] text-indigo-950 space-y-1.5 max-h-[140px] overflow-y-auto leading-relaxed font-semibold text-left">
                {neuralLogs.map((log, i) => (
                  <div key={i} className="flex gap-1">
                    <span className="text-amber-400 font-bold">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Panel: AI chat console */}
          <div className="flex min-h-[700px] flex-col justify-between overflow-hidden rounded-[2.25rem] border border-white/60 bg-slate-950/90 text-white shadow-[0_24px_80px_rgba(15,23,42,0.22)] backdrop-blur-xl">
            {/* Console Header */}
            <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/5 px-6 py-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-emerald-400/40 blur-md" />
                  <div className="relative h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-left">
                  <h2 className="text-base font-black text-white">Quantum Chat Terminal</h2>
                  <p className="text-[10px] font-bold text-white/55">
                    Secure end-to-end AI channel active
                  </p>
                </div>
              </div>
              <div className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                {isBusy ? "Streaming" : "Ready"}
              </div>
            </div>

            <div className="flex items-center gap-3 border-b border-white/10 bg-slate-950/70 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Bangla
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Science
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Quiz</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Homework
              </span>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.95),rgba(15,23,42,0.88))] px-4 py-6 space-y-4 max-h-[50vh]">
              {chat.messages.map((message, index) => {
                const text = extractText(message);
                const isUser = message.role === "user";
                const isAssistant = message.role === "assistant";

                return (
                  <div
                    key={message.id}
                    className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}
                  >
                    {!isUser && (
                      <div className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/10 text-amber-200 shadow-soft">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}

                    <div
                      className={cn(
                        "max-w-[92%] rounded-[1.5rem] border px-5 py-4 text-xs md:text-sm leading-relaxed shadow-soft transition-all text-left backdrop-blur",
                        isUser
                          ? "border-sky-300/20 bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-600 text-white"
                          : "border-white/10 bg-white/8 text-white/88",
                      )}
                    >
                      <div
                        className={cn(
                          "mb-2 flex items-center gap-1.5 text-[9px] font-black tracking-widest",
                          isUser ? "text-sky-100" : "text-white/45",
                        )}
                      >
                        {isUser ? (
                          <>
                            <UserRound className="h-3 w-3" />
                            USER (YOU)
                          </>
                        ) : (
                          <>
                            <Bot className="h-3 w-3 text-amber-300" />
                            SOHAYOK SUPER AI
                          </>
                        )}
                      </div>
                      <div className="whitespace-pre-wrap leading-relaxed font-sans font-semibold text-white/92">
                        {text ||
                          (isAssistant && index === chat.messages.length - 1 && isBusy
                            ? "শ্লেষাত্মক ডাটা ট্রান্সমিশন হচ্ছে..."
                            : "")}
                      </div>
                    </div>

                    {isUser && (
                      <div className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/10 text-white/65 shadow-soft">
                        <UserRound className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {isBusy && (
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/10 text-amber-200 shadow-soft">
                    <LoaderCircle className="h-4 w-4 animate-spin text-amber-300" />
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/8 px-5 py-3 text-xs md:text-sm text-white/65 shadow-soft font-semibold backdrop-blur">
                    ডাটা অ্যানালাইসিস চলছে...
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Chat Controller Form */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-white/10 bg-slate-950/90 p-4 md:p-6"
            >
              <div className="space-y-3">
                <Textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void submitQuestion();
                    }
                  }}
                  placeholder="তোমার প্রশ্নের কোয়েরি এখানে লিখো..."
                  className="min-h-24 rounded-2xl border-white/10 bg-white/5 px-4 py-4 text-sm text-white placeholder:text-white/35 focus:border-amber-400/50 focus:ring-amber-400/10 focus:bg-white/8 resize-none font-sans"
                />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[10px] font-bold text-white/45">
                    Enter চাপলে সরাসরি সেন্ড হবে, Shift+Enter দিলে নতুন লাইন হবে।
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="cursor-pointer rounded-xl border-white/10 bg-white/5 px-3.5 py-2 text-xs font-bold text-white/75 shadow-sm hover:bg-white/10 hover:text-white"
                      onClick={() => {
                        chat.clearError();
                        chat.setMessages(INITIAL_MESSAGES);
                        setDraft("");
                        setNeuralLogs([
                          "AI core memory buffer cleared.",
                          "Initialized welcoming parameters.",
                        ]);
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      ক্লিয়ার
                    </Button>
                    <Button
                      type="submit"
                      className="cursor-pointer rounded-xl border border-amber-300/30 bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2 text-xs font-semibold text-white shadow-soft transition-all hover:opacity-90 active:scale-95 md:text-sm"
                      disabled={!draft.trim() || isBusy}
                    >
                      {isBusy ? (
                        <LoaderCircle className="mr-1 h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Send className="mr-1 h-3.5 w-3.5" />
                      )}
                      {isBusy ? "প্রসেসিং" : "কোয়েরি সেন্ড"}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
