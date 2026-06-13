import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAuth, j as useUser, K as listenCertificates, A as AppShell, L as saveCertificate } from "./router-DlWKGgSZ.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__database.mjs";
import "../_libs/firebase__functions.mjs";
import { A as Award, T as Trophy, a8 as FileText, B as BadgeCheck, S as Sparkles, aI as Layers, r as Download, av as Share2 } from "../_libs/lucide-react.mjs";
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
function Certificates() {
  const auth = useAuth();
  const user = useUser();
  const [records, setRecords] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const unsubscribe = listenCertificates(auth.profile.uid, setRecords);
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
      else unsubscribe?.();
    };
  }, [auth.profile.uid]);
  const eligible = reactExports.useMemo(() => [{
    id: "quiz-excellence",
    title: "Quiz score > 80%",
    description: "High accuracy on the fullscreen quiz game unlocks an excellence certificate.",
    active: records.some((record) => record.title.includes("Certificate of Excellence"))
  }, {
    id: "lesson-milestone",
    title: "10 lessons completed",
    description: "Reach the lesson milestone and create a class progress certificate.",
    active: user.lessonsCompleted >= 10
  }, {
    id: "streak-win",
    title: "Winning streaks",
    description: "Sustained streak performance unlocks recognition badges and a streak certificate.",
    active: user.streak >= 7
  }], [records, user.lessonsCompleted, user.streak]);
  const createLessonCertificate = async () => {
    await saveCertificate({
      userId: auth.profile.uid,
      userName: auth.profile.name,
      classLevel: user.class,
      title: `Certificate of Progress in Class ${user.class}`,
      subject: "Class progress",
      score: user.lessonsCompleted,
      total: 10
    });
  };
  const createStreakCertificate = async () => {
    await saveCertificate({
      userId: auth.profile.uid,
      userName: auth.profile.name,
      classLevel: user.class,
      title: `Certificate of Streak Excellence`,
      subject: "Learning streak",
      score: user.streak,
      total: 7
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-8 py-6 md:py-8 max-w-7xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "glass-strong rounded-[2rem] p-6 md:p-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-3.5 w-3.5 text-brand-orange" }),
          " achievements"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-5xl font-bold", children: "Automatic certificates" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-2xl text-sm md:text-base text-muted-foreground", children: "Quiz score, lesson milestones, and streak achievements are stored in Firebase and can be downloaded or shared as a print-ready PDF." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 min-w-[240px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Records", value: records.length.toString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Eligible", value: eligible.filter((item) => item.active).length.toString() })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 lg:grid-cols-[1.05fr_0.95fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-[2rem] p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5 text-brand-orange" }),
              " Generate milestones"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Use the buttons below to generate manual milestone certificates." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5 text-primary" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-3", children: eligible.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-3xl p-5 ${item.active ? "bg-brand-green/10 border border-brand-green/20" : "bg-muted/50"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: `h-4 w-4 ${item.active ? "text-brand-green" : "text-muted-foreground"}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: item.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: item.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-3 py-1 text-xs font-semibold ${item.active ? "bg-brand-green text-white" : "bg-muted text-muted-foreground"}`, children: item.active ? "Unlocked" : "Locked" }) })
        ] }, item.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => void createLessonCertificate(), className: "inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-3 font-semibold text-white shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
            "Lesson certificate"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => void createStreakCertificate(), className: "inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 font-semibold hover:bg-muted/70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4" }),
            "Streak certificate"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Your certificates" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Click any card to download or share." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-5 w-5 text-primary" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: records.length ? records.map((record) => /* @__PURE__ */ jsxRuntimeExports.jsx(CertificateCard, { record }, record.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground", children: "No certificates yet. Complete a quiz with 80%+ or create a milestone certificate." }) })
      ] })
    ] })
  ] }) });
}
function CertificateCard({
  record
}) {
  const issuedAt = new Date(record.issuedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
  const downloadPdf = async () => {
    const win = window.open("", "_blank", "width=1200,height=900");
    if (!win) return;
    win.document.write(renderCertificateHtml(record, issuedAt));
    win.document.close();
    win.focus();
  };
  const shareCertificate = async () => {
    const shareData = {
      title: record.title,
      text: `${record.userName} earned ${record.title} in E-পাঠশালা.`
    };
    if (navigator.share) {
      await navigator.share(shareData).catch(() => {
      });
      return;
    }
    await navigator.clipboard.writeText(`${shareData.title}
${shareData.text}`).catch(() => {
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-background/90 p-5 shadow-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Certificate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 text-lg font-bold", children: record.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-brand-orange/15 px-3 py-1 text-xs font-semibold text-brand-orange", children: [
        record.score,
        "/",
        record.total
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
      record.userName,
      " · Class ",
      record.classLevel,
      " · ",
      record.subject
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
      "Issued ",
      issuedAt
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => void downloadPdf(), className: "inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-2.5 text-sm font-semibold text-white shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
        "Download PDF"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => void shareCertificate(), className: "inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-muted/70", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" }),
        "Share"
      ] })
    ] })
  ] });
}
function Metric({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-background/80 p-4 shadow-soft border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-2xl font-bold", children: value })
  ] });
}
function renderCertificateHtml(record, issuedAt) {
  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>${escapeHtml(record.title)}</title>
      <style>
        @page { size: A4 landscape; margin: 0; }
        html, body { margin: 0; padding: 0; width: 100%; height: 100%; }
        body {
          font-family: system-ui, sans-serif;
          background: linear-gradient(135deg, #fff5da 0%, #dff7ff 50%, #f3e8ff 100%);
          color: #1b1b1b;
        }
        .sheet {
          box-sizing: border-box;
          width: 100vw;
          height: 100vh;
          padding: 44px;
        }
        .card {
          height: 100%;
          border: 12px solid rgba(255,255,255,0.8);
          border-radius: 36px;
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(10px);
          padding: 48px;
          box-shadow: 0 40px 80px rgba(54, 78, 120, 0.18);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .eyebrow { letter-spacing: 0.28em; font-size: 12px; text-transform: uppercase; color: #6b7280; }
        h1 { font-size: 52px; margin: 12px 0 8px; line-height: 1.02; }
        .name { font-size: 48px; font-weight: 800; color: #7c3aed; margin: 8px 0; }
        .desc { font-size: 20px; line-height: 1.6; max-width: 900px; color: #374151; }
        .meta { display: flex; gap: 18px; flex-wrap: wrap; font-size: 18px; color: #374151; }
        .footer { display: flex; justify-content: space-between; align-items: end; gap: 16px; font-size: 16px; color: #4b5563; }
        .badge { padding: 10px 16px; border-radius: 999px; background: #111827; color: white; font-weight: 700; }
        .stamp { width: 160px; height: 160px; border-radius: 50%; border: 8px solid rgba(124,58,237,0.35); display: grid; place-items: center; color: #7c3aed; font-weight: 800; transform: rotate(-8deg); }
      </style>
    </head>
    <body>
      <div class="sheet">
        <div class="card">
          <div>
            <div class="eyebrow">E-পাঠশালা</div>
            <h1>Certificate of Excellence</h1>
            <p class="desc">This certificate is proudly awarded to</p>
            <div class="name">${escapeHtml(record.userName)}</div>
            <p class="desc">for outstanding achievement in <strong>${escapeHtml(record.title)}</strong> with a score of <strong>${record.score}/${record.total}</strong>.</p>
            <div class="meta" style="margin-top: 20px;">
              <span class="badge">Class ${record.classLevel}</span>
              <span class="badge">${escapeHtml(record.subject)}</span>
              <span class="badge">Issued ${issuedAt}</span>
            </div>
          </div>
          <div class="footer">
            <div>
              <div style="font-weight: 700;">E-পাঠশালা</div>
              <div>National learning ecosystem</div>
            </div>
            <div class="stamp">Awarded</div>
          </div>
        </div>
      </div>
      <script>
        window.addEventListener('load', () => setTimeout(() => window.print(), 300));
      <\/script>
    </body>
  </html>`;
}
function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return map[char] ?? char;
  });
}
export {
  Certificates as component
};
