import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppShell, h as cn } from "./router-9Ny0xRmp.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__database.mjs";
import "../_libs/firebase__functions.mjs";
import { O as Gamepad2, S as Sparkles, e as BookOpen, Y as RefreshCw, _ as Expand, E as ExternalLink } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
const GAMES = [{
  id: "runbd",
  name: "Bangla Run (RunBD)",
  url: "https://runbd.netlify.app",
  description: "দৌড়াও এবং বাংলা শেখো! একটি মজার ও শিক্ষামূলক রানার গেম।",
  icon: Gamepad2,
  gradient: "from-pink-500 via-rose-500 to-red-500"
}, {
  id: "alphabet-adventure",
  name: "Alphabet Adventure Land",
  url: "https://alphabet-adventure-land--tahsinnurtonoy2.replit.app",
  description: "ইংরেজি বর্ণমালার রোমাঞ্চকর জগৎ! খেলো আর শেখো অক্ষরের জাদু।",
  icon: Sparkles,
  gradient: "from-blue-500 via-indigo-500 to-violet-500"
}, {
  id: "bangla-kids-learn",
  name: "Bangla Kids Learn",
  url: "https://bangla-kids-learn--abulbasar8290.replit.app",
  description: "ছোট সোনামণিদের জন্য সহজ ও আকর্ষণীয় উপায়ে বাংলা বর্ণমালা ও শব্দ শেখা।",
  icon: BookOpen,
  gradient: "from-emerald-500 via-teal-500 to-cyan-500"
}];
function SpecialGamePage() {
  const [selectedGame, setSelectedGame] = reactExports.useState(GAMES[0]);
  const [refreshKey, setRefreshKey] = reactExports.useState(0);
  const frameWrapRef = reactExports.useRef(null);
  async function enterFullscreen() {
    if (!frameWrapRef.current?.requestFullscreen) return;
    await frameWrapRef.current.requestFullscreen().catch(() => {
    });
  }
  function handleRefresh() {
    setRefreshKey((prev) => prev + 1);
  }
  selectedGame.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-8 py-6 md:py-8 max-w-7xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "glass-strong rounded-[2rem] p-6 md:p-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Gamepad2, { className: "h-3.5 w-3.5 text-brand-orange" }),
          " special games"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-5xl font-bold", children: "মজার স্পেশাল গেমস" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-2xl text-sm md:text-base text-muted-foreground", children: "খেলে খেলে শেখার এক দারুণ আনন্দ! নিচের গেমগুলো সরাসরি ই-পাঠশালাতেই খেলো।" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleRefresh, className: "inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 font-semibold hover:bg-muted/70 cursor-pointer transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
          "রিলোড গেম"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => void enterFullscreen(), className: "inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-3 font-semibold text-white shadow-soft cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Expand, { className: "h-4 w-4" }),
          "ফুলস্ক্রিন"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: selectedGame.url, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 font-semibold hover:bg-muted/70 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" }),
          "নতুন ট্যাবে খেলো"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-3", children: GAMES.map((game) => {
      const GameIcon = game.icon;
      const isSelected = game.id === selectedGame.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
        setSelectedGame(game);
        setRefreshKey(0);
      }, className: cn("relative overflow-hidden text-left p-5 rounded-[2rem] border transition-all duration-300 shadow-soft cursor-pointer flex flex-col justify-between min-h-[140px]", isSelected ? "bg-white border-primary shadow-glow ring-2 ring-primary/20 scale-[1.02]" : "bg-white/70 border-border hover:bg-white hover:border-muted-foreground/30 hover:scale-[1.01]"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-2xl opacity-10 bg-gradient-to-br transition-all duration-300", game.gradient) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-base md:text-lg tracking-tight", children: game.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: game.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("p-3 rounded-2xl bg-gradient-to-br text-white shrink-0", game.gradient), children: /* @__PURE__ */ jsxRuntimeExports.jsx(GameIcon, { className: "h-5 w-5" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-1.5 text-xs font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("w-2 h-2 rounded-full animate-pulse", isSelected ? "bg-emerald-500" : "bg-muted-foreground/30") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: isSelected ? "text-primary font-bold" : "text-muted-foreground font-normal", children: isSelected ? "বর্তমানে চলছে" : "খেলতে ক্লিক করো" })
        ] })
      ] }, game.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref: frameWrapRef, className: "relative overflow-hidden rounded-[2rem] border border-border bg-black shadow-soft transition-all duration-300", style: {
      minHeight: "calc(100vh - 220px)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-hero z-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { src: selectedGame.url, title: selectedGame.name, className: "block h-[calc(100vh-220px)] w-full bg-black", allow: "fullscreen; autoplay; clipboard-read; clipboard-write", allowFullScreen: true, referrerPolicy: "no-referrer" }, refreshKey)
    ] })
  ] }) });
}
export {
  SpecialGamePage as component
};
