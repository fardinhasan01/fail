import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { Q as QRCode } from "../_libs/qrcode.mjs";
import { e as ensureEcosystemSeed, O as Route$3, P as getStudentById, Q as getSchoolById, d as createVerificationUrl, p as pseudoQrSvgDataUrl, b as listenStudents, l as listenSchools, A as AppShell } from "./router-DlWKGgSZ.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__database.mjs";
import "../_libs/firebase__functions.mjs";
import { aN as ArrowLeft, c as ShieldCheck, d as University, T as Trophy, B as BadgeCheck, aA as ShieldAlert, r as Download, Q as QrCode } from "../_libs/lucide-react.mjs";
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
import "../_libs/dijkstrajs.mjs";
import "fs";
import "../_libs/pngjs.mjs";
import "assert";
import "zlib";
import "buffer";
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
import "../_libs/http-parser-js.mjs";
import "../_libs/websocket-extensions.mjs";
function StudentVerificationPage() {
  ensureEcosystemSeed();
  const {
    studentId
  } = Route$3.useParams();
  const [student, setStudent] = reactExports.useState(() => getStudentById(studentId));
  const [school, setSchool] = reactExports.useState(() => student ? getSchoolById(student.schoolId) : null);
  const verificationUrl = createVerificationUrl(studentId);
  const [qr, setQr] = reactExports.useState(() => pseudoQrSvgDataUrl(verificationUrl));
  reactExports.useEffect(() => listenStudents((items) => setStudent(items.find((item) => item.studentId === studentId || item.id === studentId) ?? null)), [studentId]);
  reactExports.useEffect(() => {
    if (!student) {
      setSchool(null);
      return;
    }
    return listenSchools((schools) => {
      setSchool(schools.find((item) => item.id === student.schoolId || item.schoolCode === student.schoolCode) ?? null);
    });
  }, [student]);
  reactExports.useEffect(() => {
    let active = true;
    void QRCode.toDataURL(verificationUrl, {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 240
    }).then((value) => {
      if (active) setQr(value);
    });
    return () => {
      active = false;
    };
  }, [verificationUrl]);
  const exportPdf = () => {
    if (!student) return;
    const win = window.open("", "_blank", "width=1200,height=900");
    if (!win) return;
    win.document.write(renderVerificationHtml(student, school, qr, verificationUrl));
    win.document.close();
    win.focus();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8 md:py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/students", className: "inline-flex items-center gap-2 text-sm font-semibold text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " নিবন্ধনে ফিরুন"
    ] }),
    student ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "glass-strong rounded-[2rem] p-6 md:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
            " যাচাই পাতা"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-3xl font-bold md:text-5xl", children: student.fullName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
            "শিক্ষার্থী আইডি: ",
            student.studentId,
            " ·",
            " ",
            student.status === "Valid Student" ? "যাচাইকৃত শিক্ষার্থী" : student.status
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { label: "শ্রেণি", value: student.classLevel.toString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { label: "রোল", value: student.roll }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { label: "শাখা", value: student.section }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { label: "রক্ত", value: student.bloodGroup })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 lg:grid-cols-[1fr_0.95fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2.2rem] bg-[linear-gradient(135deg,#0f172a_0%,#0ea5e9_60%,#22c55e_100%)] p-6 text-white shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.25em] opacity-80", children: "Smart ID Card" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-2xl font-bold", children: student.fullName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm opacity-90", children: student.schoolName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-white/15 text-4xl backdrop-blur", children: isImageData(student.photo) ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: student.photo, alt: student.fullName, className: "h-full w-full object-cover" }) : student.photo })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-[1fr_auto] gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70", children: "স্কুল কোড:" }),
                " ",
                student.schoolCode
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70", children: "শ্রেণি:" }),
                " ",
                student.classLevel
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70", children: "শাখা:" }),
                " ",
                student.section
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70", children: "রোল:" }),
                " ",
                student.roll
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70", children: "স্ট্যাটাস:" }),
                " ",
                student.status === "Valid Student" ? "যাচাইকৃত শিক্ষার্থী" : student.status
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: qr, alt: "QR code", className: "h-32 w-32 rounded-2xl bg-white p-2" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(University, { className: "h-5 w-5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "স্কুল যাচাই" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-sm leading-6 text-muted-foreground", children: school ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: school.schoolName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                school.schoolCode,
                " ·",
                " ",
                school.verificationStatus === "Verified Institution" ? "যাচাইকৃত প্রতিষ্ঠান" : "অপেক্ষমাণ"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: school.address })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "স্কুল পাওয়া যায়নি।" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5 text-brand-orange" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "অর্জন ও ইতিহাস" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2", children: [
              student.achievements.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-brand-orange/10 px-3 py-2 text-sm", children: item }, item)),
              student.competitionHistory.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-brand-blue/10 px-3 py-2 text-sm", children: item }, item))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-5 w-5 text-brand-green" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "স্ট্যাটাস চেক" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2 rounded-3xl bg-brand-green/10 px-4 py-3 text-sm font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }),
              student.status === "Valid Student" ? "যাচাইকৃত শিক্ষার্থী" : student.status
            ] }),
            student.status === "Suspended" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 rounded-2xl bg-destructive/10 px-4 py-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-4 w-4" }),
              " স্থগিত অ্যাকাউন্ট প্রশাসনিক পর্যালোচনা চায়।"
            ] }) : null
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass-strong rounded-[2rem] p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm uppercase tracking-[0.2em] text-muted-foreground", children: "QR verification" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "প্রোফাইল যাচাই পাতা" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "QR কোড সরাসরি এই যাচাই পাতায় খুলবে।" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: exportPdf, className: "inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-2.5 text-sm font-semibold text-white shadow-soft", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
              " PDF ডাউনলোড"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: verificationUrl, className: "inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-muted/70", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "h-4 w-4" }),
              " লিংক"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-3xl border border-border bg-background/80 p-4 text-sm text-muted-foreground", children: [
          "যাচাই URL: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: verificationUrl })
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-strong rounded-[2rem] p-8 text-sm text-muted-foreground", children: "Student not found." })
  ] }) });
}
function MiniStat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-white/70 bg-white/80 p-4 text-center shadow-soft backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-lg font-bold", children: value })
  ] });
}
function isImageData(value) {
  return /^data:image\//i.test(value) || /^https?:\/\//i.test(value);
}
function renderVerificationHtml(student, school, qr, verificationUrl) {
  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>${student.fullName}</title>
      <style>
        @page { size: A4 portrait; margin: 0; }
        html, body { margin: 0; padding: 0; width: 100%; height: 100%; font-family: system-ui, sans-serif; }
        body { background: #e8f3ff; }
        .sheet { width: 100vw; min-height: 100vh; padding: 32px; box-sizing: border-box; }
        .card {
          min-height: calc(100vh - 64px);
          border-radius: 28px;
          overflow: hidden;
          color: white;
          background: linear-gradient(135deg, #0f172a 0%, #0ea5e9 60%, #22c55e 100%);
          box-shadow: 0 16px 40px rgba(0,0,0,.14);
          padding: 28px;
        }
        .row { display: flex; justify-content: space-between; gap: 16px; }
        .photo { width: 84px; height: 84px; display: grid; place-items: center; background: rgba(255,255,255,.15); border-radius: 22px; font-size: 40px; overflow: hidden; }
        .photo img { width: 100%; height: 100%; object-fit: cover; }
        img { width: 124px; height: 124px; border-radius: 18px; background: white; padding: 6px; }
        .badge { display: inline-flex; align-items: center; gap: 8px; border-radius: 999px; padding: 6px 12px; background: rgba(255,255,255,.14); font-size: 12px; }
        .panel { margin-top: 22px; border-radius: 24px; background: rgba(255,255,255,.12); padding: 20px; }
      </style>
    </head>
    <body>
      <div class="sheet">
        <div class="card">
          <div class="badge">Verified Student</div>
          <div class="row" style="margin-top:18px">
            <div>
              <div style="font-size:30px;font-weight:800">${student.fullName}</div>
              <div style="margin-top:6px;opacity:.9">${student.schoolName}</div>
              <div style="margin-top:4px;opacity:.8">Student ID: ${student.studentId}</div>
            </div>
            <div class="photo">${isImageData(student.photo) ? `<img src="${student.photo}" alt="${student.fullName}" />` : student.photo}</div>
          </div>
          <div class="row panel" style="align-items:center">
            <div style="font-size:15px;line-height:1.8">
              <div><span style="opacity:.75">School Code:</span> ${student.schoolCode}</div>
              <div><span style="opacity:.75">Class:</span> ${student.classLevel}</div>
              <div><span style="opacity:.75">Section:</span> ${student.section}</div>
              <div><span style="opacity:.75">Roll:</span> ${student.roll}</div>
              <div><span style="opacity:.75">Status:</span> ${student.status}</div>
              ${school ? `<div><span style="opacity:.75">Institution:</span> ${school.verificationStatus}</div>` : ""}
            </div>
            <img src="${qr}" alt="QR code" />
          </div>
          <div class="panel" style="font-size:13px;line-height:1.7">
            <div><strong>Guardian:</strong> ${student.guardianName}</div>
            <div><strong>Guardian Phone:</strong> ${student.guardianPhone}</div>
            <div><strong>Blood Group:</strong> ${student.bloodGroup}</div>
            <div><strong>Verification URL:</strong> ${verificationUrl}</div>
          </div>
        </div>
      </div>
    </body>
  </html>`;
}
export {
  StudentVerificationPage as component
};
