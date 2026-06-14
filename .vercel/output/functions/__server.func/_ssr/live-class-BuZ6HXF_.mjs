import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { j as useUser, k as liveClasses, A as AppShell } from "./router-9Ny0xRmp.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__database.mjs";
import "../_libs/firebase__functions.mjs";
import { a8 as Camera, g as Users, a9 as CalendarDays, aa as MessageSquare, C as Clock3 } from "../_libs/lucide-react.mjs";
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
function LiveClass() {
  const user = useUser();
  const currentRoom = liveClasses.find((room) => room.classLevel === user.class) ?? liveClasses[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-8 py-6 md:py-8 max-w-7xl mx-auto space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "সরাসরি ক্লাসরুম" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold", children: "লাইভ ভিডিও ক্লাস" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "ক্লাসে ঢুকো, প্রশ্ন করো, আর শিক্ষককে সঙ্গে নিয়ে রিয়েল-টাইমে শিখো।" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://meet.jit.si/${currentRoom.room}`, target: "_blank", rel: "noreferrer", className: "px-5 py-3 rounded-2xl bg-gradient-hero text-white font-semibold shadow-soft hover:shadow-glow flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" }),
        " লাইভ রুমে ঢুকো"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid lg:grid-cols-[1.35fr_0.85fr] gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-[2rem] overflow-hidden shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-hero text-white p-5 md:p-6 flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm/6 opacity-85", children: "চলতি রুম" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold", children: [
              "শ্রেণি ",
              currentRoom.classLevel,
              " · ",
              currentRoom.title
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-90 mt-1", children: currentRoom.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm bg-white/15 backdrop-blur px-3 py-2 rounded-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: currentRoom.time }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "opacity-85", children: currentRoom.teacher })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { title: `শ্রেণি ${currentRoom.classLevel} লাইভ ক্লাস রুম`, src: `https://meet.jit.si/${currentRoom.room}`, className: "w-full h-[620px] border-0 bg-background", allow: "camera; microphone; fullscreen; display-capture; autoplay; clipboard-read; clipboard-write", allowFullScreen: true, loading: "lazy" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-lg flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-primary" }),
            " লাইভ রুমের নিয়ম"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• শিক্ষক বলার আগে মাইক মিউট রাখো।" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• ছোট প্রশ্ন ও উত্তর চ্যাটে দাও।" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• পুরো ক্লাস থাকলে প্র্যাকটিস পয়েন্ট পাওয়া যাবে।" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-lg flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-5 h-5 text-brand-blue" }),
            " সাপ্তাহিক লাইভ ক্লাস"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: liveClasses.map((room) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl p-4 ${room.classLevel === currentRoom.classLevel ? "bg-muted/60" : "bg-card"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold", children: [
                "শ্রেণি ",
                room.classLevel
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: room.time })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-1", children: room.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: room.teacher }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `https://meet.jit.si/${room.room}`, target: "_blank", rel: "noreferrer", className: "text-primary font-semibold hover:underline", children: "এই রুমে ঢুকো" })
            ] })
          ] }, room.room)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-lg flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-5 h-5 text-brand-orange" }),
            " শিক্ষার্থীদের টিপস"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { className: "w-4 h-4 mt-0.5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "৫ মিনিট আগে ঢুকো, খাতা-কলম রাখো, আর ক্লাস শেষে কুইজ পেজে রিভিশন করো।" })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  LiveClass as component
};
