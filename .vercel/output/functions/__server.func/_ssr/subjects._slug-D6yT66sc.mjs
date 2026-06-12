import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as AppShell } from "./AppShell-C4H10nur.mjs";
import { c as classLevels } from "./bangladesh-learning-B2a6UQS-.mjs";
import { a as subjectResourceLinkBySlug } from "./subject-resource-links-lLLmw7ja.mjs";
import { e as Route$2, u as useUser } from "./router-D2rIulYA.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import { aa as ArrowLeft, S as Sparkles, E as ExternalLink, a5 as Layers } from "../_libs/lucide-react.mjs";
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
const subjectPdfLinks = {
  math: {},
  english: {
    1: "https://drive.egovcloud.gov.bd/index.php/s/CW6nYiJRMJE8trb",
    2: "https://drive.egovcloud.gov.bd/index.php/s/Qg7pzPPvzl1AnPS",
    3: "https://drive.google.com/uc?export=download&id=1gy7q4njDpOKGULXzGQVvhq2ZGpZMOfif",
    4: "https://drive.egovcloud.gov.bd/index.php/s/5UGmR1vSkxM0dU0",
    5: "https://drive.egovcloud.gov.bd/index.php/s/rOVIdpFOa2DA8AT",
    6: "https://drive.egovcloud.gov.bd/index.php/s/00PDZJDuOCv9ttL",
    7: "https://drive.egovcloud.gov.bd/index.php/s/gL2i3wNhvieyZbQ",
    8: "https://drive.egovcloud.gov.bd/index.php/s/gnSVZ8LoHftPSdo",
    9: "https://drive.egovcloud.gov.bd/index.php/s/6cNd5kYL7lbK62r",
    10: "https://drive.egovcloud.gov.bd/index.php/s/6cNd5kYL7lbK62r"
  },
  physics: {},
  chemistry: {},
  bangla: {},
  science: {},
  social: {},
  ict: {},
  gk: {},
  islamic: {}
};
const normalizePdfLink = (url) => {
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)\/view/);
  if (driveMatch?.[1]) {
    return `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`;
  }
  return url;
};
const getSubjectPdfLink = (subject, classLevel) => normalizePdfLink(subjectPdfLinks[subject][classLevel] ?? "");
function SubjectDetail() {
  const {
    subject
  } = Route$2.useLoaderData();
  const user = useUser();
  const [selectedClass, setSelectedClass] = reactExports.useState(user.class);
  const pdfUrl = reactExports.useMemo(() => getSubjectPdfLink(subject.slug, selectedClass), [subject.slug, selectedClass]);
  const quickLink = reactExports.useMemo(() => subjectResourceLinkBySlug[subject.slug], [subject.slug]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-8 py-6 md:py-8 max-w-6xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/subjects", className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
      " সব বিষয়ে ফিরে যান"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${subject.gradient} rounded-[2rem] p-8 md:p-10 text-white shadow-glow`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl md:text-7xl", children: subject.emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold", children: subject.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-90 mt-1", children: subject.description })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          subject.lessons,
          " পাঠ"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "শ্রেণি ",
          selectedClass
        ] })
      ] }),
      quickLink ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 rounded-3xl bg-white/15 border border-white/20 p-4 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 md:flex-row md:items-center md:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold", children: [
              quickLink.label,
              " resource"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm opacity-85", children: "Open the linked Drive resource in a new tab." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: quickLink.href, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-foreground shadow-soft hover:shadow-glow transition-all", children: [
          "Open resource",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" })
        ] })
      ] }) }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass-strong rounded-[2rem] p-6 md:p-8 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-6 h-6 text-primary" }),
            " প্রথমে ক্লাস বেছে নিন"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "ক্লাস নির্বাচন করলে PDF এই পাতার ভেতরেই খুলবে।" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
          "চলতি ক্লাস: ",
          selectedClass
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 md:grid-cols-10 gap-2", children: classLevels.map((classLevel) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedClass(classLevel), className: `rounded-xl px-3 py-2 text-sm font-semibold transition-all ${selectedClass === classLevel ? "bg-gradient-hero text-white shadow-soft" : "glass hover:shadow-soft"}`, children: classLevel }, classLevel)) }),
      pdfUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[1.5rem] border border-border bg-background p-5 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold", children: "Open in PDF.js viewer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "The PDF stays inside E-পাঠশালা with page navigation and zoom controls." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/pdf-viewer", search: {
            src: pdfUrl,
            title: `${subject.name} · Class ${selectedClass}`
          }, className: "inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-3 font-semibold text-white shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" }),
            "Open viewer"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-2xl bg-muted/50 p-4 text-sm text-muted-foreground", children: [
          "Selected PDF source: ",
          subject.slug,
          " · class ",
          selectedClass
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-muted/60 p-5 text-sm text-muted-foreground", children: "এই ক্লাসের PDF লিংক এখনো যোগ করা হয়নি। `src/lib/subject-pdf-links.ts` ফাইলে লিংক বসালে এখানে দেখাবে।" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass-strong rounded-[2rem] p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-3", children: "লিংক ফাইল" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-6", children: "আপনি চাইলে `src/lib/subject-pdf-links.ts` ফাইলে বাকি বিষয়গুলোর PDF URL ম্যানুয়ালি যোগ করতে পারবেন।" })
    ] })
  ] }) });
}
export {
  SubjectDetail as component
};
