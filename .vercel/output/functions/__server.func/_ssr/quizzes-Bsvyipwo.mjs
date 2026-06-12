import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppShell } from "./AppShell-C4H10nur.mjs";
import { q as quizBank } from "./bangladesh-learning-B2a6UQS-.mjs";
import { u as useUser, R as Route$g, a as awardXp } from "./router-D2rIulYA.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import { R as RotateCcw, S as Sparkles, T as Trophy, C as Check, X } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "node:crypto";
import "node:process";
import "../_libs/ai-sdk__openai-compatible.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/zod.mjs";
import "../_libs/ai.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/vercel__oidc.mjs";
import "path";
import "fs";
import "os";
import "../_libs/opentelemetry__api.mjs";
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
function Quizzes() {
  const user = useUser();
  const search = Route$g.useSearch();
  const [selectedClass, setSelectedClass] = reactExports.useState(search.class ?? user.class);
  const [questionIndex, setQuestionIndex] = reactExports.useState(0);
  const [picked, setPicked] = reactExports.useState(null);
  const [score, setScore] = reactExports.useState(0);
  const [done, setDone] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (search.class && search.class !== selectedClass) {
      setSelectedClass(search.class);
    }
  }, [search.class]);
  const questions = quizBank.filter((q) => q.classLevel === selectedClass);
  const question = questions[questionIndex];
  reactExports.useEffect(() => {
    setQuestionIndex(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  }, [selectedClass]);
  if (!question) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 md:px-8 py-10 max-w-2xl mx-auto text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "প্রশ্ন পাওয়া যায়নি" }) }) });
  }
  const choose = (idx) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === question.answer) setScore((current) => current + 1);
  };
  const next = () => {
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex((current) => current + 1);
      setPicked(null);
      return;
    }
    awardXp(score * 25, score * 8);
    setDone(true);
  };
  const restart = () => {
    setQuestionIndex(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };
  if (done) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-8 py-10 max-w-2xl mx-auto text-center space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-7xl animate-float", children: "🏆" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl font-bold", children: [
        "শ্রেণি ",
        selectedClass,
        " কুইজ শেষ!"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
        "তুমি ",
        score,
        " / ",
        questions.length,
        " পেয়েছ।"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-3xl p-8 inline-flex flex-col items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-5xl font-bold gradient-text", children: [
          "+",
          score * 25,
          " XP"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
          "+",
          score * 8,
          " কয়েন পাওয়া গেছে"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: restart, className: "px-6 py-3 rounded-2xl bg-gradient-hero text-white font-semibold shadow-soft inline-flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }),
        " আবার খেলো"
      ] }) })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-8 py-6 md:py-8 max-w-3xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl md:text-3xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-6 h-6 text-primary" }),
          " ১০০টি শ্রেণিভিত্তিক কুইজ"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4 text-brand-orange" }),
          " ",
          score,
          "/",
          questions.length
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((classLevel) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelectedClass(classLevel), className: `px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedClass === classLevel ? "bg-gradient-hero text-white shadow-soft" : "glass hover:shadow-soft"}`, children: [
        "শ্রেণি ",
        classLevel
      ] }, classLevel)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "তুমি এখন শ্রেণি ",
        selectedClass,
        "-এ আছো। এই শ্রেণির ২০টি প্রশ্ন শেষ করো, তারপর অন্য শ্রেণি বেছে পুরো ব্যাংক ঘুরে দেখো।"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-gradient-hero transition-all", style: {
      width: `${(questionIndex + 1) / questions.length * 100}%`
    } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-3xl p-6 md:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-2", children: [
        question.subject,
        " · শ্রেণি ",
        selectedClass,
        " · প্রশ্ন ",
        questionIndex + 1,
        " / ",
        questions.length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-6", children: question.prompt }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: question.options.map((opt, idx) => {
        const isPicked = picked === idx;
        const isCorrect = idx === question.answer;
        const reveal = picked !== null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => choose(idx), disabled: reveal, className: `w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${reveal && isCorrect ? "border-brand-green bg-brand-green/10" : reveal && isPicked && !isCorrect ? "border-destructive bg-destructive/10" : "border-border hover:border-primary hover:bg-muted/60"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: opt }),
          reveal && isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-brand-green" }),
          reveal && isPicked && !isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 text-destructive" })
        ] }, opt);
      }) }),
      picked !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 p-4 rounded-2xl bg-muted/60 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: picked === question.answer ? "দারুণ! 🎉" : "এবার হয়নি —" }),
        " ",
        question.explain
      ] })
    ] }),
    picked !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: next, className: "w-full px-6 py-3.5 rounded-2xl bg-gradient-hero text-white font-semibold shadow-soft hover:shadow-glow", children: questionIndex + 1 < questions.length ? "পরের প্রশ্ন →" : "কুইজ শেষ করো" })
  ] }) });
}
export {
  Quizzes as component
};
