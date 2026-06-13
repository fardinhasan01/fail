import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as AppShell, s as subjects } from "./router-DlWKGgSZ.mjs";
import { s as subjectResourceLinks } from "./subject-resource-links-lLLmw7ja.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__database.mjs";
import "../_libs/firebase__functions.mjs";
import { S as Sparkles, E as ExternalLink } from "../_libs/lucide-react.mjs";
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
function Subjects() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-8 py-6 md:py-8 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold", children: "সব বিষয়" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "একটা বিষয় বেছে নাও, তারপর ক্লাস সিলেক্ট করে PDF খুলে ফেলো।" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass-strong rounded-[2rem] p-5 md:p-6 mb-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-brand-orange" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Quick subject buttons" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "These shortcuts open the requested Drive resources without leaving the platform flow." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2 xl:grid-cols-3", children: subjectResourceLinks.map((item) => {
        const subject = subjects.find((entry) => entry.slug === item.slug);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: item.href, target: "_blank", rel: "noreferrer", className: `${subject?.gradient ?? "bg-gradient-hero"} rounded-[1.5rem] p-4 text-white shadow-soft hover:shadow-glow transition-all`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.24em] opacity-80", children: "direct link" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xl font-bold", children: subject?.name ?? item.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm opacity-90", children: item.label })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-white/20 px-3 py-1 text-xs font-semibold", children: [
              subject?.progress ?? 0,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-1.5 rounded-full bg-white/20 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-white", style: {
            width: `${subject?.progress ?? 0}%`
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 inline-flex items-center gap-2 text-sm font-semibold", children: [
            "Open resource",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" })
          ] })
        ] }, item.label);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: subjects.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/subjects/$slug", params: {
      slug: s.slug
    }, className: `${s.gradient} rounded-3xl p-6 text-white shadow-soft hover:shadow-glow hover:scale-[1.02] transition-all`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", children: s.emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-white/20 backdrop-blur px-2.5 py-1 rounded-full font-medium", children: [
          s.progress,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-xl", children: s.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm opacity-80 mt-1 mb-4", children: s.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-white/20 rounded-full overflow-hidden mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-white rounded-full", style: {
        width: `${s.progress}%`
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs opacity-80", children: [
        s.lessons,
        " পাঠ"
      ] })
    ] }, s.slug)) })
  ] }) });
}
export {
  Subjects as component
};
