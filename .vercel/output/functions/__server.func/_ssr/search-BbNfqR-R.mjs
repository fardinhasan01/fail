import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { e as ensureEcosystemSeed, i as searchCatalog, A as AppShell } from "./router-DlWKGgSZ.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__database.mjs";
import "../_libs/firebase__functions.mjs";
import { h as Search, S as Sparkles, d as University, g as Users, T as Trophy, e as BookOpen } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
function SearchPage() {
  ensureEcosystemSeed();
  const [query, setQuery] = reactExports.useState("");
  const results = reactExports.useMemo(() => searchCatalog(query), [query]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8 md:py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass-strong rounded-[2rem] p-6 md:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-3 py-1.5 text-xs font-semibold text-brand-blue", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-3.5 w-3.5" }),
            " Advanced Search Engine"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold md:text-5xl", children: "Search schools, students, books, competitions and more" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-3xl text-sm leading-6 text-muted-foreground md:text-base", children: "Instant suggestions across the full ecosystem. Find exactly what you need with one query." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Results", value: results.length.toString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Scope", value: "Global" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 rounded-[2rem] border border-input bg-background px-4 py-4 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: query, onChange: (event) => setQuery(event.target.value), placeholder: "Search schools, students, books, competition titles, teachers, notes, projects...", className: "w-full bg-transparent text-base outline-none" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 lg:grid-cols-[1.1fr_0.9fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-[2rem] p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Instant results" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: results.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: item.href, className: "block rounded-3xl border border-border bg-background/80 p-4 transition-all hover:bg-muted/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-11 w-11 place-items-center rounded-2xl bg-gradient-hero text-white", children: iconForType(item.type) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: item.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: item.subtitle })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green", children: item.type })
        ] }) }, `${item.type}-${item.title}`)) }),
        results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-3xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground", children: "No matches yet. Try school name, student name, book topic, or competition category." }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Search suggestions" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: ["Dhaka Residential", "EP-2026", "Fahim Hasan", "Science Fair", "Class 8 book", "Debate"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setQuery(item), className: "rounded-full bg-brand-orange/10 px-3 py-2 text-xs font-semibold text-brand-orange", children: item }, item)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(University, { className: "h-5 w-5 text-brand-blue" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Supported scopes" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2 text-sm leading-6 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Schools and profiles" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Students and ID cards" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Books and library shelves" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Competitions and rankings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Teachers, notes and projects" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 gap-3 text-xs font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { label: "Books" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { label: "Students" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { label: "Schools" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { label: "Competitions" })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
function Metric({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-white/70 bg-white/80 p-4 text-center shadow-soft backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xl font-bold", children: value })
  ] });
}
function Badge({
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-brand-orange/10 px-3 py-2 text-center text-brand-orange", children: label });
}
function iconForType(type) {
  if (type === "School") return /* @__PURE__ */ jsxRuntimeExports.jsx(University, { className: "h-5 w-5" });
  if (type === "Student") return /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5" });
  if (type === "Competition") return /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5" });
}
export {
  SearchPage as component
};
