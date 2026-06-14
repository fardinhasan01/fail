import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { j as useUser, A as AppShell, k as liveClasses, h as cn, w as activityBank, s as subjects } from "./router-9Ny0xRmp.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__database.mjs";
import "../_libs/firebase__functions.mjs";
import { S as Sparkles, d as University, n as MessageCircleHeart, l as Flame, ai as Star, T as Trophy, at as Target, m as GraduationCap, h as Search, g as Users, r as Video, e as BookOpen, au as MapPinned, N as Play, i as ArrowRight, av as Calendar } from "../_libs/lucide-react.mjs";
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
function Dashboard() {
  const user = useUser();
  const introAudioRef = reactExports.useRef(null);
  const greeting = (() => {
    const h = (/* @__PURE__ */ new Date()).getHours();
    if (h < 12) return "সুপ্রভাত (শুভ সকাল)";
    if (h < 17) return "শুভ অপরাহ্ন";
    return "শুভ সন্ধ্যা";
  })();
  const topSubjects = subjects.slice(0, 4);
  const roleLabel = user.role === "student" ? "শিক্ষার্থী" : user.role === "teacher" ? "শিক্ষক" : "অভিভাবক";
  const schoolLabel = user.schoolName ?? "Verified school pending";
  reactExports.useEffect(() => {
    const audio = introAudioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    void audio.play().catch(() => {
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("audio", { ref: introAudioRef, src: "/assets/dashboard-intro.mp3", preload: "auto", autoPlay: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-8 py-6 md:py-8 max-w-7xl mx-auto space-y-6 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-10 left-10 w-96 h-96 rounded-full bg-sky-200/30 blur-3xl -z-10 animate-float" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-48 right-10 w-80 h-80 rounded-full bg-amber-100/40 blur-3xl -z-10", style: {
        animationDelay: "2s"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative overflow-hidden rounded-[2.5rem] border border-amber-200/40 bg-[linear-gradient(135deg,#e0f2fe_0%,#eef2ff_48%,#fef3c7_100%)] p-6 md:p-10 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-12 top-6 text-amber-400/50 animate-float text-3xl", children: "✨" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/3 bottom-4 text-sky-400/50 animate-float text-2xl", style: {
          animationDelay: "1s"
        }, children: "🌟" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-1/4 bottom-8 text-indigo-400/40 animate-float text-xl", style: {
          animationDelay: "2s"
        }, children: "⭐" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sky-700 text-xs md:text-sm font-bold uppercase tracking-widest flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-amber-500 animate-spin" }),
            " ",
            greeting
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl md:text-5xl font-black text-slate-800 tracking-tight leading-none", children: [
            user.name,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl md:text-4xl inline-block animate-bounce", children: user.avatar })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-600 font-medium text-xs md:text-sm", children: [
            "আজ কী নতুন শিখবে? শ্রেণি ",
            user.class,
            " · ",
            roleLabel
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2.5 relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/school", className: "px-5 py-3.5 rounded-2xl bg-white/90 border border-slate-100 font-semibold shadow-soft hover:bg-white text-slate-700 hover:shadow-glow flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(University, { className: "w-4 h-4 text-sky-500" }),
            " স্কুল ড্যাশবোর্ড"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bani", className: "px-5 py-3.5 rounded-2xl bg-gradient-hero text-white font-semibold shadow-soft hover:shadow-glow flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircleHeart, { className: "w-4 h-4" }),
            " সহায়িকা AI"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-5 h-5" }), label: "স্ট্রিক", value: `${user.streak} দিন`, grad: "from-amber-400 to-orange-500", glowColor: "rgba(245,158,11,0.25)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5" }), label: "XP পয়েন্ট", value: user.xp.toLocaleString(), grad: "from-indigo-400 to-violet-600", glowColor: "rgba(99,102,241,0.2)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5" }), label: "কারেন্ট লেভেল", value: user.level.toString(), grad: "from-pink-400 to-fuchsia-600", glowColor: "rgba(236,72,153,0.2)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-5 h-5" }), label: "অর্জন কয়েন", value: user.coins.toString(), grad: "from-yellow-400 to-amber-500", glowColor: "rgba(251,191,36,0.25)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-6 lg:grid-cols-[1.1fr_0.9fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-[2.5rem] border border-white/60 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden bg-white/70 backdrop-blur-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 bottom-0 w-32 h-32 bg-emerald-100/20 rounded-full blur-2xl -z-10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 text-xs font-bold text-emerald-700 shadow-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(University, { className: "h-3.5 w-3.5 text-emerald-500 animate-pulse" }),
                " ",
                schoolLabel
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl md:text-2xl font-black text-slate-800 leading-tight", children: "Your school-linked learning home" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs md:text-sm leading-relaxed text-slate-600", children: "ই-পাঠশালা ন্যাশনাল ইকোসিস্টেমের সাথে সংযুক্ত হয়ে স্কুল রেজিস্ট্রেশন করো, স্টুডেন্ট আইডি কার্ড সংগ্রহ করো এবং বিভিন্ন জাতীয় প্রতিযোগিতায় অংশ নাও।" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/students", className: "inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-3 text-xs md:text-sm font-semibold text-white shadow-soft hover:scale-[1.02] transition-transform", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-4 h-4" }),
              " Student ID কার্ড"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DashLink, { to: "/school", label: "স্কুল", icon: University, color: "text-sky-500 bg-sky-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DashLink, { to: "/search", label: "অনুসন্ধান", icon: Search, color: "text-violet-500 bg-violet-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DashLink, { to: "/competitions", label: "প্রতিযোগিতা", icon: Trophy, color: "text-amber-500 bg-amber-50" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/classmates", className: "glass rounded-3xl p-5 hover:shadow-glow hover:-translate-y-1 transition-all duration-300 bg-white/80 border-white/60 relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 text-white grid place-items-center shadow-soft mb-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-base md:text-lg text-slate-800", children: "সহপাঠী আড্ডাখানা" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-600 mt-1 leading-relaxed", children: "ক্লাসভিত্তিক চ্যাটরুম, গ্রুপ স্টাডি নোট শেয়ারিং এবং সহপাঠীদের সাথে পোল সেশন।" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/live-class", className: "glass rounded-3xl p-5 hover:shadow-glow hover:-translate-y-1 transition-all duration-300 bg-white/80 border-white/60 relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 text-white grid place-items-center shadow-soft mb-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-base md:text-lg text-slate-800", children: "লাইভ ভিডিও ক্লাস" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-slate-600 mt-1 leading-relaxed", children: [
              liveClasses.find((room) => room.classLevel === user.class)?.time ?? "সাপ্তাহিক সময়সূচি",
              " · সরাসরি শিক্ষকের কাছে প্রশ্ন ও ক্লাস।"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/library", className: "glass rounded-3xl p-5 hover:shadow-glow hover:-translate-y-1 transition-all duration-300 bg-white/80 border-white/60 relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 text-white grid place-items-center shadow-soft mb-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-base md:text-lg text-slate-800", children: "ভিডিও লাইব্রেরি" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-600 mt-1 leading-relaxed", children: "সহজ ব্যাখ্যা সম্বলিত শিক্ষামূলক YouTube টিউটোরিয়াল ও চমৎকার reels ক্লিপ।" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bangladesh-map", className: "glass rounded-3xl p-5 hover:shadow-glow hover:-translate-y-1 transition-all duration-300 bg-white/80 border-white/60 relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white grid place-items-center shadow-soft mb-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPinned, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-base md:text-lg text-slate-800", children: "ইন্টারেক্টিভ মানচিত্র" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-600 mt-1 leading-relaxed", children: "গুগল ম্যাপে বাংলাদেশের নদী, ঐতিহাসিক স্থান, এবং বিভাগসমূহ ঘুরে দেখো।" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass-strong rounded-[2.5rem] border border-white/60 p-6 md:p-8 bg-white/70 backdrop-blur-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg md:text-xl font-black text-slate-800 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 text-indigo-500 animate-pulse" }),
            " পড়াশোনা চালিয়ে যাও"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/subjects", className: "text-xs md:text-sm font-bold text-primary hover:underline flex items-center gap-1", children: [
            "সব বিষয় দেখুন ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: topSubjects.slice(0, 3).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/subjects/$slug", params: {
          slug: s.slug
        }, className: `${s.gradient} rounded-3xl p-5 text-white shadow-soft hover:shadow-glow hover:scale-[1.02] transition-all relative overflow-hidden`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 rotate-45 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: s.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold bg-white/20 backdrop-blur-lg px-2.5 py-1 rounded-full", children: [
              s.progress,
              "% সম্পন্ন"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-lg", children: s.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs opacity-90 mb-3", children: [
            "পাঠ ",
            Math.floor(s.lessons * s.progress / 100) + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-white/25 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-white rounded-full transition-all duration-500", style: {
            width: `${s.progress}%`
          } }) })
        ] }, s.slug)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 glass rounded-[2.5rem] border border-white/60 bg-white/70 backdrop-blur-md p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg md:text-xl font-black text-slate-800 flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-indigo-500 animate-spin" }),
            " আজকের AI পড়ার পরিকল্পনা"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: [{
            t: "গুণের অনুশীলন ৬×",
            time: "১০ মিনিট",
            subj: "গণিত",
            done: true
          }, {
            t: "পড়ো: দুষ্ট বিড়াল (অধ্যায় ৩)",
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
            t: "সহায়িকা AI-এর সাথে ৫ মিনিট চ্যাট",
            time: "৫ মিনিট",
            subj: "সহায়ক",
            done: false
          }].map((task, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3.5 p-3 rounded-2xl hover:bg-white/60 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("w-6 h-6 rounded-full grid place-items-center text-xs border shrink-0 transition-colors", task.done ? "bg-emerald-500 border-emerald-500 text-white font-bold" : "border-slate-300"), children: task.done ? "✓" : "" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("font-semibold text-xs md:text-sm text-slate-800", task.done && "line-through text-slate-400"), children: task.t }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-slate-500", children: [
                task.subj,
                " · ",
                task.time
              ] })
            ] })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] border border-white/60 bg-white/70 backdrop-blur-md p-6 shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-800 flex items-center gap-2 mb-3.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5 text-amber-500 animate-bounce" }),
              " সাম্প্রতিক অর্জিত ব্যাজ"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: user.badges.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-xs font-bold text-white shadow-soft", children: [
              "🏅 ",
              b
            ] }, b)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] border border-white/60 bg-white/70 backdrop-blur-md p-6 shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-slate-800 flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-5 h-5 text-sky-500" }),
              " আসন্ন লাইভ ক্লাস"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-sky-400 to-indigo-500 rounded-2xl p-4 text-white shadow-soft relative overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold opacity-80 uppercase tracking-wider", children: liveClasses.find((room) => room.classLevel === user.class)?.time ?? "আগামীকাল · ১০:০০ AM" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-black mt-1 text-sm md:text-base leading-snug", children: liveClasses.find((room) => room.classLevel === user.class)?.title ?? "লাইভ লার্নিং রুম" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs opacity-90 mt-1 font-semibold", children: [
                liveClasses.find((room) => room.classLevel === user.class)?.teacher ?? "শিক্ষকের সঙ্গে",
                " · শ্রেণি ",
                user.class
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/live-class", className: "mt-3.5 inline-flex px-4 py-2 rounded-xl bg-white text-indigo-600 text-xs font-bold shadow-soft hover:scale-[1.03] transition-transform", children: "এখনই যোগ দাও" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg md:text-xl font-black text-slate-800 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-indigo-500" }),
            " বিষয়ভিত্তিক অনুশীলন"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/subjects", className: "text-xs md:text-sm font-bold text-primary hover:underline", children: "সব বিষয় দেখুন" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: topSubjects.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/subjects/$slug", params: {
          slug: s.slug
        }, className: "glass rounded-2xl p-4 md:p-5 bg-white/80 border-white/60 hover:shadow-glow hover:-translate-y-1 transition-all duration-350", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${s.gradient} w-11 h-11 rounded-xl grid place-items-center text-2xl mb-3 shadow-soft`, children: s.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-slate-855 text-sm md:text-base", children: s.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-0.5", children: [
            s.lessons,
            " লেসন"
          ] })
        ] }, s.slug)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass-strong rounded-[2.5rem] border border-white/60 bg-white/70 backdrop-blur-md p-6 md:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg md:text-xl font-black text-slate-800", children: "আজকের লার্নিং মিশন" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs md:text-sm text-slate-500", children: "সহজ শিক্ষামূলক মিশন শেষ করো এবং XP অর্জন করো।" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/quiz", className: "text-xs md:text-sm font-bold text-primary hover:underline", children: "কুইজ বোর্ড খুলুন" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-3", children: activityBank.filter((item) => item.classLevel === user.class).slice(0, 3).map((item) => item.external ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: item.href, target: "_blank", rel: "noreferrer", className: "glass rounded-2xl p-4 bg-white/90 border-slate-100 hover:shadow-soft hover:scale-[1.01] transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-2", children: item.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-sm text-slate-800", children: item.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500 mt-1 leading-relaxed", children: item.subtitle })
        ] }, item.id) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.href, className: "glass rounded-2xl p-4 bg-white/90 border-slate-100 hover:shadow-soft hover:scale-[1.01] transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-2", children: item.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-sm text-slate-800", children: item.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500 mt-1 leading-relaxed", children: item.subtitle })
        ] }, item.id)) })
      ] })
    ] })
  ] });
}
function StatCard({
  icon,
  label,
  value,
  grad,
  glowColor
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-4 flex items-center gap-3 bg-white/80 border-white/60 shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300", style: {
    boxShadow: `0 8px 30px ${glowColor}`
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `bg-gradient-to-br ${grad} w-10 h-10 rounded-xl grid place-items-center text-white shadow-soft shrink-0`, children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase font-bold tracking-wider text-slate-400 leading-none", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-black text-slate-800 text-base md:text-lg mt-1", children: value })
    ] })
  ] });
}
function DashLink({
  to,
  label,
  icon: Icon,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: "rounded-2xl border border-white/70 bg-white/90 p-4 text-center shadow-soft hover:shadow-glow hover:scale-[1.02] transition-transform flex flex-col items-center justify-center gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("p-2 rounded-xl shrink-0", color), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-slate-700", children: label })
  ] });
}
export {
  Dashboard as component
};
