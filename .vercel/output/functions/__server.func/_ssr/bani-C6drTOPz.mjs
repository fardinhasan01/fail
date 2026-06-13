import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useChat } from "../_libs/ai-sdk__react.mjs";
import { D as DefaultChatTransport } from "../_libs/ai.mjs";
import { A as AppShell, h as cn } from "./router-DlWKGgSZ.mjs";
import { B as Button } from "./button-BNTPPjbu.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__database.mjs";
import "../_libs/firebase__functions.mjs";
import { S as Sparkles, Z as Zap, m as Brain, aJ as Cpu, aK as Bot, aL as SlidersVertical, a7 as MessageSquare, aM as Terminal, aN as ArrowLeft, aO as UserRound, $ as LoaderCircle, aP as Trash2, aH as Send } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "stream";
import "util";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/throttleit.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/zod.mjs";
import "../_libs/vercel__oidc.mjs";
import "path";
import "fs";
import "os";
import "../_libs/opentelemetry__api.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "node:crypto";
import "node:process";
import "../_libs/ai-sdk__openai-compatible.mjs";
import "../_libs/firebase__component.mjs";
import "../_libs/idb.mjs";
import "../_libs/firebase__webchannel-wrapper.mjs";
import "../_libs/@grpc/grpc-js.mjs";
import "process";
import "tls";
import "net";
import "events";
import "http2";
import "http";
import "url";
import "dns";
import "zlib";
import "../_libs/@grpc/proto-loader.mjs";
import "../_libs/lodash.camelcase.mjs";
import "../_libs/protobufjs.mjs";
import "../_libs/protobufjs__aspromise.mjs";
import "../_libs/protobufjs__base64.mjs";
import "../_libs/protobufjs__eventemitter.mjs";
import "../_libs/protobufjs__float.mjs";
import "../_libs/@protobufjs/inquire.mjs";
import "../_libs/protobufjs__utf8.mjs";
import "../_libs/protobufjs__pool.mjs";
import "../_libs/long.mjs";
import "../_libs/protobufjs__codegen.mjs";
import "../_libs/protobufjs__fetch.mjs";
import "../_libs/protobufjs__path.mjs";
import "../_libs/faye-websocket.mjs";
import "../_libs/websocket-driver.mjs";
import "../_libs/safe-buffer.mjs";
import "buffer";
import "../_libs/http-parser-js.mjs";
import "../_libs/websocket-extensions.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const INITIAL_MESSAGES = [{
  id: "welcome",
  role: "assistant",
  parts: [{
    type: "text",
    text: "আমি E-পাঠশালা সহায়িকা সুপার AI Core v3.5। তোমার প্রশ্ন টাইপ করো, আমি সেকেন্ডের মধ্যে সমাধান দিচ্ছি।"
  }]
}];
const QUICK_PROMPTS = ["গণিতে ভগ্নাংশ কী এবং এর বাস্তব ব্যবহার?", "বাংলা ব্যাকরণে কারক ও বিভক্তি চেনার সহজ উপায়?", "বাংলাদেশের স্বাধীনতায় বঙ্গবন্ধুর ৭ই মার্চের গুরুত্ব?", "কীভাবে দ্রুত নামতা মুখস্থ করব?"];
function SupportAi() {
  const [draft, setDraft] = reactExports.useState("");
  const [temperature, setTemperature] = reactExports.useState(0.7);
  const [latency, setLatency] = reactExports.useState(140);
  const [neuralLogs, setNeuralLogs] = reactExports.useState(["System Initialized. Status: Online", "Loaded Bangla NLP Grammar Engine v4.1.", "Awaiting user neural input..."]);
  const bottomRef = reactExports.useRef(null);
  const chat = useChat({
    transport: reactExports.useMemo(() => new DefaultChatTransport({
      api: "/api/chat"
    }), []),
    messages: INITIAL_MESSAGES
  });
  reactExports.useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  }, [chat.messages, chat.status]);
  reactExports.useEffect(() => {
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
    setNeuralLogs((prev) => [...prev.slice(-6), `User query: "${question.substring(0, 25)}..."`, "Routing to OpenAI via OpenRouter...", "Synthesizing semantic response..."]);
    await chat.sendMessage({
      text: question
    });
    setNeuralLogs((prev) => [...prev.slice(-6), "Response stream received successfully."]);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    await submitQuestion();
  }
  function applyPrompt(prompt) {
    setDraft(prompt);
    setNeuralLogs((prev) => [...prev.slice(-6), `Quick prompt loaded: "${prompt.substring(0, 20)}..."`]);
  }
  function extractText(message) {
    return message.parts.map((part) => part.type === "text" ? part.text : "").join("").trim();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-8 py-6 md:py-8 max-w-7xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "rounded-[2.25rem] border border-violet-500/20 bg-slate-950 text-white shadow-glow overflow-hidden relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-15" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-radial-gradient(circle_at_top_right,rgba(139,92,246,0.18),transparent_50%)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8 lg:p-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/50 px-4 py-2 text-xs md:text-sm font-semibold text-violet-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-violet-400 animate-pulse" }),
            "QUANTUM NLP CORE V3.5 ENABLED"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent", children: "Sohayok AI System" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-2xl text-xs md:text-sm text-slate-300 leading-relaxed", children: "পড়াশোনার যেকোনো জটিল বিষয়কে সহজ করতে প্রস্তুত সুপার কম্পিউটিং এআই। এটি এখন আরও দ্রুত এবং সমৃদ্ধ। বাংলা ও ইংরেজিতে প্রশ্ন লিখে মুহূর্তেই রিয়েল-টাইম জেনারেটিভ উত্তর নাও।" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 text-[10px] md:text-xs font-semibold text-slate-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3 text-yellow-400" }),
              " Low Latency"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-3 w-3 text-purple-400" }),
              " Advanced Reasoning"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-3 w-3 text-cyan-400" }),
              " GPT-4o-Mini Engine"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 grid-cols-2", children: [{
          label: "Core Model",
          value: "GPT-4o-Mini",
          color: "text-violet-400"
        }, {
          label: "Latency",
          value: `${latency} ms`,
          color: "text-cyan-400"
        }, {
          label: "Bandwidth Status",
          value: "Optimal",
          color: "text-emerald-400"
        }, {
          label: "Synapse Speed",
          value: "99.8 TFLOPS",
          color: "text-indigo-400"
        }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-soft backdrop-blur-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.18em] text-slate-400", children: item.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("mt-1 text-base md:text-lg font-black", item.color), children: item.value })
        ] }, item.label)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-5 lg:grid-cols-[0.85fr_1.15fr] items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-4 lg:sticky lg:top-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] border border-slate-800 bg-slate-950 p-6 shadow-glow text-white space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-12 w-12 items-center justify-center shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("absolute inset-0 rounded-full blur-md opacity-60 transition-all duration-500", isBusy ? "bg-violet-500 animate-pulse scale-110" : "bg-cyan-500") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative grid h-10 w-10 place-items-center rounded-full bg-slate-900 border border-slate-800 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: cn("h-5 w-5", isBusy ? "text-violet-400 animate-spin" : "text-cyan-400") }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent", children: "AI Core Visualizer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400", children: isBusy ? "সিন্যাপ্স ডাটা প্রসেস হচ্ছে..." : "ইনপুট গ্রহণের জন্য প্রস্তুত।" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-3 border-t border-slate-900", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-slate-300 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersVertical, { className: "h-3.5 w-3.5 text-violet-400" }),
                " AI Temperature:"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-cyan-400 font-bold", children: [
                temperature,
                " (",
                temperature <= 0.4 ? "সংক্ষিপ্ত" : temperature <= 0.8 ? "ভারসাম্য" : "সৃজনশীল",
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: "0.2", max: "1.0", step: "0.1", value: temperature, onChange: (e) => setTemperature(parseFloat(e.target.value)), className: "w-full accent-violet-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-slate-500 leading-relaxed", children: "কম তাপমাত্রা উত্তরকে সংক্ষিপ্ত ও তথ্যবহুল করে। বেশি তাপমাত্রা উত্তরকে বর্ণনামূলক করে তোলে।" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 pt-3 border-t border-slate-900", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-3.5 w-3.5 text-cyan-400" }),
              " নমুনা প্রশ্নসমূহ"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: QUICK_PROMPTS.map((prompt) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => applyPrompt(prompt), className: "w-full rounded-2xl border border-slate-900 bg-slate-900/40 px-4 py-3 text-left text-xs font-medium text-slate-300 hover:text-white hover:border-violet-500/40 hover:bg-slate-900 transition-all cursor-pointer", children: prompt }, prompt)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] border border-slate-800 bg-slate-950 p-5 shadow-glow text-white space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs font-semibold pb-2 border-b border-slate-900", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-slate-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "h-3.5 w-3.5 text-cyan-400" }),
              " Synaptic Terminal logs"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 rounded bg-slate-900 px-1.5 py-0.5 text-[8px] font-mono text-emerald-400 border border-slate-800", children: "ACTIVE" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-cyan-300/85 space-y-1.5 max-h-[140px] overflow-y-auto leading-relaxed", children: neuralLogs.map((log, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600 font-bold", children: ">" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: log })
          ] }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2.25rem] border border-slate-800 bg-slate-950 shadow-glow overflow-hidden flex flex-col justify-between text-white min-h-[640px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 border-b border-slate-900 px-6 py-4 bg-slate-950/80 backdrop-blur-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-white", children: "Quantum Chat Terminal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400", children: "Secure end-to-end AI channel active" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
            "ড্যাশবোর্ড"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-4 max-h-[50vh] bg-slate-950", children: [
          chat.messages.map((message, index) => {
            const text = extractText(message);
            const isUser = message.role === "user";
            const isAssistant = message.role === "assistant";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex gap-3", isUser ? "justify-end" : "justify-start"), children: [
              !isUser && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-violet-500/20 bg-slate-900 text-violet-400 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("max-w-[92%] md:max-w-[80%] rounded-[1.5rem] px-5 py-4 text-xs md:text-sm leading-relaxed shadow-soft border transition-all", isUser ? "bg-gradient-to-br from-violet-600 to-indigo-700 text-white border-violet-500/30" : "bg-slate-900/60 border-slate-800 text-slate-100"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-slate-400", children: isUser ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "h-3 w-3 text-indigo-400" }),
                  "USER (YOU)"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-3 w-3 text-violet-400" }),
                  "SOHAYOK SUPER AI"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "whitespace-pre-wrap leading-relaxed font-sans", children: text || (isAssistant && index === chat.messages.length - 1 && isBusy ? "শ্লেষাত্মক ডাটা ট্রান্সমিশন হচ্ছে..." : "") })
              ] }),
              isUser && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "h-4 w-4" }) })
            ] }, message.id);
          }),
          isBusy && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-xl border border-violet-500/20 bg-slate-900 text-violet-400 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-violet-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-[1.5rem] border border-slate-800 bg-slate-900/30 px-5 py-3 text-xs md:text-sm text-slate-400 shadow-soft", children: "ডাটা অ্যানালাইসিস চলছে..." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit, className: "border-t border-slate-900 bg-slate-950 p-4 md:p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: draft, onChange: (event) => setDraft(event.target.value), onKeyDown: (event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void submitQuestion();
            }
          }, placeholder: "তোমার প্রশ্নের কোয়েরি এখানে লিখো...", className: "min-h-24 rounded-2xl border-slate-900 bg-slate-900/30 px-4 py-4 text-sm text-white placeholder-slate-500 focus:border-violet-500/50 focus:ring-violet-500/10 focus:bg-slate-900/50 resize-none font-sans" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-500", children: "Enter চাপলে সরাসরি সেন্ড হবে, Shift+Enter দিলে নতুন লাইন হবে।" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", className: "rounded-xl border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer px-3.5 py-2 text-xs", onClick: () => {
                chat.clearError();
                chat.setMessages(INITIAL_MESSAGES);
                setDraft("");
                setNeuralLogs(["AI core memory buffer cleared.", "Initialized welcoming parameters."]);
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                "ক্লিয়ার"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: "rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-soft px-5 py-2 text-xs md:text-sm font-semibold hover:opacity-90 active:scale-95 transition-all cursor-pointer", disabled: !draft.trim() || isBusy, children: [
                isBusy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin mr-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-3.5 w-3.5 mr-1" }),
                isBusy ? "প্রসেসিং" : "কোয়েরি সেন্ড"
              ] })
            ] })
          ] })
        ] }) })
      ] })
    ] })
  ] }) });
}
export {
  SupportAi as component
};
