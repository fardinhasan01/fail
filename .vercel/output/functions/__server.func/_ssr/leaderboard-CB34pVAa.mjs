import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { e as ensureEcosystemSeed, j as useUser, g as getSchools, a as getStudents, A as AppShell } from "./router-DlWKGgSZ.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__database.mjs";
import "../_libs/firebase__functions.mjs";
import { ae as Crown, d as University, g as Users, A as Award, S as Sparkles, T as Trophy, af as Star, ag as Medal } from "../_libs/lucide-react.mjs";
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
function Leaderboard() {
  ensureEcosystemSeed();
  const user = useUser();
  const schools = getSchools();
  const students = getStudents();
  const schoolBoard = reactExports.useMemo(() => [...schools].map((school) => ({
    name: school.schoolName,
    subtitle: `${school.district} · ${school.verificationStatus}`,
    score: school.students * 2 + school.teachers * 8 + school.achievements.length * 120 + school.competitionRankings.length * 90,
    school
  })).sort((a, b) => b.score - a.score), [schools]);
  const studentBoard = reactExports.useMemo(() => [...students].map((student) => ({
    name: student.fullName,
    subtitle: `${student.schoolName} · Class ${student.classLevel}`,
    score: student.achievements.length * 120 + student.competitionHistory.length * 95 + Number(student.roll || 0),
    student
  })).sort((a, b) => b.score - a.score), [students]);
  const topMetrics = [{
    label: "Top Schools",
    value: schoolBoard.length.toString()
  }, {
    label: "Top Students",
    value: studentBoard.length.toString()
  }, {
    label: "Badges",
    value: String(user.badges.length)
  }, {
    label: "XP",
    value: user.xp.toLocaleString()
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8 md:py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "glass-strong rounded-[2rem] p-6 md:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-brand-orange/10 px-3 py-1.5 text-xs font-semibold text-brand-orange", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-3.5 w-3.5" }),
          " National Education Leaderboard"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold md:text-5xl", children: "Rank by student, school, district and innovation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-3xl text-sm leading-6 text-muted-foreground md:text-base", children: "Trophies, badges and scoreboards now reflect the whole ecosystem, not just a single classroom." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: topMetrics.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: item.label, value: item.value }, item.label)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 xl:grid-cols-[1fr_0.95fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-[2rem] p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(University, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Top Schools" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: schoolBoard.map((row, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(BoardRow, { rank: index + 1, name: row.name, subtitle: row.subtitle, score: row.score, accent: index === 0 ? "bg-brand-yellow" : index === 1 ? "bg-brand-orange/40" : index === 2 ? "bg-brand-blue/25" : "bg-muted" }, row.name)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-brand-blue" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Top Students" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: studentBoard.slice(0, 5).map((row, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(BoardRow, { rank: index + 1, name: row.name, subtitle: row.subtitle, score: row.score, accent: index === 0 ? "bg-brand-green" : index === 1 ? "bg-brand-orange/40" : "bg-muted" }, row.name)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5 text-brand-orange" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Badge wall" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: user.badges.map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-gradient-sunny px-3 py-1.5 text-sm font-medium text-white shadow-soft", children: [
            "🏅 ",
            badge
          ] }, badge)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/students", className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary", children: [
            "Add students to leaderboard ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5 text-brand-green" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Ranking notes" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2 text-sm leading-6 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Schools rank by students, teachers, achievements and competition performance." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Students rank by achievements and competition history." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• District and division views can be extended in the same data layer." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/competitions", className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary", children: [
            "View competition rankings ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4" })
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
function BoardRow({
  rank,
  name,
  subtitle,
  score,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-2xl border border-border bg-background/80 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-8 w-8 place-items-center rounded-full text-xs font-bold ${accent}`, children: rank }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: subtitle })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 font-bold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { className: "h-4 w-4" }),
      " ",
      score
    ] })
  ] });
}
export {
  Leaderboard as component
};
