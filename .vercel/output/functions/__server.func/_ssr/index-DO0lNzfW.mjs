import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { W as ArrowRight, S as Sparkles, V as Video, H as MessageCircleHeart, _ as BookOpen, G as Gamepad2, af as Brain, T as Trophy } from "../_libs/lucide-react.mjs";
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
const features = [{
  icon: MessageCircleHeart,
  title: "সহায়ক AI",
  desc: "শেখা বুঝিয়ে দেয়, কুইজ দেয়, আর উৎসাহ দেয়।",
  grad: "bg-gradient-purple"
}, {
  icon: BookOpen,
  title: "বিষয়ভিত্তিক",
  desc: "গণিত, বাংলা, ইংরেজি, বিজ্ঞান, আইসিটি, জিকে, সমাজ, ধর্ম।",
  grad: "bg-gradient-blue"
}, {
  icon: Video,
  title: "লাইভ ক্লাস",
  desc: "শিক্ষকের সঙ্গে সরাসরি শেখা, প্রশ্ন, আর আলোচনা।",
  grad: "bg-gradient-green"
}, {
  icon: Gamepad2,
  title: "শেখা খেলায়",
  desc: "শিক্ষামূলক গেম ও রে‌ইলস দিয়ে অনুশীলন।",
  grad: "bg-gradient-orange"
}, {
  icon: Brain,
  title: "কুইজ",
  desc: "ক্লাসভিত্তিক MCQ, সত্য-মিথ্যা, এবং ফিল-ইন।",
  grad: "bg-gradient-pink"
}, {
  icon: Trophy,
  title: "অর্জন",
  desc: "XP, ব্যাজ, স্ট্রিক, আর লেভেল—সবই আছে।",
  grad: "bg-gradient-sunny"
}];
function Landing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-30 backdrop-blur-xl bg-white/75 border-b border-white/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] bg-white/90 shadow-soft px-5 py-4 flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/assets/e-pathshala-logo.png", alt: "E-পাঠশালা", className: "w-12 h-12 rounded-2xl object-cover shadow-glow bg-white" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-xl leading-none", children: "E-পাঠশালা" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "বাংলা-প্রথম ডিজিটাল স্কুল" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden lg:flex items-center gap-2 text-sm font-semibold text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/subjects", className: "px-4 py-2 rounded-full hover:bg-muted/70 hover:text-foreground", children: "বিষয়" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/library", className: "px-4 py-2 rounded-full hover:bg-muted/70 hover:text-foreground", children: "ভিডিও" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/classmates", className: "px-4 py-2 rounded-full hover:bg-muted/70 hover:text-foreground", children: "ক্লাসমেট" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/games", className: "px-4 py-2 rounded-full hover:bg-muted/70 hover:text-foreground", children: "গেম" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/live-class", className: "px-4 py-2 rounded-full hover:bg-muted/70 hover:text-foreground", children: "লাইভ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "px-4 py-2 rounded-full hover:bg-muted/70 hover:text-foreground", children: "প্রবেশ" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "px-5 py-3 rounded-full bg-gradient-hero text-white font-semibold shadow-soft hover:shadow-glow transition-all inline-flex items-center gap-2", children: [
        "শুরু করুন ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto px-4 py-6 md:py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-[2.5rem] overflow-hidden shadow-soft border border-white/50 bg-[linear-gradient(135deg,#fff5da_0%,#ffe8d6_38%,#f7f1ea_62%,#dff4ff_100%)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-10 lg:p-14 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-7", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 shadow-soft text-sm font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-brand-orange" }),
              " প্রথম থেকে দশম শ্রেণি"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] text-foreground", children: [
                "শেখা হবে ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-orange", children: "মজার" }),
                ",",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "হোক তা ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-green", children: "সহজ" }),
                "।"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-2xl text-base md:text-lg text-muted-foreground leading-7", children: "বাংলাদেশি শিক্ষার্থীদের জন্য বাংলা-প্রথম একটি আধুনিক ডিজিটাল স্কুল। বিষয়, PDF, লাইভ ক্লাস, কুইজ, গেম, রিলস, আর ক্লাসমেট এক জায়গায়।" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "px-6 py-3.5 rounded-full bg-brand-orange text-white font-semibold shadow-soft hover:shadow-glow transition-all inline-flex items-center gap-2", children: [
                "ফ্রি শুরু করুন ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/library", className: "px-6 py-3.5 rounded-full bg-white text-foreground font-semibold shadow-soft hover:shadow-glow transition-all inline-flex items-center gap-2", children: [
                "ভিডিও দেখুন ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-4 h-4" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex -space-x-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 h-10 rounded-full bg-brand-orange text-white grid place-items-center shadow-soft", children: "১" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 h-10 rounded-full bg-brand-blue text-white grid place-items-center shadow-soft", children: "২" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 h-10 rounded-full bg-brand-green text-white grid place-items-center shadow-soft", children: "৩" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 h-10 rounded-full bg-brand-purple text-white grid place-items-center shadow-soft", children: "৪" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "২৫,০০০+ শিক্ষার্থী-সদৃশ অনুশীলন সেশন" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-6 -top-6 h-20 w-20 rounded-3xl bg-white/80 shadow-soft" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-6 bottom-0 h-24 w-24 rounded-3xl bg-white/70 shadow-soft" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative rounded-[2rem] overflow-hidden border-4 border-white shadow-glow bg-white/80 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/assets/e-pathshala-logo.png", alt: "E-পাঠশালা", className: "w-full aspect-[4/3] object-cover" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 md:px-10 lg:px-14 pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "তোমার শ্রেণি বেছে নাও:" }),
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((classLevel) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/subjects", className: "px-4 py-2 rounded-full bg-white shadow-soft font-semibold hover:scale-105 transition-transform", children: [
            "শ্রেণি ",
            classLevel
          ] }, classLevel))
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-16 md:py-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 shadow-soft text-sm font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-brand-orange" }),
            " ৬টি বিষয়"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-bold mt-4", children: "যা যা শিখবে তুমি" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3 max-w-2xl mx-auto", children: "যা শিখতে ভালোবাসো, সেটাই এখানে পাবে—বাংলায়, সুন্দরভাবে, আর সহজে।" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-5", children: features.map((feature) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-6 hover:shadow-glow transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${feature.grad} w-14 h-14 rounded-2xl grid place-items-center text-white mb-4 shadow-soft`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(feature.icon, { className: "w-7 h-7" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-xl mb-2", children: feature.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-6", children: feature.desc })
        ] }, feature.title)) })
      ] })
    ] })
  ] });
}
export {
  Landing as component
};
