import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { e as ensureEcosystemSeed, m as getLibraryAssets, n as listenLibraryAssets, o as libraryItems, A as AppShell, q as saveLibraryAsset } from "./router-9Ny0xRmp.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__database.mjs";
import "../_libs/firebase__functions.mjs";
import { E as ExternalLink, ab as FileText, ac as Headphones, ad as Boxes, ae as ScanLine, af as CirclePlus, ag as CirclePlay } from "../_libs/lucide-react.mjs";
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
const educationalVideos = [{
  title: "বাংলা বর্ণমালা ও পাঠ",
  channel: "শিক্ষামূলক ভিডিও",
  url: "https://youtu.be/j5Vwp6PQyNE",
  classLevel: 1,
  subject: "বাংলা"
}, {
  title: "গণিতের সহজ ব্যাখ্যা",
  channel: "শিক্ষামূলক ভিডিও",
  url: "https://youtu.be/j5Vwp6PQyNE",
  classLevel: 2,
  subject: "গণিত"
}, {
  title: "বিজ্ঞানের মজার ক্লাস",
  channel: "শিক্ষামূলক ভিডিও",
  url: "https://youtu.be/j5Vwp6PQyNE",
  classLevel: 4,
  subject: "বিজ্ঞান"
}];
const featuredShorts = [{
  title: "শর্টস: বাংলা শেখা",
  channel: "শিক্ষামূলক শর্টস",
  url: "https://youtu.be/j5Vwp6PQyNE",
  classLevel: 1,
  subject: "বাংলা"
}, {
  title: "শর্টস: দ্রুত গণিত",
  channel: "শিক্ষামূলক শর্টস",
  url: "https://youtu.be/j5Vwp6PQyNE",
  classLevel: 2,
  subject: "গণিত"
}];
function Library() {
  ensureEcosystemSeed();
  const [uploadedAssets, setUploadedAssets] = reactExports.useState(getLibraryAssets());
  const [selectedClass, setSelectedClass] = reactExports.useState("all");
  const [selectedSubject, setSelectedSubject] = reactExports.useState("all");
  const [uploadForm, setUploadForm] = reactExports.useState({
    title: "",
    kind: "PDF",
    shelf: "left",
    subject: "সাধারণ জ্ঞান",
    description: "",
    url: "",
    uploadedBy: "লাইব্রেরি অ্যাডমিন"
  });
  const [pendingFile, setPendingFile] = reactExports.useState(null);
  reactExports.useEffect(() => listenLibraryAssets(setUploadedAssets), []);
  const shelfAssets = reactExports.useMemo(() => ({
    left: [...uploadedAssets.filter((asset) => asset.shelf === "left"), ...libraryItems.filter((item) => item.format === "Book")],
    middle: [...uploadedAssets.filter((asset) => asset.shelf === "middle"), ...libraryItems.filter((item) => item.format === "Audio")],
    right: [...uploadedAssets.filter((asset) => asset.shelf === "right"), ...libraryItems.filter((item) => item.format === "Model")]
  }), [uploadedAssets]);
  const filteredVideos = reactExports.useMemo(() => educationalVideos.filter((video) => (selectedClass === "all" || video.classLevel === selectedClass) && (selectedSubject === "all" || video.subject === selectedSubject)), [selectedClass, selectedSubject]);
  const filteredReels = reactExports.useMemo(() => featuredShorts.filter((reel) => (selectedClass === "all" || reel.classLevel === selectedClass) && (selectedSubject === "all" || reel.subject === selectedSubject)), [selectedClass, selectedSubject]);
  const handleUpload = () => {
    if (!uploadForm.title.trim()) return;
    const commitUpload = (resolvedUrl) => {
      const asset = {
        id: `asset-${Date.now()}`,
        title: uploadForm.title.trim(),
        kind: uploadForm.kind,
        shelf: uploadForm.shelf,
        subject: uploadForm.subject.trim() || "সাধারণ জ্ঞান",
        url: resolvedUrl,
        uploadedBy: uploadForm.uploadedBy.trim() || "লাইব্রেরি অ্যাডমিন",
        uploadedAt: Date.now(),
        description: uploadForm.description.trim() || "নতুন লাইব্রেরি আপলোড"
      };
      saveLibraryAsset(asset);
      setUploadedAssets((current) => [asset, ...current.filter((item) => item.id !== asset.id)]);
      setUploadForm({
        title: "",
        kind: uploadForm.kind,
        shelf: uploadForm.shelf,
        subject: uploadForm.subject,
        description: "",
        url: "",
        uploadedBy: uploadForm.uploadedBy
      });
      setPendingFile(null);
    };
    if (pendingFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const resolvedUrl = typeof reader.result === "string" ? reader.result : uploadForm.url;
        commitUpload(resolvedUrl || uploadForm.url);
      };
      reader.readAsDataURL(pendingFile);
      return;
    }
    commitUpload(uploadForm.url.trim());
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-none flex-col gap-6 px-4 py-6 md:px-8 md:py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "overflow-hidden rounded-[2.5rem] border border-white/40 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.28),transparent_26%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.22),transparent_28%),linear-gradient(135deg,#07111f_0%,#0f172a_55%,#111827_100%)] text-white shadow-[0_24px_80px_rgba(15,23,42,0.28)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-h-[34vh] gap-6 lg:grid-cols-[1.25fr_0.75fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between gap-6 p-6 md:p-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200", children: "লাইব্রেরি শেল্ফ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black tracking-tight md:text-5xl", children: "পূর্ণ পর্দার bookshelf যেখানে বই, নোট, অডিও আর AR একই জায়গায়" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-2xl text-sm leading-7 text-white/75 md:text-base", children: "Left shelf-এ PDF ও notes, middle shelf-এ audio notes ও novels, right shelf-এ periodic table mini web এবং 3D AR models আছে।" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/live-class", className: "inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 shadow-soft transition-transform hover:scale-[1.01]", children: "লাইভ ক্লাস" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://zperiod.app", target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10", children: [
            "Periodic Table খুলুন",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative p-6 md:p-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid h-full grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShelfPreview, { title: "PDF বই", accent: "from-amber-200 via-amber-100 to-white", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShelfPreview, { title: "অডিও", accent: "from-cyan-200 via-sky-100 to-white", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Headphones, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShelfPreview, { title: "AR", accent: "from-fuchsia-200 via-violet-100 to-white", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Boxes, { className: "h-5 w-5" }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 xl:grid-cols-[1.55fr_0.75fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-[2rem] border border-white/40 bg-slate-950 text-white shadow-[0_24px_70px_rgba(15,23,42,0.22)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-white/10 p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "h-5 w-5 text-emerald-300" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Periodic Table mini web" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-6 text-white/70", children: "zperiod.app এখন বাম দিকের main area-তে বড় view হিসেবে লোড হচ্ছে।" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { title: "Periodic Table", src: "https://zperiod.app", className: "h-[68vh] w-full", loading: "lazy" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-[2rem] p-5 md:p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "বাম শেল্ফ: PDF বই ও নোট" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-3 md:grid-cols-2", children: shelfAssets.left.map((asset) => /* @__PURE__ */ jsxRuntimeExports.jsx(AssetRow, { asset: normalizeAsset(asset, "left") }, asset.id ?? asset.title)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-[2rem] p-5 md:p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Headphones, { className: "h-5 w-5 text-brand-blue" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "মধ্য শেল্ফ: অডিও নোট ও নভেল" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-3 md:grid-cols-2", children: shelfAssets.middle.map((asset) => /* @__PURE__ */ jsxRuntimeExports.jsx(AssetRow, { asset: normalizeAsset(asset, "middle") }, asset.id ?? asset.title)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[2rem] p-5 md:p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-5 w-5 text-brand-green" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "লাইব্রেরি আপলোড" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { label: "Title", value: uploadForm.title, onChange: (value) => setUploadForm((current) => ({
              ...current,
              title: value
            })) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "Kind", value: uploadForm.kind, options: ["PDF", "Note", "Audio", "Novel", "AR Model"], onChange: (value) => {
              const nextShelf = value === "AR Model" ? "right" : value === "Audio" || value === "Novel" ? "middle" : "left";
              setUploadForm((current) => ({
                ...current,
                kind: value,
                shelf: nextShelf
              }));
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "Shelf", value: uploadForm.shelf, options: ["left", "middle", "right"], onChange: (value) => setUploadForm((current) => ({
              ...current,
              shelf: value
            })) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { label: "Subject", value: uploadForm.subject, onChange: (value) => setUploadForm((current) => ({
              ...current,
              subject: value
            })) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { label: "Uploaded by", value: uploadForm.uploadedBy, onChange: (value) => setUploadForm((current) => ({
              ...current,
              uploadedBy: value
            })) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { label: "URL", value: uploadForm.url, onChange: (value) => setUploadForm((current) => ({
              ...current,
              url: value
            })) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-1.5 text-sm font-medium md:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ফাইল আপলোড" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", onChange: (event) => setPendingFile(event.target.files?.[0] ?? null), className: "w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-1.5 text-sm font-medium md:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: uploadForm.description, onChange: (event) => setUploadForm((current) => ({
                ...current,
                description: event.target.value
              })), className: "min-h-24 w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:border-primary", placeholder: "Short description" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleUpload, className: "mt-4 inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-4 py-3 text-sm font-semibold text-white shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4" }),
            "আপলোড সংরক্ষণ করুন"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "RTDB-backed upload. File দিলে সেটি data URL হিসেবে লোড হবে, না হলে URL হিসেবে সেভ হবে।" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-[2rem] p-5 md:p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Boxes, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold", children: "3D AR models" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-6 text-muted-foreground", children: "3D model upload এখানে RTDB-তে সেভ হবে, তারপর AR shelf-এ দেখাবে।" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: shelfAssets.right.map((asset) => /* @__PURE__ */ jsxRuntimeExports.jsx(AssetRow, { asset: normalizeAsset(asset, "right") }, asset.id ?? asset.title)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-[2rem] p-5 md:p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-6 h-6 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "ভিডিও ফিড" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "শিক্ষামূলক ভিডিও ও শর্টস।" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4", children: [
            filteredVideos.map((video) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: video.url, target: "_blank", rel: "noreferrer", className: "group glass rounded-3xl overflow-hidden shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all bg-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video bg-slate-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `https://i.ytimg.com/vi/${youtubeIdFromUrl(video.url)}/hqdefault.jpg`, alt: video.title, className: "h-full w-full object-cover", loading: "lazy" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-xs font-semibold text-white", children: [
                  "শ্রেণি ",
                  video.classLevel
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold leading-snug", children: video.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center justify-between gap-2 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: video.channel }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: video.subject })
                ] })
              ] })
            ] }, video.url + video.title)),
            filteredReels.map((reel) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: reel.url, target: "_blank", rel: "noreferrer", className: "group glass rounded-3xl overflow-hidden shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all bg-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[9/16] bg-gradient-blue text-white overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `https://i.ytimg.com/vi/${youtubeIdFromUrl(reel.url)}/hqdefault.jpg`, alt: reel.title, className: "h-full w-full object-cover" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-xs font-semibold text-white", children: "Shorts" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: reel.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center justify-between text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: reel.subject }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "শ্রেণি ",
                    reel.classLevel
                  ] })
                ] })
              ] })
            ] }, reel.url))
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
function AssetRow({
  asset
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[1.5rem] border border-border bg-white/85 p-4 shadow-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: asset.kind }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-bold", children: asset.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: asset.subject })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary", children: asset.shelf })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-6 text-muted-foreground", children: asset.description }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: asset.uploadedBy }),
      asset.url && asset.url !== "#" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: asset.url, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1 font-semibold text-primary", children: [
        "খুলুন ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-muted-foreground", children: "Preview" })
    ] })
  ] });
}
function ShelfPreview({
  title,
  accent,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-[2rem] border border-white/10 bg-gradient-to-br ${accent} p-4 text-slate-900 shadow-soft`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.3em] text-slate-500", children: "Shelf" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-bold", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-white/80 p-2", children: icon })
  ] }) });
}
function normalizeAsset(asset, shelf) {
  if ("kind" in asset) return asset;
  return {
    id: asset.id,
    title: asset.title,
    kind: asset.format === "Book" ? "PDF" : asset.format === "Audio" ? "Audio" : "AR Model",
    subject: asset.category,
    shelf,
    url: "#",
    uploadedBy: "System",
    uploadedAt: Date.now(),
    description: asset.description
  };
}
function InputField({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-1.5 text-sm font-medium", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, onChange: (event) => onChange(event.target.value), className: "w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:border-primary" })
  ] });
}
function SelectField({
  label,
  value,
  options,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-1.5 text-sm font-medium", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value, onChange: (event) => onChange(event.target.value), className: "w-full rounded-2xl border border-input bg-background px-4 py-3 outline-none focus:border-primary", children: options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option, children: option }, option)) })
  ] });
}
function youtubeIdFromUrl(url) {
  const patterns = [/youtu\.be\/([A-Za-z0-9_-]{11})/i, /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/i, /youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})/i];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return "";
}
export {
  Library as component
};
