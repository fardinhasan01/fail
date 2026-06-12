import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useChat } from "../_libs/ai-sdk__react.mjs";
import { D as DefaultChatTransport } from "../_libs/ai.mjs";
import { A as AppShell, c as cn } from "./AppShell-C4H10nur.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import { S as Sparkles, a8 as Bot, a9 as Trash2, aa as ArrowLeft, ab as UserRound, L as LoaderCircle, a2 as Send } from "../_libs/lucide-react.mjs";
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
import "./router-D2rIulYA.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "node:crypto";
import "node:process";
import "../_libs/ai-sdk__openai-compatible.mjs";
import "../_libs/firebase__util.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
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
    text: "আমি E-পাঠশালা সহায়ক AI. তোমার প্রশ্ন লিখো, আমি সংক্ষেপে উত্তর দেব।"
  }]
}];
const QUICK_PROMPTS = ["গণিতে ভগ্নাংশ কী?", "বাংলা ব্যাকরণে বিশেষ্য কী?", "বাংলাদেশের রাজধানী কোনটি?", "কীভাবে দ্রুত multiplication শিখব?"];
function SupportAi() {
  const [draft, setDraft] = reactExports.useState("");
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
  const isBusy = chat.status === "submitted" || chat.status === "streaming";
  async function submitQuestion() {
    const question = draft.trim();
    if (!question || isBusy) return;
    setDraft("");
    await chat.sendMessage({
      text: question
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    await submitQuestion();
  }
  function applyPrompt(prompt) {
    setDraft(prompt);
  }
  function extractText(message) {
    return message.parts.map((part) => part.type === "text" ? part.text : "").join("").trim();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-8 py-6 md:py-8 max-w-7xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "rounded-[2.25rem] border border-white/60 bg-[linear-gradient(135deg,#fff8e7_0%,#fff0dc_42%,#eaf6ff_100%)] shadow-soft overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8 lg:p-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-semibold shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-brand-orange" }),
          "OpenAI-powered question answerer"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-5xl font-bold tracking-tight", children: "E-পাঠশালা সহায়ক AI" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-2xl text-sm md:text-base text-muted-foreground leading-7", children: "এটি এখন আর embedded website নয়. এখানে তুমি সরাসরি প্রশ্ন করবে, আর OpenAI থেকে দ্রুত, সংক্ষিপ্ত উত্তর পাবে।" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 text-xs md:text-sm font-medium text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-white/90 px-3 py-2 shadow-soft", children: "শুধু প্রশ্ন করো" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-white/90 px-3 py-2 shadow-soft", children: "Bangla + English" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-white/90 px-3 py-2 shadow-soft", children: "Streaming answers" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2", children: [{
        label: "চালু AI",
        value: "OpenAI"
      }, {
        label: "ফোকাস",
        value: "Question & answer"
      }, {
        label: "ফরম্যাট",
        value: "Short replies"
      }, {
        label: "পৃষ্ঠা",
        value: "E-পাঠশালা"
      }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[1.5rem] bg-white/90 border border-white/70 p-4 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: item.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-lg font-bold", children: item.value })
      ] }, item.label)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-5 lg:grid-cols-[0.82fr_1.18fr] items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] border border-border bg-white shadow-soft p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-2xl bg-gradient-hero text-white shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "কীভাবে ব্যবহার করবে" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "একটি প্রশ্ন লিখো, আর উত্তর নাও।" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: QUICK_PROMPTS.map((prompt) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => applyPrompt(prompt), className: "w-full rounded-2xl border border-border bg-muted/30 px-4 py-3 text-left text-sm font-medium hover:bg-muted/60 transition-colors", children: prompt }, prompt)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-brand-orange/10 p-4 text-sm leading-6 text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Tip:" }),
            " যদি প্রশ্নটা কঠিন হয়, খুব ছোট করে জিজ্ঞেস করো. আমি সেটাকে সহজ ভাষায় বুঝিয়ে দেব।"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] border border-border bg-white shadow-soft p-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-brand-orange" }),
            "Status"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-2xl bg-muted/40 px-4 py-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Connection" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: isBusy ? "Thinking..." : "Ready" })
          ] }),
          chat.error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive", children: chat.error.message }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-muted/30 px-4 py-3 text-sm text-muted-foreground", children: isBusy ? "উত্তর তৈরি হচ্ছে..." : "নতুন প্রশ্নের জন্য প্রস্তুত।" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", className: "w-full rounded-2xl", onClick: () => {
            chat.clearError();
            chat.setMessages(INITIAL_MESSAGES);
            setDraft("");
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }),
            "Clear chat"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] border border-border bg-white shadow-soft overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 border-b border-border px-5 py-4 bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: "Ask a question" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "একবারে একটি প্রশ্ন লিখলেই হবে।" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted/70 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            "ফিরে যাও"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-h-[60vh] overflow-y-auto px-4 md:px-5 py-5 space-y-4 bg-[radial-gradient(circle_at_top,#fffaf2_0%,#ffffff_42%,#f7fbff_100%)]", children: [
          chat.messages.map((message, index) => {
            const text = extractText(message);
            const isUser = message.role === "user";
            const isAssistant = message.role === "assistant";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex gap-3", isUser ? "justify-end" : "justify-start"), children: [
              !isUser && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-gradient-hero text-white shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("max-w-[92%] md:max-w-[80%] rounded-[1.5rem] px-4 py-3 text-sm leading-7 shadow-sm", isUser ? "bg-gradient-hero text-white" : "bg-white border border-border text-foreground"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] opacity-70", children: isUser ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "h-3.5 w-3.5" }),
                  "You"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-3.5 w-3.5" }),
                  "E-পাঠশালা AI"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "whitespace-pre-wrap", children: text || (isAssistant && index === chat.messages.length - 1 && isBusy ? "..." : "") })
              ] }),
              isUser && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-muted text-foreground shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "h-4 w-4" }) })
            ] }, message.id);
          }),
          isBusy && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-2xl bg-gradient-hero text-white shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-[1.5rem] border border-border bg-white px-4 py-3 text-sm text-muted-foreground shadow-sm", children: "ভাবছি..." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit, className: "border-t border-border bg-white p-4 md:p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: draft, onChange: (event) => setDraft(event.target.value), onKeyDown: (event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void submitQuestion();
            }
          }, placeholder: "তোমার প্রশ্ন এখানে লিখো...", className: "min-h-32 rounded-[1.5rem] border-border bg-muted/20 px-4 py-4 text-base" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Enter চাপলে send হবে, Shift+Enter দিলে নতুন লাইন হবে।" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: "rounded-full px-6", disabled: !draft.trim() || isBusy, children: [
              isBusy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
              isBusy ? "Sending" : "Send question"
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
