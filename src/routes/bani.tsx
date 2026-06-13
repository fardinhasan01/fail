import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
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
        text: "আমি E-পাঠশালা সহায়িকা সুপার AI Core v3.5। তোমার প্রশ্ন টাইপ করো, আমি সেকেন্ডের মধ্যে সমাধান দিচ্ছি।",
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
  head: () => ({ meta: [{ title: "সহায়ক AI Core · E-পাঠশালা" }] }),
  component: SupportAi,
});

function SupportAi() {
  const [draft, setDraft] = useState("");
  const [temperature, setTemperature] = useState<number>(0.7);
  const [latency, setLatency] = useState<number>(140);
  const [neuralLogs, setNeuralLogs] = useState<string[]>([
    "System Initialized. Status: Online",
    "Loaded Bangla NLP Grammar Engine v4.1.",
    "Awaiting user neural input..."
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
    
    // Add logs
    setNeuralLogs(prev => [
      ...prev.slice(-6),
      `User query: "${question.substring(0, 25)}..."`,
      "Routing to OpenAI via OpenRouter...",
      "Synthesizing semantic response..."
    ]);

    await chat.sendMessage({ text: question });
    
    setNeuralLogs(prev => [
      ...prev.slice(-6),
      "Response stream received successfully."
    ]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitQuestion();
  }

  function applyPrompt(prompt: string) {
    setDraft(prompt);
    setNeuralLogs(prev => [
      ...prev.slice(-6),
      `Quick prompt loaded: "${prompt.substring(0, 20)}..."`
    ]);
  }

  function extractText(message: UIMessage) {
    return message.parts
      .map((part) => (part.type === "text" ? part.text : ""))
      .join("")
      .trim();
  }

  return (
    <AppShell>
      <div className="px-4 md:px-8 py-6 md:py-8 max-w-7xl mx-auto space-y-6">
        
        {/* Advanced Futuristic Header */}
        <header className="rounded-[2.25rem] border border-violet-500/20 bg-slate-950 text-white shadow-glow overflow-hidden relative">
          {/* Cyberpunk Grid Background Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-15" />
          <div className="absolute inset-0 bg-radial-gradient(circle_at_top_right,rgba(139,92,246,0.18),transparent_50%)" />
          
          <div className="p-6 md:p-8 lg:p-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center relative z-10">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/50 px-4 py-2 text-xs md:text-sm font-semibold text-violet-300">
                <Sparkles className="h-4 w-4 text-violet-400 animate-pulse" />
                QUANTUM NLP CORE V3.5 ENABLED
              </div>
              
              <div className="space-y-3">
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  Sohayok AI System
                </h1>
                <p className="max-w-2xl text-xs md:text-sm text-slate-300 leading-relaxed">
                  পড়াশোনার যেকোনো জটিল বিষয়কে সহজ করতে প্রস্তুত সুপার কম্পিউটিং এআই। এটি এখন আরও দ্রুত এবং সমৃদ্ধ। বাংলা ও ইংরেজিতে প্রশ্ন লিখে মুহূর্তেই রিয়েল-টাইম জেনারেটিভ উত্তর নাও।
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-[10px] md:text-xs font-semibold text-slate-400">
                <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 flex items-center gap-1">
                  <Zap className="h-3 w-3 text-yellow-400" /> Low Latency
                </span>
                <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 flex items-center gap-1">
                  <Brain className="h-3 w-3 text-purple-400" /> Advanced Reasoning
                </span>
                <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 flex items-center gap-1">
                  <Cpu className="h-3 w-3 text-cyan-400" /> GPT-4o-Mini Engine
                </span>
              </div>
            </div>

            {/* Neural Diagnostics Grid */}
            <div className="grid gap-3 grid-cols-2">
              {[
                { label: "Core Model", value: "GPT-4o-Mini", color: "text-violet-400" },
                { label: "Latency", value: `${latency} ms`, color: "text-cyan-400" },
                { label: "Bandwidth Status", value: "Optimal", color: "text-emerald-400" },
                { label: "Synapse Speed", value: "99.8 TFLOPS", color: "text-indigo-400" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-soft backdrop-blur-md"
                >
                  <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                    {item.label}
                  </div>
                  <div className={cn("mt-1 text-base md:text-lg font-black", item.color)}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Dashboard Panels */}
        <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] items-start">
          
          {/* Left Panel: Neural Settings & Logs */}
          <aside className="space-y-4 lg:sticky lg:top-4">
            
            {/* Setting Dashboard */}
            <div className="rounded-[2rem] border border-slate-800 bg-slate-950 p-6 shadow-glow text-white space-y-5">
              <div className="flex items-center gap-3">
                {/* Glowing Core Visualizer */}
                <div className="relative flex h-12 w-12 items-center justify-center shrink-0">
                  <div
                    className={cn(
                      "absolute inset-0 rounded-full blur-md opacity-60 transition-all duration-500",
                      isBusy
                        ? "bg-violet-500 animate-pulse scale-110"
                        : "bg-cyan-500"
                    )}
                  />
                  <div className="relative grid h-10 w-10 place-items-center rounded-full bg-slate-900 border border-slate-800 text-white">
                    <Bot className={cn("h-5 w-5", isBusy ? "text-violet-400 animate-spin" : "text-cyan-400")} />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">AI Core Visualizer</h2>
                  <p className="text-[10px] text-slate-400">
                    {isBusy ? "সিন্যাপ্স ডাটা প্রসেস হচ্ছে..." : "ইনপুট গ্রহণের জন্য প্রস্তুত।"}
                  </p>
                </div>
              </div>

              {/* Advanced Parameters Slider */}
              <div className="space-y-3 pt-3 border-t border-slate-900">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1">
                    <Sliders className="h-3.5 w-3.5 text-violet-400" /> AI Temperature:
                  </span>
                  <span className="font-mono text-cyan-400 font-bold">
                    {temperature} ({temperature <= 0.4 ? "সংক্ষিপ্ত" : temperature <= 0.8 ? "ভারসাম্য" : "সৃজনশীল"})
                  </span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="1.0"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-violet-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                />
                <p className="text-[9px] text-slate-500 leading-relaxed">
                  কম তাপমাত্রা উত্তরকে সংক্ষিপ্ত ও তথ্যবহুল করে। বেশি তাপমাত্রা উত্তরকে বর্ণনামূলক করে তোলে।
                </p>
              </div>

              {/* Quick Prompt Selector */}
              <div className="space-y-2.5 pt-3 border-t border-slate-900">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5 text-cyan-400" /> নমুনা প্রশ্নসমূহ
                </span>
                <div className="space-y-2">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => applyPrompt(prompt)}
                      className="w-full rounded-2xl border border-slate-900 bg-slate-900/40 px-4 py-3 text-left text-xs font-medium text-slate-300 hover:text-white hover:border-violet-500/40 hover:bg-slate-900 transition-all cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Neural Execution Terminal Logs */}
            <div className="rounded-[2rem] border border-slate-800 bg-slate-950 p-5 shadow-glow text-white space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold pb-2 border-b border-slate-900">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Terminal className="h-3.5 w-3.5 text-cyan-400" /> Synaptic Terminal logs
                </span>
                <span className="inline-flex items-center gap-1 rounded bg-slate-900 px-1.5 py-0.5 text-[8px] font-mono text-emerald-400 border border-slate-800">
                  ACTIVE
                </span>
              </div>
              <div className="font-mono text-[9px] text-cyan-300/85 space-y-1.5 max-h-[140px] overflow-y-auto leading-relaxed">
                {neuralLogs.map((log, i) => (
                  <div key={i} className="flex gap-1">
                    <span className="text-slate-600 font-bold">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Panel: Advanced Holographic Chat Console */}
          <div className="rounded-[2.25rem] border border-slate-800 bg-slate-950 shadow-glow overflow-hidden flex flex-col justify-between text-white min-h-[640px]">
            
            {/* Console Header */}
            <div className="flex items-center justify-between gap-3 border-b border-slate-900 px-6 py-4 bg-slate-950/80 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <h2 className="text-base font-bold text-white">Quantum Chat Terminal</h2>
                  <p className="text-[10px] text-slate-400">Secure end-to-end AI channel active</p>
                </div>
              </div>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                ড্যাশবোর্ড
              </Link>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-4 max-h-[50vh] bg-slate-950">
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
                      <div className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-violet-500/20 bg-slate-900 text-violet-400 shadow-soft">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}

                    <div
                      className={cn(
                        "max-w-[92%] md:max-w-[80%] rounded-[1.5rem] px-5 py-4 text-xs md:text-sm leading-relaxed shadow-soft border transition-all",
                        isUser
                          ? "bg-gradient-to-br from-violet-600 to-indigo-700 text-white border-violet-500/30"
                          : "bg-slate-900/60 border-slate-800 text-slate-100"
                      )}
                    >
                      <div className="mb-2 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                        {isUser ? (
                          <>
                            <UserRound className="h-3 w-3 text-indigo-400" />
                            USER (YOU)
                          </>
                        ) : (
                          <>
                            <Bot className="h-3 w-3 text-violet-400" />
                            SOHAYOK SUPER AI
                          </>
                        )}
                      </div>
                      <div className="whitespace-pre-wrap leading-relaxed font-sans">
                        {text ||
                          (isAssistant && index === chat.messages.length - 1 && isBusy
                            ? "শ্লেষাত্মক ডাটা ট্রান্সমিশন হচ্ছে..."
                            : "")}
                      </div>
                    </div>

                    {isUser && (
                      <div className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 shadow-soft">
                        <UserRound className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {isBusy && (
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl border border-violet-500/20 bg-slate-900 text-violet-400 shadow-soft">
                    <LoaderCircle className="h-4 w-4 animate-spin text-violet-400" />
                  </div>
                  <div className="rounded-[1.5rem] border border-slate-800 bg-slate-900/30 px-5 py-3 text-xs md:text-sm text-slate-400 shadow-soft">
                    ডাটা অ্যানালাইসিস চলছে...
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Chat Controller Form */}
            <form onSubmit={handleSubmit} className="border-t border-slate-900 bg-slate-950 p-4 md:p-6">
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
                  className="min-h-24 rounded-2xl border-slate-900 bg-slate-900/30 px-4 py-4 text-sm text-white placeholder-slate-500 focus:border-violet-500/50 focus:ring-violet-500/10 focus:bg-slate-900/50 resize-none font-sans"
                />
                
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[10px] text-slate-500">
                    Enter চাপলে সরাসরি সেন্ড হবে, Shift+Enter দিলে নতুন লাইন হবে।
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-xl border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer px-3.5 py-2 text-xs"
                      onClick={() => {
                        chat.clearError();
                        chat.setMessages(INITIAL_MESSAGES);
                        setDraft("");
                        setNeuralLogs([
                          "AI core memory buffer cleared.",
                          "Initialized welcoming parameters."
                        ]);
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      ক্লিয়ার
                    </Button>
                    <Button
                      type="submit"
                      className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-soft px-5 py-2 text-xs md:text-sm font-semibold hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                      disabled={!draft.trim() || isBusy}
                    >
                      {isBusy ? (
                        <LoaderCircle className="h-3.5 w-3.5 animate-spin mr-1" />
                      ) : (
                        <Send className="h-3.5 w-3.5 mr-1" />
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
