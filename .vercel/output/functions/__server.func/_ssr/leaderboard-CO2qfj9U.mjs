import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppShell } from "./AppShell-C4H10nur.mjs";
import { u as useUser } from "./router-D2rIulYA.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import { o as Crown, p as Medal } from "../_libs/lucide-react.mjs";
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
const BOARD = [{
  name: "Sumaiya",
  avatar: "🦄",
  xp: 3450,
  badge: "গণিত চ্যাম্পিয়ন"
}, {
  name: "Rafi",
  avatar: "🐯",
  xp: 2980,
  badge: "বিজ্ঞান অভিযাত্রী"
}, {
  name: "Mira",
  avatar: "🐼",
  xp: 2510,
  badge: "পড়ার নায়ক"
}, {
  name: "Ayan",
  avatar: "🐧",
  xp: 1980,
  badge: "কুইজ মাস্টার"
}, {
  name: "Tania",
  avatar: "🦊",
  xp: 1700,
  badge: "বানান তারকা"
}];
function Leaderboard() {
  const user = useUser();
  const merged = [...BOARD, {
    name: `${user.name} (তুমি)`,
    avatar: user.avatar,
    xp: user.xp,
    badge: "তুমি"
  }].sort((a, b) => b.xp - a.xp);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-8 py-6 md:py-8 max-w-3xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-12 h-12 mx-auto text-brand-orange mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold", children: "শ্রেণি লিডারবোর্ড" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "এই সপ্তাহের সেরা শিক্ষার্থীরা" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-strong rounded-3xl p-2 space-y-1", children: merged.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-4 p-4 rounded-2xl ${row.name.includes("(তুমি)") ? "bg-gradient-hero text-white shadow-soft" : "hover:bg-muted/60"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-9 h-9 rounded-full grid place-items-center font-bold ${idx === 0 ? "bg-brand-yellow text-foreground" : idx === 1 ? "bg-muted-foreground/30" : idx === 2 ? "bg-brand-orange/40" : "bg-muted"}`, children: idx + 1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl", children: row.avatar }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: row.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-xs ${row.name.includes("(তুমি)") ? "opacity-80" : "text-muted-foreground"}`, children: row.badge })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { className: "w-4 h-4" }),
        " ",
        row.xp.toLocaleString()
      ] })
    ] }, row.name)) })
  ] }) });
}
export {
  Leaderboard as component
};
