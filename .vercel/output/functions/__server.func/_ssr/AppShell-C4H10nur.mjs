import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useRouterState, L as Link } from "../_libs/tanstack__react-router.mjs";
import { h as useRequireAuth } from "./router-D2rIulYA.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { ag as House, _ as BookOpen, H as MessageCircleHeart, af as Brain, G as Gamepad2, ah as Swords, P as Palette, j as Users, V as Video, ai as ScrollText, T as Trophy, aj as DoorOpen } from "../_libs/lucide-react.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const nav = [
  { to: "/dashboard", label: "শুরু", icon: House },
  { to: "/subjects", label: "বিষয়", icon: BookOpen },
  { to: "/bani", label: "সহায়ক", icon: MessageCircleHeart },
  { to: "/quizzes", label: "কুইজ", icon: Brain },
  { to: "/games", label: "গেম", icon: Gamepad2 },
  { to: "/special-game", label: "Special Game", icon: Swords },
  { to: "/free-board", label: "বোর্ড", icon: Palette },
  { to: "/classmates", label: "ক্লাসমেট", icon: Users },
  { to: "/live-class", label: "লাইভ", icon: Video },
  { to: "/library", label: "লাইব্রেরি", icon: Video },
  { to: "/certificates", label: "সার্টিফিকেট", icon: ScrollText },
  { to: "/leaderboard", label: "র‍্যাঙ্ক", icon: Trophy }
];
function AppShell({ children }) {
  const auth = useRequireAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const user = auth.profile;
  if (auth.loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen grid place-items-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-[2rem] p-8 text-center max-w-md w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3 animate-float", children: "📚" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "তোমার স্কুল লোড হচ্ছে" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "সেশন যাচাই করা হচ্ছে, একটু অপেক্ষা করো।" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden lg:flex w-64 flex-col gap-2 p-4 sticky top-0 h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "flex items-center gap-2 px-3 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/assets/e-pathshala-logo.png", alt: "E-পাঠশালা", className: "w-12 h-12 rounded-2xl object-cover shadow-glow bg-white" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-lg leading-none", children: "E-পাঠশালা" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "ডিজিটাল শেখার স্কুল" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-col gap-1 mt-2", children: nav.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.to || pathname.startsWith(item.to + "/");
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: item.to,
            className: cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
              active ? "bg-gradient-hero text-white shadow-soft" : "text-sidebar-foreground hover:bg-sidebar-accent"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" }),
              item.label
            ]
          },
          item.to
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto glass rounded-2xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-gradient-orange grid place-items-center text-2xl", children: user.avatar }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold truncate", children: user.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "Class ",
              user.class,
              " · ",
              user.role.charAt(0).toUpperCase() + user.role.slice(1),
              " · Lv ",
              user.level
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            "🔥 ",
            user.streak,
            "d"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            "⭐ ",
            user.xp
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            "🪙 ",
            user.coins
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => void auth.signOut(),
            className: "mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted/80 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DoorOpen, { className: "w-4 h-4" }),
              "Logout"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 min-w-0 pb-24 lg:pb-8", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "lg:hidden fixed bottom-3 left-3 right-3 z-40 glass-strong rounded-2xl px-2 py-2 flex items-center justify-around", children: nav.slice(0, 9).map((item) => {
      const Icon = item.icon;
      const active = pathname === item.to || pathname.startsWith(item.to + "/");
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: item.to,
          className: cn(
            "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-[10px] font-medium",
            active ? "text-primary" : "text-muted-foreground"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" }),
            item.label
          ]
        },
        item.to
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "fixed left-1/2 -translate-x-1/2 bottom-20 lg:bottom-4 z-30 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-auto glass-strong px-4 py-2 rounded-full text-[11px] md:text-xs text-muted-foreground shadow-soft text-center", children: "Created & Developed by Fardin Hasan, Kachua Govt Pilot High School. Firebase-powered learning workspace." }) })
  ] });
}
export {
  AppShell as A,
  cn as c
};
