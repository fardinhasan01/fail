import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as AppShell } from "./AppShell-C4H10nur.mjs";
import { l as liveClasses, a as activityBank } from "./bangladesh-learning-B2a6UQS-.mjs";
import { u as useUser, s as subjects } from "./router-D2rIulYA.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import { H as MessageCircleHeart, J as Flame, K as Star, T as Trophy, N as Target, j as Users, V as Video, O as MapPinned, Q as Play, W as ArrowRight, S as Sparkles, Y as Calendar, _ as BookOpen } from "../_libs/lucide-react.mjs";
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
function Dashboard() {
  const user = useUser();
  const introAudioRef = reactExports.useRef(null);
  const greeting = (() => {
    const h = (/* @__PURE__ */ new Date()).getHours();
    if (h < 12) return "সুপ্রভাত";
    if (h < 17) return "শুভ অপরাহ্ন";
    return "শুভ সন্ধ্যা";
  })();
  const topSubjects = subjects.slice(0, 4);
  const roleLabel = user.role === "student" ? "শিক্ষার্থী" : user.role === "teacher" ? "শিক্ষক" : "অভিভাবক";
  reactExports.useEffect(() => {
    const audio = introAudioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    void audio.play().catch(() => {
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("audio", { ref: introAudioRef, src: "/assets/dashboard-intro.mp3", preload: "auto", autoPlay: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-8 py-6 md:py-8 max-w-7xl mx-auto space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
            greeting,
            ","
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl md:text-4xl font-bold", children: [
            user.name,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: user.avatar })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
            "আজ কী নতুন শিখবে? শ্রেণি ",
            user.class,
            " · ",
            roleLabel
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bani", className: "px-5 py-3 rounded-2xl bg-gradient-hero text-white font-semibold shadow-soft hover:shadow-glow flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircleHeart, { className: "w-4 h-4" }),
          " সহায়ক AI"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-5 h-5" }), label: "স্ট্রিক", value: `${user.streak} দিন`, grad: "bg-gradient-orange" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5" }), label: "XP", value: user.xp.toLocaleString(), grad: "bg-gradient-purple" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5" }), label: "লেভেল", value: user.level.toString(), grad: "bg-gradient-pink" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-5 h-5" }), label: "কয়েন", value: user.coins.toString(), grad: "bg-gradient-sunny" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid sm:grid-cols-2 xl:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/classmates", className: "glass rounded-3xl p-5 hover:shadow-glow hover:scale-[1.02] transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-gradient-pink text-white grid place-items-center shadow-soft mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-lg", children: "ক্লাসমেট" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-1", children: "ক্লাসভিত্তিক চ্যাট, নোট, পোল, আর স্টাডি রুম।" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/live-class", className: "glass rounded-3xl p-5 hover:shadow-glow hover:scale-[1.02] transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-gradient-hero text-white grid place-items-center shadow-soft mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-lg", children: "লাইভ ভিডিও ক্লাস" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground mt-1", children: [
            liveClasses.find((room) => room.classLevel === user.class)?.time ?? "সাপ্তাহিক সময়সূচি",
            " · শিক্ষকের সঙ্গে সরাসরি।"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/library", className: "glass rounded-3xl p-5 hover:shadow-glow hover:scale-[1.02] transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-gradient-blue text-white grid place-items-center shadow-soft mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-lg", children: "ভিডিও ও রিলস" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-1", children: "শুধু শিক্ষামূলক YouTube সার্চ লিংক।" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bangladesh-map", className: "glass rounded-3xl p-5 hover:shadow-glow hover:scale-[1.02] transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-gradient-green text-white grid place-items-center shadow-soft mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPinned, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-lg", children: "বাংলাদেশ মানচিত্র" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-1", children: "Google Maps খুলে নদী, বিভাগ, আর স্থাপনা দেখো।" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://www.nctb.gov.bd/", target: "_blank", rel: "noreferrer", className: "glass rounded-3xl p-5 hover:shadow-glow hover:scale-[1.02] transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-gradient-orange text-white grid place-items-center shadow-soft mb-3", children: "📘" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-lg", children: "NCTB বই" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-1", children: "অফিশিয়াল পাঠ্যপুস্তক বোর্ডের লিংক।" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass-strong rounded-3xl p-6 md:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 text-primary" }),
            " পড়াশোনা চালিয়ে যাও"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/subjects", className: "text-sm font-medium text-primary hover:underline flex items-center gap-1", children: [
            "সব দেখো ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: topSubjects.slice(0, 3).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/subjects/$slug", params: {
          slug: s.slug
        }, className: `${s.gradient} rounded-2xl p-5 text-white shadow-soft hover:shadow-glow hover:scale-[1.02] transition-all`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: s.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-white/20 backdrop-blur px-2 py-1 rounded-full", children: [
              s.progress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-lg", children: s.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm opacity-80 mb-3", children: [
            "পাঠ ",
            Math.floor(s.lessons * s.progress / 100) + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-white/20 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-white rounded-full", style: {
            width: `${s.progress}%`
          } }) })
        ] }, s.slug)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 glass rounded-3xl p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-primary" }),
            " আজকের AI পড়ার পরিকল্পনা"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: [{
            t: "গুণের অনুশীলন ৬×",
            time: "১০ মিনিট",
            subj: "গণিত",
            done: true
          }, {
            t: "পড়ো: দুষ্ট বিড়াল (অধ্যায় ৩)",
            time: "১২ মিনিট",
            subj: "ইংরেজি",
            done: true
          }, {
            t: "দেখো: জলচক্র 🌧️",
            time: "৮ মিনিট",
            subj: "বিজ্ঞান",
            done: false
          }, {
            t: "কুইজ: বিশ্বের রাজধানী",
            time: "৬ মিনিট",
            subj: "সাধারণ জ্ঞান",
            done: false
          }, {
            t: "সহায়ক AI-এর সঙ্গে ৫ মিনিট চ্যাট",
            time: "৫ মিনিট",
            subj: "সহায়ক",
            done: false
          }].map((task, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 p-3 rounded-2xl hover:bg-muted/60 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-6 h-6 rounded-full grid place-items-center text-xs ${task.done ? "bg-brand-green text-white" : "border-2 border-muted-foreground/30"}`, children: task.done ? "✓" : "" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-medium ${task.done ? "line-through text-muted-foreground" : ""}`, children: task.t }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                task.subj,
                " · ",
                task.time
              ] })
            ] })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5 text-brand-orange" }),
              " সাম্প্রতিক ব্যাজ"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: user.badges.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 py-1.5 rounded-full bg-gradient-sunny text-sm font-medium text-white shadow-soft", children: [
              "🏅 ",
              b
            ] }, b)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-5 h-5 text-brand-blue" }),
              " আসন্ন লাইভ ক্লাস"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-blue rounded-2xl p-4 text-white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs opacity-80", children: liveClasses.find((room) => room.classLevel === user.class)?.time ?? "আগামীকাল · ১০:০০ AM" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold mt-1", children: liveClasses.find((room) => room.classLevel === user.class)?.title ?? "লাইভ লার্নিং রুম" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs opacity-80 mt-1", children: [
                liveClasses.find((room) => room.classLevel === user.class)?.teacher ?? "শিক্ষকের সঙ্গে",
                " · শ্রেণি ",
                user.class
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/live-class", className: "mt-3 inline-flex px-3 py-1.5 rounded-lg bg-white text-primary text-xs font-semibold", children: "এখনই যোগ দাও" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-primary" }),
            " বিষয়গুলো দেখো"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/subjects", className: "text-sm font-medium text-primary hover:underline", children: "সব দেখো" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: topSubjects.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/subjects/$slug", params: {
          slug: s.slug
        }, className: "glass rounded-2xl p-5 hover:shadow-glow hover:scale-[1.02] transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${s.gradient} w-12 h-12 rounded-xl grid place-items-center text-2xl mb-3`, children: s.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: s.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            s.lessons,
            " পাঠ"
          ] })
        ] }, s.slug)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass-strong rounded-3xl p-6 md:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "আজকের মিশন স্ট্রিক" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "বাংলাদেশি শিক্ষার্থীদের জন্য দ্রুত স্টাডি লুপ।" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/games", className: "text-sm font-medium text-primary hover:underline", children: "গেম বোর্ড খুলুন" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-3", children: activityBank.filter((item) => item.classLevel === user.class).slice(0, 3).map((item) => item.external ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: item.href, target: "_blank", rel: "noreferrer", className: "glass rounded-2xl p-4 hover:shadow-soft transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-2", children: item.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: item.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: item.subtitle })
        ] }, item.id) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.href, className: "glass rounded-2xl p-4 hover:shadow-soft transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-2", children: item.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: item.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: item.subtitle })
        ] }, item.id)) })
      ] })
    ] })
  ] });
}
function StatCard({
  icon,
  label,
  value,
  grad
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-4 flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${grad} w-11 h-11 rounded-xl grid place-items-center text-white shadow-soft`, children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-lg leading-none", children: value })
    ] })
  ] });
}
export {
  Dashboard as component
};
