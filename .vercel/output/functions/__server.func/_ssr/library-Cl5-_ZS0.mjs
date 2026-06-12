import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as AppShell } from "./AppShell-C4H10nur.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import { V as Video, n as CirclePlay, E as ExternalLink } from "../_libs/lucide-react.mjs";
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
import "./router-D2rIulYA.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const youtubeIdFromUrl = (url) => {
  const patterns = [/youtu\.be\/([A-Za-z0-9_-]{11})/i, /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/i, /youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})/i];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return "";
};
const educationalVideos = [{
  title: "বাংলা বর্ণমালা ও পাঠ",
  channel: "শিক্ষামূলক ভিডিও",
  url: "https://youtu.be/48ZRxmIMgNQ?si=eUrEmNz3Z7Lb7tcJ",
  classLevel: 1,
  subject: "বাংলা"
}, {
  title: "গণিতের সহজ ব্যাখ্যা",
  channel: "শিক্ষামূলক ভিডিও",
  url: "https://youtu.be/jaTwx7vUq54?si=i_LWBrGnD-OvtpOL",
  classLevel: 2,
  subject: "গণিত"
}, {
  title: "বিজ্ঞানের মজার ক্লাস",
  channel: "শিক্ষামূলক ভিডিও",
  url: "https://youtu.be/FpoowsMdb_s?si=HLa_JOIfS5Sc14Vb",
  classLevel: 4,
  subject: "বিজ্ঞান"
}, {
  title: "সাধারণ জ্ঞানের ক্লিপ",
  channel: "শিক্ষামূলক ভিডিও",
  url: "https://youtu.be/nSXWaOa566Q?si=Ao7YPhoPTQWfz-R7",
  classLevel: 5,
  subject: "সাধারণ জ্ঞান"
}, {
  title: "দেশ ও সমাজের কথা",
  channel: "শিক্ষামূলক ভিডিও",
  url: "https://youtu.be/Ra3FjOvZ9QY?si=rd6B8FsKKmM_HzuM",
  classLevel: 6,
  subject: "সাধারণ জ্ঞান"
}];
const featuredShorts = [{
  title: "শর্টস: বাংলা শেখা",
  channel: "শিক্ষামূলক শর্টস",
  url: "https://youtube.com/shorts/7ArLIKTaW5Y?si=R2jNPmjM8wZgwHAr",
  classLevel: 1,
  subject: "বাংলা"
}, {
  title: "শর্টস: দ্রুত গণিত",
  channel: "শিক্ষামূলক শর্টস",
  url: "https://youtube.com/shorts/VhbIzWHCS_w?si=NNnT1EDU5wBIVsB7",
  classLevel: 2,
  subject: "গণিত"
}, {
  title: "শর্টস: বিজ্ঞান টিপস",
  channel: "শিক্ষামূলক শর্টস",
  url: "https://youtube.com/shorts/2_6WUHbmjDU?si=3v50CfOG83Z6OOYy",
  classLevel: 3,
  subject: "বিজ্ঞান"
}, {
  title: "শর্টস: সাধারণ জ্ঞান",
  channel: "শিক্ষামূলক শর্টস",
  url: "https://youtube.com/shorts/qino3UWRoLk?si=FqbvhfuKq3484ieV",
  classLevel: 4,
  subject: "সাধারণ জ্ঞান"
}, {
  title: "শর্টস: রিভিশন",
  channel: "শিক্ষামূলক শর্টস",
  url: "https://youtube.com/shorts/MVkwReTgtAM?si=CveiK9mnGrKqT3f0",
  classLevel: 5,
  subject: "সাধারণ জ্ঞান"
}];
function Library() {
  const [selectedClass, setSelectedClass] = reactExports.useState("all");
  const [selectedSubject, setSelectedSubject] = reactExports.useState("all");
  const filteredVideos = reactExports.useMemo(() => educationalVideos.filter((video) => (selectedClass === "all" || video.classLevel === selectedClass) && (selectedSubject === "all" || video.subject === selectedSubject)), [selectedClass, selectedSubject]);
  const filteredReels = reactExports.useMemo(() => featuredShorts.filter((reel) => (selectedClass === "all" || reel.classLevel === selectedClass) && (selectedSubject === "all" || reel.subject === selectedSubject)), [selectedClass, selectedSubject]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-8 py-6 md:py-8 max-w-7xl mx-auto space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-hero text-white grid place-items-center shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-7 h-7" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold", children: "শিক্ষামূলক ভিডিও লাইব্রেরি" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "YouTube-স্টাইলের কার্ডে ভিডিও, চ্যানেল, আর রিলস দেখো।" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/live-class", className: "px-4 py-2 rounded-xl glass font-medium hover:shadow-soft transition-all", children: "লাইভ ক্লাসে যাও" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/bangladesh-map", className: "px-4 py-2 rounded-xl glass font-medium hover:shadow-soft transition-all", children: "মানচিত্র দেখো" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass rounded-3xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-lg", children: "ফিল্টার" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setSelectedClass("all");
          setSelectedSubject("all");
        }, className: "text-sm font-medium text-primary hover:underline", children: "ফিল্টার রিসেট করো" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: ["all", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((classLevel) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedClass(classLevel), className: `px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedClass === classLevel ? "bg-gradient-hero text-white shadow-soft" : "bg-background border border-border hover:border-primary"}`, children: classLevel === "all" ? "সব শ্রেণি" : `শ্রেণি ${classLevel}` }, String(classLevel))) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: ["all", "গণিত", "বাংলা", "বিজ্ঞান", "সাধারণ জ্ঞান"].map((subject) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedSubject(subject), className: `px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedSubject === subject ? "bg-gradient-blue text-white shadow-soft" : "bg-background border border-border hover:border-primary"}`, children: subject === "all" ? "সব বিষয়" : subject }, subject)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass-strong rounded-[2rem] p-6 md:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-6 h-6 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "ভিডিও ফিড" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "কার্ডে থাম্বনেইল দেখো, ক্লিক করলে YouTube-এ খুলবে।" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 xl:grid-cols-3 gap-4", children: filteredVideos.map((video) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: video.url, target: "_blank", rel: "noreferrer", className: "group glass rounded-3xl overflow-hidden shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video bg-slate-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `https://i.ytimg.com/vi/${youtubeIdFromUrl(video.url)}/hqdefault.jpg`, alt: video.title, className: "h-full w-full object-cover", loading: "lazy", onError: (event) => {
            event.currentTarget.style.display = "none";
            const fallback = event.currentTarget.parentElement?.querySelector("[data-fallback]");
            if (fallback instanceof HTMLElement) fallback.style.display = "grid";
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-fallback": true, className: "hidden absolute inset-0 place-items-center bg-gradient-to-br from-sky-100 via-white to-amber-100 text-center px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-2", children: "▶" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-slate-700", children: video.title })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/80 text-white text-xs font-semibold", children: [
            "শ্রেণি ",
            video.classLevel
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold leading-snug", children: video.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-1 flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: video.channel }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: video.subject })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-xs font-semibold text-primary inline-flex items-center gap-1", children: [
            "YouTube-এ দেখো ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" })
          ] })
        ] })
      ] }, video.url + video.title)) }),
      filteredVideos.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-4", children: "এই ফিল্টারে কোনো ভিডিও নেই।" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass-strong rounded-[2rem] p-6 md:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-2xl bg-gradient-orange text-white grid place-items-center shadow-soft text-xl", children: "shorts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "রিলস ও শর্টস" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "YouTube shorts-ধাঁচের শিক্ষামূলক ক্লিপ।" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 xl:grid-cols-3 gap-4", children: filteredReels.map((reel) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: reel.url, target: "_blank", rel: "noreferrer", className: "glass rounded-3xl overflow-hidden shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[9/16] grid place-items-center text-6xl bg-gradient-blue text-white overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `https://i.ytimg.com/vi/${youtubeIdFromUrl(reel.url)}/hqdefault.jpg`, alt: reel.title, className: "h-full w-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/80 text-white text-xs font-semibold", children: "Shorts" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: reel.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground flex items-center justify-between mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: reel.subject }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "শ্রেণি ",
              reel.classLevel
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-xs font-semibold text-primary inline-flex items-center gap-1", children: [
            "শর্টস দেখো ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" })
          ] })
        ] })
      ] }, reel.url)) }),
      filteredReels.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-4", children: "এই ফিল্টারে কোনো রিলস নেই।" })
    ] })
  ] }) });
}
export {
  Library as component
};
